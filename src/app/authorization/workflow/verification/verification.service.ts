import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { StateService } from 'src/app/lookup/state/state.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from '../../../form-configuration/services/form-creation/form-creation.service';
import { FormItem } from '../../../form-configuration/shared/models/form-item.model';
import { WorkflowService } from '../workflow.service';

@Injectable()
export class VerificationService {

  public verificationGroup: FormGroup;
  public controlHomeNumber = 'homeNumber';
  public controlMobileNumber = 'mobileNumber';

  private controlFirstName = 'firstName';
  private controlLastName = 'lastName';
  private controlGender = 'gender';
  private controlDateOfBirth = 'dateOfBirth';
  private controlAddress = 'addressLine1';
  private controlAddressLine2 = 'addressLine2';
  private controlCity = 'city';
  private controlState = 'stateCode';
  private controlZipCode = 'postalCode';
  private controlPreferredMethodOfContact = 'preferredContactType';
  private controlEmailAddress = 'emailAddress';
  private controlBestTimeToReach = 'bestTimeToReach';
  private controlOkToLeaveMessage = 'okToLeaveMessage';
  private controlDMDPrescriberName = 'dmdPrescriberName';

  public get firstNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlFirstName, this.translateContentService.patientView.firstName, null, null, null, true,
      this.translateContentService.errorMessages.required);
  }

  public get lastNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlLastName, this.translateContentService.patientView.lastName, null, null, null, true,
      this.translateContentService.errorMessages.required);
  }

  public get genderConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlGender, this.translateContentService.patientView.sex.label, null, this.translateContentService.patientView.sex.option);
  }

  public get dobConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlDateOfBirth, this.translateContentService.patientView.dob, null,
      null, null, true, this.translateContentService.errorMessages.dateInvalid, null, {isDate: true});
  }

  public get addressConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlAddress, this.translateContentService.patientView.address);
  }

  public get addressLine2Config(): FormItem {
    return this.formCreationService.createItem(
      this.controlAddressLine2, this.translateContentService.patientView.addressLine2);
  }

  public get cityConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlCity, this.translateContentService.patientView.city);
  }

  public get stateConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlState, this.translateContentService.patientView.state.label, null,
      this.stateService.states.map(d => ({ displayedString: d.name, valueString: d.value })),
      this.translateContentService.patientView.dropdownPlaceholder);
  }

  public get zipCodeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlZipCode, this.translateContentService.patientView.postalCode, null,
      null, null, true, this.translateContentService.errorMessages.required, null, {isPostalCode: true});
  }

  public get preferredMethodOfContactConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlPreferredMethodOfContact,
      this.translateContentService.patientView.preferredContactNumber.label, null,
      this.translateContentService.patientView.preferredContactNumber.option
      , null, true, this.translateContentService.errorMessages.preferredContactRequired);
  }

  public get homeNumberConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlHomeNumber, this.translateContentService.patientView.homePhone, null,
      null, null, null, this.translateContentService.errorMessages.phoneNumberInvalid, null, {isPhoneNumber: true});
  }

  public get mobileNumberConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlMobileNumber, this.translateContentService.patientView.mobile, null,
      null, null, null, this.translateContentService.errorMessages.phoneNumberInvalid, null, {isPhoneNumber: true});
  }

  public get emailAddressConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlEmailAddress, this.translateContentService.patientView.emailAddress);
  }

  public get bestTimeToContactConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlBestTimeToReach,
      this.translateContentService.patientView.bestTimeToReachMe.label, null,
      this.translateContentService.patientView.bestTimeToReachMe.option, this.translateContentService.patientView.dropdownPlaceholder);
  }

  public get okToLeaveMessageConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlOkToLeaveMessage,
      this.translateContentService.patientView.okToLeaveMessage.label, null,
      this.translateContentService.patientView.okToLeaveMessage.option, this.translateContentService.patientView.dropdownPlaceholder);
  }

  public get dmdPrescriberNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlDMDPrescriberName, this.translateContentService.patientView.dmdPrescriberName);
  }

  public get stepContent(): any {
    return this.translateContentService.patientView.step;
  }

  public get actionContent(): any {
    return this.translateContentService.patientView.actions;
  }

  public get alertCannotVerify(): any {
    return this.translateContentService.patientView.alertCannotVerify;
  }

  public get alertFBAError(): any {
    return this.translateContentService.patientView.alertFBAError;
  }

  constructor(
      private formCreationService: FormCreationService,
      private formValidationService: FormValidationService,
      private translateContentService: TranslateContentService,
      private stateService: StateService,
      private workflowService: WorkflowService) {
  }

  public createGroup(): FormGroup {
    return this.verificationGroup = this.formCreationService.createGroup();
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(this.verificationGroup, this.controlFirstName, false, [Validators.required],
      this.workflowService.patientFormData.firstName || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlLastName, false, [Validators.required],
      this.workflowService.patientFormData.lastName || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlDateOfBirth, false, [Validators.required,
      this.formValidationService.forbidFutureDateValidator()],
      this.workflowService.patientFormData.dateOfBirth || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlZipCode, false, [Validators.required],
      this.workflowService.patientFormData.postalCode || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlGender, false, null,
      this.workflowService.patientFormData.gender || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlAddress, false, null,
      this.workflowService.patientFormData.addressLine1 || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlAddressLine2, false, null,
      this.workflowService.patientFormData.addressLine2 || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlCity, false, null,
      this.workflowService.patientFormData.city || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlState, false, null,
      this.workflowService.patientFormData.stateCode || '');
    this.formCreationService.addControl(this.verificationGroup, this.controlPreferredMethodOfContact, false, [Validators.required],
      this.workflowService.patientFormData.preferredContactType || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlHomeNumber, false, null,
      this.workflowService.patientFormData.homeNumber || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlMobileNumber, false, null,
      this.workflowService.patientFormData.mobileNumber || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlEmailAddress, false, [Validators.email],
      this.workflowService.patientFormData.emailAddress || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlBestTimeToReach, false, null,
      this.workflowService.patientFormData.bestTimeToReach || '');
    this.formCreationService.addControl(this.verificationGroup, this.controlOkToLeaveMessage, false, null,
      this.workflowService.patientFormData.okToLeaveMessage || null);
    this.formCreationService.addControl(this.verificationGroup, this.controlDMDPrescriberName, false, null,
      this.workflowService.patientFormData.dmdPrescriberName || null);
  }

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.verificationGroup, true);
  }

  public submitPatientData(formValue: any): void {
    this.workflowService.patientFormData = formValue;
  }
}
