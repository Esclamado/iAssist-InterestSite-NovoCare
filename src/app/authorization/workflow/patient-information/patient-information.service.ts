import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { Observable } from "rxjs/internal/Observable";
import { AbvService } from "src/app/api/services/abv/abv.service";
import { Regex } from "src/app/api/shared/constants/regex.constant";
import { AbvRequestModel } from "src/app/api/shared/models/abv/abv-request.model";
import { ABV_DRUG_SELECTIONS } from "src/app/api/shared/models/abv/abv.constant";
import { EligibilityRequestModel } from "src/app/api/shared/models/abv/eligibility-request.model";
import { EligibilityResponseModel } from "src/app/api/shared/models/abv/eligibility-response.model";
import { FormCreationService } from "src/app/form-configuration/services/form-creation/form-creation.service";
import { FormValidationService } from "src/app/form-configuration/services/form-validation/form-validation.service";
import { FormItem } from "src/app/form-configuration/shared/models/form-item.model";
import { PharmacyService } from "src/app/lookup/pharmacy/pharmacy.service";
import { StateService } from "src/app/lookup/state/state.service";
import { TranslateContentService } from "src/app/translation/services/translate-content/translate-content.service";
import { WorkflowService } from "../workflow.service";

@Injectable({
    providedIn: 'root'
})
export class PatientInformationService {

    public patientInformationGroup: FormGroup;

    private controlFirstName = 'firstName';
    private controlLastName = 'lastName';
    private controlDateOfBirth = 'dateOfBirth';
    private controlGender = 'gender';
    private controlAddress1 = 'addressLine1';
    private controlAddress2 = 'addressLine2';
    private controlCity = 'city';
    private controlState = 'stateCode';
    private controlZipCode = 'postalCode';
    private controlPrimaryPhone = 'primaryPhone';
    private controlPhoneType = 'phoneType';
    private controlAltPhone = 'altPhone';
    private controlAltPhoneType = 'altPhoneType';
    private controlPreferredLanguage = 'preferredLanguage';
    private controlLanguageIfOther = 'languageIfOther';
    private controlPharmacy = 'preferredPharmacy';
    private controlOtherPharmacy = 'preferredPharmacyIfOther';
    private controlEmailAddress = 'emailAddress';
    private controlAltContactOrCaregiver = 'altContactOrCaregiver';
    private controlOkToLeaveMessage = 'okToLeaveMessage';
    private controlPreferredNumber = 'preferredNumber';

    private controlCaregiverFirstName = 'caregiverFirstName';
    private controlCaregiverLastName = 'caregiverLastName';
    private controlCaregiverEmail = 'caregiverEmail';
    private controlCaregiverPhone = 'caregiverPhone';
    private controlCaregiverPhoneType = 'caregiverPhoneType';
    private controlCaregiverPatientConsent = 'caregiverPatientConsent';
    private controlCaregiverRelationshipToPatient = 'caregiverRelationshipToPatient';


    constructor(private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private stateService: StateService,
        private pharmacyService: PharmacyService,
        private workflowService: WorkflowService,
        private abvService: AbvService) {
    }

    public get stepContent(): any {
        return this.translateContentService.patientView.step;
    }

    public get continueButtonText(): string {
        return this.translateContentService.patientDemographics.action.submitBtn;
    }

    public get cancelButtonText(): string {
        return this.translateContentService.patientDemographics.action.cancelBtn;
    }

    public get firstNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlFirstName,
            this.translateContentService.patientView.firstName,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientFirstName,
            true,
            this.translateContentService.errorMessages.firstNameInvalid,
            null,
            { maxLength: 35 }
        );
    }

    public get lastNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlLastName,
            this.translateContentService.patientView.lastName,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientLastName,
            true,
            this.translateContentService.errorMessages.lastNameInvalid,
            null,
            { maxLength: 35 }
        );
    }

    public get dobConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlDateOfBirth,
            this.translateContentService.patientView.dob,
            null,
            null,
            this.translateContentService.formPlaceholder.dobPlaceholder,
            true,
            this.translateContentService.errorMessages.dateInvalid,
            null,
            { isDate: true, maxLength: 10 }
        );
    }

    public get genderConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlGender,
            this.translateContentService.patientView.sex.label,
            null,
            this.translateContentService.patientView.sex.option,
            null,
            true,
            this.translateContentService.errorMessages.required,
            null,
            null,
            this.translateContentService.patientView.sex.tooltip
        );
    }

    public get addressLine1Config(): FormItem {
        return this.formCreationService.createItem(
            this.controlAddress1,
            this.translateContentService.patientView.address,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientAddressLine1,
            true,
            this.translateContentService.errorMessages.required,
            null,
            { maxLength: 35 });
    }

    public get addressLine2Config(): FormItem {
        return this.formCreationService.createItem(
            this.controlAddress2,
            this.translateContentService.patientView.addressLine2,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientAddressLine2,
            false,
            this.translateContentService.errorMessages.addressInvalid,
            null,
            { maxLength: 35 });
    }

    public get cityConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCity,
            this.translateContentService.patientView.city,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientCity,
            true,
            this.translateContentService.errorMessages.required,
            null,
            { maxLength: 35 });
    }

    public get stateConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlState,
            this.translateContentService.patientView.state.label,
            null,
            this.stateService.states.map(d => ({ displayedString: d.name, valueString: d.value })),
            this.translateContentService.patientView.dropdownPlaceholder,
            true,
            this.translateContentService.errorMessages.required);
    }

    public get zipCodeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlZipCode,
            this.translateContentService.patientView.postalCode,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientZip,
            true,
            this.translateContentService.errorMessages.zipInvalid,
            null,
            { isPostalCode: true }
        );
    }

    public get emailAddressConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlEmailAddress,
            this.translateContentService.patientView.emailAddress,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientEmail,
            null,
            this.translateContentService.errorMessages.emailInvalid);
    }

    public get primaryPhoneNumberConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPrimaryPhone,
            this.translateContentService.patientView.primaryPhone,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientPhone,
            null,
            this.translateContentService.errorMessages.phoneNumberInvalid,
            null,
            { isPhoneNumber: true });
    }


    public get primaryPhoneTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPhoneType,
            this.translateContentService.patientView.primaryContactNumber.label,
            null,
            this.translateContentService.patientView.primaryContactNumber.option,
            null,
            null,
            this.translateContentService.errorMessages.required);
    }

    
    public get okToLeaveMessageConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlOkToLeaveMessage,
            this.translateContentService.patientView.okToLeaveMessage.label,
            null,
            this.translateContentService.patientView.okToLeaveMessage.option,
            null,
            null,
            null);
    }

    public get altPhoneConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlAltPhone,
            this.translateContentService.patientView.altPrimaryPhone,
            null,
            null,
            this.translateContentService.patientView.placeholders.patientPhone,
            null,
            this.translateContentService.errorMessages.phoneNumberInvalid,
            null,
            { isPhoneNumber: true });
    }

    public get preferredNumberConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPreferredNumber,
            this.translateContentService.patientView.preferredLanguage.label,
            null,
            this.translateContentService.patientView.preferredLanguage.option,
            this.translateContentService.patientView.dropdownPlaceholder,
            null,
            null,
            null,
            null,
            this.translateContentService.patientView.preferredLanguage.tooltip);
    }

    public get altPhoneTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlAltPhoneType,
            this.translateContentService.patientView.preferredAltContactNumber.label,
            null,
            this.translateContentService.patientView.preferredAltContactNumber.option,
            null,
            null,
            this.translateContentService.errorMessages.required); 
    }

    public get altContactOrCaregiverConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlAltContactOrCaregiver,
            this.translateContentService.patientView.altContactOrCaregiver.label,
            null,
            this.translateContentService.patientView.altContactOrCaregiver.option,
            null,
            true,
            this.translateContentService.errorMessages.required,
            null,
            null,
            this.translateContentService.patientView.altContactOrCaregiver.tooltip
        );
    }

    public get preferredLanguageTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPreferredLanguage,
            this.translateContentService.patientView.preferredLanguage.label,
            null,
            this.translateContentService.patientView.preferredLanguage.option,
            this.translateContentService.patientView.dropdownPlaceholder,
            null,
            this.translateContentService.errorMessages.required,
            null,
            null,
            null)
    }

    public get otherLanguageTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlLanguageIfOther,
            this.translateContentService.patientView.preferredLanguageIfOther,
            null,
            null,
            null,
            null,
            this.translateContentService.errorMessages.required);
    }

    public get pharmacyTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPharmacy,
            this.translateContentService.patientView.preferredPharmacy.label,
            null,
            this.pharmacyService.pharmacies.map(d => ({ displayedString: d.name, valueString: d.value })),
            this.translateContentService.patientView.dropdownPlaceholder,
            null,
            this.translateContentService.errorMessages.required,
            null,
            null,
            this.translateContentService.patientView.preferredPharmacy.tooltip);
    }

    public get otherPharmacyTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlOtherPharmacy,
            this.translateContentService.patientView.preferredPharmacyIfOther,
            null,
            null,
            null,
            null,
            this.translateContentService.errorMessages.required);
    }

    public get caregiverFirstNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCaregiverFirstName,
            this.translateContentService.patientView.caregiverFirstName,
            null,
            null,
            this.translateContentService.patientView.placeholders.caregiverFirstName,
            null,
            this.translateContentService.errorMessages.firstNameInvalid,
            null,
            { maxLength: 35 }
        );
    }

    public get caregiverLastNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCaregiverLastName,
            this.translateContentService.patientView.caregiverLastName,
            null,
            null,
            this.translateContentService.patientView.placeholders.caregiverLastName,
            null,
            this.translateContentService.errorMessages.lastNameInvalid,
            null,
            { maxLength: 35 }
        );
    }

    public get caregiverEmailConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCaregiverEmail,
            this.translateContentService.patientView.caregiverEmail,
            null,
            null,
            this.translateContentService.patientView.placeholders.caregiverEmail,
            null,
            this.translateContentService.errorMessages.emailInvalid);
    }

    public get caregiverPhoneConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCaregiverPhone,
            this.translateContentService.patientView.caregiverPhone,
            null,
            null,
            this.translateContentService.patientView.placeholders.caregiverPhone,
            null,
            this.translateContentService.errorMessages.phoneNumberInvalid,
            null,
            { isPhoneNumber: true });
    }

    public get caregiverPatientConsentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCaregiverPatientConsent,
            this.translateContentService.patientView.caregiverPatientConsent.label,
            null,
            this.translateContentService.patientView.caregiverPatientConsent.option,
            null,
            null,
            null);
    }


    public get caregiverPhoneTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCaregiverPhoneType,
            this.translateContentService.patientView.caregiverPhoneType.label,
            null,
            this.translateContentService.patientView.caregiverPhoneType.option,
            null,
            null,
            this.translateContentService.errorMessages.required);
    }

    public get caregiverRelationshipToPatientConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlCaregiverRelationshipToPatient,
            this.translateContentService.patientView.caregiverRelationshipToPatient.label,
            null,
            this.translateContentService.patientView.caregiverRelationshipToPatient.option,
            this.translateContentService.patientView.dropdownPlaceholder,
            null,
            this.translateContentService.errorMessages.required,
            null,
            null,
            // this.translateContentService.patientView.preferredLanguage.tooltip);
            null)
    }

    public createGroup(): FormGroup {
        return this.patientInformationGroup = this.formCreationService.createGroup();
    }

    public addControlsToGroup(): void {
        this.formCreationService.addControl(this.patientInformationGroup, this.controlFirstName, false, [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.patientFormData.firstName || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlLastName, false, [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.patientFormData.lastName || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlGender, false, [Validators.required],
            this.workflowService.patientFormData.gender || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlDateOfBirth, false, [Validators.required],
            this.workflowService.patientFormData.dateOfBirth || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlAddress1, false, [Validators.required, Validators.pattern(Regex.ALPHA_NUMERIC)],
            this.workflowService.patientFormData.addressLine1 || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlAddress2, false, [Validators.pattern(Regex.ALPHA_NUMERIC)],
            this.workflowService.patientFormData.addressLine2 || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlCity, false, [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.patientFormData.city || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlState, false, [Validators.required],
            this.workflowService.patientFormData.stateCode || '');

        this.formCreationService.addControl(this.patientInformationGroup, this.controlZipCode, false,
            [Validators.required, Validators.pattern(Regex.ZIP_CODE)], this.workflowService.patientFormData.postalCode || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlEmailAddress, false, [Validators.pattern(Regex.EMAIL)],
            this.workflowService.patientFormData.emailAddress || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlOkToLeaveMessage, false, null ,
                this.workflowService.patientFormData.okToLeaveMessage || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlPreferredNumber, false, null,
            this.workflowService.patientFormData.preferredNumber || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlAltContactOrCaregiver, false, [Validators.required],
            this.workflowService.patientFormData.altContactOrCaregiver || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlPrimaryPhone, false, [
        Validators.pattern(Regex.PHONE_NUMBER)], this.workflowService.patientFormData.primaryPhone || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlPhoneType, false, null,
            this.workflowService.patientFormData.phoneType || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlAltPhone, false, [
        Validators.pattern(Regex.PHONE_NUMBER)], this.workflowService.patientFormData.altPhone || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlAltPhoneType, false, null,
            this.workflowService.patientFormData.altPhoneType || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlPreferredLanguage, false, null,
            this.workflowService.patientFormData.preferredLanguage || '');

        this.formCreationService.addControl(this.patientInformationGroup, this.controlLanguageIfOther, false, null,
            this.workflowService.patientFormData.languageIfOther || '');
            
        this.formCreationService.addControl(this.patientInformationGroup, this.controlPharmacy, false, null,
            this.workflowService.patientFormData.preferredPharmacy || '');

        this.formCreationService.addControl(this.patientInformationGroup, this.controlOtherPharmacy, false, [Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.patientFormData.preferredPharmacyIfOther || '');

        this.formCreationService.addControl(this.patientInformationGroup, this.controlCaregiverFirstName, false, [Validators.pattern(Regex.ALPHA_ONLY)], this.workflowService.patientFormData.caregiverFirstName || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlCaregiverLastName, false, [ Validators.pattern(Regex.ALPHA_ONLY)], this.workflowService.patientFormData.caregiverLastName || null);
        
        this.formCreationService.addControl(this.patientInformationGroup, this.controlCaregiverEmail, false, [Validators.pattern(Regex.EMAIL)], this.workflowService.patientFormData.caregiverEmail || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlCaregiverPhone, false, [Validators.pattern(Regex.PHONE_NUMBER)], this.workflowService.patientFormData.caregiverPhone || null);
        
        this.formCreationService.addControl(this.patientInformationGroup, this.controlCaregiverPhoneType, false, null, this.workflowService.patientFormData.caregiverPhoneType || null);

        this.formCreationService.addControl(this.patientInformationGroup, this.controlCaregiverRelationshipToPatient, false, null, this.workflowService.patientFormData.caregiverRelationshipToPatient || '');

        this.formCreationService.addControl(this.patientInformationGroup, this.controlCaregiverPatientConsent, false, null , this.workflowService.patientFormData.caregiverPatientConsent || null);
    }

    public touchForm() {
        this.formValidationService.markControlsAsTouched(this.patientInformationGroup, true);
    }

    public setFormData(value: any) {
        this.workflowService.patientFormData = value;
    }

    public eligibility(): Observable<EligibilityResponseModel> {
        const patientData = this.workflowService.patientFormData;
        const prescriberData = this.workflowService.prescriberFormData;
        const requestEligibility: EligibilityRequestModel = {
            nameFirst: patientData.firstName,
            nameLastOrOrganizationName: patientData.lastName,
            dob: moment(patientData.dateOfBirth).format('MM/DD/YYYY'),
            gender: patientData.gender,
            address: patientData.addressLine1,
            city: patientData.city,
            state: patientData.stateCode,
            zip: patientData.postalCode,
            providerNPI: prescriberData.npi,
            providerFirstName: prescriberData.firstName,
            providerLastName: prescriberData.lastName
        };
        this.workflowService.attemptedEligibility = true;
        const subscription = this.abvService.patientEligibility(requestEligibility);
        subscription.subscribe((responseEligibility) => {
            if (responseEligibility?.eligibilityResults && responseEligibility?.eligibilityResults?.length > 0) {
                this.workflowService.eligibilityResponseModel = responseEligibility;
                this.workflowService.failedEligibility = false;
            } else {
                this.workflowService.eligibilityResponseModel = null;
                this.workflowService.failedEligibility = true;
            }
        }, () => {
            this.workflowService.failedEligibility = true;
        });
        return subscription;
    }
}
