import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class PatientDemograchicService {
  private _unsubscribe$ = new Subject<boolean>();
  unsubscribe$ = this._unsubscribe$.asObservable();

  public patientDemographicsGroup: FormGroup;
  private controlFirstName = 'firstName';
  private controlLastName = 'lastName';
  private controlDateOfBirth = 'dateOfBirth';
  private controlZipCode = 'postalCode';
  private controlPatientPhone = 'primaryPhone';

  private controlCaregiverFirstName = 'caregiverFirstName';
  private controlCaregiverLastName = 'caregiverLastName';
  private controlCaregiverPhone = 'caregiverPhone';
  private controlCaregiverRelationshipToPatient = 'caregiverRelationshipToPatient';

  constructor(
    private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private formValidationService: FormValidationService,
    private patientService: PatientService,
    private workflowService: WorkflowService
  ) { }

  public get stepContent(): any {
    return this.translateContentService.patientDemographics.step;
  }

  public get demographicHeader(): string {
    return this.translateContentService.patientDemographics.body.header;
  }

  public get demographicSubheader(): string {
    return this.translateContentService.patientDemographics.body.subheader;
  }

  public get caregiverHeader(): string {
    return this.translateContentService.patientDemographics.body.caregiverHeader;
  }

  public get caregiverSubheader(): string {
    return this.translateContentService.patientDemographics.body.caregiverSubheader;
  }

  public get below18Information(): string {
    return this.translateContentService.patientDemographics.body.below18Information;
  }

  public get demographicsInformation(): string {
    return this.translateContentService.patientDemographics.body.demographicsInformation;
  }

  public get firstNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlFirstName,
      this.translateContentService.patientDemographics.body.firstName,
      null,
      null,
      this.translateContentService.patientDemographics.body.firstNamePlaceholder,
      true,
      this.translateContentService.errorMessages.firstNameInvalid,
      null,
      { maxLength: 35 }
    );
  }

  public get lastNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlLastName,
      this.translateContentService.patientDemographics.body.lastName,
      null,
      null,
      this.translateContentService.patientDemographics.body.lastNamePlaceholder,
      true,
      this.translateContentService.errorMessages.lastNameInvalid,
      null,
      { maxLength: 35 }
    );
  }

  public get dobConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlDateOfBirth,
      this.translateContentService.patientDemographics.body.dob,
      null,
      null,
      this.translateContentService.patientDemographics.body.dobPlaceholder,
      true,
      this.translateContentService.errorMessages.dateInvalid,
      null,
      { isDate: true, maxLength: 10 }
    );
  }

  public get zipCodeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlZipCode,
      this.translateContentService.patientDemographics.body.postalCode,
      null,
      null,
      this.translateContentService.patientDemographics.body.postalCodePlaceholder,
      true,
      this.translateContentService.errorMessages.zipInvalid,
      null,
      { isPostalCode: true }
    );
  }

  public get primaryPhoneNumberConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlPatientPhone,
      this.translateContentService.patientDemographics.body.patientPhone,
      null,
      null,
      this.translateContentService.patientDemographics.body.patientPhonePlaceholder,
      true,
      this.translateContentService.errorMessages.phoneNumberInvalid,
      null,
      { isPhoneNumber: true }
    );
  }

  public get caregiverFirstNameConfig(): FormItem {
    return this.formCreationService.createItem(
        this.controlCaregiverFirstName,
        this.translateContentService.patientDemographics.body.caregiverFirstName,
        null,
        null,
        this.translateContentService.patientDemographics.body.caregiverFirstNamePlaceholder,
        false,
        this.translateContentService.errorMessages.firstNameInvalid,
        null,
        { maxLength: 35 }
    );
  }

  public get caregiverLastNameConfig(): FormItem {
      return this.formCreationService.createItem(
          this.controlCaregiverLastName,
          this.translateContentService.patientDemographics.body.caregiverLastName,
          null,
          null,
          this.translateContentService.patientDemographics.body.caregiverLastNamePlaceholder,
          false,
          this.translateContentService.errorMessages.lastNameInvalid,
          null,
          { maxLength: 35 }
      );
  }

  public get caregiverPhoneConfig(): FormItem {
      return this.formCreationService.createItem(
          this.controlCaregiverPhone,
          this.translateContentService.patientDemographics.body.caregiverPhone,
          null,
          null,
          this.translateContentService.patientDemographics.body.caregiverPhonePlaceholder,
          false,
          this.translateContentService.errorMessages.phoneNumberInvalid,
          null,
          { isPhoneNumber: true });
  }

  public get caregiverRelationshipToPatientConfig(): FormItem {
      return this.formCreationService.createItem(
          this.controlCaregiverRelationshipToPatient,
          this.translateContentService.patientDemographics.body.caregiverRelationshipToPatient.label,
          null,
          this.translateContentService.patientDemographics.body.caregiverRelationshipToPatient.option,
          this.translateContentService.patientDemographics.body.caregiverRelationshipToPatient.dropdownPlaceHolder,
          false,
          this.translateContentService.errorMessages.required,
          null,
          null,
          null);
  }

  public createGroup(): FormGroup {
    return (this.patientDemographicsGroup = this.formCreationService.createGroup());
  }

  public get continueButtonText(): string {
    return this.translateContentService.patientDemographics.action.submitBtn;
  }

  public get cancelButtonText(): string {
    return this.translateContentService.patientDemographics.action.cancelBtn;
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlFirstName,
      false,
      [Validators.required, Validators.pattern(Regex.NAME_UPDATED)],
      this.workflowService.patientFormData.firstName || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlLastName,
      false,
      [Validators.required, Validators.pattern(Regex.NAME_UPDATED)],
      this.workflowService.patientFormData.lastName || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlDateOfBirth,
      false,
      [Validators.required],
      this.workflowService.patientFormData.dateOfBirth || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlZipCode,
      false,
      [Validators.required, Validators.pattern(Regex.ZIP_CODE)],
      this.workflowService.patientFormData.postalCode || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlPatientPhone,
      false,
      [Validators.pattern(Regex.PHONE_NUMBER)],
      this.workflowService.patientFormData.primaryPhone || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlCaregiverFirstName,
      false,
      [Validators.pattern(Regex.NAME_UPDATED)],
      this.workflowService.patientFormData.caregiverFirstName || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlCaregiverLastName,
      false,
      [Validators.pattern(Regex.NAME_UPDATED)],
      this.workflowService.patientFormData.caregiverLastName || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlCaregiverPhone,
      false,
      [Validators.pattern(Regex.PHONE_NUMBER)],
      this.workflowService.patientFormData.caregiverPhone || null
    );
    this.formCreationService.addControl(
      this.patientDemographicsGroup,
      this.controlCaregiverRelationshipToPatient,
      false,
      null,
      this.workflowService.patientFormData.caregiverRelationshipToPatient || ''
    );

  }

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.patientDemographicsGroup, true);
  }

  public setFormData(value: any) {
    this.workflowService.patientFormData = value;
  }
}
