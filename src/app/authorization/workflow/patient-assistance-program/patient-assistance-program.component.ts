import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { WorkflowService } from '../workflow.service';
import { PatientAssistanceProgramService } from './patient-assistance-program.service';

@Component({
    selector: 'app-patient-assistance-program',
    templateUrl: './patient-assistance-program.component.html',
    styleUrls: ['./patient-assistance-program.component.scss']
})
export class PatientAssistanceProgramComponent implements OnInit {
    @Output() continueButtonText: string;
    @Output() cancelButtonText: string;

    public patientAssistanceProgramGroup: FormGroup;
    public stepContent: any;
    public patientAssistanceProgramConfig: FormItem;
    public pharmacyYesNoConfig: FormItem;
    public specialityPharmacyConfig: FormItem;
    public pharmacyIfOtherConfig: FormItem;
    public showPharmacyYesNoOption: boolean = false;
    public showOtherPharmacy: boolean = false;
    public showSpecialityPharamcy: boolean = false;
    public showContinueNote: boolean = false;

    ngOnInit(): void {
        this.setButtonText();
        this.setViewContent();
    }

    constructor(
        private patientAssistanceProgramService: PatientAssistanceProgramService,
        private workFlowService: WorkflowService,
        public translationService: TranslateContentService,
        public dialog: MatDialog,
        public cdr: ChangeDetectorRef
    ) {}

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    public cancelBtnClick(): void {
        this.dialog.open(FormCancelModalComponent);
    }

    private setViewContent() {
        this.stepContent = this.patientAssistanceProgramService.stepContent;
        this.patientAssistanceProgramGroup = this.patientAssistanceProgramService.createGroup();
        this.patientAssistanceProgramService.addControlsToGroup();
        this.patientAssistanceProgramConfig = this.patientAssistanceProgramService.patientAssistanceProgramConfig;
        this.pharmacyYesNoConfig = this.patientAssistanceProgramService.pharmacyYesNoConfig;
        this.specialityPharmacyConfig = this.patientAssistanceProgramService.specialityPharmacyTypeConfig;
        this.pharmacyIfOtherConfig = this.patientAssistanceProgramService.otherPharmacyTypeConfig;

        this.onpatientAssistanceEligibility(this.patientAssistanceProgramGroup.controls.patientAssistanceEligibility.value);
        this.onpharmacySelect(this.patientAssistanceProgramGroup.controls.pharmacyYesNo.value);
        this.showOtherPharmacyInput();
    }

    public onpatientAssistanceEligibility(value: any): void {
        const controls = [{ name: 'pharmacyYesNo' }];

        if (this.translationService.patientAssistanceProgramView.patientAssistanceProgram.option[2].valueString === value) {
            this.showContinueNote = false;
            this.showPharmacyYesNoOption = true;
            this.addRequiredValidator(controls);
        } else if (this.translationService.patientAssistanceProgramView.patientAssistanceProgram.option[3].valueString === value) {
            this.showPharmacyYesNoOption = false;
            this.showContinueNote = true;
            this.removeValidators([{ name: 'pharmacyYesNo' }, { name: 'specialtyPharmacy' }, { name: 'otherPharmacy' }]);
        } else {
            this.showContinueNote = false;
            this.showPharmacyYesNoOption = false;
            this.removeValidators([{ name: 'pharmacyYesNo' }, { name: 'specialtyPharmacy' }, { name: 'otherPharmacy' }]);
        }
        this.showSpecialityPharamcy = false;
        this.showOtherPharmacy = false;
    }

    public showOtherPharmacyInput() {
        const controls = [{ name: 'otherPharmacy' }];
        let val = this.patientAssistanceProgramGroup.controls.specialtyPharmacy.value;
        if (val === 'Other') {
            this.showOtherPharmacy = true;
            this.pharmacyIfOtherConfig.required = true;
            this.patientAssistanceProgramGroup.controls.otherPharmacy.setValidators([Validators.required]);
            this.patientAssistanceProgramGroup.controls.otherPharmacy.setValidators(Validators.pattern(Regex.ALPHA_ONLY));
            this.patientAssistanceProgramGroup.controls.otherPharmacy.updateValueAndValidity();
        } else {
            this.showOtherPharmacy = false;
            this.removeValidators(controls);
        }
    }

    public onpharmacySelect(value: any) {
        const controls = [{ name: 'specialtyPharmacy' }];
        let val = this.patientAssistanceProgramGroup.controls.pharmacyYesNo.value;
        if (val === 'Yes') {
            this.showSpecialityPharamcy = true;
            this.addRequiredValidator(controls);
        } else {
            this.showSpecialityPharamcy = false;
            this.showOtherPharmacy = false;
            this.removeValidators([{ name: 'specialtyPharmacy' }, { name: 'otherPharmacy' }]);
        }
    }

    private removeValidators(controlNameArray: Array<any>) {
        controlNameArray.forEach(element => {
            this.patientAssistanceProgramGroup.get(element.name).setValidators(null);
            this.patientAssistanceProgramGroup.get(element.name).reset(null);
            this.patientAssistanceProgramGroup.get(element.name).updateValueAndValidity();
        });
    }

    private addRequiredValidator(controlNameArray: Array<any>) {
        controlNameArray.forEach(element => {
            this.patientAssistanceProgramGroup.get(element.name).setValidators([Validators.required]);
            this.patientAssistanceProgramGroup.get(element.name).updateValueAndValidity();
        });
    }

    private setButtonText(): void {
        this.continueButtonText = this.patientAssistanceProgramService.continueButtonText;
        this.cancelButtonText = this.patientAssistanceProgramService.cancelButtonText;
    }

    public continueButtonClick(): void {
        if (this.patientAssistanceProgramGroup.invalid) {
            this.patientAssistanceProgramService.touchForm();
        } else {
            this.patientAssistanceProgramService.setFormData(this.patientAssistanceProgramGroup.value);
            this.workFlowService.navigateToNextStep();
        }
    }
}
