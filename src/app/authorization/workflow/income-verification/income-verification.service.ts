import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { WorkflowService } from '../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeVerificationService {

  public incomeVerificationGroup: FormGroup;
  private controlHouseholdSize = 'householdSize';
  private controlAnnualHouseholdIncome= 'annualHouseholdIncome';

  constructor(
    private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private formValidationService: FormValidationService,
    private workflowService: WorkflowService
  ) { }

  public get stepContent(): any {
    return this.translateContentService.incomeVerificationView.step;
  }

  public get householdSizeDescription(): any {
    return this.translateContentService.incomeVerificationView.body.householdSizeDescription;
  }

  public get annualHouseholdIncomeDescription(): any {
    return this.translateContentService.incomeVerificationView.body.annualHouseholdIncomeDescription;
  }

  public get householdSizeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlHouseholdSize,
      this.translateContentService.incomeVerificationView.body.householdSize,
      null,
      null,
      this.translateContentService.incomeVerificationView.body.householdSizePlaceholder,
      true,
      this.translateContentService.errorMessages.householdSizeInvalid,
      null,
      { maxLength: 100, isNumeric: true }
    )
  }

  public get annualHouseholdIncomeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlAnnualHouseholdIncome,
      this.translateContentService.incomeVerificationView.body.annualHouseholdIncome,
      null,
      null,
      this.translateContentService.incomeVerificationView.body.annualHouseholdIncomePlaceholder,
      true,
      this.translateContentService.errorMessages.annualHouseholdIncomeInvalid,
      null,
      { maxLength: 100, isNumeric: true }
    )
  }

  public createGroup(): FormGroup {
    return (this.incomeVerificationGroup = this.formCreationService.createGroup());
  }

  public get continueButtonText(): string {
    return this.translateContentService.incomeVerificationView.action.submitBtn;
  }

  public get cancelButtonText(): string {
    return this.translateContentService.incomeVerificationView.action.cancelBtn;
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(
      this.incomeVerificationGroup,
      this.controlHouseholdSize,
      false,
      [Validators.required],
      this.workflowService.incomeVerificationFormData.householdSize || null
    )

    this.formCreationService.addControl(
      this.incomeVerificationGroup,
      this.controlAnnualHouseholdIncome,
      false,
      [Validators.required],
      this.workflowService.incomeVerificationFormData.annualHouseholdIncome || null
    )
  }

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.incomeVerificationGroup, true);
  }

  public setFormData(value: any) {
    this.workflowService.incomeVerificationFormData = value;
  }
}
