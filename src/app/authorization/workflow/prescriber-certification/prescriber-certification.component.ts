import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DocumentService } from 'src/app/api/services/document/document.service';
import { FulfillmentService } from 'src/app/api/services/fulfillment/fulfillment.service';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { FactIntakeResponse } from 'src/app/api/shared/models/fact-intake/fact-intake-response.model';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { FormNoModalComponent } from 'src/app/ui-components/form-controls/form-no-modal/form-no-modal.component';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';
import { PrescriberCertificationService } from './prescriber-certification.service';

@Component({
    selector: 'app-prescriber-certification',
    templateUrl: './prescriber-certification.component.html',
    styleUrls: ['./prescriber-certification.component.scss']
})
export class PrescriberCertificationComponent implements OnInit {
    @Output() continueButtonText: string;
    @Output() cancelButtonText: string;

    public prescriberCertificationGroup: FormGroup;
    public stepContent: any;
    public prescriberCertificationConfig: FormItem;
    public prescriberCertificationFullNameConfig: FormItem;
    public prescriberCertificationSignatureConfig: FormItem;
    public showPrescriberCertification: boolean;
    public diableContinueonModalNoAnswer: boolean = true;
    private agreementDialog: MatDialogRef<FormNoModalComponent>;
    public fullName = '';
    public isSubmitting: boolean;
    public agreeLabel: string;

    ngOnInit(): void {
        this.setButtonText();
        this.setViewContent();
    }

    constructor(
        private prescriberCertificationService: PrescriberCertificationService,
        private workFlowService: WorkflowService,
        public translationService: TranslateContentService,
        private patientService: PatientService,
        private documentService: DocumentService,
        private fulfillmentService: FulfillmentService,
        public dialog: MatDialog,
        public cdr: ChangeDetectorRef
    ) { }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    public onFullNameValueChange(value: any): void {
        this.fullName = value;
    }

    public onAgreeChange(e) {
        if (e.target.checked) {
            this.prescriberCertificationGroup.controls.prescriberCertification.setValue('Y')
        } else {
            this.prescriberCertificationGroup.controls.prescriberCertification.setValue(null)
        }
    }

    public cancelBtnClick(): void {
        this.dialog.open(FormCancelModalComponent);
    }

    private setViewContent() {
        this.stepContent = this.prescriberCertificationService.stepContent;
        this.agreeLabel = this.prescriberCertificationService.agreeLabel;
        this.prescriberCertificationGroup = this.prescriberCertificationService.createGroup();
        this.prescriberCertificationService.addControlsToGroup();
        this.prescriberCertificationConfig = this.prescriberCertificationService.prescriberCertificationConfig;
        this.prescriberCertificationFullNameConfig = this.prescriberCertificationService.FullNameConfig;
        this.prescriberCertificationSignatureConfig = this.prescriberCertificationService.SignatureConfig;
    }

    private setButtonText(): void {
        this.continueButtonText = this.prescriberCertificationService.continueButtonText;
        this.cancelButtonText = this.prescriberCertificationService.cancelButtonText;
    }

    public continueButtonClick(): void {
        this.prescriberCertificationService.setFormData(this.prescriberCertificationGroup.value)
        this.isSubmitting = true;
        this.patientService.generateDocuments()
            .pipe(switchMap((documentIds: string[]) => {
                this.workFlowService.enrollmentDocumentId = documentIds.shift();
                return this.patientService.saveToTransactional();
            }))
            .pipe(switchMap((res: FactIntakeResponse) => {
                this.workFlowService.transactionGroupId = res.clientTransactionGroupId;
                this.workFlowService.patientId = res.patientId;
                return this.documentService.uploadAllDocuments(res.clientTransactionGroupId);
            }))
            .pipe(switchMap((uploadedDocumentIds: string[]) => {
                this.workFlowService.uploadedDocumentIds = uploadedDocumentIds;
                return this.patientService.saveToTransactional();
            }))
            .pipe(switchMap(() => {
                return this.fulfillmentService.submitFulfillment(this.workFlowService.transactionGroupId);
            }))
            .subscribe(() => {
                this.isSubmitting = false;
                this.workFlowService.navigateToNextStep();
            });
    }
}
