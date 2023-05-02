import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataPoint, DataService, FactIds, FlexStartService } from 'flex-start';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { FactIntakeResponse } from 'src/app/api/shared/models/fact-intake/fact-intake-response.model';
import { WorkflowService } from '../workflow.service';
import { FlexStartContainerService } from './flex-start-container.service';
import { AbvService } from './services/abv.service';
import { FlowLifecycleHandler } from './services/flow-lifecycle-handler.service';

@Component({
  selector: 'app-flex-start-container',
  templateUrl: './flex-start-container.component.html',
  styleUrls: ['./flex-start-container.component.scss']
})
export class FlexStartContainerComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private abvService: AbvService,
    private dataService: DataService,
    private flexStartContainerService: FlexStartContainerService,
    private flexStartService: FlexStartService,
    private flowLifecycleHandler: FlowLifecycleHandler,
    private workflowService: WorkflowService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    if (this.workflowService.patientId && this.workflowService.transactionGroupId) {
      this.initializeAbvFlexStart();
    } else {
      this.patientService
        .saveToTransactional()
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((factIntake: FactIntakeResponse) => {
          if (factIntake?.clientTransactionGroupId && factIntake?.patientId) {
            this.workflowService.transactionGroupId = factIntake?.clientTransactionGroupId;
            this.workflowService.patientId = factIntake?.patientId;
            this.initializeAbvFlexStart();
          }
        });
    }

    combineLatest([this.abvService.benefit$, this.abvService.isFlexStartCompleted$])
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(([benefit, isFlexStartCompleted]) => {
        if (isFlexStartCompleted && benefit?.patientSpecificBenefit?.restrictions?.priorAuthorization === 'Required') {
          this.initializeEpaFlexStart();
        } else if (
          isFlexStartCompleted &&
          (!benefit?.patientSpecificBenefit?.restrictions?.priorAuthorization ||
            benefit?.patientSpecificBenefit?.restrictions?.priorAuthorization === null ||
            benefit?.patientSpecificBenefit?.restrictions?.priorAuthorization === 'Not Required')
        ) {
          this.workflowService.navigateToNextStep();
        }
      });
  }

  initializeAbvFlexStart(): void {
    const flow$ = this.flexStartContainerService.getAbvFlow();
    const initialValues$ = this.flexStartContainerService.getInitialAbvValue();

    const dataPoint: DataPoint = {
      factId: FactIds.META_TRANSACTION_GROUP_ID,
      factValue: this.workflowService.transactionGroupId
    };
    const workflowIdDataPoint: DataPoint = {
      factId: FactIds.META_WORKFLOW_ID,
      factValue: this.workflowService.workFlowId
    };
    this.dataService.write(dataPoint, workflowIdDataPoint);

    combineLatest([flow$, initialValues$])
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(([flow, initialValues]) => {
        this.flexStartService.initiate(flow, initialValues, this.flowLifecycleHandler, null);
      });
  }

  initializeEpaFlexStart(): void {
    // Making sure we reset data for every seed data flow launch as available services data service is singleton
    this.dataService.reset();

    const dataPoint: DataPoint = {
      factId: FactIds.META_TRANSACTION_GROUP_ID,
      factValue: this.workflowService.transactionGroupId
    };
    const workflowIdDataPoint: DataPoint = {
      factId: FactIds.META_WORKFLOW_ID,
      factValue: this.workflowService.workFlowId
    };
    this.dataService.write(dataPoint, workflowIdDataPoint);

    const flow$ = this.flexStartContainerService.getEpaFlow();
    const initialValues$ = this.flexStartContainerService.getEpaInitialValue();

    combineLatest([flow$, initialValues$])
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(([flow, initialValues]) => {
        this.flexStartService.initiate(flow, initialValues, this.flowLifecycleHandler, null);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this.dataService.reset();
    this.abvService.setFlexStartCompleted(false);
  }
}
