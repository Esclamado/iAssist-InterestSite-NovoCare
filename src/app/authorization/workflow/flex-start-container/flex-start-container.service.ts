import { Injectable } from '@angular/core';
import {
  abvResultsStep,
  Data,
  FactIds,
  Flow,
  InitializationValues,
  insuranceStep,
  medicationDetailsStep,
  MedicationDetailsStepInitializationConfig,
  medicationStep,
  patientStep,
  pharmacyStep,
  PHARMACY_BENEFITS_INSURANCE_POLICY_TYPE,
  prescriberStep,
  priorAuthorizationStep,
  StepPackage,
  StepStateKeys,
  SummaryMode,
  surescriptsRtpbResultsStep
} from 'flex-start';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { WorkflowService } from '../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class FlexStartContainerService {
  constructor(private workflowService: WorkflowService) {}

  getAbvFlow(): Observable<Flow> {
    const medication = medicationStep({
      showServiceIndicators: false,
      canSelectControlledSubstances: false
    });
    medication.step.summary = null;

    const medicationDetails = medicationDetailsStep();
    medicationDetails.step.summary = null;

    const patient = patientStep({
      canEditPatient: false
    });
    patient.step.summary = null;

    const prescriber = prescriberStep({
      includeInactive: true
    });
    prescriber.step.summary = null;

    const insurance = insuranceStep({
      autoSelectSingleInsurance: true,
      canAddInsuranceManually: false,
      canSkip: false,
      requireResults: true,
      showUploadDocuments: false,
      supportedInsuranceTypes: [PHARMACY_BENEFITS_INSURANCE_POLICY_TYPE]
    });

    const phamarcy = pharmacyStep({
      showServiceIndicators: false,
      showPreferredPharmacies: false,
	  hideEditButton: true,
    });

    const surescriptsRtpbResults = surescriptsRtpbResultsStep({
	  hideEditButton: true,
      showThirdPartyNotice: false,
      rtpbThirdPartyNoticeContent:
        'To see Affordability options click Save & Continue to acknowledge, save to patient record and disclose this information to the third party, authorized portal attached to this session.'
    });

    const abvResults = abvResultsStep({
      allowInitiatePa: true,
      nextLabel: 'Next',
	  summaryTitle: 'ACCESS & AFFORDABILITY',
	  hideEditButton: true
    });

    const steps: StepPackage[] = [
      medication,
      medicationDetails,
      patient,
      prescriber,
      insurance,
      phamarcy,
      surescriptsRtpbResults,
      abvResults
    ];

    return of({
      config: {
        title: '',
        summaryMode: SummaryMode.Stacked,
        services: [],
        showFlowHeader: false,
        showStepHeaders: false,
        showBackButton: true,
        hideCancelButton: true,
        maxWidth: 1366
      },
      steps
    });
  }

  getEpaFlow(): Observable<Flow> {
    const medication = medicationStep({
      showServiceIndicators: false,
      canSelectControlledSubstances: false
    });
    medication.step.summary = null;

    const medicationDetails = medicationDetailsStep();
    medicationDetails.step.summary = null;

    const patient = patientStep({
      canEditPatient: false
    });
    patient.step.summary = null;

    const prescriber = prescriberStep({
      includeInactive: true
    });
    prescriber.step.summary = null;

    const insurance = insuranceStep({
      autoSelectSingleInsurance: true,
      canAddInsuranceManually: false,
      canSkip: false,
      requireResults: true,
      showUploadDocuments: false,
      supportedInsuranceTypes: [PHARMACY_BENEFITS_INSURANCE_POLICY_TYPE]
    });
    insurance.step.summary = null;

    const priorAuthorization = priorAuthorizationStep({
      epaOnly: false,
      shouldRenderQuestions: true,
      useFullscreenForPaQuestions: false,
      canSkipPa: false
    });
    priorAuthorization.step.summary = null;

    const steps: StepPackage[] = [medication, patient, prescriber, insurance, medicationDetails, priorAuthorization];

    return of({
      config: {
        title: '',
        summaryMode: SummaryMode.Stacked,
        services: [],
        showFlowHeader: false,
        showStepHeaders: false,
        hideBackButton: true,
        hideCancelButton: true,
        showStepProgress: false
      },
      steps
    });
  }

  getInitialAbvValue(): Observable<InitializationValues> {
    const data = this.getInitialDataParserValue();
    const configs = this.getInitialDataParserConfigs();

    const initialValues: InitializationValues = {
      data,
      stepInitializationConfigs: configs,
      ndc: this.workflowService.medicationFormData.selectedDrug,
      patientId: this.workflowService.patientId,
      prescriber: {
        npi: this.workflowService.prescriberFormData?.npi?.toString()
      },
      medicationDetails: {
        form: this.workflowService.medicationFormData.form,
        daysSupply: parseInt(this.workflowService.medicationFormData.daysSupply),
        quantity: parseInt(this.workflowService.medicationFormData.quantity)
      },
      refills: 0,
      priorAuthorization: {
        shouldComplete: true
      }
    };
    return of(initialValues);
  }

  getEpaInitialValue(): Observable<InitializationValues> {
    const data = this.getInitialDataParserValue();
    const configs = this.getInitialDataParserConfigs();

    const initialValues: InitializationValues = {
      data,
      stepInitializationConfigs: configs,
      ndc: this.workflowService.medicationFormData.selectedDrug,
      patientId: this.workflowService.patientId,
      prescriber: {
        npi: this.workflowService.npi
      },
      medicationDetails: {
        form: this.workflowService.medicationFormData.form,
        daysSupply: parseInt(this.workflowService.medicationFormData.daysSupply),
        quantity: parseInt(this.workflowService.medicationFormData.quantity)
      },
      refills: 0,
      insurance: {
        selectedInsurance: this.workflowService.selectedInsurance,
        selectedPolicyId: this.workflowService.insuranceFormData.eligibilityResultId
      },
      pharmacy: {
        ncpdpId: this.workflowService.pharmacyNcpdp,
        shouldComplete: true,
        isEditable: false
      },
      ncpdpId: this.workflowService.pharmacyNcpdp
    };

    return of(initialValues);
  }

  private getInitialDataParserConfigs(): any {
    // This step is required to use the step's data parser
    const configs = new Map<StepStateKeys, MedicationDetailsStepInitializationConfig>();
    configs.set(StepStateKeys.MedicationDetails, {
      shouldComplete: true,
      isEditable: false,
      includePrescriptionFields: true
    });
    return configs;
  }

  private getInitialDataParserValue(): Data {
    const data: Data = {};

    // Some of the Flex Start steps are now using the data parser vs the initialvalues object
    // Patient
    data[FactIds.PATIENT_ID] = this.workflowService.patientId;
    data[FactIds.PATIENT_FIRST_NAME] = this.workflowService.patientFormData.firstName;
    data[FactIds.PATIENT_LAST_NAME] = this.workflowService.patientFormData.lastName;
    data[FactIds.PATIENT_DATE_OF_BIRTH] = moment(this.workflowService.patientFormData.dateOfBirth).format('MM/DD/YYYY');
    data[FactIds.PATIENT_GENDER] = this.workflowService.patientFormData.gender;
    data[FactIds.PATIENT_ADDRESS_POSTAL_CODE] = this.workflowService.patientFormData.postalCode;

    //   Prescription
    data[FactIds.PRESCRIPTION_DRUG_NDC] = this.workflowService.medicationFormData.selectedDrug;

    //   Medication Details
    data[FactIds.PRESCRIPTION_NUMBER_OF_REFILLS] = '0';
    data[FactIds.PRESCRIPTION_QUANTITY_QUALIFIER_NAME] = this.workflowService.medicationFormData.form;
    data[FactIds.PRESCRIPTION_QUANTITY] = this.workflowService.medicationFormData.quantity;
    data[FactIds.PRESCRIPTION_DAYS_SUPPLY] = this.workflowService.medicationFormData.daysSupply;

    return data;
  }
}
