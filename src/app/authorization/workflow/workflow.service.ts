import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbvResponseModel } from 'src/app/api/shared/models/abv/abv-response.model';
import { EligibilityResponseModel } from 'src/app/api/shared/models/abv/eligibility-response.model';
import { DocumentUploadFormData } from 'src/app/api/shared/models/document-upload-form-data.model';
import { InsuranceInformationFormData } from 'src/app/api/shared/models/insurance-information-data.model';
import { PatientAssistanceProgramFormData } from 'src/app/api/shared/models/patient-assistance-program-data.model';
import { PatientAuthorizationFormData } from 'src/app/api/shared/models/patient-authorization-form-data.model';
import { PrescriberInformationFormData } from 'src/app/api/shared/models/prescriber-information-form-data.model';
import { ProductFormData } from 'src/app/api/shared/models/product-form-data.model';
import { ProviderAttestationFormData } from 'src/app/api/shared/models/provider-attestation-form-data.model';
import { WORKFLOW } from '../../../assets/workflow';
import { ConsentFormData } from '../../api/shared/models/consent-form-data.model';
import { DocumentFile } from '../../api/shared/models/documents/document-file.model';
import { InsuranceFormData } from '../../api/shared/models/insurance-form-data.model';
import { MedicationFormData } from '../../api/shared/models/medication-form-data.model';
import { PatientFormData } from '../../api/shared/models/patient-form-data.model';
import { PrescriberNpiFormData, PrescriberResponseData } from '../../api/shared/models/prescriber-form-data.model';
import { ServiceOfferingModel } from '../../api/shared/models/service-offering.model';
import { TranslateContentService } from '../../translation/services/translate-content/translate-content.service';
import { SupportedLanguages } from '../../translation/shared/enums/supported-languages.enum';
import { ServiceOfferingsEnum } from './service-offerings.enum';
import { ServiceUserSelectionsEnum } from './service-userselection.enum';
import { SnackbarService } from '../../ui-components/page-addons/snackbar/snackbar.service';
import { FacilityInformationFormData } from '../../api/shared/models/facility-information-form-data';
import { PrescriptionInformationFormData } from '../../api/shared/models/prescription-information-form-data';
import { IncomeVerificationFormData } from '../../api/shared/models/income-verification-form-data';

@Injectable({
    providedIn: 'root'
})
export class WorkflowService {

  public patientFormData: PatientFormData = {};
  public prescriberInformationFormData: PrescriberInformationFormData = {};
  public patientAuthorizationFormData: PatientAuthorizationFormData = {};
  public consentFormData: ConsentFormData = {};
  public medicationFormData: MedicationFormData = {};
  public patientAssistanceProgramFormData: PatientAssistanceProgramFormData = {};
  public productFormData: ProductFormData = {};
  public prescriberNpiFormData: PrescriberNpiFormData = {};
  public prescriberFormData: PrescriberResponseData = {};
  public provideAttestationFormData: ProviderAttestationFormData = {};
  public insuranceInformationFormData: InsuranceInformationFormData = {};
  public documentUploadFormData: DocumentUploadFormData = {};
  public insuranceFormData: InsuranceFormData = {};
  public selectedInsurance = {};
  public consentDocumentId: string;
  public coversheetDocumentId: string;
  public patientAuthorizationDocumentId: string;
  public financialUploadedDocuments: DocumentFile[];
  public enrollmentDocumentId: string;
  public priorAuthorizationDocumentId: string;
  public submissionPacketId: string;
  public uploadedDocuments: DocumentFile[] = [];;
  public npi: string;
  public pharmacyNcpdp: string;
  public emailAddress: string;
  public registrationPath: string;
  public selectedDrug: string;
  public externalServiceToken: string;
  public prescriberId: string;
  public organizationId: string;
  public transactionGroupId: string;
  public workFlowId: string;
  public patientId: string;
  public selectedDrugName: string;
  public rxStatusId: number;
  public selectedServiceType: any = {};
  public uploadedDocumentIds: string[] = [];
  public patientAuthorizationDocumentName: string;
  public enrollmentDocumentName: string;
  public submissionPacketName: string;
  public siteSource: string;
  public facilityInformationFormData: FacilityInformationFormData = {};
  public prescriptionInformationFormData: PrescriptionInformationFormData = {};
  public incomeVerificationFormData: IncomeVerificationFormData = {};
  public serviceTypeForApi: string;
  public selectedDrugGenericName: string;
  public selectedDrugFull: string;
  public selectedURL: string;

  // theraphy groupings
  public RAREBLOOD_THERAPY = [ServiceOfferingsEnum.RareBloodPatientAuth, ServiceOfferingsEnum.RareBloodDoc,
    ServiceOfferingsEnum.RareBloodPTAuthandDoc];
  public OBESITY_THERAPY = [ServiceOfferingsEnum.ObesityPatientAuth, ServiceOfferingsEnum.ObesityDoc,
    ServiceOfferingsEnum.ObesityPTAuthandDoc];
  public GROWTH_THERAPY = [ServiceOfferingsEnum.GrowthPatientAuth, ServiceOfferingsEnum.GrowthDoc,
    ServiceOfferingsEnum.GrowthPTAuthandDoc];

  // identifier groupings
  public AUTH = [ServiceOfferingsEnum.RareBloodPatientAuth, ServiceOfferingsEnum.ObesityPatientAuth,
    ServiceOfferingsEnum.GrowthPatientAuth];
  public AUTH_AND_DOC = [ServiceOfferingsEnum.RareBloodPTAuthandDoc, ServiceOfferingsEnum.ObesityPTAuthandDoc,
    ServiceOfferingsEnum.GrowthPTAuthandDoc];
  public DOC = [ServiceOfferingsEnum.RareBloodDoc, ServiceOfferingsEnum.ObesityDoc,
    ServiceOfferingsEnum.GrowthDoc];

  private workflowLanguage = new BehaviorSubject<string>(SupportedLanguages.English);
  private showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @SessionStorage('currentServiceOffering')
  currentServiceOffering: ServiceOfferingModel;
  @SessionStorage('isWorkflowComplete') isWorkflowComplete: boolean;

  // ABV Logic
  public attemptedEligibility = false;
  public failedEligibility = true;
  public eligibilityResponseModel: EligibilityResponseModel = null;
  public abvResponseModel: AbvResponseModel = null;

  constructor(private translateContentService: TranslateContentService, private router: Router,
    private snackbar: SnackbarService) {
    this.currentServiceOffering = this.currentServiceOffering ? this.currentServiceOffering : new ServiceOfferingModel();
    if (this.currentServiceOffering.selectedOffering === undefined) {
      this.setSelectedOffering(0);
    }
    this.isWorkflowComplete = false;
    router.events.subscribe(() => {
      this.setShowNav(false);
    })
  }

  /**
   * Set Workflow Complete Flag
   *  - Set TRUE upon Confirmation
   *  - Set FALSE on Initial "Page"
   */
  setWorkflowComplete(complete: boolean): void {
    this.isWorkflowComplete = complete;
    this.isWorkflowComplete = this.isWorkflowComplete; // needs to be reassigned to save
  }

  /**
   * Get Current Step
   * @returns number
   */
  getCurrentStep(): number {
    const stepIndex = this.getCurrentWorkflow().findIndex(r => r === this.router.url.slice(1));
    return stepIndex >= 0 ? stepIndex : -1;
  }

  /**
   * Set Selected Offering
   * @param {number} selectedOffering
   */
  setSelectedOffering(selectedOffering: number): void {
    this.currentServiceOffering.selectedOffering = selectedOffering;
    this.currentServiceOffering = this.currentServiceOffering; // needs to be reassigned to save
  }

  /**
   * Get Selected Offering
   */
  getSelectedOffering(): ServiceOfferingsEnum {
    return this.currentServiceOffering.selectedOffering;
  }

  getSelectedUserSelection(): ServiceUserSelectionsEnum {
    return ServiceUserSelectionsEnum.Gilenya;
  }

  /**
   * Returns Current Workflow
   */
  getCurrentWorkflow(): Array<any> {
    return this.currentServiceOffering.selectedOffering
      ? WORKFLOW.find(wf => wf.workFlowId === this.currentServiceOffering.selectedOffering).route
      : WORKFLOW[0].route;
  }

  public publishWorkflowLanguage(language: SupportedLanguages): void {
    this.translateContentService.languageSelected = language;
    this.workflowLanguage.next(language);
  }

  public subscribeWorkflowLanguage(): Observable<string> {
    return this.workflowLanguage.asObservable();
  }

  public setSelectedDrug(drug: string): void {
    this.selectedDrug = drug;
  }

  public isLastStep(): boolean {
    const currentStepIndex = this.getCurrentStep();
    const currentWorkflow = this.getCurrentWorkflow();
    let index = currentWorkflow.indexOf('confirmation');
    if (this.getSelectedOffering() === ServiceOfferingsEnum.GrowthPatientAuth) {
      index = currentWorkflow.indexOf('endo/ptauth/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.GrowthPTAuthandDoc) {
      index = currentWorkflow.indexOf('endo/ptauthanddoc/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.GrowthDoc) {
      index = currentWorkflow.indexOf('endo/doc/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.ObesityPatientAuth) {
      index = currentWorkflow.indexOf('obes/ptauth/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.ObesityPTAuthandDoc) {
      index = currentWorkflow.indexOf('obes/ptauthanddoc/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.ObesityDoc) {
      index = currentWorkflow.indexOf('obes/doc/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.RareBloodPatientAuth) {
      index = currentWorkflow.indexOf('rb/ptauth/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.RareBloodPTAuthandDoc) {
      index = currentWorkflow.indexOf('rb/ptauthanddoc/confirmation');
    } else if (this.getSelectedOffering() === ServiceOfferingsEnum.RareBloodDoc) {
      index = currentWorkflow.indexOf('rb/doc/confirmation');
    }
    if (index > -1) {
      currentWorkflow.splice(index);
    }
    return currentStepIndex && currentStepIndex + 1 >= currentWorkflow.length;
  }

  public openSnackBar(message: string, classPanel?: string, action?: string) {
    this.snackbar.open(message);
  }

  public setFormattedFileName(baseFileName: string): string {
    const dateTimeString = new Date().toISOString().slice(0, 19);
    const formattedFileName = `NovoCare_Patient_${baseFileName}${dateTimeString}Z.pdf`;

    return formattedFileName;
  }

  navigateToNextStep(): void {
    const currentStepIndex = this.getCurrentStep();

    if (currentStepIndex && currentStepIndex + 1 === this.getCurrentWorkflow().length) {
      if (this.getSelectedOffering() === ServiceOfferingsEnum.GrowthPatientAuth) {
        this.router.navigate(['endo/ptauth/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.GrowthPTAuthandDoc) {
        this.router.navigate(['endo/ptauthanddoc/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.GrowthDoc) {
      this.router.navigate(['endo/doc/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.ObesityPatientAuth) {
        this.router.navigate(['obes/ptauth/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.ObesityPTAuthandDoc) {
        this.router.navigate(['obes/ptauthanddoc/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.ObesityDoc) {
      this.router.navigate(['obes/doc/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.RareBloodPatientAuth) {
        this.router.navigate(['rb/ptauth/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.RareBloodPTAuthandDoc) {
        this.router.navigate(['rb/ptauthanddoc/confirmation']);
      } else if (this.getSelectedOffering() === ServiceOfferingsEnum.RareBloodDoc) {
      this.router.navigate(['rb/doc/confirmation']);
      } else {
        this.router.navigate(['confirmation']);
      }
    } else if (this.currentServiceOffering && currentStepIndex >= 0) {
      this.router.navigate([this.getCurrentWorkflow()[currentStepIndex + 1]]);
    } else {
      this.router.navigate([this.getCurrentWorkflow()[0]]);
    }
  }

  navigateToFirstStep(): void {
    this.router.navigate([this.getCurrentWorkflow()[0]]);
  }

  navigateToHome(): void {
    this.router.navigateByUrl(this.selectedURL || '/');
  }

  navigateToPreviousStep(): void {
    const currentStepIndex = this.getCurrentStep();
    if (this.currentServiceOffering && currentStepIndex > 0) {
      this.router.navigate([this.getCurrentWorkflow()[currentStepIndex - 1]]);
    } else {
      this.navigateToHome();
    }
  }

  navigateToSpecificPath(pathName: string): void {
    const index = this.getCurrentWorkflow().findIndex(r => r === pathName);
    if (this.getCurrentWorkflow().length == 0 || index < 0) {
      this.router.navigate(['confirmation']);
    }
    this.router.navigate([pathName]);
  }

  /**
   * Reset Workflow Session and mark Workflow as Complete.
   * Make sure to add any new Session data elements here to reset them.
   */
  reset(): void {
    this.patientFormData = {};
    this.prescriberInformationFormData = {};
    this.consentFormData = {};
    this.patientAssistanceProgramFormData = {};
    this.patientAuthorizationFormData = {};
    this.insuranceInformationFormData = {};
    this.provideAttestationFormData = {};
    this.productFormData = {};
    this.prescriberNpiFormData = {};
    this.medicationFormData = {};
    this.prescriberFormData = {};
    this.pharmacyNcpdp = null;
    this.selectedInsurance = {};
    this.insuranceFormData = {};
    this.documentUploadFormData = {};
    this.consentDocumentId = null;
    this.coversheetDocumentId = null;
    this.enrollmentDocumentId = null;
    this.priorAuthorizationDocumentId = null;
    this.patientAuthorizationDocumentId = null;
    this.currentServiceOffering = new ServiceOfferingModel();
    this.financialUploadedDocuments = [];
    this.uploadedDocuments = [];
    this.registrationPath = null;
    this.npi = null;
    this.emailAddress = null;
    this.externalServiceToken = null;
    this.transactionGroupId = null;
    this.organizationId = null;
    this.prescriberId = null;
    this.workFlowId = null;
    this.selectedDrugName = null;
    this.patientId = null;
    this.rxStatusId = 0;
    this.selectedServiceType = {};
    this.patientAuthorizationDocumentName = null;
    this.enrollmentDocumentName = null;
    this.uploadedDocumentIds = [];
    this.patientAuthorizationDocumentName = null;
    this.enrollmentDocumentName = null;
    this.submissionPacketName = null;
    this.siteSource = null;
    this.facilityInformationFormData = {};
    this.prescriptionInformationFormData = {};
    this.incomeVerificationFormData = {};
    this.serviceTypeForApi = null;
    this.selectedDrugGenericName = null;
    this.selectedDrugFull = null;
    this.setWorkflowComplete(true);
  }

  /**
   * Update random document Id of uploaded documents
   */
  updateUploadedDocumentId(previousDocumentId: string, documentId: string): void {
    const documentIndex = this.uploadedDocuments.findIndex(doc => doc.documentId === previousDocumentId);
    this.uploadedDocuments[documentIndex].documentId = documentId;
  }

  getShowNav(){
    return this.showNav$.asObservable();
  }

  setShowNav(showHide: boolean) {
    this.showNav$.next(showHide);
  }

  setWorkflowByUrl(url: string) {
    switch (url) {
      case '/rb/ptauth':
        this.setSelectedOffering(ServiceOfferingsEnum.RareBloodPatientAuth);
        break;
      case '/rb/doc':
        this.setSelectedOffering(ServiceOfferingsEnum.RareBloodDoc);
        break;
      case '/rb/ptauthanddoc':
        this.setSelectedOffering(ServiceOfferingsEnum.RareBloodPTAuthandDoc);
        break;
      case '/obes/ptauth':
        this.setSelectedOffering(ServiceOfferingsEnum.ObesityPatientAuth);
        break;
      case '/obes/doc':
        this.setSelectedOffering(ServiceOfferingsEnum.ObesityDoc);
        break;
      case '/obes/ptauthanddoc':
        this.setSelectedOffering(ServiceOfferingsEnum.ObesityPTAuthandDoc);
        break;
      case '/endo/ptauth':
        this.setSelectedOffering(ServiceOfferingsEnum.GrowthPatientAuth);
        break;
      case '/endo/doc':
        this.setSelectedOffering(ServiceOfferingsEnum.GrowthDoc);
        break;
      case '/endo/ptauthanddoc':
        this.setSelectedOffering(ServiceOfferingsEnum.GrowthPTAuthandDoc);
        break;
      default:
        break;
    }
  }
}
