import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { format } from 'date-fns';
import * as moment_ from 'moment/moment';
import { forkJoin, Observable, of } from 'rxjs';
import { ServiceOfferingsEnum } from 'src/app/authorization/workflow/service-offerings.enum';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { SupportedLanguages } from 'src/app/translation/shared/enums/supported-languages.enum';
import { UploadDocumentService } from 'src/app/ui-components/page-addons/upload-document/upload-document.service';
import { AccessPoint } from '../../shared/enums/access-point.enum';
import { ConsentSource, ConsentStatus, ConsentType } from '../../shared/enums/consent.enum';
import { DocumentType } from '../../shared/enums/document-type.enum';
import { Gender } from '../../shared/enums/gender.enum';
import { ApplicationConfig } from '../../shared/models/application-config.model';
import { DocumentRequest } from '../../shared/models/documents/document-request.model';
import { FactIntakeResponse } from '../../shared/models/fact-intake/fact-intake-response.model';
import {
  FactIntake,
  Fact,
  FactDocument,
  FactIntakeInsurance,
  FactIntakePrescriber,
  FactPractice,
  FactPracticeAddress,
  FactPracticePhone,
  FactPracticeFaxPhone,
  FactIntakeInsurancePhone
} from '../../shared/models/fact-intake/fact-intake.model';
import { SubmissionPacketHelper } from '../document/submission-packet-helper';
import { EnrollmentRequestHelper } from './enrollment-request-helper';

// TODO: create service to wrap moment
const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private englishConsentDocId = 'CF7FFB9E-10A4-426E-BCCC-6726C9DDB497';
  private englishCoversheetDocId = 'bd330ad5-e8a7-4fd8-ac16-54e3312c7e23';
  private englishPatientAuthorizationDocId = 'AE7F0FFE-C5DB-42E6-9DAB-A6FAFE5F14FC';
  private englishEnrollmentDocumentId = 'EE4F2306-7A00-401D-AB68-56532444FC3B';
  private spanishConsentDocId = 'CF7FFB9E-10A4-426E-BCCC-6726C9DDB497';
  private spanishCoversheetDocId = '9a49d504-32f6-4b4c-910b-fc2c8476a321';
  private spanishPatientAuthorizationDocId = 'AE7F0FFE-C5DB-42E6-9DAB-A6FAFE5F14FC';
  private spanishEnrollmentDocumentId = 'EE4F2306-7A00-401D-AB68-56532444FC3B';
  private workflowIdGrowth = 'bd630a1d-2ade-45ff-ba7e-9bc4e06b4bdd';
  private workflowIdRareblood = '76ab3827-ddec-4290-a1d4-94438054c02c';
  private workflowIdObesity = '837eea69-cadb-4363-aab3-6e5234625f33';
  private templateIdGrowthCoverpage = '487bbad3-1101-41bf-ae24-1dd92e42cabe';
  private templateIdObesityCoverpage = '1fefe84b-f4b3-478d-9102-503d8a11fea6';
  private templateIdRarebloodCoverpage = '9ba2139e-425c-4368-9d59-07c4495804b7';
  private templateIdGrowthPatientAuthorization = 'bbaf6774-4f32-439a-876d-32858b7779b7';
  private templateIdObesityPatientAuthorization = '943e7468-f217-41db-9699-4fb4e260d9a2';
  private templateIdRarebloodPatientAuthorization = '2716c3b9-cd60-482a-a27c-98bc4d96a861';
  private factIntakeRoute: string;
  private documentGenerateRoute: string;
  private faxSendRoute: string;
  private consentFaxNumber: string;
  private obesityFaxNumber: string;
  private rarebloodFaxNumber: string;
  private growthFaxNumber: string;
  private ptAuthIdentifier = 'PTAuth';
  private ptAuthDocIdentifier = 'PTAuthandDoc';
  private docIdentifier = 'DOC';

  constructor(
    @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
    private httpClient: HttpClient,
    private workflowService: WorkflowService,
    private translateService: TranslateContentService,
    private uploadDocumentService: UploadDocumentService
  ) {
    this.factIntakeRoute = `${applicationConfig.integrationFabricApiBaseAddress}integration/v1/interestsite/factintake`;
    this.documentGenerateRoute = `${applicationConfig.integrationFabricApiBaseAddress}integration/v1/document/generate`;
    this.faxSendRoute = `${applicationConfig.integrationFabricApiBaseAddress}integration/v1/fax/send`;
    this.consentFaxNumber = applicationConfig.consentFaxNumber;
    this.obesityFaxNumber = applicationConfig.obesityFaxNumber;
    this.rarebloodFaxNumber = applicationConfig.rarebloodFaxNumber;
    this.growthFaxNumber = applicationConfig.growthFaxNumber;
  }

  public generateDocuments(): Observable<string[]> {
    const documents = [];

    if (this.workflowService.getSelectedOffering() != ServiceOfferingsEnum.GrowthDoc &&
        this.workflowService.getSelectedOffering() != ServiceOfferingsEnum.ObesityDoc &&
        this.workflowService.getSelectedOffering() != ServiceOfferingsEnum.RareBloodDoc ){
          const patientAuthorizationDocument$ = this.httpClient.post<string>(this.documentGenerateRoute, this.generatePatientAuthorizationDocumentRequest());
          documents.push(patientAuthorizationDocument$);
    }
    const enrollmentDocument$ = this.httpClient.post<string>(this.documentGenerateRoute, this.generateEnrollmentDocumentRequest());
    documents.push(enrollmentDocument$);

    if (documents.length === 0) {
      return of([]);
    } else {
      return forkJoin<string[]>(documents);
    }
  }

  public saveToTransactional(): Observable<FactIntakeResponse> {
    const factIntakeRequest = this.buildFactIntakeRequest();
    return this.httpClient.post<FactIntakeResponse>(this.factIntakeRoute, factIntakeRequest);
  }

  public faxDocumentForm(transactionGroupId: string): Observable<any> {

    let faxNumber;
    switch (this.workflowService.getSelectedOffering()) {
      case ServiceOfferingsEnum.ObesityPatientAuth:
        faxNumber = this.obesityFaxNumber;
        break;
      case ServiceOfferingsEnum.ObesityPTAuthandDoc:
        faxNumber = this.obesityFaxNumber;
        break;
      case ServiceOfferingsEnum.ObesityDoc:
        faxNumber = this.obesityFaxNumber;
        break;
      case ServiceOfferingsEnum.RareBloodPatientAuth:
        faxNumber = this.rarebloodFaxNumber;
        break;
      case ServiceOfferingsEnum.RareBloodPTAuthandDoc:
        faxNumber = this.rarebloodFaxNumber;
        break;
      case ServiceOfferingsEnum.RareBloodDoc:
        faxNumber = this.rarebloodFaxNumber;
        break;
      case ServiceOfferingsEnum.GrowthPatientAuth:
        faxNumber = this.growthFaxNumber;
        break;
      case ServiceOfferingsEnum.GrowthPTAuthandDoc:
        faxNumber = this.growthFaxNumber;
        break;
      case ServiceOfferingsEnum.GrowthDoc:
        faxNumber = this.growthFaxNumber;
        break;
    }

    const faxRequest = {
      transactionGroupId,
      coverPage: '(none)',
      recipientFaxNumber: faxNumber,
      attachments: []
    };

    if (this.workflowService.patientAuthorizationDocumentId) {
      faxRequest.attachments.push(this.workflowService.patientAuthorizationDocumentId);
    }

    if (this.workflowService.enrollmentDocumentId) {
      faxRequest.attachments.push(this.workflowService.enrollmentDocumentId);
    }

    if (this.workflowService.uploadedDocumentIds && this.workflowService.uploadedDocumentIds.length > 0) {
      faxRequest.attachments.push(...this.workflowService.uploadedDocumentIds);
    }

    if (faxRequest.attachments.length > 0) {
      return this.httpClient.post<any>(this.faxSendRoute, faxRequest);
    }

    return of(null);
  }

  private generatePatientAuthorizationRequest(): DocumentRequest {
    const documentRequest = new DocumentRequest();

    if (this.translateService.languageSelected === SupportedLanguages.English) {
      documentRequest.templateDocumentId = this.englishPatientAuthorizationDocId;
    } else {
      documentRequest.templateDocumentId = this.spanishPatientAuthorizationDocId;
    }

    const fullName = `${this.workflowService.patientFormData.firstName} ${this.workflowService.patientFormData.lastName}`;
    const patientAuthorization = this.workflowService.patientAuthorizationFormData;
    const patientAuthorizing = patientAuthorization.whoIsAuthorizing === 'Patient';
    const signature = patientAuthorizing ? patientAuthorization.signature : patientAuthorization.legalSignature;
    const patientConsentValue = patientAuthorizing ? 'No' : 'Yes';
    documentRequest.formData = {
      data: {
        'pt_fullname': fullName,
        'pt_signature': {
          '@type': 'image',
          'value': signature
        },
        'pt_consent': patientConsentValue
      }
    };

    if (!patientAuthorizing) {
      documentRequest.formData.data['pt_relation'] = patientAuthorization.relationToPatient;
      documentRequest.formData.data['legal_rep_name'] = patientAuthorization.legalRepFullName;
    }
    return documentRequest;
  }

  private generateEnrollmentDocumentRequest(): DocumentRequest {
    let templateId = '';
    if (this.workflowService.GROWTH_THERAPY.includes(this.workflowService.getSelectedOffering())) {
      templateId = this.templateIdGrowthCoverpage;
    }
    if (this.workflowService.OBESITY_THERAPY.includes(this.workflowService.getSelectedOffering())) {
      templateId = this.templateIdObesityCoverpage;
    }
    if (this.workflowService.RAREBLOOD_THERAPY.includes(this.workflowService.getSelectedOffering())) {
      templateId = this.templateIdRarebloodCoverpage;
    }
    const helper = new EnrollmentRequestHelper(this.workflowService, templateId, '_Submission_Coverpage_');
    this.workflowService.enrollmentDocumentName = helper.buildEnrollmentRequest().documentName;
    return helper.buildEnrollmentRequest();
  }

  private generatePatientAuthorizationDocumentRequest(): DocumentRequest {
    let templateId = '';
    if (this.workflowService.GROWTH_THERAPY.includes(this.workflowService.getSelectedOffering())) {
      templateId = this.templateIdGrowthPatientAuthorization;
    }
    if (this.workflowService.OBESITY_THERAPY.includes(this.workflowService.getSelectedOffering())) {
      templateId = this.templateIdObesityPatientAuthorization;
    }
    if (this.workflowService.RAREBLOOD_THERAPY.includes(this.workflowService.getSelectedOffering())) {
      templateId = this.templateIdRarebloodPatientAuthorization;
    }
    const helper = new EnrollmentRequestHelper(this.workflowService, templateId, '_Patient_Authorization_FORM_');
    this.workflowService.patientAuthorizationDocumentName = helper.buildEnrollmentRequest().documentName;
    return helper.buildEnrollmentRequest();
  }

  private generateSubmissionPacketRequest(): DocumentRequest {
    const helper = new SubmissionPacketHelper(this.workflowService, this.translateService, this.uploadDocumentService);
    return helper.generateSubmissionPacketRequest();
  }

  private getWorkflowIdByTherapy(): string {
    const selectedOffering = this.workflowService.getSelectedOffering();
    if (this.workflowService.RAREBLOOD_THERAPY.includes(selectedOffering)) {
      return this.workflowIdRareblood;
    } else if (this.workflowService.GROWTH_THERAPY.includes(selectedOffering)) {
      return this.workflowIdGrowth;
    } else if (this.workflowService.OBESITY_THERAPY.includes(selectedOffering)) {
      return this.workflowIdObesity;
    }
    return '';
  }

  private getIdentifierByTherapy(): string {
    const selectedOffering = this.workflowService.getSelectedOffering();
    if (this.workflowService.AUTH.includes(selectedOffering)) {
      return this.ptAuthIdentifier;
    } else if (this.workflowService.AUTH_AND_DOC.includes(selectedOffering)) {
      return this.ptAuthDocIdentifier;
    } else if (this.workflowService.DOC.includes(selectedOffering)) {
      return this.docIdentifier;
    }
    return '';
  }

  public buildFactIntakeRequest(): FactIntake {
    const factIntake = new FactIntake();

    const patientFullName = this.workflowService.patientFormData.firstName + ' ' + this.workflowService.patientFormData.lastName;
    const now = new Date();

    factIntake.transactionGroupId = this.workflowService.transactionGroupId ?? undefined;
    factIntake.serviceTypeId = this.workflowService.getSelectedOffering();
    factIntake.accessPointId = AccessPoint.InterestSite;
    factIntake.currentDateTime = moment.utc().format();
    factIntake.workflowId = this.getWorkflowIdByTherapy();
    factIntake.organizationId = this.workflowService.organizationId || undefined;

    factIntake.patient.firstName = this.workflowService.patientFormData.firstName;
    factIntake.patient.lastName = this.workflowService.patientFormData.lastName;
    factIntake.patient.dateOfBirth = moment(this.workflowService.patientFormData.dateOfBirth).format('MM/DD/YYYY');
    factIntake.patient.gender = this.workflowService.patientFormData.gender || Gender.Unknown;
    factIntake.patient.emailAddress = this.workflowService.patientFormData.emailAddress;
    factIntake.patient.preferredLanguage = this.workflowService.patientFormData.preferredLanguage;
    factIntake.patient.grossHouseholdIncome = this.workflowService.incomeVerificationFormData.annualHouseholdIncome;
    factIntake.patient.householdSize = this.workflowService.incomeVerificationFormData.householdSize;
    factIntake.patient.caregiverFirstName = this.workflowService.patientFormData.altContactOrCaregiver == 'Y' ? this.workflowService.patientFormData.caregiverFirstName : null;
    factIntake.patient.caregiverLastName = this.workflowService.patientFormData.altContactOrCaregiver == 'Y' ? this.workflowService.patientFormData.caregiverLastName : null;
    factIntake.patient.caregiverPhone = this.workflowService.patientFormData.altContactOrCaregiver == 'Y' ? this.workflowService.patientFormData.caregiverPhone : null;
    factIntake.patient.bestTimeToContact = this.workflowService.patientFormData.bestTimeToReach;

    factIntake.patient.factPatientAddress.addressLine1 = this.workflowService.patientFormData.addressLine1;
    factIntake.patient.factPatientAddress.addressLine2 = this.workflowService.patientFormData.addressLine2;
    factIntake.patient.factPatientAddress.city = this.workflowService.patientFormData.city;
    factIntake.patient.factPatientAddress.stateCode = this.workflowService.patientFormData.stateCode;
    factIntake.patient.factPatientAddress.postalCode = this.workflowService.patientFormData.postalCode;

    if (this.workflowService.patientFormData.primaryPhone) {
      factIntake.patient.factPatientMobilePhone = {
        number: this.unformatPhoneNumber(this.workflowService.patientFormData.primaryPhone),
        phoneLevelId: 0,
        countryCode: null,
        ext: null,
        isAllowedToLeaveMessage: this.workflowService.patientFormData.preferredNumber == '1' ? this.workflowService.patientFormData.okToLeaveMessage == "Y" : null,
        isContactTimeMorning: null,
        isContactTimeAfternoon: null,
        isContactTimeEvening: null
      };
    }

    if (this.workflowService.patientFormData.altPhone) {
      factIntake.patient.factPatientHomePhone = {
        number: this.unformatPhoneNumber(this.workflowService.patientFormData.altPhone),
        phoneLevelId: 0,
        countryCode: null,
        ext: null,
        isAllowedToLeaveMessage: this.workflowService.patientFormData.preferredNumber == '2' ? this.workflowService.patientFormData.okToLeaveMessage == "Y" : null,
        isContactTimeMorning: null,
        isContactTimeAfternoon: null,
        isContactTimeEvening: null
      };
    }

    if (this.workflowService.prescriberInformationFormData && this.workflowService.prescriberInformationFormData.prescriberNpi) {
      factIntake.prescriber = new FactIntakePrescriber();
      factIntake.prescriber.firstName = this.workflowService.prescriberInformationFormData.prescriberFirstName;
      factIntake.prescriber.lastName = this.workflowService.prescriberInformationFormData.prescriberLastName;
      factIntake.prescriber.specialty = this.workflowService.prescriberInformationFormData.prescriberSpecialty;
      factIntake.prescriber.npi = this.workflowService.prescriberInformationFormData.prescriberNpi;
      factIntake.prescriber.stateLicenseNumber = this.workflowService.prescriberInformationFormData.prescriberStateNumber;

      factIntake.practice = new FactPractice();
      factIntake.practice.practiceName = this.workflowService.prescriberInformationFormData.practiceName;

      factIntake.practice.phoneNumber = new FactPracticePhone();
      factIntake.practice.phoneNumber.number = this.unformatPhoneNumber(this.workflowService.prescriberInformationFormData.officeContactPhoneNumber);

      factIntake.practice.faxPhoneNumber = new FactPracticeFaxPhone();
      factIntake.practice.faxPhoneNumber.number = this.unformatPhoneNumber(this.workflowService.prescriberInformationFormData.officeFaxNumber);

      factIntake.practice.address = new FactPracticeAddress();
      factIntake.practice.address.addressLine1 = this.workflowService.prescriberInformationFormData.practiceAddress1;
      factIntake.practice.address.addressLine2 = this.workflowService.prescriberInformationFormData.practiceAddress2;
      factIntake.practice.address.city = this.workflowService.prescriberInformationFormData.city;
      factIntake.practice.address.postalCode = this.workflowService.prescriberInformationFormData.postalCode || '';
      factIntake.practice.address.stateCode = this.workflowService.prescriberInformationFormData.state;
    }

    factIntake.miscFactItems = [
      this.createFactItem('workflowSubmitted', 'true'),
      this.createFactItem('Patient.CaregiverRelationship', this.workflowService.patientFormData.caregiverRelationshipToPatient ?? 'N/A'),
      this.createFactItem('DocumentUpload.DocumentType', this.workflowService.documentUploadFormData.documentType),
      this.createFactItem('DocumentUpload.OtherDocumentType', this.workflowService.documentUploadFormData.documentTypeOther),
      this.createFactItem('workflowIdentifier', this.getIdentifierByTherapy()),
    ];

    if (this.workflowService.patientAuthorizationFormData.whoIsAuthorizing == 'Patient') {
      factIntake.miscFactItems.push (
        this.createFactItem('PatientAuthorization.AuthorizedBy', this.workflowService.patientAuthorizationFormData.whoIsAuthorizing ?? 'N/A'),
        this.createFactItem('PatientAuthorization.AuthorizeCombination', this.workflowService.patientAuthorizationFormData.authorizationOption ?? 'N/A'),
        this.createFactItem('PatientAuthorization.HippaAuthorization', this.workflowService.patientAuthorizationFormData.hipaaConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.SMSAuthorization', this.workflowService.patientAuthorizationFormData.smsConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.MarketingAuthorization', this.workflowService.patientAuthorizationFormData.marketingMsgConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.FCRAuthorization', this.workflowService.patientAuthorizationFormData.fcraConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.PapAuthorization', this.workflowService.patientAuthorizationFormData.asstProgAuthConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.MedicarePartDEnrolleeAuthorization', this.workflowService.patientAuthorizationFormData.medEnrollAuthConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.PatientFullName', this.workflowService.patientAuthorizationFormData.authorizerName ?? 'N/A'),
        this.createFactItem('PatientAuthorization.Signature', this.workflowService.patientAuthorizationFormData.signature ?? 'N/A')
      );
    } else if (this.workflowService.patientAuthorizationFormData.whoIsAuthorizing == 'Legal Representative') {
      factIntake.miscFactItems.push (
        this.createFactItem('PatientAuthorization.AuthorizedBy', this.workflowService.patientAuthorizationFormData.whoIsAuthorizing ?? 'N/A'),
        this.createFactItem('PatientAuthorization.AuthorizeCombination', this.workflowService.patientAuthorizationFormData.authorizationOption ?? 'N/A'),
        this.createFactItem('PatientAuthorization.LegalRepresentativeFullName', this.workflowService.patientAuthorizationFormData.legalRepFullName ?? 'N/A'),
        this.createFactItem('PatientAuthorization.RelationToPatient', this.workflowService.patientAuthorizationFormData.relationToPatient ?? 'N/A'),
        this.createFactItem('PatientAuthorization.HippaAuthorization', this.workflowService.patientAuthorizationFormData.hipaaConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.SMSAuthorization', this.workflowService.patientAuthorizationFormData.smsConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.MarketingAuthorization', this.workflowService.patientAuthorizationFormData.marketingMsgConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.FCRAuthorization', this.workflowService.patientAuthorizationFormData.fcraConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.PapAuthorization', this.workflowService.patientAuthorizationFormData.asstProgAuthConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.MedicarePartDEnrolleeAuthorization', this.workflowService.patientAuthorizationFormData.medEnrollAuthConsent ?? 'N/A'),
        this.createFactItem('PatientAuthorization.LegalFullName', this.workflowService.patientAuthorizationFormData.legalFullName ?? 'N/A'),
        this.createFactItem('PatientAuthorization.LegalSignature', this.workflowService.patientAuthorizationFormData.legalSignature ?? 'N/A'),
      );
    }

  if (this.workflowService.selectedServiceType != null && this.workflowService.selectedServiceType.serviceTypeSelected != undefined) {
    factIntake.miscFactItems.push(this.createFactItem('Service.PriorAuthorization', this.workflowService.selectedServiceType.serviceTypeSelected[0] ? "Y" : "N"))
    factIntake.miscFactItems.push(this.createFactItem('Service.ClaimsAssistance', this.workflowService.selectedServiceType.serviceTypeSelected[1] ? "Y" : "N"))
    factIntake.miscFactItems.push(this.createFactItem('Service.Copay', this.workflowService.selectedServiceType.serviceTypeSelected[2] ? "Y" : "N"))
    factIntake.miscFactItems.push(this.createFactItem('Service.PAP', this.workflowService.selectedServiceType.serviceTypeSelected[3] ? "Y" : "N"))
    factIntake.miscFactItems.push(this.createFactItem('Service.ResourceSupport', this.workflowService.selectedServiceType.serviceTypeSelected[4] ? "Y" : "N"))
  }

    const patientAuthorizing = this.workflowService.patientAuthorizationFormData.whoIsAuthorizing === 'Patient';
    const currentISODate = moment().utc().toISOString();
    factIntake.patient.consents.push({
      consentSourceId: ConsentSource.Electronic,
      consentStatusId: ConsentStatus.Consented,
      consentTypeId: ConsentType.Hipaa,
      consentName: 'Authorization to Use and Disclose Health Information',
      effectiveDate: currentISODate,
      expirationDate: null,
      receivedDate: currentISODate,
      signatureOnConsent: true,
      signatureOnConsentDate: currentISODate,
      consentOptOutDate: null,
      consentProvidedBy: patientAuthorizing ? patientFullName : this.workflowService.patientAuthorizationFormData.legalFullName,
    });

    factIntake.patient.consents.push({
      consentSourceId: ConsentSource.Electronic,
      consentStatusId: ConsentStatus.Consented,
      consentTypeId: ConsentType.Hipaa,
      consentName: 'Patient Certifications',
      effectiveDate: currentISODate,
      expirationDate: null,
      receivedDate: currentISODate,
      signatureOnConsent: true,
      signatureOnConsentDate: currentISODate,
      consentOptOutDate: null,
      consentProvidedBy: patientAuthorizing ? patientFullName : this.workflowService.patientAuthorizationFormData.legalFullName,
    });

    factIntake.patient.consents.push({
      consentSourceId: ConsentSource.Electronic,
      consentStatusId: this.workflowService.patientAuthorizationFormData.consentTextMessage?.textMessaging ? ConsentStatus.Consented : ConsentStatus.Declined,
      consentTypeId: ConsentType.Marketing,
      consentName: 'Text Authorization',
      effectiveDate: currentISODate,
      expirationDate: null,
      receivedDate: currentISODate,
      signatureOnConsent: true,
      signatureOnConsentDate: currentISODate,
      consentOptOutDate: null,
      consentProvidedBy: patientAuthorizing ? patientFullName : this.workflowService.patientAuthorizationFormData.legalFullName,
    });

    if (this.workflowService.insuranceInformationFormData.hasInsurance === 'Y') {
      const policyholderDateOfBirth = this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.policyholderDateOfBirth;
      const insurancePhone = new FactIntakeInsurancePhone();
      insurancePhone.number = this.unformatPhoneNumber(this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.pbmPhoneNumber);

      factIntake.miscFactItems.push(this.createFactItem('Insurance.HasInsurance', 'true'));
      factIntake.primaryInsurance = {
        patientId: this.workflowService.patientId,
        insurancePolicyId: this.newGuid(),
        levelId: 1,
        pharmacyBenefitPlanTypeId: this.getPlanTypeId(this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.insurancePlanType),
        pharmacyBenefitManagerCompanyName: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.pbmName,
        pbmPhoneNumber: insurancePhone,
        rxMemberNumber: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.policyholderIdNumber,
        rxGroupNumber: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.groupNumber,
        rxBankIdentificationNumber: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.binNumber,
        rxProcessorControlNumber: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.pcnNumber,
        rxRelationshipToMember: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.policyholderRelationshipToPatient,
        rxPolicyHolderBirthDate: policyholderDateOfBirth ? moment(policyholderDateOfBirth).format('MM/DD/YYYY') : null,
        rxPolicyHolderFirstName: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.policyholderFirstName,
        rxPolicyHolderLastName: this.workflowService.insuranceInformationFormData['insuranceFormPrimary']?.policyholderLastName
      };
    } else if (this.workflowService.insuranceInformationFormData.isInformationCorrect === 'Y') {
      const insurancePhone = new FactIntakeInsurancePhone();
      const eligibilityResponse = this.workflowService.eligibilityResponseModel;

      factIntake.miscFactItems.push(this.createFactItem('Insurance.HasInsurance', 'true'));

      if (eligibilityResponse?.eligibilityResults) {
        const result = eligibilityResponse.eligibilityResults[0];

        insurancePhone.number = this.unformatPhoneNumber(result.pbmPhone);

        factIntake.primaryInsurance = {
          patientId: this.workflowService.patientId,
          insurancePolicyId: this.newGuid(),
          levelId: 1,
          pharmacyBenefitManagerCompanyName: result.pbmName,
          pbmPhoneNumber: insurancePhone,
          rxMemberNumber: result.memberId,
          rxGroupNumber: result.groupId,
          rxBankIdentificationNumber: result.bankIdentificationNumber,
          rxProcessorControlNumber: result.processorControlNumber,
          rxPolicyHolderBirthDate: result.dateOfBirth,
          rxPolicyHolderFirstName: result.firstName,
          rxPolicyHolderLastName: result.lastName
        }
      };
    } else {
      factIntake.miscFactItems.push(this.createFactItem('Insurance.HasInsurance', 'false'));
    }

    if (this.workflowService.insuranceInformationFormData.hasSecondaryInsurance === 'Y') {
      const policyholderDateOfBirth = this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.policyholderDateOfBirth;
      const insurancePhone = new FactIntakeInsurancePhone();
      insurancePhone.number = this.unformatPhoneNumber(this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.pbmPhoneNumber);

      factIntake.miscFactItems.push(this.createFactItem('Insurance.HasOtherInsurance', 'true'));
      factIntake.secondaryInsurance = {
        patientId: this.workflowService.patientId,
        insurancePolicyId: this.newGuid(),
        levelId: 2,
        pharmacyBenefitPlanTypeId: this.getPlanTypeId(this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.insurancePlanType),
        pharmacyBenefitManagerCompanyName: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.pbmName,
        pbmPhoneNumber: insurancePhone,
        rxMemberNumber: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.policyholderIdNumber,
        rxGroupNumber: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.groupNumber,
        rxBankIdentificationNumber: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.binNumber,
        rxProcessorControlNumber: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.pcnNumber,
        rxRelationshipToMember: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.policyholderRelationshipToPatient,
        rxPolicyHolderBirthDate: policyholderDateOfBirth ? moment(policyholderDateOfBirth).format('MM/DD/YYYY') : null,
        rxPolicyHolderFirstName: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.policyholderFirstName,
        rxPolicyHolderLastName: this.workflowService.insuranceInformationFormData['insuranceFormSecondary']?.policyholderLastName
      };
    } else {
      factIntake.miscFactItems.push(this.createFactItem('Insurance.HasOtherInsurance', 'false'));
    }

    if (this.workflowService.productFormData.productSelectedType) {
      factIntake.prescriptions = [
        {
          drugName: this.workflowService.selectedDrugFull,
          drugBaseName: this.workflowService.selectedDrugName,
          drugNdc: this.workflowService.selectedDrug,
          drugGenericName: this.workflowService.selectedDrugGenericName,
          daysSupply: null,
          quantity: this.workflowService.prescriptionInformationFormData.quantity,
          numberOfRefills: this.workflowService.prescriptionInformationFormData.refills,
          strength: this.workflowService.medicationFormData.strength,
          strengthUnits: 'MG',
          substitutionsAllowed: null,
          sig: ' ',
          icd9: null,
          icd10: this.workflowService.prescriptionInformationFormData.icd10Code,
          diagnosis: null,
          notes: null,
          ncpdpid: null,
          quantityQualifierName: null,
          potencyUnitCode: null,
          rxTypeId: 3,
          rxStatusId: 1,
          isPrimary: null,
          levelId: 0,
          quantityQualifierTypeId: null,
          externalId: null,
          drugBrandName: this.workflowService.selectedDrugName,
          frequency: null,
          administered: null,
          deliveryMethod: null,
          drugCodeValue: null,
          drugCodeType: null,
          dateWritten: new Date(now.getTime()),
          drugCodeDescription: null,
          drugCodingSystem: null,
          shipmentDeliveryLocation: null,
          shipmentDeliveryDate: null,
          rX36ID: null,
          recordId: null,
          quantityQualifierTypeName: null
        }
      ];
    }
    else {
      factIntake.prescriptions = [{}]
    }

    factIntake.documents = [];

    if (this.workflowService.patientAuthorizationDocumentId) {
      const patientAuthDocument = {
        documentId: this.workflowService.patientAuthorizationDocumentId,
        documentTypeId: DocumentType.PatientAuthorization,
        documentFileName: this.workflowService.patientAuthorizationDocumentName ?? this.workflowService.setFormattedFileName('Patient_Authorization'),
        documentDescriptor: 'Patient Authorization'
      };

      factIntake.documents.push(patientAuthDocument);
    }

    if (this.workflowService.transactionGroupId) {
      factIntake.patient.patientId = this.workflowService.patientId;

      // Workaround to avoid duplicate consent records on PATCH. May need to fix on backend instead.
      factIntake.patient.consents = [];
      factIntake.patient.consents.push({
        consentSourceId: ConsentSource.Electronic,
        consentStatusId: ConsentStatus.Consented,
        consentTypeId: ConsentType.Hipaa,
        consentName: 'HUB Consent',
        effectiveDate: currentISODate,
        expirationDate: null,
        receivedDate: currentISODate,
        signatureOnConsent: true,
        signatureOnConsentDate: currentISODate,
        consentOptOutDate: null,
        consentProvidedBy: patientAuthorizing ? patientFullName : this.workflowService.patientAuthorizationFormData.legalFullName
    });

      if (factIntake.primaryInsurance) {
        factIntake.primaryInsurance.patientId = this.workflowService.patientId;
      }

      if (factIntake.secondaryInsurance) {
        factIntake.secondaryInsurance.patientId = this.workflowService.patientId;
      }
    }

    return factIntake;
  }

  private yesNoNull(value): any {
    if (value === 'Y') {
      return true;
    }
    if (value === 'N') {
      return false;
    }
    return null;
  }

  private createFactItem(factId: string, factValue: string, factValueType?: string): Fact {
    return {
      factId,
      factValue,
      factValueType
    };
  }

  private getPlanTypeId(planType: string): number {
    switch (planType) {
      case 'commercialPlan':
        return 2;
      case 'medicare':
        return 8;
      case 'medicaid':
        return 9;
      default:
        return 0;
    }
  }

  private newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private unformatPhoneNumber(value: string): string {
    return value ? value.replace(/\-/gi, '') : value;
  }
}
