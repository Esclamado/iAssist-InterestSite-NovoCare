import { Injectable } from '@angular/core';
import { Data, DataService, FactIds, FlexStartError, FlexStartLifecycleHandler, getBenefit, getPricingDebug, State } from 'flex-start';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { InsuranceService } from 'src/app/api/services/insurance/insurance.service';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { WorkflowService } from '../../workflow.service';
import { AbvService } from './abv.service';

@Injectable()
export class FlowLifecycleHandler extends FlexStartLifecycleHandler {
  constructor(
    private workflowService: WorkflowService,
    private abvService: AbvService,
    private dataService: DataService,
    private patientService: PatientService,
    private insuranceService: InsuranceService
  ) {
    super();
  }

  onComplete(state: State): void {
    this.insuranceService.setupInsurance(state);
    this.workflowService.selectedInsurance = this.insuranceService.mapEpaSelectedInsuranceData(state.data);
    this.workflowService.pharmacyNcpdp = state.data[FactIds.PHARMACY_NCPDP];

    if (state.data['PriorAuthorization.SelectedDocumentId']) {
      this.workflowService.priorAuthorizationDocumentId = state.data['PriorAuthorization.FormDocumentId'] || null;
    }

    const benefit = getBenefit(state);
    const debug = getPricingDebug(state);
    if (
      !benefit ||
      !benefit?.patientSpecificBenefit?.restrictions?.priorAuthorization ||
      benefit?.patientSpecificBenefit?.restrictions?.priorAuthorization === null ||
      benefit?.patientSpecificBenefit?.restrictions?.priorAuthorization === 'Not Required'
    ) {
      this.workflowService.rxStatusId = 1;
    }
    this.patientService.saveToTransactional().subscribe(() => {
      if (benefit) {
        this.abvService.setBenefit(benefit);
        this.abvService.setFlexStartCompleted(true);
        this.abvService.setDebug(debug);
      } else if (!benefit) {
        this.workflowService.navigateToNextStep();
      }
    });

    this.dataService.reset();
  }

  onCancel(state: State): void {
    this.dataService.reset();
  }

  onFail(state: State): void {
    this.patientService.saveToTransactional().subscribe(factIntake => {
      if (factIntake?.clientTransactionGroupId && factIntake?.patientId) {
        this.workflowService.transactionGroupId = factIntake.clientTransactionGroupId;
        this.workflowService.patientId = factIntake.patientId;
      }
    });
    this.dataService.reset();
    this.workflowService.navigateToNextStep();
  }

  onError(error: FlexStartError): Observable<boolean> {
    return of(true);
  }

  onStepComplete(data: Data): Observable<boolean> {
    if (data[FactIds.PRIOR_AUTHORIZATION_FORM_DOCUMENT_ID]) {
      this.workflowService.rxStatusId = 1;
      this.patientService.saveToTransactional().pipe(first()).subscribe();
      this.workflowService.navigateToNextStep();
    }
    this.dataService.observe();
    return of(true);
  }
}
