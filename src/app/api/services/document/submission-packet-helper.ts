import * as moment from "moment";
import { ServiceOfferingsEnum } from "src/app/authorization/workflow/service-offerings.enum";
import { WorkflowService } from "src/app/authorization/workflow/workflow.service";
import { TranslateContentService } from "src/app/translation/services/translate-content/translate-content.service";
import { SupportedLanguages } from "src/app/translation/shared/enums/supported-languages.enum";
import { UploadDocumentService } from "src/app/ui-components/page-addons/upload-document/upload-document.service";
import { EligibilityResultResponseModel } from "../../shared/models/abv/eligibility-response.model";
import { DocumentRequest, DocumentRequestImage } from "../../shared/models/documents/document-request.model";

export class SubmissionPacketHelper {
  private englishSubmissionPacketDocId = '192981ef-2e4e-4115-81d4-3667334b803b';
  private spanishSubmissionPacketDocId = '192981ef-2e4e-4115-81d4-3667334b803b';
  private today = moment().format('MM/DD/YYYY');
  private documentRequest: DocumentRequest;

  constructor(private workflowService: WorkflowService,
    private translateService: TranslateContentService,
    private uploadDocumentService: UploadDocumentService) { }

  public generateSubmissionPacketRequest(): DocumentRequest {
    const documentRequest = new DocumentRequest();
    this.documentRequest = documentRequest;

    if (this.translateService.languageSelected === SupportedLanguages.English) {
      documentRequest.templateDocumentId = this.englishSubmissionPacketDocId;
    } else {
      documentRequest.templateDocumentId = this.spanishSubmissionPacketDocId;
    }

    documentRequest.formData = { data: {} };

    documentRequest.formData.data['date'] = this.today;
    this.buildServiceSelection();
    this.buildPatientInformation();
    this.buildPrescriberInformation();
    this.buildPatientAuthorization();
    this.buildPrescriberCertification();
    this.buildProduct();
    this.buildPatientAssistanceProgram();
    this.buildDocumentUploadInformation();
    this.buildGeneralPharmacyBenefitsDetails();
    this.buildPharmacyBenefitsDetails();
    this.buildSecondaryPharmacyBenefitsDetails();

    return documentRequest;
  }

  private buildServiceSelection(): void {
    const formData = this.documentRequest.formData.data;
    formData['full'] = this.workflowService.selectedServiceType.toString() === ServiceOfferingsEnum.ENT.toString() ? 'Yes' : '';
    formData['doc'] = this.workflowService.selectedServiceType.toString() === ServiceOfferingsEnum.UploadDocumentation.toString() ? 'Yes' : '';
    formData['auth'] = this.workflowService.selectedServiceType.toString() === ServiceOfferingsEnum.Dermatology.toString() ? 'Yes' : '';
  }

  private buildPatientInformation(): void {
    const patientFormData = this.workflowService.patientFormData;
    const formData = this.documentRequest.formData.data;

    formData['pt_first_name'] = patientFormData.firstName;
    formData['pt_last_name'] = patientFormData.lastName;
    formData['pt_prim_phone'] = patientFormData.primaryPhone;
    formData['pt_prim_phone_type'] = patientFormData.phoneType;
    formData['pt_dob'] = patientFormData.dateOfBirth ? moment(patientFormData.dateOfBirth).format('MM/DD/YYYY') : '';
    formData['pt_gender'] = patientFormData.gender;
    formData['pt_alt_phone'] = patientFormData.altPhone;
    formData['pt_alt_phone_type'] = patientFormData.altPhoneType;
    formData['pt_address_1'] = patientFormData.addressLine1;
    formData['pt_address_2'] = patientFormData.addressLine2;
    formData['pt_city'] = patientFormData.city;
    formData['pt_state'] = patientFormData.stateCode;
    formData['pt_zip'] = patientFormData.postalCode;
    formData['pt_pref_lang'] = patientFormData.preferredLanguage;
    formData['pt_pref_lang_other'] = patientFormData.preferredLanguage === 'Other' ? patientFormData.languageIfOther : '';
    formData['pt_pharm'] = patientFormData.preferredPharmacy;
    formData['pt_pharm_other'] = patientFormData.preferredPharmacy === 'Other' ? patientFormData.preferredPharmacyIfOther : '';
    formData['pt_email'] = patientFormData.emailAddress;
    formData['pt_fullname'] = patientFormData.firstName + ' ' + patientFormData.lastName;
  }

  private buildPatientAuthorization(): void {
    const patientAuthorization = this.workflowService.patientAuthorizationFormData;
    const formData = this.documentRequest.formData.data;

    formData['pt_auth_sel'] = patientAuthorization.whoIsAuthorizing;
    formData['who_auth'] = patientAuthorization.whoIsAuthorizing;
    if (patientAuthorization.whoIsAuthorizing === 'Legal Representative') {
      formData['legal_rep_fullname'] = patientAuthorization.legalFullName;
      formData['legal_rep_relation'] = patientAuthorization.relationToPatient;
      formData['pt_auth_sig'] = this.buildImageEntry(patientAuthorization.legalSignature);
      formData['pt_auth_name'] = patientAuthorization.legalRepFullName;
    } else {
      formData['pt_auth_name'] = patientAuthorization.authorizerName;
      formData['pt_auth_sig'] = this.buildImageEntry(patientAuthorization.signature);
    }
    formData['pt_auth_agree'] = patientAuthorization.doAgreeAuthorization === 'Yes';
    formData['pt_auth_sig_date'] = this.today;
    formData['witness'] = patientAuthorization.witnessAuthorization?.Witness ? 'Yes' : '';
    formData['witness_initial'] = patientAuthorization.witnessInitials;
    formData['text'] = patientAuthorization.optIn?.Text ? 'Yes' : '';
    formData['pt_connect'] = patientAuthorization.optIn?.Info ? 'Yes' : '';
    formData['materials'] = patientAuthorization.optIn?.Materials ? 'Yes' : '';
  }

  private buildPrescriberInformation(): void {
    const prescriberInfo = this.workflowService.prescriberInformationFormData;
    const formData = this.documentRequest.formData.data;

    formData['prescriber_first_name'] = prescriberInfo.prescriberFirstName;
    formData['prescriber_last_name'] = prescriberInfo.prescriberLastName;
    formData['prescriber_npi'] = prescriberInfo.prescriberNpi;
    formData['practice_name'] = prescriberInfo.practiceName;
    formData['practice_address_1'] = prescriberInfo.practiceAddress1;
    formData['practice_address_2'] = prescriberInfo.practiceAddress2;
    formData['practice_city'] = prescriberInfo.city;
    formData['practice_state'] = prescriberInfo.state;
    formData['practice_zip'] = prescriberInfo.postalCode;
    formData['prescriber_spec'] = prescriberInfo.practiceSpecialty;

    formData['office_contact_name'] = prescriberInfo.officeContactName;
    formData['office_phone'] = prescriberInfo.officeContactPhoneNumber;
    formData['office_fax'] = prescriberInfo.officeFaxNumber;
  }

  private buildPrescriberCertification(): void {
    const provideAttestation = this.workflowService.provideAttestationFormData;
    const formData = this.documentRequest.formData.data;

    formData['prescriber_cert'] = provideAttestation.prescriberCertification;
    formData['prescriber_cert_name'] = provideAttestation.prescriberCertificationFullName;
    formData['prescriber_cert_sig'] = this.buildImageEntry(provideAttestation.prescriberCertificationSignature);
    formData['prescriber_cert_sig_date'] = this.today;
  }

  private buildProduct(): void {
    const product = this.workflowService.productFormData;
    const formData = this.documentRequest.formData.data;

    formData['product'] = product.productSelectedType;
    formData['dx'] = product.diagnosisCode;
    formData['dx_other'] = product.diagnosisCode === 'Other' ? product.diagnosisIfOther : '';
  }

  private buildPatientAssistanceProgram(): void {
    const pap = this.workflowService.patientAssistanceProgramFormData;
    const formData = this.documentRequest.formData.data;

    formData['describe_pt'] = pap.patientAssistanceEligibility;
    formData['sent_to_sp'] = pap.pharmacyYesNo;
    formData['previous_sp'] = pap.specialtyPharmacy;
    formData['previous_sp_other'] = pap.specialtyPharmacy === 'Other' ? pap.otherPharmacy : '';
  }

  private buildDocumentUploadInformation(): void {
    const documentUpload = this.workflowService.documentUploadFormData;
    const formData = this.documentRequest.formData.data;

    formData['type_doc'] = documentUpload.documentType;
    formData['type_doc_other'] = documentUpload.documentTypeOther;
    formData['doc_count'] = this.uploadDocumentService.fileList?.length;
  }

  private buildGeneralPharmacyBenefitsDetails(): void {
    const insurance = this.workflowService.insuranceInformationFormData;
    const formData = this.documentRequest.formData.data;

    formData['insurance'] = !this.workflowService.failedEligibility;
    formData['insurance_yes'] = !this.workflowService.failedEligibility ? insurance.isInformationCorrect : '';
    formData['insurance_no'] = this.workflowService.failedEligibility && insurance.hasInsurance === 'Y' ? insurance.hasInsurance : '';
  }

  private buildPharmacyBenefitsDetails(): void {
    const insurance = this.workflowService.insuranceInformationFormData;
    const eligibilityResult: EligibilityResultResponseModel = this.workflowService.eligibilityResponseModel?.eligibilityResults.length > 0 ?
      this.workflowService.eligibilityResponseModel.eligibilityResults[0] : null;
    const formData = this.documentRequest.formData.data;

    if (insurance.isInformationCorrect === 'Y') {
      formData['pbm_name'] = eligibilityResult?.pbmName;
      formData['pbm_phone'] = eligibilityResult?.pbmPhone;
      formData['policy_first_name'] = eligibilityResult?.firstName;
      formData['policy_last_name'] = eligibilityResult?.lastName;
      formData['policy_dob'] = eligibilityResult?.dateOfBirth ?
              moment(eligibilityResult.dateOfBirth).format("MM/DD/YYYY") : '';
      formData['policy_id'] = eligibilityResult?.memberId;
      formData['group'] = eligibilityResult?.groupId;
      formData['bin'] = eligibilityResult?.bankIdentificationNumber;
      formData['pcn'] = eligibilityResult?.processorControlNumber;
    } else if (insurance.hasInsurance === 'Y') {
      formData['insurance_type'] = insurance.insuranceFormPrimary?.insurancePlanType;
      formData['pbm_name'] = insurance.insuranceFormPrimary?.pbmName;
      formData['pbm_phone'] = insurance.insuranceFormPrimary?.pbmPhoneNumber;
      formData['policy_first_name'] = insurance.insuranceFormPrimary?.policyholderFirstName;
      formData['policy_last_name'] = insurance.insuranceFormPrimary?.policyholderLastName;
      formData['policy_dob'] = insurance.insuranceFormPrimary?.policyholderDateOfBirth ?
              moment(insurance.insuranceFormPrimary?.policyholderDateOfBirth).format("MM/DD/YYYY") : '';
      formData['policy_relation'] = insurance.insuranceFormPrimary?.policyholderRelationshipToPatient;
      formData['policy_id'] = insurance.insuranceFormPrimary?.policyholderIdNumber;
      formData['group'] = insurance.insuranceFormPrimary?.groupNumber;
      formData['bin'] = insurance.insuranceFormPrimary?.binNumber;
      formData['pcn'] = insurance.insuranceFormPrimary?.pcnNumber;
    }
  }

  private buildSecondaryPharmacyBenefitsDetails(): void {
    const insurance = this.workflowService.insuranceInformationFormData;
    const formData = this.documentRequest.formData.data;

    if (insurance.hasSecondaryInsurance === 'Y') {
      formData['sec_insurance_type'] = insurance.insuranceFormSecondary?.insurancePlanType;
      formData['sec_pbm_name'] = insurance.insuranceFormSecondary?.pbmName;
      formData['sec_pbm_phone'] = insurance.insuranceFormSecondary?.pbmPhoneNumber;
      formData['sec_policy_first_name'] = insurance.insuranceFormSecondary?.policyholderFirstName;
      formData['sec_policy_last_name'] = insurance.insuranceFormSecondary?.policyholderLastName;
      formData['sec_policy_dob'] = insurance.insuranceFormSecondary?.policyholderDateOfBirth ?
              moment(insurance.insuranceFormSecondary?.policyholderDateOfBirth).format("MM/DD/YYYY") : '';
      formData['sec_policy_relation'] = insurance.insuranceFormSecondary?.policyholderRelationshipToPatient;
      formData['sec_policy_id'] = insurance.insuranceFormSecondary?.policyholderIdNumber;
      formData['sec_group'] = insurance.insuranceFormSecondary?.groupNumber;
      formData['sec_bin'] = insurance.insuranceFormSecondary?.binNumber;
      formData['sec_pcn'] = insurance.insuranceFormSecondary?.pcnNumber;
    }
  }

  private buildImageEntry(value: string): DocumentRequestImage {
    return {
      '@type': 'image',
      'value': value
    };
  }
}
