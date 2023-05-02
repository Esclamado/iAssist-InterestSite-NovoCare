import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { PrescriberResponseData } from 'src/app/api/shared/models/prescriber-form-data.model';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { SnackbarIconComponent } from '../../../../app/api/shared/component/snackbar-icon.component';
import { DocumentFile } from '../../../../app/api/shared/models/documents/document-file.model';
import { TranslateContentService } from '../../../../app/translation/services/translate-content/translate-content.service';
import { ApplicationConfig } from '../../../api/shared/models/application-config.model';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';
import { ConfirmationService } from './confirmation.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy, AfterViewInit {
    private transactionalDocumentRoute: string;
    private _unsubscribe = new Subject<void>();

    public stepContent: any;
    public pageFullyLoaded: boolean;
    public header: string;
    public description: string;
    public registerLabel: string;
    public patientCoverageLabel: string;
    public assistanceLabel: string;
    public footer: string;
    public downloadLabel: string;
    public enrollment: string;
    public priorAuthorization: string;
    public patientAuthorizationLabel: string;
    public downloadBtnLabel: string;

    public enrollmentDocId: string;
    public patientAuthorizationId: string;
    public priorAuthDocId: string;
    public uploadedDocuments: DocumentFile[];
    public iAssistLiteRegisterLink: string;
    private _npi: string;
    private _emailAddress: string;
    private _serviceToken: string;
    private _prescriberId: string;
    private _prescriberFormData: PrescriberResponseData;
    private _enrollmentFormName: string;
    private _patientAuthorizationFormName: string;
    public homeLinkUrl;

    selectedAll: boolean;
    public documentForm: FormGroup;
    public enrollmentConfig: FormItem;
    assetScreeningQuestionnaireDocName: any;

    constructor(
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
        public translationService: TranslateContentService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService,
        private snackBar: MatSnackBar,
        private confirmationService: ConfirmationService,
        private formService: FormCreationService,
        private patientService: PatientService
    ) {
        this.transactionalDocumentRoute = `${applicationConfig.transactionalApiBaseAddress}document`;
        if (this.workflowService.externalServiceToken) {
            this.iAssistLiteRegisterLink = `${applicationConfig.iAssistLiteRegistrationAddress}register?external-services-token=${this.workflowService.externalServiceToken}`;
        }
    }

    ngOnInit() {
        this.documentForm = this.formService.createGroup();
        this.subscribeWorkflowLanguage();
        this.setupDocumentForm();
        this.workflowService.reset();
    }

    ngAfterViewInit(): void {
        this.pageFullyLoaded = true;
        this.setPropertiesForOtherPatientCoverage();
    }

    setPropertiesForOtherPatientCoverage() {
        this._npi = this.workflowService.npi;
        this._emailAddress = this.workflowService.emailAddress;
        this._serviceToken = this.workflowService.externalServiceToken;
        this._prescriberId = this.workflowService.prescriberId;
        this._prescriberFormData = this.workflowService.prescriberFormData;
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
    private setupDocumentForm() {
        if (this.patientAuthorizationId) {
            this.formService.addControl(this.documentForm, 'patientAuthorization', false, null);
        }

    }

    private subscribeWorkflowLanguage(): void {
        this.workflowService.subscribeWorkflowLanguage().subscribe(res => {
            this.setViewContent();
        });
    }

    public get consentDocumentUrl(): string {
        return `${this.transactionalDocumentRoute}/${this.consentDocumentId}/content`;
    }

    public get consentDocumentId(): string {
        return this.workflowService.consentDocumentId || null;
    }

    private setViewContent(): void {
        this.stepContent = this.confirmationService.stepContent;
        const selectedOfferingStr = this.workflowService.selectedDrug;

        this.selectedAll = false;
        this.priorAuthDocId = this.workflowService.priorAuthorizationDocumentId;
        this.enrollmentDocId = this.workflowService.enrollmentDocumentId;
        this.patientAuthorizationId = this.workflowService.patientAuthorizationDocumentId;
        this._enrollmentFormName = this.workflowService.enrollmentDocumentName;
        this._patientAuthorizationFormName = this.workflowService.patientAuthorizationDocumentName;
        this.uploadedDocuments = this.workflowService.uploadedDocuments;
        this.registerLabel = this.translateContentService.confirmationView.registerLabel;
        switch (this.workflowService.currentServiceOffering.selectedOffering) {
            case ServiceOfferingsEnum.Allergy:
            case ServiceOfferingsEnum.ENT:
            case ServiceOfferingsEnum.Gastroenterology:
                this.setEnrollmentView();
                break;
            case ServiceOfferingsEnum.UploadDocumentation:
                this.setUploadDocumentView();
                break;
            case ServiceOfferingsEnum.Dermatology:
                this.setPatientAuthorizationView();
                break;
        }
        this.footer = this.translateContentService.confirmationView.footer
            .replace('{0}', selectedOfferingStr)
            .replace('{1}', selectedOfferingStr?.toUpperCase());
        this.enrollment = this.translateContentService.confirmationView.enrollment;
        this.patientAuthorizationLabel = this.translateContentService.confirmationView.patientAuthorizationLabel;
        this.downloadBtnLabel = this.translateContentService.confirmationView.downloadBtnLabel;
        this.patientCoverageLabel = this.translateContentService.confirmationView.checkAnotherLabel;
        this.assistanceLabel = this.translateContentService.confirmationView.needAssistanceLabel;
        const selectedOffering = this.workflowService.getSelectedOffering();
    }

    private hasNoInsurance(): boolean {
        return (
            !this.workflowService.insuranceInformationFormData ||
            Object.keys(this.workflowService.insuranceInformationFormData).length === 0 ||
            this.workflowService.insuranceInformationFormData.hasInsurance === 'N'
        );
    }

    private setPatientAuthorizationView(): void {
        this.downloadLabel = this.confirmationService.stepContent.patientAuthorizationDownloadLabel;
        this.priorAuthorization = this.confirmationService.stepContent.priorAuthorization;
        this.patientAuthorizationLabel = this.confirmationService.stepContent.patientAuthorizationLabel;
        this._patientAuthorizationFormName = this.replaceColonCharacter(this.workflowService.patientAuthorizationDocumentName);
    }

    private setUploadDocumentView() {
        this.header = this.confirmationService.stepContent.uploadDocumentHeader;
        this.description = this.confirmationService.stepContent.uploadDocumentDescription;
        this.downloadLabel = this.confirmationService.stepContent.uploadDocumentDownloadLabel;
        this.priorAuthorization = this.confirmationService.stepContent.priorAuthorization;
    }

    private setEnrollmentView() {
        this.header = this.enrollmentDocId
            ? this.confirmationService.stepContent.enrollmentHeader
            : this.confirmationService.stepContent.uploadDocumentHeader;
        this.description = this.enrollmentDocId
            ? this.confirmationService.stepContent.enrollmentDescription
            : this.confirmationService.stepContent.uploadDocumentDescription;
        this.downloadLabel = this.confirmationService.stepContent.enrollmentDownloadLabel;
        this.priorAuthorization = this.confirmationService.stepContent.enrollmentLabel;
    }

    private showNotification(): void {
        this.snackBar.openFromComponent(SnackbarIconComponent, {
            data: {
                icon: 'info_outline',
                message: 'Coverage details were not found for your patient.',
                action: 'Dismiss'
            },
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }

    public toggleSelectAll(): void {
        const checked = !this.selectedAll;

        Object.keys(this.documentForm.controls).forEach((key: string) => {
            this.documentForm.get(key).setValue(checked);
        });
    }

    public download(): void {
        let documentIds: string[] = [];

        // Since only 1 document is displayed - single download if OK for now.
        //   Will have to create a new API to combine all documents when multiple
        //   document will be added in the list.
        Object.keys(this.documentForm.controls).forEach((key: string) => {
            if (this.documentForm.get(key).value) {
                if (key === 'priorAuthorization') {
                    window.open(`${this.transactionalDocumentRoute}/${this.priorAuthDocId}/content`, '_blank');
                    documentIds.push(this.priorAuthDocId);
                } else if (key === 'enrollment') {
                    window.open(
                        `${this.transactionalDocumentRoute}/${this.patientAuthorizationId}/content?name=${this._enrollmentFormName}`,
                        '_blank'
                    );
                    documentIds.push(this.patientAuthorizationId);
                } else if (key === 'patientAuthorization') {
                    window.open(
                        `${this.transactionalDocumentRoute}/${this.enrollmentDocId}/content?name=${this._patientAuthorizationFormName}`,
                        '_blank'
                    );
                    documentIds.push(this.enrollmentDocId);
                } else if (key.startsWith('uploaded-')) {
                    const index = +key.replace('uploaded-', '');
                    documentIds.push(this.uploadedDocuments[index].fileName);
                }
            }
        });
    }

    public otherCoverage(): void {
        this.snackBar.dismiss();
        this.workflowService.npi = this._npi;
        this.workflowService.emailAddress = this._emailAddress;
        this.workflowService.externalServiceToken = this._serviceToken;
        this.workflowService.prescriberId = this._prescriberId;
        this.workflowService.rxStatusId = 0;
        this.workflowService.prescriberFormData = this._prescriberFormData;
        this.workflowService.setWorkflowComplete(false);
        this.workflowService.navigateToFirstStep();
    }

    private replaceColonCharacter(value: string): string {
        /**
         * Replace usual colon(:) character to Unicode Modifier Letter Colon
         * This is for the client to download the file in the expected file name format e.g XTANDI_Patient_Authorization_Form_Copy_YYYY-MM-DDTHH:MM:SSZ.pdf
         * Usual colon(:) character is an invalid file name character for some systems like Windows
         * So it automatically replaces any colon character to underscore(_) character when downloaded
         */
        return value?.replace(/:\s*/g, '_');
    }A
}
