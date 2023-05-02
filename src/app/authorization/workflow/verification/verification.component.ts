import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { WorkflowService } from '../workflow.service';
import { VerificationService } from './verification.service';
import { SupportedLanguages } from 'src/app/translation/shared/enums/supported-languages.enum';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  providers: [VerificationService]
})
export class VerificationComponent implements OnInit {

  private phoneRegex = /\d{3}-\d{3}-\d{4}/;

  public get homeControl(): FormControl {
    return this.verificationGroup.get(this.verificationService.controlHomeNumber) as FormControl;
  }

  public get mobileControl(): FormControl {
    return this.verificationGroup.get(this.verificationService.controlMobileNumber) as FormControl;
  }

  public stepContent: any;
  public actionContent: any;
  public verificationGroup: FormGroup;
  public firstNameConfig: FormItem;
  public lastNameConfig: FormItem;
  public genderConfig: FormItem;
  public dobConfig: FormItem;
  public addressConfig: FormItem;
  public addressLine2Config: FormItem;
  public cityConfig: FormItem;
  public stateConfig: FormItem;
  public zipCodeConfig: FormItem;
  public preferredMethodOfContactConfig: FormItem;
  public homeNumberConfig: FormItem;
  public mobileNumberConfig: FormItem;
  public emailAddressConfig: FormItem;
  public bestTimeToContactConfig: FormItem;
  public okToLeaveMessageConfig: FormItem;
  public dmdPrescriberNameConfig: FormItem;
  public isLanguageSpanish: boolean;
  public showAlert = false;
  public alertContent: any;
  public isSubmitting = false;

  constructor(
    public verificationService: VerificationService,
    private workflowService: WorkflowService) { }

  ngOnInit() {
    this.verificationGroup = this.verificationService.createGroup();
    this.verificationService.addControlsToGroup();
    this.subscribeWorkflowLanguage();

    if (this.preferredContactType) {
      this.onRadioValueChange(this.preferredContactType);
    }
  }

  public get preferredContactType(): string {
    return this.verificationGroup.get('preferredContactType').value;
  }

  public submit(): void {
    // Exit is already submitting
    if (this.isSubmitting) { return; }

    if (this.verificationGroup.invalid) {
      this.verificationService.touchForm();
    } else {
      this.isSubmitting = true;
      this.verificationService.submitPatientData(this.verificationGroup.value);
      this.isSubmitting = false;
      this.workflowService.navigateToNextStep();
    }
  }

  /**
   * non dynamic approach of setting fields to required, lets approve on this in the future
   */
  public onRadioValueChange(value: string): void {
    if (value.toLowerCase() === 'mobile') {
      this.mobileNumberConfig.required = true;
      this.mobileControl.setValidators([Validators.required, Validators.pattern(this.phoneRegex)]);
      this.homeControl.setValidators([Validators.pattern(this.phoneRegex)]);
      this.homeNumberConfig.required = false;
    }

    if (value.toLowerCase() === 'home') {
      this.homeNumberConfig.required = true;
      this.homeControl.setValidators([Validators.required, Validators.pattern(this.phoneRegex)]);
      this.mobileControl.setValidators([Validators.pattern(this.phoneRegex)]);
      this.mobileNumberConfig.required = false;
    }

    // update validility status
    this.mobileControl.updateValueAndValidity({ onlySelf: true });
    this.homeControl.updateValueAndValidity({ onlySelf: true });

    // reset touch status
    this.homeControl.markAsUntouched();
    this.mobileControl.markAsUntouched();
  }

  private subscribeWorkflowLanguage(): void {
    this.workflowService.subscribeWorkflowLanguage()
      .subscribe(res => {
        this.isLanguageSpanish = res === SupportedLanguages.Spanish;
        this.setControlConfigs();
        this.setViewContent();
      });
  }

  private setControlConfigs(): void {
    this.firstNameConfig = this.verificationService.firstNameConfig;
    this.lastNameConfig = this.verificationService.lastNameConfig;
    this.genderConfig = this.verificationService.genderConfig;
    this.dobConfig = this.verificationService.dobConfig;
    this.addressConfig = this.verificationService.addressConfig;
    this.addressLine2Config = this.verificationService.addressLine2Config;
    this.cityConfig = this.verificationService.cityConfig;
    this.stateConfig = this.verificationService.stateConfig;
    this.zipCodeConfig = this.verificationService.zipCodeConfig;
    this.preferredMethodOfContactConfig = this.verificationService.preferredMethodOfContactConfig;
    this.homeNumberConfig = this.verificationService.homeNumberConfig;
    this.mobileNumberConfig = this.verificationService.mobileNumberConfig;
    this.emailAddressConfig = this.verificationService.emailAddressConfig;
    this.bestTimeToContactConfig = this.verificationService.bestTimeToContactConfig;
    this.okToLeaveMessageConfig = this.verificationService.okToLeaveMessageConfig;
    this.dmdPrescriberNameConfig = this.verificationService.dmdPrescriberNameConfig;
  }

  private setViewContent(): void {
    this.stepContent = this.verificationService.stepContent;
    this.actionContent = this.verificationService.actionContent;
  }

}
