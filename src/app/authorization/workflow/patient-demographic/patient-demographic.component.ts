import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PrescriberService } from 'src/app/api/services/prescriber/prescriber.service';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { ExternalServicesSetupResponse } from 'src/app/api/shared/models/external-services-response.model';
import { ProviderExternalLoginRequest } from 'src/app/api/shared/models/provider-external-login.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';
import { PatientDemograchicService } from './patient-demographic.service';

@Component({
  selector: 'app-patient-demographic',
  templateUrl: './patient-demographic.component.html',
  styleUrls: ['./patient-demographic.component.scss']
})
export class PatientDemographicComponent implements OnInit, AfterViewInit {
  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;
  @Output() continue: boolean;
  @Output() resultFound: boolean;

  public stepContent: any;

  public patientDemographicFirstNameConfig: FormItem;
  public patientDemographicLastNameConfig: FormItem;
  public patientDemographicDOBConfig: FormItem;
  public patientDemographicZipCodeConfig: FormItem;
  public patientDemographicPhoneConfig: FormItem;
  public patientDemographicsGroup: FormGroup;

  public caregiverFirstNameConfig: FormItem;
  public caregiverLastNameConfig: FormItem;
  public caregiverPhoneConfig: FormItem;
  public caregiverRelationshipToPatientConfig: FormItem;

  public drugUrl: string;
  public showPrevious = false;
  public patientDemographicsHeader: string;
  public patientDemographicsSubheader: string;
  public caregiverHeader: string;
  public caregiverSubheader: string;
  public below18Information: string;
  public demographicsInformation: string;
  public showCaregiverDescription = false;

  constructor(
    private authService: AuthService,
    private patientDemographicService: PatientDemograchicService,
    private workFlowService: WorkflowService,
    private prescriberService: PrescriberService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    public translationService: TranslateContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientDemographicsGroup = this.patientDemographicService.createGroup();
    this.patientDemographicService.addControlsToGroup();
    this.setControlConfigs();
    this.setViewContent();
    this.drugUrl = this.workFlowService.medicationFormData.drugUrl;
    if (ServiceOfferingsEnum.Allergy === this.workFlowService.getSelectedOffering()) {
      this.showPrevious = true;
    }
    this.workFlowService.setWorkflowComplete(false);
    this.workFlowService.setWorkflowByUrl(this.router.url);
  }

  ngAfterViewInit(): void {
    this.checkDOB();
    this.changeDetector.detectChanges();
  }

  checkDOB() {
    if (this.patientDemographicsGroup.controls.dateOfBirth.value) {
      this.onDateChange(null);
    }
  }

  public submit(): void {
    if (this.patientDemographicsGroup.valid) {
      this.patientDemographicService.setFormData({...this.patientDemographicsGroup.value,
        altContactOrCaregiver: 'Y' });
      this.workFlowService.navigateToNextStep();
    } else {
      this.patientDemographicService.touchForm();
    }
  }

  private setViewContent(): void {
    this.stepContent = this.patientDemographicService.stepContent;
    this.patientDemographicsHeader = this.patientDemographicService.demographicHeader;
    this.patientDemographicsSubheader = this.patientDemographicService.demographicSubheader;
    this.caregiverHeader = this.patientDemographicService.caregiverHeader;
    this.caregiverSubheader = this.patientDemographicService.caregiverSubheader;
    this.below18Information = this.patientDemographicService.below18Information;
    this.demographicsInformation = this.patientDemographicService.demographicsInformation;
  }

  private setControlConfigs(): void {
    this.continueButtonText = this.patientDemographicService.continueButtonText;
    this.cancelButtonText = this.patientDemographicService.cancelButtonText;
    this.patientDemographicFirstNameConfig = this.patientDemographicService.firstNameConfig;
    this.patientDemographicLastNameConfig = this.patientDemographicService.lastNameConfig;
    this.patientDemographicDOBConfig = this.patientDemographicService.dobConfig;
    this.patientDemographicZipCodeConfig = this.patientDemographicService.zipCodeConfig;
    this.patientDemographicPhoneConfig = this.patientDemographicService.primaryPhoneNumberConfig;

    this.caregiverFirstNameConfig = this.patientDemographicService.caregiverFirstNameConfig;
    this.caregiverLastNameConfig = this.patientDemographicService.caregiverLastNameConfig;
    this.caregiverPhoneConfig = this.patientDemographicService.caregiverPhoneConfig;
    this.caregiverRelationshipToPatientConfig = this.patientDemographicService.caregiverRelationshipToPatientConfig;
  }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }

  public continueBtnClick(): void {
    this.patientDemographicService.setFormData(this.patientDemographicsGroup.value);

    this.workFlowService.navigateToNextStep();
  }

  public onDateChange(e: any) {
    const age = this.getAge();
    if (age < 18) {
      this.showCaregiverDescription = true;
      this.updateValidator(this.caregiverFirstNameConfig.controlName, [Validators.required, Validators.pattern(Regex.NAME_UPDATED)]);
      this.updateValidator(this.caregiverLastNameConfig.controlName, [Validators.required, Validators.pattern(Regex.NAME_UPDATED)]);
      this.updateValidator(this.caregiverPhoneConfig.controlName, [Validators.required, Validators.pattern(Regex.PHONE_NUMBER)]);
      this.updateValidator(this.caregiverRelationshipToPatientConfig.controlName, [Validators.required]);
      this.caregiverFirstNameConfig.required = true;
      this.caregiverLastNameConfig.required = true;
      this.caregiverPhoneConfig.required = true;
      this.caregiverRelationshipToPatientConfig.required = true;
    } else {
      this.showCaregiverDescription = false;
      this.updateValidator(this.caregiverFirstNameConfig.controlName, [Validators.pattern(Regex.NAME_UPDATED)]);
      this.updateValidator(this.caregiverLastNameConfig.controlName, [Validators.pattern(Regex.NAME_UPDATED)]);
      this.updateValidator(this.caregiverPhoneConfig.controlName, [Validators.pattern(Regex.PHONE_NUMBER)]);
      this.updateValidator(this.caregiverRelationshipToPatientConfig.controlName, []);
      this.caregiverFirstNameConfig.required = false;
      this.caregiverLastNameConfig.required = false;
      this.caregiverPhoneConfig.required = false;
      this.caregiverRelationshipToPatientConfig.required = false;
    }
  }

  private updateValidator(controlName: string, validators: ValidatorFn[]) {
      this.patientDemographicsGroup.controls[controlName]?.setValidators(validators);
      this.patientDemographicsGroup.controls[controlName]?.updateValueAndValidity();
  }

  private getAge() {
    const getMonths = moment().diff(this.patientDemographicsGroup.controls.dateOfBirth.value, 'months');
    return getMonths / 12;
  }
}
