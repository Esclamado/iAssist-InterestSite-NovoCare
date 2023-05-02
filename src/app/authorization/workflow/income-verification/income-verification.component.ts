import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { WorkflowService } from '../workflow.service';
import { IncomeVerificationService } from './income-verification.service';

@Component({
  selector: 'app-income-verification',
  templateUrl: './income-verification.component.html',
  styleUrls: ['./income-verification.component.scss']
})
export class IncomeVerificationComponent implements OnInit {
  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;
  @Output() continue: boolean;

  public stepContent: any;
  public incomeVerificationGroup: FormGroup
  public incomeVerificationHouseholdSizeConfig: FormItem;
  public incomeVerificationAnnualHouseholdIncomeConfig: FormItem;
  public incomeVerificationHouseholdSizeDescription: string;
  public incomeVerificationAnnualHouseholdIncomeDescription: string;
  public showPrevious: boolean = true;

  constructor(
    private incomeVerificationService: IncomeVerificationService,
    private workFlowService: WorkflowService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.incomeVerificationGroup = this.incomeVerificationService.createGroup();
    this.incomeVerificationService.addControlsToGroup();
    this.setControlConfigs();
    this.setViewContent();
    
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  public submit(): void {
    if (this.incomeVerificationGroup.valid) {
      this.incomeVerificationService.setFormData(this.incomeVerificationGroup.value);
      this.workFlowService.navigateToNextStep();
    } else {
      this.incomeVerificationService.touchForm();
    }
  }

  private setViewContent(): void {
    this.stepContent = this.incomeVerificationService.stepContent;
  }

  private setControlConfigs(): void {
    this.continueButtonText = this.incomeVerificationService.continueButtonText;
    this.cancelButtonText = this.incomeVerificationService.cancelButtonText;
    this.incomeVerificationHouseholdSizeConfig = this.incomeVerificationService.householdSizeConfig;
    this.incomeVerificationAnnualHouseholdIncomeConfig = this.incomeVerificationService.annualHouseholdIncomeConfig;
    this.incomeVerificationHouseholdSizeDescription = this.incomeVerificationService.householdSizeDescription
    this.incomeVerificationAnnualHouseholdIncomeDescription = this.incomeVerificationService.annualHouseholdIncomeDescription
  }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }
}
