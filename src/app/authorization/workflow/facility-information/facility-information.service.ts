import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { StateService } from 'src/app/lookup/state/state.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { WorkflowService } from '../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class FacilityInformationService {

  public facilityInformationGroup: FormGroup;
  private controlFacilityType = 'facilityType';
  private controlFacilityName= 'facilityName';
  private controlAddressLine1= 'addressLine1';
  private controlAddressLine2= 'addressLine2';
  private controlCity= 'city';
  private controlState= 'state';
  private controlZipCode= 'zipCode';
  private controlPrimaryContactName= 'primaryContactName';
  private controlRole= 'role';
  private controlPrimaryPhoneNumber= 'primaryPhoneNumber';
  private controlPrimaryFaxNumber= 'primaryFaxNumber';
  private controlPrimaryEmail= 'primaryEmail';

  constructor(
    private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private formValidationService: FormValidationService,
    private workflowService: WorkflowService,
    private stateService: StateService
  ) { }

  public get stepContent(): any {
    return this.translateContentService.facilityInformationView.step;
  }

  public get facilityTypeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlFacilityType,
      this.translateContentService.facilityInformationView.body.facilityType.label,
      null,
      this.translateContentService.facilityInformationView.body.facilityType.option,
      null,
      true,
      null
    )
  }

  public get facilityNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlFacilityName,
      this.translateContentService.facilityInformationView.body.facilityName,
      null,
      null,
      this.translateContentService.facilityInformationView.body.facilityNamePlaceholder,
      true,
      this.translateContentService.errorMessages.facilityNameInvalid,
      null,
      { maxLength: 100 }
    )
  }

  public get addressLine1Config(): FormItem {
    return this.formCreationService.createItem(
      this.controlAddressLine1,
      this.translateContentService.facilityInformationView.body.addressLine1,
      null,
      null,
      this.translateContentService.facilityInformationView.body.addressLine1Placeholder,
      true,
      this.translateContentService.errorMessages.addressInvalid,
      null,
      { maxLength: 100 }
    )
  }

  public get addressLine2Config(): FormItem {
    return this.formCreationService.createItem(
      this.controlAddressLine2,
      this.translateContentService.facilityInformationView.body.addressLine2,
      null,
      null,
      this.translateContentService.facilityInformationView.body.addressLine2Placeholder,
      false,
      this.translateContentService.errorMessages.addressInvalid,
      null,
      { maxLength: 100 }
    )
  }

  public get cityConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlCity,
      this.translateContentService.facilityInformationView.body.city,
      null,
      null,
      this.translateContentService.facilityInformationView.body.cityPlaceholder,
      true,
      this.translateContentService.errorMessages.cityInvalid,
      null,
      { maxLength: 35 }
    )
  }

  public get stateConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlState,
      this.translateContentService.facilityInformationView.body.state,
      null,
      this.stateService.states.map(d => ({ displayedString: d.name, valueString: d.value })),
      this.translateContentService.facilityInformationView.body.statePlaceholder,
      true,
      this.translateContentService.errorMessages.stateInvalid,
      null,
      { maxLength: 35 }
    )
  }

  public get zipCodeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlZipCode,
      this.translateContentService.facilityInformationView.body.zipCode,
      null,
      null,
      this.translateContentService.facilityInformationView.body.zipCodePlaceholder,
      true,
      this.translateContentService.errorMessages.zipInvalid,
      null,
      { isPostalCode: true }
    )
  }

  public get primaryContactNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlPrimaryContactName,
      this.translateContentService.facilityInformationView.body.primaryContactName,
      null,
      null,
      this.translateContentService.facilityInformationView.body.primaryContactNamePlaceholder,
      true,
      this.translateContentService.errorMessages.nameInvalid,
      null,
      { maxLength: 100 }
    )
  }

  public get roleConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlRole,
      this.translateContentService.facilityInformationView.body.role,
      null,
      null,
      this.translateContentService.facilityInformationView.body.rolePlaceholder,
      true,
      this.translateContentService.errorMessages.roleInvalid,
      null,
      { maxLength: 35 }
    )
  }

  public get primaryPhoneNumberConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlPrimaryPhoneNumber,
      this.translateContentService.facilityInformationView.body.primaryPhoneNumber,
      null,
      null,
      this.translateContentService.facilityInformationView.body.primaryPhoneNumberPlaceholder,
      true,
      this.translateContentService.errorMessages.phoneNumberInvalid,
      null,
      { isPhoneNumber: true }
    )
  }

  public get primaryFaxNumberConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlPrimaryFaxNumber,
      this.translateContentService.facilityInformationView.body.primaryFaxNumber,
      null,
      null,
      this.translateContentService.facilityInformationView.body.primaryFaxNumberPlaceholder,
      true,
      this.translateContentService.errorMessages.faxInvalid,
      null,
      { isPhoneNumber: true }
    )
  }

  public get primaryEmailConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlPrimaryEmail,
      this.translateContentService.facilityInformationView.body.primaryEmail,
      null,
      null,
      this.translateContentService.facilityInformationView.body.primaryEmailPlaceholder,
      false,
      this.translateContentService.errorMessages.emailInvalid,
      null,
      { maxLength: 50 }
    )
  }

  public createGroup(): FormGroup {
    return (this.facilityInformationGroup = this.formCreationService.createGroup());
  }

  public get continueButtonText(): string {
    return this.translateContentService.facilityInformationView.action.submitBtn;
  }

  public get cancelButtonText(): string {
    return this.translateContentService.facilityInformationView.action.cancelBtn;
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlFacilityType,
      false,
      [Validators.required],
      this.workflowService.facilityInformationFormData.facilityType || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlFacilityName,
      false,
      [Validators.required],
      this.workflowService.facilityInformationFormData.facilityName || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlAddressLine1,
      false,
      [Validators.required],
      this.workflowService.facilityInformationFormData.addressLine1 || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlAddressLine2,
      false,
      null,
      this.workflowService.facilityInformationFormData.addressLine2 || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlCity,
      false,
      [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
      this.workflowService.facilityInformationFormData.city || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlState,
      false,
      [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
      this.workflowService.facilityInformationFormData.state || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlState,
      false,
      [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
      this.workflowService.facilityInformationFormData.state || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlZipCode,
      false,
      [Validators.required, Validators.pattern(Regex.ZIP_CODE)],
      this.workflowService.facilityInformationFormData.zipCode || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlPrimaryContactName,
      false,
      [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
      this.workflowService.facilityInformationFormData.primaryContactName || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlRole,
      false,
      [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
      this.workflowService.facilityInformationFormData.role || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlPrimaryPhoneNumber,
      false,
      [Validators.required, Validators.pattern(Regex.PHONE_NUMBER)],
      this.workflowService.facilityInformationFormData.primaryPhoneNumber || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlPrimaryFaxNumber,
      false,
      [Validators.required, Validators.pattern(Regex.PHONE_NUMBER)],
      this.workflowService.facilityInformationFormData.primaryFaxNumber || null
    )

    this.formCreationService.addControl(
      this.facilityInformationGroup,
      this.controlPrimaryEmail,
      false,
      [Validators.pattern(Regex.EMAIL)],
      this.workflowService.facilityInformationFormData.primaryEmail || null
    )
  }

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.facilityInformationGroup, true);
  }

  public setFormData(value: any) {
    this.workflowService.facilityInformationFormData = value;
  }
}
