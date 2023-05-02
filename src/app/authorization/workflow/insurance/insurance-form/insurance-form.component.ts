import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { InsuranceInformationFormViewTranslation } from 'src/app/translation/shared/language/translations.models';
import { WorkflowService } from '../../workflow.service';
import { InsuranceFormControlNames } from '../insurance-control-names.enum';
import { InsuranceFormService } from './insurance-form.service';

@Component({
    selector: 'app-insurance-form',
    templateUrl: './insurance-form.component.html',
    styleUrls: ['./insurance-form.component.scss']
})
export class InsuranceFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public idName = '';
    @Input() public parentFormGroup: FormGroup;

    public insuranceFormGroup: FormGroup;

    public viewContent: InsuranceInformationFormViewTranslation;

    public insurancePlanType: FormItem;
    public pbmName: FormItem;
    public pbmPhoneNumber: FormItem;
    public policyholderIdNumber: FormItem;
    public groupNumber: FormItem;
    public binNumber: FormItem;
    public pcnNumber: FormItem;
    public policyholderRelationshipToPatient: FormItem;
    public policyholderDateOfBirth: FormItem;
    public policyholderFirstName: FormItem;
    public policyholderLastName: FormItem;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private insuranceFormService: InsuranceFormService,
        private workflowService: WorkflowService
    ) {}

    ngOnInit(): void {
        this.insuranceFormGroup = this.insuranceFormService.createGroup(this.idName, this.parentFormGroup);
        this.insuranceFormService.addControlsToGroup(this.idName);
        this.setViewConfigs();
        this.setControlConfigs();
    }

    ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
    }

    ngOnDestroy(): void {
        this.insuranceFormService.removeGroup(this.idName, this.parentFormGroup);
    }

    private setViewConfigs(): void {
        this.viewContent = this.insuranceFormService.viewContent;
    }

    private setControlConfigs(): void {
        this.insurancePlanType = this.insuranceFormService.insurancePlanType;
        this.pbmName = this.insuranceFormService.pbmName;
        this.pbmPhoneNumber = this.insuranceFormService.pbmPhoneNumber;
        this.policyholderIdNumber = this.insuranceFormService.policyholderIdNumber;
        this.groupNumber = this.insuranceFormService.groupNumber;
        this.binNumber = this.insuranceFormService.binNumber;
        this.pcnNumber = this.insuranceFormService.pcnNumber;
        this.policyholderRelationshipToPatient = this.insuranceFormService.policyholderRelationshipToPatient;
        this.policyholderDateOfBirth = this.insuranceFormService.policyholderDateOfBirth;
        this.policyholderFirstName = this.insuranceFormService.policyholderFirstName;
        this.policyholderLastName = this.insuranceFormService.policyholderLastName;
    }
}
