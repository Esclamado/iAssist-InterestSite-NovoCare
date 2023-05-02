import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { InsuranceInformationFormFormData } from 'src/app/api/shared/models/insurance-information-data.model';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import {
    InsuranceInformationFormTranslation,
    InsuranceInformationFormViewTranslation
} from 'src/app/translation/shared/language/translations.models';
import { WorkflowService } from '../../workflow.service';
import { InsuranceFormControlNames } from '../insurance-control-names.enum';

@Injectable({
    providedIn: 'root'
})
export class InsuranceFormService {
    public insuranceInformationGroups = new Map<string, FormGroup>();

    private translateContent: InsuranceInformationFormTranslation = null;

    private controlInsurancePlanType = InsuranceFormControlNames.INSURANCE_PLAN_TYPE;
    private controlPBMName = InsuranceFormControlNames.PBM_NAME;
    private controlPBMPhoneNumber = InsuranceFormControlNames.PBM_PHONE_NUMBER;
    private controlPolicyholderIdNumber = InsuranceFormControlNames.POLICYHOLDER_ID_NUMBER;
    private controlGroupNumber = InsuranceFormControlNames.GROUP_NUMBER;
    private controlBinNumber = InsuranceFormControlNames.BIN_NUMBER;
    private controlPCNNumber = InsuranceFormControlNames.PCN_NUMBER;
    private controlPolicyholderRelationshipToPatient = InsuranceFormControlNames.POLICYHOLDER_RELATIONSHIP_TO_PATIENT;
    private controlPolicyholderDateOfBirth = InsuranceFormControlNames.POLICYHOLDER_DATE_OF_BIRTH;
    private controlPolicyholderFirstName = InsuranceFormControlNames.POLICYHOLDER_FIRST_NAME;
    private controlPolicyholderLastName = InsuranceFormControlNames.POLICYHOLDER_LAST_NAME;

    public get viewContent(): InsuranceInformationFormViewTranslation {
        return this.translateContent.view;
    }

    public get insurancePlanType(): FormItem {
        return this.formCreationService.createItem(
            this.controlInsurancePlanType,
            this.translateContent.insurancePlanType.label,
            null,
            this.translateContent.insurancePlanType.option,
            this.translateContent.insurancePlanType.dropdownPlaceHolder,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get pbmName(): FormItem {
        return this.formCreationService.createItem(
            this.controlPBMName,
            this.translateContent.pbmName,
            null,
            null,
            this.translateContent.placeholderPbmName,
            true,
            this.translateContentService.errorMessages.required,
            null,
            { maxLength: 35 }
        );
    }

    public get pbmPhoneNumber(): FormItem {
        return this.formCreationService.createItem(
            this.controlPBMPhoneNumber,
            this.translateContent.pbmPhoneNumber,
            null,
            null,
            this.translateContent.placeholderPbmPhoneNumber,
            false,
            this.translateContentService.errorMessages.phoneNumberInvalid,
            null,
            { isPhoneNumber: true }
        );
    }

    public get policyholderIdNumber(): FormItem {
        return this.formCreationService.createItem(
            this.controlPolicyholderIdNumber,
            this.translateContent.policyIdNumber,
            null,
            null,
            this.translateContent.placeholderPolicyIDNumber,
            true,
            this.translateContentService.errorMessages.required,
            null,
            { maxLength: 35 }
        );
    }

    public get groupNumber(): FormItem {
        return this.formCreationService.createItem(
            this.controlGroupNumber, 
            this.translateContent.groupNumber, 
            null, 
            null, 
            this.translateContent.placeholderGroupNumber, 
            false, 
            this.translateContentService.errorMessages.groupNumberInvalid, 
            null, 
            { maxLength: 35 });
    }

    public get policyholderRelationshipToPatient(): FormItem {
        return this.formCreationService.createItem(
          this.controlPolicyholderRelationshipToPatient,
          this.translateContent.policyholderRelationshipToPatient.label,
          null,
          this.translateContent.policyholderRelationshipToPatient.option,
          this.translateContent.policyholderRelationshipToPatient.dropdownPlaceHolder,
          true,
          this.translateContentService.errorMessages.required);
    }

    public get policyholderDateOfBirth(): FormItem {
        return this.formCreationService.createItem(
            this.controlPolicyholderDateOfBirth,
            this.translateContent.policyholderDateOfBirth,
            null,
            null,
            this.translateContentService.formPlaceholder.dobPlaceholder,
            true,
            this.translateContentService.errorMessages.dateInvalid,
            null,
            { isDate: true, maxLength: 10 }
        );
    }

    public get policyholderFirstName(): FormItem {
        return this.formCreationService.createItem(
            this.controlPolicyholderFirstName,
            this.translateContent.policyholderFirstName,
            null,
            null,
            this.translateContent.placeholderPolicyholderFirstName,
            true,
            this.translateContentService.errorMessages.firstNameInvalid,
            null,
            { maxLength: 35 }
        );
    }

    public get policyholderLastName(): FormItem {
        return this.formCreationService.createItem(
            this.controlPolicyholderLastName,
            this.translateContent.policyholderLastName,
            null,
            null,
            this.translateContent.placeholderPolicyholderLastName,
            true,
            this.translateContentService.errorMessages.lastNameInvalid,
            null,
            { maxLength: 35 }
        );
    }

    public get binNumber(): FormItem {
        return this.formCreationService.createItem(this.controlBinNumber, this.translateContent.binNumber, null, null, null, false, this.translateContentService.errorMessages.binNumberInvalid, null, { maxLength: 35 });
    }

    public get pcnNumber(): FormItem {
        return this.formCreationService.createItem(this.controlPCNNumber, this.translateContent.pcnNumber, null, null, null, false, this.translateContentService.errorMessages.pcnNumberInvalid, null, { maxLength: 35 });
    }
    constructor(
        private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService
    ) {
        this.translateContent = this.translateContentService.insuranceInformationView.form;
    }

    public createGroup(id: string, parent: FormGroup): FormGroup {
        this.insuranceInformationGroups.set(id, this.formCreationService.createGroup());
        this.formCreationService.addControl(parent, 'insuranceForm' + id, false, null, {}, this.insuranceInformationGroups.get(id));
        return this.insuranceInformationGroups.get(id);
    }

    public removeGroup(id: string, parent: FormGroup): void {
      parent.removeControl('insuranceForm' + id);
      this.insuranceInformationGroups.delete(id);
    }

    public addControlsToGroup(id: string): void {
        const formGroup = this.insuranceInformationGroups.get(id);
        const formData = this.workflowService.insuranceInformationFormData['insuranceForm' + id] as InsuranceInformationFormFormData;

        if (!formGroup) {
            console.error('Attempted to add controls to nonexistent id: ' + id);
            return;
        }

        this.formCreationService.addControl(
            formGroup,
            this.controlInsurancePlanType,
            false,
            [Validators.required],
            formData?.insurancePlanType || null
        );

        this.formCreationService.addControl(
            formGroup, 
            this.controlPBMName, 
            false, 
            [Validators.required, Validators.pattern(Regex.ALPHA_NUMERIC)], 
            formData?.pbmName || null);

        this.formCreationService.addControl(
            formGroup,
            this.controlPBMPhoneNumber,
            false,
            [Validators.pattern(Regex.PHONE_NUMBER)],
            formData?.pbmPhoneNumber || null
        );

        this.formCreationService.addControl(
            formGroup,
            this.controlPolicyholderIdNumber,
            false,
            [Validators.required, Validators.pattern(Regex.ALPHA_NUMERIC)],
            formData?.policyholderIdNumber || null
        );

        this.formCreationService.addControl(
            formGroup, 
            this.controlGroupNumber, 
            false, 
            [Validators.pattern(Regex.ALPHA_NUMERIC)], 
            formData?.groupNumber || null);

        this.formCreationService.addControl(
            formGroup, 
            this.controlBinNumber, 
            false, 
            [Validators.pattern(Regex.ALPHA_NUMERIC)], 
            formData?.binNumber || null);

        this.formCreationService.addControl(
            formGroup, 
            this.controlPCNNumber, 
            false, 
            [Validators.pattern(Regex.ALPHA_NUMERIC)], 
            formData?.pcnNumber || null);

        this.formCreationService.addControl(
            formGroup,
            this.controlPolicyholderRelationshipToPatient,
            false,
            [Validators.required],
            formData?.policyholderRelationshipToPatient || null
        );

        this.formCreationService.addControl(
            formGroup,
            this.controlPolicyholderDateOfBirth,
            false,
            [Validators.required],
            formData?.policyholderDateOfBirth || this.workflowService.patientFormData?.dateOfBirth || null
        );

        this.formCreationService.addControl(
            formGroup,
            this.controlPolicyholderFirstName,
            false,
            [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
            formData?.policyholderFirstName || this.workflowService.patientFormData?.firstName || null
        );

        this.formCreationService.addControl(
            formGroup, 
            this.controlPolicyholderLastName, 
            false, 
            [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)], 
            formData?.policyholderLastName || this.workflowService.patientFormData?.lastName || null
        );
    }

    public touchForm(id: string) {
        this.formValidationService.markControlsAsTouched(this.insuranceInformationGroups[id], true);
    }
}
