import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PatientService } from "src/app/api/services/patient/patient.service";
import { FormCreationService } from "src/app/form-configuration/services/form-creation/form-creation.service";
import { FormValidationService } from "src/app/form-configuration/services/form-validation/form-validation.service";
import { FormItem } from "src/app/form-configuration/shared/models/form-item.model";
import { TranslateContentService } from "src/app/translation/services/translate-content/translate-content.service";
import { WorkflowService } from "../workflow.service";

@Injectable({
    providedIn: 'root'
})
export class PrescriberCertificationService {
    private controlprescriberCertification = 'prescriberCertification';
    private controlprescriberCertificationFullName = 'prescriberCertificationFullName';
    private controlprescriberCertificationSignature = 'prescriberCertificationSignature';

    private prescriberCertificationGroup: FormGroup;

    constructor(private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService,
        private patientService: PatientService) {

    }

    public get stepContent(): any {
        return this.translateContentService.prescriberCertificationView.step
    }

    public get agreeLabel():any{
        return this.translateContentService.prescriberCertificationView.doAgreeAuthorization.label
    }

    public get continueButtonText(): string {
        return this.translateContentService.prescriberCertificationView.action.submitBtn;
    }

    public get cancelButtonText(): string {
        return this.translateContentService.prescriberCertificationView.action.cancelBtn;
    }

    public get prescriberCertificationConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlprescriberCertification,
            this.translateContentService.prescriberCertificationView.PrescriberCertification.label,
            null,
            this.translateContentService.prescriberCertificationView.PrescriberCertification.option,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get SignatureConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlprescriberCertificationSignature,
            this.translateContentService.prescriberCertificationView.signature,
            null,
            null,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get FullNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlprescriberCertificationFullName,
            this.translateContentService.prescriberCertificationView.signature.signerFullName,
            null,
            null,
            this.translateContentService.prescriberCertificationView.signature.placeholder,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public touchForm(): void {
        this.formValidationService.markControlsAsTouched(this.prescriberCertificationGroup, true);
    }

    public createGroup(): FormGroup {
        return this.prescriberCertificationGroup = this.formCreationService.createGroup();
    }

    public addControlsToGroup(): void {
        this.formCreationService.addControl(this.prescriberCertificationGroup, this.controlprescriberCertification, false, null,
            this.workflowService.provideAttestationFormData.prescriberCertification || null);
        this.formCreationService.addControl(this.prescriberCertificationGroup, this.controlprescriberCertificationFullName, false, null, 
            this.workflowService.provideAttestationFormData.prescriberCertificationFullName);
        this.formCreationService.addControl(this.prescriberCertificationGroup, this.controlprescriberCertificationSignature, false, null,
            this.workflowService.provideAttestationFormData.prescriberCertificationSignature);
    }

    public setFormData(value: any) {
        this.workflowService.provideAttestationFormData = value;
    }
}