import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import {
    ActionTranslation,
    InsuranceInformationStaticTranslation,
    StepTranslation
} from 'src/app/translation/shared/language/translations.models';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { UploadDocumentComponent } from 'src/app/ui-components/page-addons/upload-document/upload-document.component';
import { ServiceOfferingsEnum } from '../../service-offerings.enum';
import { WorkflowService } from '../../workflow.service';
import { InsuranceControlNames } from '../insurance-control-names.enum';
import { ViewInsuranceModalComponent } from '../view-insurance-modal/view-insurance-modal.component';
import { InsuranceInformationService } from './insurance-information.service';

@Component({
    selector: 'app-insurance-information',
    templateUrl: './insurance-information.component.html',
    styleUrls: ['./insurance-information.component.scss']
})
export class InsuranceInformationComponent implements OnInit, AfterViewInit {
    @ViewChild(UploadDocumentComponent) public uploadDocument: UploadDocumentComponent;

    public stepContent: StepTranslation;
    public actionContent: ActionTranslation;
    public staticContent: InsuranceInformationStaticTranslation;
    public insuranceInformationGroup: FormGroup;
    
    public isInformationCorrectConfig: FormItem;
    public hasInsuranceConfig: FormItem;
    public wantToUploadConfig: FormItem;
    public hasSecondaryInsuranceConfig: FormItem;

    public hasInsurance : boolean;
    public disable : boolean;
    public upload = true;
    public wantToUpload = null;
    public hasSecondaryInsurance = null;

    public attemptedEligibility = false;
    public failedEligibility = false;
    public informationCorrect = null;
    state: any;

    public get nonRegisteredNPIEnrollment(): boolean {
        return this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.ENT;
    }

    constructor(
        private changeDetector: ChangeDetectorRef,
        private insuranceInformationService: InsuranceInformationService,
        private dialog: MatDialog,
        private workflowService: WorkflowService
    ) {}

    ngOnInit(): void {
        this.attemptedEligibility = this.workflowService.attemptedEligibility;
        this.failedEligibility = this.workflowService.failedEligibility;

        this.insuranceInformationGroup = this.insuranceInformationService.createGroup();
        this.insuranceInformationService.addControlsToGroup(!this.failedEligibility);
        this.setViewContent();
        this.setControlConfigs();
        if (this.failedEligibility && this.attemptedEligibility && !this.nonRegisteredNPIEnrollment) {
            this.showInsuranceErrorNotification();
            this.workflowService.attemptedEligibility = false;
            this.attemptedEligibility = false;
        }
        
        console.log("upload " + this.insuranceInformationGroup.controls.wantToUpload.value)
    }

    ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
        this.insuranceInformationService.restorePreviousValues();
    }

    public cancelBtnClick(): void {
        this.dialog.open(FormCancelModalComponent);
    }

    public continueButtonClick(): void {
        if (this.insuranceInformationGroup.invalid) {
            this.insuranceInformationService.touchForm();
        } else {
            this.insuranceInformationService.setFormData(this.insuranceInformationGroup.value);
            this.workflowService.navigateToNextStep();
        }
    }

    public disableButton(): boolean {
        return this.insuranceInformationGroup.invalid ||  this.disable ;
    }

    public isInformationCorrect($event: string): void {
        this.informationCorrect = $event === 'Y';
        if (!this.informationCorrect) {
            this.hasSecondaryInsurance = null;
            this.wantToUpload = null;
        } else {
            this.hasInsurance = false;
        }
        this.insuranceInformationService.updateInformationCorrect(this.informationCorrect);
        this.updateDetectAndValidation();
    }

    public updateHasInsurance($event: string): void {
        this.hasInsurance = $event === 'Y';
        if(!this.hasInsurance) {
            this.hasSecondaryInsurance = null;
            this.wantToUpload = null;
            this.disable = false;
            this.insuranceInformationService.updateHasInsurance(!this.hasInsurance);
        }
        this.upload = true;
        this.hasSecondaryInsurance = null;
        this.wantToUpload = null;
        this.insuranceInformationService.updateHasInsurance(this.hasInsurance);
        this.updateDetectAndValidation();
    }

    public updateWantToUpload($event: string): void {
        this.wantToUpload = $event === 'Y';
        this.upload = true;
        this.disable = true;
        if (!this.wantToUpload) {
            this.hasSecondaryInsurance = null;
            this.upload = false;
            this.disable = true;
        }
    }

    public updateHasSecondaryInsurance($event: string): void {
        this.hasSecondaryInsurance = $event === 'Y';
        this.updateDetectAndValidation();
        if(!this.hasSecondaryInsurance) {
            if(this.workflowService.uploadedDocuments.length === 0 && this.wantToUpload) {
                this.disable = true
            } else {
                this.disable = false
            }
        } else {
            this.disable = false;
        }
    }

    public showConfirmationMessage(): boolean {
        return this.insuranceInformationGroup.get(InsuranceControlNames.HAS_INSURANCE)?.value === 'N';
    }

    public showInsuranceErrorNotification(): void {
        this.workflowService.openSnackBar(this.staticContent.noInsuranceError, 'snackbar-warning', 'Ok');
    }

    public viewInsuranceInfo(): void {
        this.dialog.open(ViewInsuranceModalComponent);
    }

    private updateDetectAndValidation(): void {
        this.changeDetector.detectChanges();
        setTimeout(() => {
            this.insuranceInformationService.updateValidation();
        }, 0);
    }

    private setViewContent(): void {
        this.stepContent = this.insuranceInformationService.stepContent;
        this.actionContent = this.insuranceInformationService.actionContent;
        this.staticContent = this.insuranceInformationService.staticContent;
        this.wantToUpload = this.wantToUpload?.value === null;
        
        this.hasInsurance = this.insuranceInformationGroup?.controls?.hasInsurance?.value === 'Y' ? true : false;
        this.wantToUpload = this.insuranceInformationGroup?.controls?.wantToUpload?.value === 'Y' ? true : false;
        if (this.insuranceInformationGroup.controls.hasSecondaryInsurance) {
            this.hasSecondaryInsurance = this.insuranceInformationGroup.controls.hasSecondaryInsurance.value === 'Y' ? true : false;
        }
    }

    private setControlConfigs(): void {
        this.isInformationCorrectConfig = this.insuranceInformationService.isInformationCorrectConfig;
        this.hasInsuranceConfig = this.insuranceInformationService.hasInsuranceConfig;
        this.wantToUploadConfig = this.insuranceInformationService.wantToUploadConfig;
        this.hasSecondaryInsuranceConfig = this.insuranceInformationService.hasSecondaryInsuranceConfig;
    }
}
