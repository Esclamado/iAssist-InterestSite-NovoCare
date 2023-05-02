import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from '../../../form-configuration/services/form-creation/form-creation.service';
import { WorkflowService } from '../workflow.service';

@Injectable({
    providedIn: 'root'
})
export class PrescriberInformationService {
    public prescriberInformationGroup: FormGroup;

    private controlPrescriberFirstName = 'prescriberFirstName';
    private controlPrescriberLastName = 'prescriberLastName';
    private controlPrescriberSpecialty = 'prescriberSpecialty';
    private controlPrescriberStateNumber = 'prescriberStateNumber';
    private controltaxIdNumber = 'taxIdNumber';
    private controlPrescriberNpi = 'prescriberNpi';

    public get prescriberFirstNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPrescriberFirstName,
            this.translateContentService.prescriberInformationView.prescriberFirstName,
            null,
            null,
            this.translateContentService.prescriberInformationView.placeHolderFirstName,
            true,
            this.translateContentService.errorMessages.firstNameInvalid,
            null,
            { maxLength: 35 }
        );
    }
    public get prescriberLastNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPrescriberLastName,
            this.translateContentService.prescriberInformationView.prescriberLastName,
            null,
            null,
            this.translateContentService.prescriberInformationView.placeHolderLastName,
            true,
            this.translateContentService.errorMessages.lastNameInvalid,
            null,
            { maxLength: 35 }
        );
    }
    public get prescriberSpecialtyConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPrescriberSpecialty,
            this.translateContentService.prescriberInformationView.prescriberSpecialty,
            null,
            null,
            this.translateContentService.prescriberInformationView.placeHolderPrescriberSpecialty,
            false,
            this.translateContentService.errorMessages.alphaInvalid,
            null,
            { maxLength: 35 }
        );
    }
    public get prescriberStateNumberConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPrescriberStateNumber,
            this.translateContentService.prescriberInformationView.prescriberStateNumber.label,
            null,
            null,
            this.translateContentService.prescriberInformationView.prescriberStateNumber.placeholder,
            false,
            this.translateContentService.errorMessages.numericInvalid,
            null,
            { isAlphaNumeric: true },
            this.translateContentService.prescriberInformationView.officeContactPhoneNumber.tooltip
        );
    }
    public get taxIdNumberConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controltaxIdNumber,
            this.translateContentService.prescriberInformationView.taxIdNumber,
            null,
            null,
            this.translateContentService.prescriberInformationView.placeHolderTaxIdNumber,
            true,
            this.translateContentService.errorMessages.numericInvalid,
            null,
            { isTax: true }
        );
    }

    public get prescriberNpiConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPrescriberNpi,
            this.translateContentService.prescriberInformationView.prescriberNpi,
            null,
            null,
            this.translateContentService.prescriberInformationView.placeHolderNpi,
            true,
            this.translateContentService.errorMessages.npiInvalid || this.translateContentService.errorMessages.numericInvalid,
            null,
            { isNumeric: true, maxLength: 10}
        );
    }

    public get stepContent(): any {
        return this.translateContentService.prescriberInformationView.step;
    }

    public get actionContent(): any {
        return this.translateContentService.prescriberInformationView.actions;
    }

    public get alertCannotVerify(): any {
        return this.translateContentService.prescriberInformationView.alertCannotVerify;
    }

    public get alertFBAError(): any {
        return this.translateContentService.prescriberInformationView.alertFBAError;
    }

    public get formError(): any {
      return this.translateContentService.snackbarView.formError;
    }

    constructor(
        private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService
    ) {}

    public createGroup(): FormGroup {
        return (this.prescriberInformationGroup = this.formCreationService.createGroup());
    }

    public addControlsToGroup(): void {
        this.formCreationService.addControl(
            this.prescriberInformationGroup,
            this.controlPrescriberFirstName,
            false,
            [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.prescriberInformationFormData.prescriberFirstName || null
        );
        this.formCreationService.addControl(
            this.prescriberInformationGroup,
            this.controlPrescriberLastName,
            false,
            [Validators.required, Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.prescriberInformationFormData.prescriberLastName || null
        );
        this.formCreationService.addControl(
            this.prescriberInformationGroup,
            this.controlPrescriberSpecialty,
            false,
            [Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.prescriberInformationFormData.prescriberSpecialty || null
        );
        this.formCreationService.addControl(
            this.prescriberInformationGroup,
            this.controltaxIdNumber,
            false,
            [Validators.required, Validators.pattern(Regex.TAX_ID)],
            this.workflowService.prescriberInformationFormData.taxIdNumber || null
        );
        this.formCreationService.addControl(
            this.prescriberInformationGroup,
            this.controlPrescriberStateNumber,
            false,
            [Validators.pattern(Regex.ALPHA_NUMERIC)],
            this.workflowService.prescriberInformationFormData.prescriberStateNumber || null
        );

        this.formCreationService.addControl(
            this.prescriberInformationGroup,
            this.controlPrescriberNpi,
            false,
            [Validators.required, Validators.pattern(Regex.NPI)],
            this.workflowService.prescriberInformationFormData.prescriberNpi || null
        );
    }

    public touchForm(): void {
        this.formValidationService.markControlsAsTouched(this.prescriberInformationGroup, true);
    }

    public get continueButtonText(): string {
        return this.translateContentService.prescriberInformationView.action.submitBtn;
    }

    public get cancelButtonText(): string {
        return this.translateContentService.prescriberInformationView.action.cancelBtn;
    }

    public setFormData(value: any) {
        this.workflowService.prescriberInformationFormData = value;
        if (Object.keys(this.workflowService.prescriberFormData).length == 0) {
            this.workflowService.prescriberFormData = {
                firstName: value.prescriberFirstName,
                lastName: value.prescriberLastName,
                npi: value.prescriberNpi,
                prescriberSpecialty: value.prescriberSpecialty,
                stateNumber: value.prescriberStateNumber,
                taxIdNumber: value.taxIdNumber
            }
        }
    }
}
