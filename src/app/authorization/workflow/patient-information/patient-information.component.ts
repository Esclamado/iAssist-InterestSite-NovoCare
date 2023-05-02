import { Component, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Regex } from "src/app/api/shared/constants/regex.constant";
import { FormItem } from "src/app/form-configuration/shared/models/form-item.model";
import { TranslateContentService } from "src/app/translation/services/translate-content/translate-content.service";
import { FormCancelModalComponent } from "src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component";
import { ServiceOfferingsEnum } from "../service-offerings.enum";
import { WorkflowService } from "../workflow.service";
import { PatientInformationService } from "./patient-information.service";
import * as moment from "moment";

@Component({
    selector: 'app-patient-information',
    templateUrl: './patient-information.component.html',
    styleUrls: ['./patient-information.component.scss']
})

export class PatientInformationComponent implements OnInit {
    @Output() continueButtonText: string;
    @Output() cancelButtonText: string;

    public patientInformationGroup: FormGroup;
    public stepContent: any;
    public patientInformationFirstNameConfig: FormItem;
    public patientInformationLastNameConfig: FormItem;
    public patientInformationDOBConfig: FormItem;
    public patientInformationZipCodeConfig: FormItem;
    public patientInformationGenderConfig: FormItem;
    public patientInformationAddressLine1Config: FormItem;
    public patientInformationAddressLine2Config: FormItem;
    public patientInformationCityConfig: FormItem;
    public patientInformationStateConfig: FormItem;

    public patientInformationPrimaryPhoneConfig: FormItem;
    public patientInformationPrimaryPhoneTypeConfig: FormItem;
    public patientInformationOkToLeaveMessage: FormItem;
    public patientInformationAltPhoneConfig: FormItem;
    public patientInformationAltPhoneTypeConfig: FormItem;
    public patientInformationPreferredLanguageConfig: FormItem;
    public patientInformationPreferredLanguageIfOtherConfig: FormItem;
    public patientInformationPreferredPharmacyConfig: FormItem;
    public patientInformationPreferredPharmacyIfOtherConfig: FormItem;
    public patientInformationPreferredEmailAddressConfig: FormItem;
    public patientInformationAltContactOrCaregiver:FormItem;
    public patientInformationPreferredNumber:FormItem;

    public caregiverFirstName : FormItem;
    public caregiverLastName : FormItem;
    public caregiverEmail : FormItem;
    public caregiverPhone : FormItem;
    public caregiverPhoneType : FormItem;
    public caregiverPatientConsent : FormItem;
    public caregiverRelationshipToPatient : FormItem;

    public showOtherLanguage: boolean = false;
    public showOtherPharmacy: boolean = false;
    public hitContinue: boolean = false;
    public showOkToLeaveMessageMobile:boolean;
    public showOkToLeaveMessageHome:boolean;
    public okToMessageText: string;
    public preferredText : string;
    public consentText:string;
    public rttpText:string;
    public showCaregiverForm:boolean=false;
    public contactRttp:boolean=false;
    public greaterThanEighteen:boolean=false;
    public hasAtleastOneNumberSelected:boolean;
    public isSubmitting: boolean

    public get medicationType(): FormControl {
        return this.patientInformationGroup.get('drugSelected') as FormControl;
    }


    constructor(
        private patientService: PatientInformationService,
        private workFlowService: WorkflowService,
        public dialog: MatDialog,
        public translateService: TranslateContentService) {
        this.okToMessageText = this.translateService.patientView.okToLeaveMessage.label
        this.preferredText = this.translateService.patientView.primaryContactNumber.label
        this.consentText = this.translateService.patientView.caregiverPatientConsent.label
        this.rttpText = this.translateService.patientView.caregiverPatientConsent.rttp
    }

    ngOnInit(): void {
        this.patientInformationGroup = this.patientService.createGroup();
        this.patientService.addControlsToGroup();
        this.setControlConfigs();
        this.setViewContent();
        this.onFormChange()
        this.workFlowService.patientFormData.altContactOrCaregiver == 'Y' && (this.showCaregiverForm = true)

        if (this.workFlowService.patientFormData.preferredNumber == '1') {
            this.showOkToLeaveMessageMobile=true
            this.showOkToLeaveMessageHome=false
            this.primaryPreferred()
        }
        else if (this.workFlowService.patientFormData.preferredNumber == '2') {
            this.showOkToLeaveMessageMobile=false
            this.showOkToLeaveMessageHome=true
            this.homePreferred()
        }
    }

    setControlConfigs() {
        this.continueButtonText = this.patientService.continueButtonText;
        this.cancelButtonText = this.patientService.cancelButtonText;
        this.patientInformationFirstNameConfig = this.patientService.firstNameConfig;
        this.patientInformationLastNameConfig = this.patientService.lastNameConfig;
        this.patientInformationDOBConfig = this.patientService.dobConfig;
        this.patientInformationZipCodeConfig = this.patientService.zipCodeConfig;
        this.patientInformationGenderConfig = this.patientService.genderConfig;
        this.patientInformationAddressLine1Config = this.patientService.addressLine1Config;
        this.patientInformationAddressLine2Config = this.patientService.addressLine2Config;
        this.patientInformationCityConfig = this.patientService.cityConfig;
        this.patientInformationStateConfig = this.patientService.stateConfig;

        this.patientInformationPrimaryPhoneConfig = this.patientService.primaryPhoneNumberConfig;
        this.patientInformationPrimaryPhoneTypeConfig = this.patientService.primaryPhoneTypeConfig;
        this.patientInformationOkToLeaveMessage = this.patientService.okToLeaveMessageConfig;
        this.patientInformationAltPhoneConfig = this.patientService.altPhoneConfig;
        this.patientInformationAltPhoneTypeConfig = this.patientService.altPhoneTypeConfig;
        this.patientInformationPreferredLanguageConfig = this.patientService.preferredLanguageTypeConfig;
        this.patientInformationAltContactOrCaregiver = this.patientService.altContactOrCaregiverConfig;
        this.patientInformationPreferredNumber = this.patientService.preferredNumberConfig;

        if (this.patientInformationGroup.get('languageIfOther').value) {
            this.showOtherLanguage = true;
        }
        this.patientInformationPreferredLanguageIfOtherConfig = this.patientService.otherLanguageTypeConfig;

        this.patientInformationPreferredPharmacyConfig = this.patientService.pharmacyTypeConfig;
        this.patientInformationPreferredPharmacyIfOtherConfig = this.patientService.otherPharmacyTypeConfig;
        if (this.patientInformationGroup.get('preferredPharmacyIfOther').value) {
            this.showOtherPharmacy = true;
        }
        this.patientInformationPreferredEmailAddressConfig = this.patientService.emailAddressConfig;

        this.caregiverFirstName = this.patientService.caregiverFirstNameConfig
        this.caregiverLastName = this.patientService.caregiverLastNameConfig
        this.caregiverEmail = this.patientService.caregiverEmailConfig
        this.caregiverPhone = this.patientService.caregiverPhoneConfig
        this.caregiverPhoneType = this.patientService.caregiverPhoneTypeConfig
        this.caregiverPatientConsent = this.patientService.caregiverPatientConsentConfig
        this.caregiverRelationshipToPatient = this.patientService.caregiverRelationshipToPatientConfig

    }

    private setViewContent(): void {
        this.stepContent = this.patientService.stepContent;
    }

    public showOtherLanguageInput() {
        let val = (this.patientInformationGroup.get('preferredLanguage').value);
        if (val === 'Other'){
            this.showOtherLanguage = true;
            this.patientInformationPreferredLanguageIfOtherConfig.required = true;
            this.patientInformationGroup.controls.languageIfOther.setValidators([Validators.required, Validators.pattern(Regex.ALPHA_ONLY)]);
            this.patientInformationGroup.controls.languageIfOther.updateValueAndValidity();
        }
        else {
            this.showOtherLanguage = false;
            this.patientInformationPreferredLanguageIfOtherConfig.required = false;
            this.patientInformationGroup.controls.languageIfOther.setValidators(null);
            this.patientInformationGroup.controls.languageIfOther.reset(null);
            this.patientInformationGroup.controls.languageIfOther.setValidators(Validators.pattern(Regex.ALPHA_ONLY));
            this.patientInformationGroup.controls.languageIfOther.updateValueAndValidity();
        }
    }

    public onFormChange(){
        this.patientInformationGroup.valueChanges.subscribe(form=>{
            if(form.preferredNumber===1 && form.primaryPhone){
                this.hasAtleastOneNumberSelected=true
            }else if(form.preferredNumber===2 && form.altPhone){
                this.hasAtleastOneNumberSelected=true
            }else{
                this.hasAtleastOneNumberSelected=false
            }
        })
    }

    public showOtherPharmacyInput() {
        let val = (this.patientInformationGroup.get('preferredPharmacy').value);
        if (val === 'Other') {
            this.showOtherPharmacy = true;
            this.patientInformationPreferredPharmacyIfOtherConfig.required = true;
            this.patientInformationGroup.controls.preferredPharmacyIfOther.setValidators([Validators.required, Validators.pattern(Regex.ALPHA_ONLY)]);
            this.patientInformationGroup.controls.preferredPharmacyIfOther.updateValueAndValidity();
        }
        else {
            this.showOtherPharmacy = false;
            this.patientInformationPreferredPharmacyIfOtherConfig.required = false;
            this.patientInformationGroup.controls.preferredPharmacyIfOther.setValidators(null);
            this.patientInformationGroup.controls.preferredPharmacyIfOther.reset(null);
            this.patientInformationGroup.controls.preferredPharmacyIfOther.setValidators(Validators.pattern(Regex.ALPHA_ONLY));
            this.patientInformationGroup.controls.preferredPharmacyIfOther.updateValueAndValidity();
        }
    }

    public onSetMobileAsPreferred(e:any){
        if(e.target.checked){
            this.showOkToLeaveMessageMobile=true
            this.showOkToLeaveMessageHome=false
            this.patientInformationGroup.controls.preferredNumber.setValue(1)
            this.primaryPreferred()
        }else{
            this.showOkToLeaveMessageMobile=false
            this.patientInformationGroup.controls.preferredNumber.setValue(0)
        }
    }

    public onSetHomeAsPreferred(e:any){
        if(e.target.checked){
            this.showOkToLeaveMessageHome=true
            this.showOkToLeaveMessageMobile=false
            this.patientInformationGroup.controls.preferredNumber.setValue(2);
            this.homePreferred()
        }else{
            this.showOkToLeaveMessageHome=false
            this.patientInformationGroup.controls.preferredNumber.setValue(0)
        }
    }

    public primaryPreferred(){
        this.patientInformationGroup.controls.altPhone.setErrors(null)
        this.patientInformationGroup.controls.primaryPhone.setValidators([Validators.required , Validators.pattern(Regex.PHONE_NUMBER)])
        this.patientInformationGroup.controls.primaryPhone.markAsTouched()
        this.patientInformationGroup.controls.primaryPhone.updateValueAndValidity()
    }
    public homePreferred(){
        this.patientInformationGroup.controls.primaryPhone.setErrors(null)
        this.patientInformationGroup.controls.altPhone.setValidators([Validators.required , Validators.pattern(Regex.PHONE_NUMBER)])
        this.patientInformationGroup.controls.altPhone.markAsTouched()
        this.patientInformationGroup.controls.altPhone.updateValueAndValidity()
    }

    public requireBoth(){
        this.patientInformationGroup.controls.primaryPhone.setValidators([Validators.required , Validators.pattern(Regex.PHONE_NUMBER)])
        this.patientInformationGroup.controls.primaryPhone.markAsTouched()
        this.patientInformationGroup.controls.altPhone.setValidators([Validators.required , Validators.pattern(Regex.PHONE_NUMBER)])
        this.patientInformationGroup.controls.altPhone.markAsTouched()
        this.patientInformationGroup.controls.primaryPhone.updateValueAndValidity()
        this.patientInformationGroup.controls.altPhone.updateValueAndValidity()
    }

    public onOkToLeaveMessage(e:any){
        if(e.target.checked){
            this.patientInformationGroup.controls.okToLeaveMessage.setValue('Y');
        }else{
            this.patientInformationGroup.controls.okToLeaveMessage.setValue('N')
        }
    }

    public onDateChange(e:any){
        const relationship = this.patientInformationGroup.value.caregiverRelationshipToPatient
        let age = this.getAge()
        if(age>=18){
            this.patientInformationGroup.controls.altContactOrCaregiver.setValue(null)
            this.patientInformationGroup.controls.altContactOrCaregiver.enable()
            this.greaterThanEighteen=true
            this.contactRttp=relationship?true:false
        }else{
            this.patientInformationGroup.controls.altContactOrCaregiver.setValue('Y')
            this.patientInformationGroup.controls.altContactOrCaregiver.disable()
            this.greaterThanEighteen=false
            this.showCaregiverForm = true
            this.contactRttp=false
        }
    }

    public getAge() {
        let getMonths = moment().diff(this.patientInformationGroup.controls.dateOfBirth.value, 'months');
        let age = Math.round(getMonths/12)
        return age
    }

    public onRelationshipChange(e:any){
        if(e.target.value && this.greaterThanEighteen){
            this.contactRttp=true
        }else{
            this.contactRttp=false
        }
    }

    public onAltContactOrCaregiverChange(value:any){
        if (this.patientInformationGroup.value.preferredNumber === null) {
            this.requireBoth()
        } else {
            this.patientInformationGroup.controls.primaryPhone.setValidators(null)
            this.patientInformationGroup.controls.altPhone.setValidators(null)
            this.patientInformationGroup.controls.primaryPhone.markAsUntouched()
            this.patientInformationGroup.controls.altPhone.markAsUntouched()
            this.patientInformationGroup.controls.primaryPhone.updateValueAndValidity()
            this.patientInformationGroup.controls.altPhone.updateValueAndValidity()
        }

        if (value==='Y') {
            this.setCareGiverFormRequired(true)
        } else {
            this.setCareGiverFormRequired(false)
        }
    }

    public setCareGiverFormRequired(value:boolean){
        this.showCaregiverForm = value
        if(!value){
            this.patientInformationGroup.controls.caregiverFirstName.setErrors(null);
            this.patientInformationGroup.controls.caregiverLastName.setErrors(null);
            this.patientInformationGroup.controls.caregiverEmail.setErrors(null);
            this.patientInformationGroup.controls.caregiverPhone.setErrors(null);
            this.patientInformationGroup.controls.caregiverPhoneType.setErrors(null);
            this.patientInformationGroup.controls.caregiverRelationshipToPatient.setErrors(null);
        } else {
            this.patientInformationGroup.controls.caregiverFirstName.setValidators([Validators.required])
            this.patientInformationGroup.controls.caregiverFirstName.updateValueAndValidity()
            this.caregiverFirstName.required=value;
            this.caregiverLastName.required=value;
            this.caregiverEmail.required=value;
            this.caregiverPhone.required=value;
            this.caregiverPhoneType.required=value;
            this.caregiverRelationshipToPatient.required=value;
        }
        this.patientInformationGroup.controls.caregiverFirstName.markAsDirty();
    }

    public onChangeRttp(e:any){
        if(e.target.checked){
            this.patientInformationGroup.controls.caregiverPatientConsent.setValue('Y');
        }else{
            this.patientInformationGroup.controls.caregiverPatientConsent.setValue('')
        }
    }

    public isUploadDocumentationServiceOffering() {
        if (this.workFlowService.getSelectedOffering() == ServiceOfferingsEnum.UploadDocumentation) {
            return true
        }
        else {
            return false
        }
    }

    public cancelBtnClick(): void {
        this.dialog.open(FormCancelModalComponent);
    }

    public continueButtonClick(): void {
        if (this.patientInformationGroup.invalid) {
            this.patientService.touchForm();
          } else {
            this.isSubmitting = true;
            this.patientService.setFormData(this.patientInformationGroup.value);
            this.getAge() < 18 && (this.workFlowService.patientFormData.altContactOrCaregiver = 'Y')
            const selectedOffering = this.workFlowService.getSelectedOffering();
            const runEligibility = selectedOffering !== ServiceOfferingsEnum.Dermatology &&
                                    selectedOffering !== ServiceOfferingsEnum.UploadDocumentation &&
                                    selectedOffering !== ServiceOfferingsEnum.ENT;
            if (runEligibility) {
                this.hitContinue = true;
                this.patientService.eligibility().subscribe(() => {
                    this.isSubmitting = false
                    this.workFlowService.navigateToNextStep();
                    this.hitContinue = false;
                }, () => {
                    this.isSubmitting = false
                    this.workFlowService.navigateToNextStep();
                    this.hitContinue = false;
                });
            } else {
                this.workFlowService.navigateToNextStep();
            }
          }
    }
}
