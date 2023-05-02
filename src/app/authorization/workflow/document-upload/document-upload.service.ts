import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { WorkflowService } from '../workflow.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentUploadService {
    public documentUploadGroup: FormGroup;
    public controlDocumentType = 'documentType';
    private controlDocumentTypeOther = 'documentTypeOther';

    constructor(
        private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService,
        private patientService: PatientService
    ) {}

    public get documentTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlDocumentType,
            this.translateContentService.documentUploadView.documentType.label,
            null,
            this.translateContentService.documentUploadView.documentType.option,
            this.translateContentService.documentUploadView.dropdownPlaceholder,
            false,
            this.translateContentService.errorMessages.required,
            null,
            null,
            this.translateContentService.documentUploadView.documentType.tooltip
        );
    }

    public get documentTypeOtherConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlDocumentTypeOther,
            this.translateContentService.documentUploadView.documentTypeOther,
            null,
            null,
            null,
            false,
            this.translateContentService.errorMessages.required,
            null,
            { maxLength: 35 }
        );
    }

    public get uploadDocumentContent(): any {
        return this.translateContentService.documentUploadView.uploadDoc;
    }

    public get stepContent(): any {
        return this.translateContentService.documentUploadView.step;
    }

    public get actionContent(): any {
        return this.translateContentService.documentUploadView.actions;
    }

    public get validationMessage(): any {
        return this.translateContentService.errorMessages;
    }

    public get continueButtonText(): string {
        return this.translateContentService.actions.submitBtn;
    }

    public get cancelButtonText(): string {
        return this.translateContentService.documentUploadView.actions.cancelBtn;
    }

    public get skipButtonText(): string {
        return this.translateContentService.documentUploadView.actions.skipBtn;
    }

    public createGroup(): FormGroup {
        return (this.documentUploadGroup = this.formCreationService.createGroup());
    }

    public touchForm(): void {
        this.formValidationService.markControlsAsTouched(this.documentUploadGroup, true);
    }

    public setFormData(value: any) {
        this.workflowService.documentUploadFormData = value;
    }

    public addControlsToGroup(): void {
      this.formCreationService.addControl(this.documentUploadGroup, this.controlDocumentType, false, null,
          this.workflowService.documentUploadFormData.documentType || '');
      this.formCreationService.addControl(this.documentUploadGroup, this.controlDocumentTypeOther, false, [ Validators.pattern(Regex.ALPHA_ONLY)],
          this.workflowService.documentUploadFormData.documentTypeOther || '');
  }
}
