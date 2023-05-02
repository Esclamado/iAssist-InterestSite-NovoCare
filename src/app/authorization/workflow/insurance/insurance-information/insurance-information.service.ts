import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import {
    ActionTranslation,
    InsuranceInformationStaticTranslation,
    InsuranceInformationTranslation,
    StepTranslation
} from 'src/app/translation/shared/language/translations.models';
import { WorkflowService } from '../../workflow.service';
import { InsuranceControlNames } from '../insurance-control-names.enum';

@Injectable({
    providedIn: 'root'
})
export class InsuranceInformationService {
    public insuranceInformationGroup: FormGroup;

    private controlIsInformationCorrect = InsuranceControlNames.IS_INFORMATION_CORRECT;
    private controlHasInsurance = InsuranceControlNames.HAS_INSURANCE;
    private controlWantToUpload = InsuranceControlNames.WANT_TO_UPLOAD;
    private controlHasSecondaryInsurance = InsuranceControlNames.HAS_SECONDARY_INSURANCE;

    public get stepContent(): StepTranslation {
        return this.translateContent.step;
    }

    public get actionContent(): ActionTranslation {
        return this.translateContent.actions;
    }

    public get staticContent(): InsuranceInformationStaticTranslation {
        return this.translateContent.static;
    }

    public get isInformationCorrectConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlIsInformationCorrect,
            this.translateContent.isInformationCorrect.label,
            null,
            this.translateContent.isInformationCorrect.option,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get hasInsuranceConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlHasInsurance,
            this.translateContent.hasInsurance.label,
            null,
            this.translateContent.hasInsurance.option,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get wantToUploadConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlWantToUpload,
            this.translateContent.wantToUpload.label,
            null,
            this.translateContent.wantToUpload.option,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get hasSecondaryInsuranceConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlHasSecondaryInsurance,
            this.translateContent.hasSecondaryInsurance.label,
            null,
            this.translateContent.hasSecondaryInsurance.option,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    private translateContent: InsuranceInformationTranslation = null;

    constructor(
        private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService
    ) {
        this.translateContent = this.translateContentService.insuranceInformationView;
    }

    public createGroup(): FormGroup {
        return (this.insuranceInformationGroup = this.formCreationService.createGroup());
    }

    public addControlsToGroup(hasEligibility: boolean): void {
        if (hasEligibility) {
            this.formCreationService.addControl(
                this.insuranceInformationGroup,
                this.controlIsInformationCorrect,
                false,
                null,
                this.workflowService.insuranceInformationFormData.isInformationCorrect || null
            );
        } else {
            this.formCreationService.addControl(
                this.insuranceInformationGroup,
                this.controlHasInsurance,
                false,
                null,
                this.workflowService.insuranceInformationFormData.hasInsurance || null
            );
            this.formCreationService.addControl(
                this.insuranceInformationGroup,
                this.controlWantToUpload,
                false,
                null,
                this.workflowService.insuranceInformationFormData.wantToUpload || null
            );
            this.formCreationService.addControl(
              this.insuranceInformationGroup,
              this.controlHasSecondaryInsurance,
              false,
              null,
              this.workflowService.insuranceInformationFormData.hasSecondaryInsurance || null
          );
        }
    }

    public touchForm(): void {
        this.formValidationService.markControlsAsTouched(this.insuranceInformationGroup, true);
    }

    public updateValidation(): void {
        this.insuranceInformationGroup.updateValueAndValidity();
    }

    public updateInformationCorrect(informationCorrect: boolean) {
        if (!informationCorrect) {
            this.formCreationService.addControl(
                this.insuranceInformationGroup,
                this.controlHasInsurance,
                false,
                null,
                this.workflowService.insuranceInformationFormData.hasInsurance || null
            );
            if (this.insuranceInformationGroup.controls[this.controlHasSecondaryInsurance]) {
                this.insuranceInformationGroup.removeControl(this.controlHasSecondaryInsurance);
            }
        } else {
            this.formCreationService.addControl(
                this.insuranceInformationGroup,
                this.controlHasSecondaryInsurance,
                false,
                null,
                this.workflowService.insuranceInformationFormData.hasSecondaryInsurance || null
            );
            if (this.insuranceInformationGroup.controls[this.controlHasInsurance]) {
                this.insuranceInformationGroup.removeControl(this.controlHasInsurance);
            }
        }
    }

    public updateHasInsurance(hasInsurance: boolean): void {
        if (!hasInsurance) {
            this.insuranceInformationGroup.removeControl(this.controlHasSecondaryInsurance);
            this.insuranceInformationGroup.removeControl(this.controlWantToUpload);
        } else {
            this.formCreationService.addControl(
                this.insuranceInformationGroup,
                this.controlHasSecondaryInsurance,
                false,
                null,
                this.workflowService.insuranceInformationFormData.hasSecondaryInsurance || null
            );
            this.formCreationService.addControl(
                this.insuranceInformationGroup,
                this.controlWantToUpload,
                false,
                null,
                this.workflowService.insuranceInformationFormData.wantToUpload || null
            );
        }
    }

    public setFormData(value: any) {
        this.workflowService.insuranceInformationFormData = value;
    }

    public restorePreviousValues(): void {
        this.formCreationService.restoreForm(this.insuranceInformationGroup, this.workflowService.insuranceInformationFormData);
      }
}
