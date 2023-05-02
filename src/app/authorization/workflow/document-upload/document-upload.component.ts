import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { DocumentService } from 'src/app/api/services/document/document.service';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FactIntakeResponse } from 'src/app/api/shared/models/fact-intake/fact-intake-response.model';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { UploadDocumentComponent } from 'src/app/ui-components/page-addons/upload-document/upload-document.component';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';
import { FulfillmentService } from 'src/app/api/services/fulfillment/fulfillment.service';
import { DocumentUploadService } from './document-upload.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';

@Component({
    selector: 'app-document-upload',
    templateUrl: './document-upload.component.html',
    styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
    @Output() continueButtonText: string;
    @Output() cancelButtonText: string;
    @Output() skipButtonText: string;

    @ViewChild(UploadDocumentComponent) uploadDocument: UploadDocumentComponent;

    public documentUploadGroup: FormGroup;
    public stepContent: any;
    public actionContent: any;
    public validationMessage: any;
    public uploadDocumentContent: any;
    public isSubmitting: boolean;
    public documentTypeConfig: FormItem;
    public documentTypeOtherConfig: FormItem;
    public showOtherDocument: boolean = false;
    public displayRestrictionsError: boolean = false;

    public get uploadedDocuments(): boolean {
        return this.workflowService.uploadedDocuments.length === 0 ? true : false;
    }

    constructor(private workflowService: WorkflowService,
                private documentUploadService: DocumentUploadService,
                private documentService: DocumentService,
                private patientService: PatientService,
                private fulfillmentService: FulfillmentService,
                public dialog: MatDialog,
                public translateService: TranslateContentService) {}

    ngOnInit(): void {
        this.documentUploadGroup = this.documentUploadService.createGroup();
        this.documentUploadService.addControlsToGroup();
        this.setControlConfigs();
        this.setViewContent();
        this.setButtonText();
    }

    public showOtherDocumentInput() {
        this.documentUploadService.touchForm();
        let val = this.documentUploadGroup.get(this.documentUploadService.controlDocumentType).value;
        if (val === 'Other') {
            this.showOtherDocument = true;
            this.documentUploadGroup.controls.documentTypeOther.setValidators([Validators.required]);
            this.documentUploadGroup.controls.documentTypeOther.updateValueAndValidity();
        } else {
            this.showOtherDocument = false;
            this.documentUploadGroup.controls.documentTypeOther.setValidators(null);
            this.documentUploadGroup.controls.documentTypeOther.reset(null);
            this.documentUploadGroup.controls.documentTypeOther.setValidators(Validators.pattern(Regex.ALPHA_ONLY));
            this.documentUploadGroup.controls.documentTypeOther.updateValueAndValidity();
        }
    }

    public isUploadDocumentationServiceOffering() {
        if (this.workflowService.getSelectedOffering() == ServiceOfferingsEnum.UploadDocumentation) {
            return true
        }
        else {
            return false
        }
    }

    public setViewContent(): void {
        this.stepContent = this.documentUploadService.stepContent;
        this.actionContent = this.documentUploadService.actionContent;
        this.validationMessage = this.documentUploadService.validationMessage;
    }

    public setControlConfigs(): void {
        this.uploadDocumentContent = this.documentUploadService.uploadDocumentContent;
        this.documentTypeConfig = this.documentUploadService.documentTypeConfig;
        this.documentTypeOtherConfig = this.documentUploadService.documentTypeOtherConfig;
    }

    private setButtonText(): void {
        this.continueButtonText = this.documentUploadService.continueButtonText;
        this.cancelButtonText = this.documentUploadService.cancelButtonText;
        this.skipButtonText = this.documentUploadService.skipButtonText;
    }

    public cancelBtnClick(): void {
        if (this.displayRestrictionsError == true) {
            this.dialog.open(FormCancelModalComponent);
        }
        else {
            this.workflowService.uploadedDocuments = []
            this.workflowService.navigateToNextStep()
        }
    }

    public documentFile(event: any): void{
        this.displayRestrictionsError = event;
    }

    public continueBtnClick(): void {
        if (this.documentUploadGroup.valid && !this.workflowService.isLastStep()) {
            this.isSubmitting = true;
            this.patientService.generateDocuments()
            .pipe(switchMap((documentIds: string[]) => {
                    this.workflowService.patientAuthorizationDocumentId = documentIds.shift();
                    this.workflowService.enrollmentDocumentId = documentIds.shift();
                this.workflowService.submissionPacketId = documentIds.shift();

                return this.patientService.saveToTransactional();
            }))
            .subscribe(() => {
                this.isSubmitting = false;
                this.workflowService.navigateToNextStep();
            });
        }
        else if (this.documentUploadGroup.valid && this.workflowService.isLastStep()) {
           this.saveData()
        } else {
            this.documentUploadService.touchForm();
        }
    }

    public saveData() {
        this.isSubmitting = true;
        this.patientService.generateDocuments()
        .pipe(switchMap((documentIds: string[]) => {
            this.workflowService.enrollmentDocumentId = documentIds.shift();
            this.workflowService.patientAuthorizationDocumentId = documentIds.shift();
            return this.patientService.saveToTransactional();
        }))
        .pipe(switchMap((res: FactIntakeResponse) => {
            this.workflowService.transactionGroupId = res.clientTransactionGroupId;
            this.workflowService.patientId = res.patientId;
            return this.documentService.uploadAllDocuments(res.clientTransactionGroupId);
          }))
        .pipe(switchMap((uploadedDocumentIds: string[]) => {
            this.workflowService.uploadedDocumentIds = uploadedDocumentIds;
            return this.patientService.saveToTransactional();
        }))
        .pipe(switchMap(() => {
          return this.patientService.faxDocumentForm(this.workflowService.transactionGroupId);
        }))
        // TODO:
        // .pipe(switchMap(() => {
        //     return this.fulfillmentService.submitFulfillment(this.workflowService.transactionGroupId);
        // }))
        .subscribe(() => {
            this.isSubmitting = false;
            this.workflowService.navigateToNextStep();
        });
    }
}
