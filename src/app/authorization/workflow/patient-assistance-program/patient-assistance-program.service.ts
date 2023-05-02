import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { Regex } from "src/app/api/shared/constants/regex.constant";
import { FormCreationService } from "src/app/form-configuration/services/form-creation/form-creation.service";
import { FormValidationService } from "src/app/form-configuration/services/form-validation/form-validation.service";
import { FormItem } from "src/app/form-configuration/shared/models/form-item.model";
import { PharmacyService } from "src/app/lookup/pharmacy/pharmacy.service";
import { TranslateContentService } from "src/app/translation/services/translate-content/translate-content.service";
import { WorkflowService } from "../workflow.service";

@Injectable({
    providedIn: 'root'
})
export class PatientAssistanceProgramService {
    private controlPatientAssistanceProgram = 'patientAssistanceEligibility';
    private controlPharmacyYesNo= 'pharmacyYesNo';
    private controlSpecialtyPharmacy = 'specialtyPharmacy';
    private controlOtherPharmacy = 'otherPharmacy';
    

    private patientAssistanceProgramGroup: FormGroup;

    constructor(private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService,
        private pharmacyService: PharmacyService) {

    }

    public get stepContent(): any {
        return this.translateContentService.patientAssistanceProgramView.step
    }

    public get continueButtonText(): string {
        return this.translateContentService.patientAssistanceProgramView.action.submitBtn;
    }

    public get cancelButtonText(): string {
        return this.translateContentService.patientAssistanceProgramView.action.cancelBtn;
    }

    public get patientAssistanceProgramConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPatientAssistanceProgram,
            this.translateContentService.patientAssistanceProgramView.patientAssistanceProgram.label,
            null,
            this.translateContentService.patientAssistanceProgramView.patientAssistanceProgram.option,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get pharmacyYesNoConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPharmacyYesNo,
            this.translateContentService.patientAssistanceProgramView.pharmacyYesNo.label,
            null,
            this.translateContentService.patientAssistanceProgramView.pharmacyYesNo.option,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get specialityPharmacyTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlSpecialtyPharmacy,
            this.translateContentService.patientAssistanceProgramView.specialityPharmacy.label,
            null,
            this.pharmacyService.specialtyPharmacies.map(d => ({ displayedString: d.name, valueString: d.value })),
            this.translateContentService.patientAssistanceProgramView.dropdownPlaceholder,
            true,
            this.translateContentService.errorMessages.required,
            null,
            null,
            null);
    }

    public get otherPharmacyTypeConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlOtherPharmacy,
            this.translateContentService.patientAssistanceProgramView.pharmacyIfOther,
            null,
            null,
            null,
            null,
            this.translateContentService.errorMessages.required);
    }

    public touchForm(): void {
        this.formValidationService.markControlsAsTouched(this.patientAssistanceProgramGroup, true);
    }

    public createGroup(): FormGroup {
        return this.patientAssistanceProgramGroup = this.formCreationService.createGroup();
    }

    public addControlsToGroup(): void {
        this.formCreationService.addControl(this.patientAssistanceProgramGroup, this.controlPatientAssistanceProgram, false, [Validators.required],
            this.workflowService.patientAssistanceProgramFormData.patientAssistanceEligibility || null);
        this.formCreationService.addControl(this.patientAssistanceProgramGroup, this.controlPharmacyYesNo, false, null,
                this.workflowService.patientAssistanceProgramFormData.pharmacyYesNo || null);
        this.formCreationService.addControl(this.patientAssistanceProgramGroup, this.controlSpecialtyPharmacy, false, null,
            this.workflowService.patientAssistanceProgramFormData.specialtyPharmacy || '');
        this.formCreationService.addControl(this.patientAssistanceProgramGroup, this.controlOtherPharmacy, false, [Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.patientAssistanceProgramFormData.otherPharmacy || '');
    }

    public setFormData(value: any) {
        this.workflowService.patientAssistanceProgramFormData = value;
    }
}