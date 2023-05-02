import * as moment from "moment";
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { DocumentService } from 'src/app/api/services/document/document.service';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';
import { FactIntakeResponse } from 'src/app/api/shared/models/fact-intake/fact-intake-response.model';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { checkBoxValueValidator } from 'src/app/form-configuration/shared/validators/check-box.validator';
import { SupportedLanguages } from 'src/app/translation/shared/enums/supported-languages.enum';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { FormNoModalComponent } from 'src/app/ui-components/form-controls/form-no-modal/form-no-modal.component';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';
import { FulfillmentService } from "src/app/api/services/fulfillment/fulfillment.service";
import { PatientAuthorizationService } from './patient-authorization.service';
import { FormCustomModalComponent } from "src/app/ui-components/form-controls/form-custom-modal/form-custom-modal.component";
import { TranslateContentService } from "src/app/translation/services/translate-content/translate-content.service";

@Component({
    selector: 'app-patient-authorization',
    templateUrl: './patient-authorization.component.html',
    styleUrls: ['./patient-authorization.component.scss']
})
export class PatientAuthorizationComponent implements OnInit, AfterViewInit {
    @Output() continueButtonText: string;
    @Output() cancelButtonText: string;
    @Output() continue: boolean;

    public stepContent: any;
    public hipaaContent: any;
    public tcpaContent: any;
    public smsContent: any;
    public marketingMsgContent: any;
    public fcraContent: any;
    public PapAuthContent: any;
    public asstProgAuthContent: any;
    public medEnrollAuthContent: any;
    public textMessagingContent: any;
    public patientConsentContent: any;
    public authorizationContent: any;
    public drugUrl: string;
    public isLanguageSpanish: boolean;
    public readAllText: boolean = false;
    public signatureContent: any;
    public fullName = '';
    public showIsPatient: boolean = false;
    public showIsAuthorized: boolean = false;
    public showIsLegal: boolean = false;
    public patientAuthOnly: boolean = false;
    public patientAssitProgOnly: boolean = false;
    public patientFcraConsentOnly: boolean = false;
    public showIsHcp: boolean = false;
    public showSkip: boolean = false;
    public legalDiscloser: string;
    public cancelModal: any;
    public showIsPresent: boolean = false;
    public showNoPresent: boolean = false;
    public continueButtonClicked = false;
    public provideText: string;
    public emailContinue: string;
    public skipContinueText: string;
    public isSubmitting: boolean;
    public isDisabled:boolean | undefined;
    public isScrolledTextMessage:boolean = false;
    public isScrolledPatientConsent:boolean = false;
    public isScrolledAuthorization:boolean = false;
    public isScrolledHipaaConsent:boolean = false;
    public isScrolledAsstProgAuthConsent:boolean = false;
    public isScrolledMedEnrollAuthConsent:boolean = false;
    public isScrolledMarketingConsent = false;
    public isScrolledFcraConsent = false;
    public textMessageChecked: boolean = false;
    public authorizationChecked: boolean = false;
    public patientConsentChecked: boolean = false;
    public hipaaChecked:boolean = false;
    public asstProgAuthChecked:boolean = false;
    public medEnrollAuthChecked:boolean = false;
    public marketingConsentChecked = false;
    public fcraConsentChecked = false;
    public isScrolledEnabled: undefined;
    public isLessThanEighteen:boolean=false;
    public patientParticipation:any;
    public missingPatient:any;
    public determineEligiblity:any;
    public sendText:any;
    public sentText:any;
    public orText:any;
    public sendMessageNow:boolean;
    public witnessChecked:boolean;
    public consentChecked:boolean;
    public authorizeChecked:boolean;
    public enableButton:boolean=false;
    public modalData:any;
    public isPresentTouched:boolean;
    public checkedCheckbox:any=[];
    public patientFields:any=[];
    public legalRepFields:any=[];
    public rbTherapy = false;
    public obesTherapy = false;
    public growthTherapy = false;
    public enableContinueButton = false;
    public patientReqFieldsPatientAuthOnly = [];
    public patientReqFieldsPapAuthOnly = [];
    public patientReqFieldsPatientAndPapAuth = [];
    public legalReqFieldsPatientAuthOnly = [];
    public legalReqFieldsPapAuthOnly = [];
    public legalReqFieldsPatientAndPapAuth = [];
    public obesPatientReqFieldsPatientAuthOnly = [];
    public obesLegalReqFieldsPatientAuthOnly = [];

    public patientAuthorizationGroup: FormGroup;
    public isPresentConfig:FormItem;
    public authorizationOptionConfig: FormItem;
    public whoIsAuthorizingConfig: FormItem;
    public legalRepFullNameConfig: FormItem;
    public relationToPatientConfig: FormItem;
    public fullNameConfig: FormItem;
    public signatureConfig: FormItem;
    public legalFullNameConfig: FormItem;
    public legalSignatureConfig: FormItem;
    public witnessAuthorizationConfig: FormItem;
    public witnessInitialsConfig: FormItem;
    public sendMessageNowConfig:FormItem;
    public consentAuthorizationConfig: FormItem;
    public consentPatientConfig: FormItem;
    public textMessagingConfig: FormItem;
    public patientOrLegalEmailConfig:FormItem;
    public patientOrLegalNumberConfig:FormItem;
    public hipaaContentConfig:FormItem;
    public tcpaContentConfig: FormItem;
    public smsContentConfig: FormItem;
    public marketingMsgContentConfig:FormItem;
    public fcraContentConfig: FormItem;
    public asstProgAuthContentConfig: FormItem;
    public medEnrollAuthContentConfig: FormItem;

    public disableEmailButton: boolean = false;
    public disableSMSButton: boolean = false;
    public sentVia: string;

    private snackbarErrorScroll: string;

    private agreementDialog: MatDialogRef<FormNoModalComponent>;
    constructor(@Inject('ApplicationConfig') private applicationConfig: ApplicationConfig,
        public dialog: MatDialog,
        private workflowService: WorkflowService,
        private patientAuthorizationService: PatientAuthorizationService,
        private patientService: PatientService,
        private documentService: DocumentService,
        private fulfillmentService: FulfillmentService,
        public cdr: ChangeDetectorRef,
        public translateService: TranslateContentService
    ) {
        this.continue = false;
    }

    ngOnInit(): void {
        this.drugUrl = this.workflowService.medicationFormData.drugUrl;
        this.patientAuthorizationGroup = this.patientAuthorizationService.createGroup();
        this.patientAuthorizationService.addControlsToGroup();
        this.checkAge();
        this.onPatientAuthFormChanges();
        this.subscribeWorkflowLanguage();
        this.setViewContent();
        this.checkTherapy();
    }

    ngAfterViewInit(): void {
        this.patientAuthorizationService.restorePreviousValues();
    }

    public onFullNameValueChange(value: any): void {
        this.fullName = value;
    }

    public cancelButtonClick(event: any): void {
        this.dialog.open(FormCancelModalComponent);
    }

    public cancelBtnClick(): void {
        this.dialog.open(FormCancelModalComponent);
    }

    public continueBtnClick(): void {
        this.patientAuthorizationService.setFormData(this.patientAuthorizationGroup.value);
        this.isSubmitting = true;
        if (this.workflowService.isLastStep()) {
            this.submitWorkflow();
        } else {
            this.workflowService.navigateToNextStep();
        }
    }

    private submitWorkflow(): void {
        this.continueButtonClicked = true;
        this.patientService.generateDocuments()
            .pipe(switchMap((documentIds: Array<string>) => {
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
            .subscribe(() => {
                this.workflowService.navigateToNextStep();
                this.continueButtonClicked = false;
                this.isSubmitting = false;
            },() => {
                this.continueButtonClicked = false;
            });
    }

    public onScrollDown(event: any): void {
        const className = event.target.className.split(' ')[2];
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            this.readAllText = true;
            switch (className) {
                case 'authorization-content': {
                    this.isScrolledAuthorization = true;
                    this.authorizationChecked = false;
                    break;
                }
                case 'text-message-content': {
                    this.isScrolledTextMessage = true;
                    this.textMessageChecked = false;
                    break;
                }
                case 'marketing-content': {
                    this.isScrolledMarketingConsent = true;
                    this.marketingConsentChecked = false;
                    break;
                }
                case 'fcra-content': {
                    this.isScrolledFcraConsent = true;
                    this.fcraConsentChecked = false;
                    break;
                }
                case 'patient-consent-content': {
                    this.isScrolledPatientConsent = true;
                    this.patientConsentChecked = false;
                    break;
                }
                case 'patient-hipaa-content': {
                    this.isScrolledHipaaConsent = true;
                    this.hipaaChecked = false;
                    break;
                }
                case 'patient-asst-auth-content': {
                    this.isScrolledAsstProgAuthConsent = true;
                    this.asstProgAuthChecked = false;
                    break;
                }
                case 'patient-med-enroll-content': {
                    this.isScrolledMedEnrollAuthConsent = true;
                    this.medEnrollAuthChecked = false;
                    break;
                }
            }
        }
    }

    public checkIfHasScrollBar(id: string) {
      const div = document.getElementById(id);
      return div?.scrollHeight > div?.clientHeight;
    }

    public onCheckboxClick(clicked: FormItem, scrollableViewId?: string): void {
        switch (clicked.controlName) {
            case this.patientAuthorizationService.controlConsentAuthorization: {
                if (!this.isScrolledAuthorization) {
                    this.authorizationChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                }
                break;
            }
            case this.patientAuthorizationService.controlSmsConsent: {
                const hasScrollbar = this.checkIfHasScrollBar(scrollableViewId);
                if (hasScrollbar && !this.isScrolledTextMessage) {
                    this.textMessageChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                } else {
                    this.removeCheckError(clicked);
                }
                break;
            }
            case this.patientAuthorizationService.controlMarketingMsgConsent: {
                const hasScrollbar = this.checkIfHasScrollBar(scrollableViewId);
                if (hasScrollbar && !this.isScrolledMarketingConsent) {
                    this.marketingConsentChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                } else {
                    this.removeCheckError(clicked);
                }
                break;
            }
            case this.patientAuthorizationService.controlFcraConsent: {
                const hasScrollbar = this.checkIfHasScrollBar(scrollableViewId);
                if (hasScrollbar && !this.isScrolledFcraConsent) {
                    this.fcraConsentChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                } else {
                    this.removeCheckError(clicked);
                }
                break;
            }
            case this.patientAuthorizationService.controlConsentPatient: {
                if (!this.isScrolledPatientConsent) {
                    this.patientConsentChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                }
                break;
            }
            case this.patientAuthorizationService.controlHipaaConsent: {
                if (!this.isScrolledHipaaConsent) {
                    this.hipaaChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                }
                break;
            }
            case this.patientAuthorizationService.controlAsstProgAuthConsent: {
                if (!this.isScrolledAsstProgAuthConsent) {
                    this.asstProgAuthChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                }
                break;
            }
            case this.patientAuthorizationService.controlMedEnrollAuthConsent: {
                const hasScrollbar = this.checkIfHasScrollBar(scrollableViewId);
                if (hasScrollbar && !this.isScrolledMedEnrollAuthConsent) {
                    this.medEnrollAuthChecked = true;
                    this.clearCheck(clicked);
                    this.workflowService.openSnackBar(this.snackbarErrorScroll);
                } else {
                    this.removeCheckError(clicked);
                }
                break;
            }
        }
    }

    private clearCheck(clicked: FormItem): void {
        const checkbox = document.getElementById(clicked.controlName + '_0') as HTMLInputElement | null;
        if (checkbox != null) {
            checkbox.checked = false;
            checkbox.classList.add("is-invalid");
        }
        const control = this.patientAuthorizationGroup.controls[clicked.controlName]

        control.setErrors({'incorrect': true});
        control.markAllAsTouched();
        control.updateValueAndValidity();
    }

    private removeCheckError(clicked: FormItem): void {
        const checkbox = document.getElementById(clicked.controlName + '_0') as HTMLInputElement | null;
        if (checkbox != null) {
            checkbox.classList.remove('is-invalid');
        }
        const control = this.patientAuthorizationGroup.controls[clicked.controlName];

        control.setErrors({incorrect: false});
        control.markAllAsTouched();
        control.updateValueAndValidity();
    }

    public checkAge(){
        let getMonths = moment().diff(this.workflowService.patientFormData.dateOfBirth, 'months');
        let age = Math.round(getMonths/12)
        if(age >= 18) {
            this.patientAuthorizationGroup.controls.whoIsAuthorizing.setValue(null);
            this.patientAuthorizationGroup.controls.whoIsAuthorizing.enable()
            this.isLessThanEighteen = false;
        }else if (age < 18 && this.patientAuthorizationGroup.controls.isPresent.value == "Yes") {
            this.patientAuthorizationGroup.controls.whoIsAuthorizing.setValue('Legal Representative');
            this.isDisabled = true;
            this.isLessThanEighteen = true;
            this.showIsAuthorized = true;
        }
    }

    public setDefualtSignatureValue(){
        this.workflowService.patientAuthorizationFormData.authorizerName=''
        this.workflowService.patientAuthorizationFormData.legalFullName=''
    }

    public onPatientAuthFormChanges() {
        this.onWhoIsAuthorizingChanges();
        this.patientAuthorizationGroup.valueChanges.subscribe(value => {
            if (value.whoIsAuthorizing === 'Patient') {
                this.enableContinueButton = false;
                if (this.rbTherapy || this.growthTherapy) {
                    if (this.patientAuthOnly) {
                        this.checkRequiredFields(this.patientReqFieldsPatientAuthOnly);
                    }
                    if (this.patientAssitProgOnly) {
                        this.checkRequiredFields(this.patientReqFieldsPapAuthOnly);
                    }
                    if (this.patientAuthOnly && this.patientAssitProgOnly) {
                        this.checkRequiredFields(this.patientReqFieldsPatientAndPapAuth);
                    }
                }
                if (this.obesTherapy) {
                    this.checkRequiredFields(this.obesPatientReqFieldsPatientAuthOnly);
                }
            }

            if (value.whoIsAuthorizing === 'Legal Representative') {
                this.enableContinueButton = false;
                if (this.rbTherapy || this.growthTherapy) {
                    if (this.patientAuthOnly) {
                        this.checkRequiredFields(this.legalReqFieldsPatientAuthOnly);
                    }
                    if (this.patientAssitProgOnly) {
                        this.checkRequiredFields(this.legalReqFieldsPapAuthOnly);
                    }
                    if (this.patientAuthOnly && this.patientAssitProgOnly) {
                        this.checkRequiredFields(this.legalReqFieldsPatientAndPapAuth);
                    }
                }
                if (this.obesTherapy) {
                    this.checkRequiredFields(this.obesLegalReqFieldsPatientAuthOnly);
                }
            }
            this.cdr.detectChanges();
        });
    }

    private checkRequiredFields(requiredFields: any) {

        let isFieldsInvalid = false;
        for (const field of requiredFields) {
            if (!this.patientAuthorizationGroup.controls[field].valid) {
                isFieldsInvalid = true;
                break;
            }
        }
        if (isFieldsInvalid) {
            this.enableContinueButton = false;
        } else {
            this.enableContinueButton = true;
        }
        this.cdr.detectChanges();
    }

    private onWhoIsAuthorizingChanges() {
        this.patientAuthorizationGroup.controls.whoIsAuthorizing.valueChanges.subscribe(() => {
            this.patientAuthorizationGroup.controls.hipaaConsent.reset();
            this.patientAuthorizationGroup.controls.tcpaConsent.reset();
            this.patientAuthorizationGroup.controls.smsConsent.reset();
            this.patientAuthorizationGroup.controls.marketingMsgConsent.reset();
            this.patientAuthorizationGroup.controls.fcraConsent.reset();
            this.patientAuthorizationGroup.controls.asstProgAuthConsent.reset();
            this.patientAuthorizationGroup.controls.medEnrollAuthConsent.reset();
            this.patientAuthorizationGroup.controls.authorizerName.reset();
            this.patientAuthorizationGroup.controls.signature.reset();
            this.patientAuthorizationGroup.controls.legalRepFullName.reset();
            this.patientAuthorizationGroup.controls.relationToPatient.reset();
            this.patientAuthorizationGroup.controls.legalFullName.reset();
            this.patientAuthorizationGroup.controls.legalSignature.reset();
            this.isScrolledHipaaConsent = false;
            this.isScrolledAsstProgAuthConsent = false;
            this.isScrolledMedEnrollAuthConsent = false;
        });
    }

    private resetRareBloodPatientAuthFields() {
        this.patientAuthorizationGroup.controls.hipaaConsent.reset();
        this.patientAuthorizationGroup.controls.tcpaConsent.reset();
        this.patientAuthorizationGroup.controls.smsConsent.reset();
        this.patientAuthorizationGroup.controls.marketingMsgConsent.reset();
        this.patientAuthorizationGroup.controls.fcraConsent.reset();
        this.patientAuthorizationGroup.controls.authorizerName.reset();
        this.patientAuthorizationGroup.controls.signature.reset();
        this.isScrolledHipaaConsent = false;
    }

    private resetRareBloodPapAuthFields() {
        this.patientAuthorizationGroup.controls.asstProgAuthConsent.reset();
        this.patientAuthorizationGroup.controls.medEnrollAuthConsent.reset();
        this.patientAuthorizationGroup.controls.fcraConsent.reset();
        this.patientAuthorizationGroup.controls.authorizerName.reset();
        this.patientAuthorizationGroup.controls.signature.reset();
        this.isScrolledAsstProgAuthConsent = false;
        this.isScrolledMedEnrollAuthConsent = false;
    }

    public onSendEmail(){
        if (!this.patientAuthorizationGroup.controls.patientOrLegalEmail.invalid && this.patientAuthorizationGroup.controls.patientOrLegalEmail.value) {
            this.patientAuthorizationGroup.controls.patientOrLegalEmail.disable()
            this.patientAuthorizationGroup.controls.patientOrLegalNumber.disable()
            this.patientAuthorizationGroup.patchValue({
                tokenViaEmail: 'Yes'
            })
            this.enableButton=true
            this.disableEmailButton=true
            this.disableSMSButton=true
            this.sentVia = 'email'
        }
        else {
            this.patientAuthorizationGroup.controls.patientOrLegalEmail.markAsTouched()
            this.patientAuthorizationGroup.controls.patientOrLegalEmail.setErrors({incorrect: true})
        }
    }

    public onSendSMS(){
        if (!this.patientAuthorizationGroup.controls.patientOrLegalNumber.invalid && this.patientAuthorizationGroup.controls.patientOrLegalNumber.value) {
            this.patientAuthorizationGroup.controls.patientOrLegalNumber.disable()
            this.patientAuthorizationGroup.controls.patientOrLegalEmail.disable()
            this.patientAuthorizationGroup.patchValue({
                tokenViaSMS: 'Yes'
            })
            this.enableButton=true
            this.disableSMSButton=true
            this.disableEmailButton=true
            this.sentVia = 'SMS'
        }
        else {
            this.patientAuthorizationGroup.controls.patientOrLegalNumber.markAsTouched()
            this.patientAuthorizationGroup.controls.patientOrLegalNumber.setErrors({incorrect: true})
        }
    }

    public checkTherapy() {
        if (this.workflowService.RAREBLOOD_THERAPY.includes(this.workflowService.currentServiceOffering.selectedOffering)) {
            this.rbTherapy = true;
            this.obesTherapy = false;
            this.growthTherapy = false;
        }
        if (this.workflowService.OBESITY_THERAPY.includes(this.workflowService.currentServiceOffering.selectedOffering)) {
            this.rbTherapy = false;
            this.obesTherapy = true;
            this.growthTherapy = false;
        }
        if (this.workflowService.GROWTH_THERAPY.includes(this.workflowService.currentServiceOffering.selectedOffering)) {
            this.rbTherapy = false;
            this.obesTherapy = false;
            this.growthTherapy = true;
        }
    }

    public onAuthorizeChanges(event: any) {
        if (event === 'Patient') {
            this.showIsPatient = true;
            this.showIsLegal = false;
        }
        if (event === 'Legal Representative') {
            this.showIsPatient = false;
            this.showIsLegal = true;
        }
        this.isPresentTouched = true;
    }

    public onAuthorizationOption(event: any) {
        if (event === 'PAuth' && this.onAuthorizeChanges) {
            this.resetRareBloodPapAuthFields();
            this.patientAuthOnly = true;
            this.patientAssitProgOnly = false;
        }
        if (event === 'PAP' && this.onAuthorizeChanges) {
            this.resetRareBloodPatientAuthFields();
            this.patientAuthOnly = false;
            this.patientAssitProgOnly = true;
            this.patientFcraConsentOnly = true;
        }
        if (event === 'Both' && this.onAuthorizeChanges) {
            this.resetRareBloodPatientAuthFields();
            this.resetRareBloodPapAuthFields();
            this.patientAuthOnly = true;
            this.patientAssitProgOnly = true;
            this.patientFcraConsentOnly = false;
        }
        this.cdr.detectChanges();
    }

    private setViewContent(): void {
        this.stepContent = this.patientAuthorizationService.stepContent;
        this.hipaaContent = this.patientAuthorizationService.hipaaContent;
        this.tcpaContent = this.patientAuthorizationService.tcpaContent;
        this.smsContent = this.patientAuthorizationService.smsContent;
        this.marketingMsgContent = this.patientAuthorizationService.marketingMsgContent;
        this.fcraContent = this.patientAuthorizationService.fcraContent;
        this.PapAuthContent = this.patientAuthorizationService.PapAuthContent;
        this.asstProgAuthContent = this.patientAuthorizationService.asstProgAuthContent;
        this.medEnrollAuthContent = this.patientAuthorizationService.medEnrollAuthContent;
        this.textMessagingContent = this.patientAuthorizationService.textMessagingContent;
        this.patientConsentContent = this.patientAuthorizationService.patientConsentContent;
        this.authorizationContent = this.patientAuthorizationService.authorizationContent;
        this.signatureContent = this.patientAuthorizationService.signatureContent;
        this.legalDiscloser = this.patientAuthorizationService.legalDiscloser;
        this.cancelModal = this.patientAuthorizationService.cancelModal;
        this.provideText = this.patientAuthorizationService.provideText;
        this.emailContinue = this.patientAuthorizationService.emailContinue;
        this.skipContinueText = this.patientAuthorizationService.skipContinueText;
        this.patientParticipation = this.patientAuthorizationService.patientParticipation;
        this.missingPatient = this.patientAuthorizationService.missingPatient;
        this.determineEligiblity = this.patientAuthorizationService.determineEligiblity;
        this.sendText = this.patientAuthorizationService.sendButtonText;
        this.sentText = this.patientAuthorizationService.sentButtonText;
        this.orText = this.patientAuthorizationService.orText;
        this.modalData=this.patientAuthorizationService.proceedModal;
        this.patientFields=this.patientAuthorizationService.patientReqFields;
        this.legalRepFields=this.patientAuthorizationService.legalRepReqFields;
        this.patientReqFieldsPatientAuthOnly = this.patientAuthorizationService.patientReqFieldsPatientAuthOnly;
        this.patientReqFieldsPapAuthOnly = this.patientAuthorizationService.patientReqFieldsPapAuthOnly;
        this.patientReqFieldsPatientAndPapAuth = this.patientAuthorizationService.patientReqFieldsPatientAndPapAuth;
        this.legalReqFieldsPatientAuthOnly = this.patientAuthorizationService.legalReqFieldsPatientAuthOnly;
        this.legalReqFieldsPapAuthOnly = this.patientAuthorizationService.legalReqFieldsPapAuthOnly;
        this.legalReqFieldsPatientAndPapAuth = this.patientAuthorizationService.legalReqFieldsPatientAndPapAuth;
        this.obesPatientReqFieldsPatientAuthOnly = this.patientAuthorizationService.obesPatientReqFieldsPatientAuthOnly;
        this.obesLegalReqFieldsPatientAuthOnly = this.patientAuthorizationService.obesLegalReqFieldsPatientAuthOnly;

        this.snackbarErrorScroll = this.patientAuthorizationService.snackBarScrollText;

        this.workflowService.patientAuthorizationFormData.sendMessageNow == 'Yes' && (this.sendMessageNow = true)

        if (this.workflowService.patientAuthorizationFormData.tokenViaEmail == 'Yes') {
            this.patientAuthorizationGroup.controls.patientOrLegalEmail.disable()
            this.patientAuthorizationGroup.controls.patientOrLegalNumber.disable()
            this.enableButton=true
            this.disableEmailButton=true
            this.disableSMSButton=true
            this.sentVia = 'email'
        }

        if (this.workflowService.patientAuthorizationFormData.tokenViaSMS == 'Yes') {
            this.patientAuthorizationGroup.controls.patientOrLegalNumber.disable()
            this.patientAuthorizationGroup.controls.patientOrLegalEmail.disable()
            this.enableButton=true
            this.disableSMSButton=true
            this.disableEmailButton=true
            this.sentVia = 'SMS'
        }
    }

    private subscribeWorkflowLanguage(): void {
        this.workflowService.subscribeWorkflowLanguage().subscribe(res => {
            this.isLanguageSpanish = res === SupportedLanguages.Spanish;
            this.setControlConfigs();
            this.setViewContent();
        });
    }

    private setControlConfigs(): void {
        this.continueButtonText = this.patientAuthorizationService.continueButtonText;
        this.cancelButtonText = this.patientAuthorizationService.cancelButtonText;
        this.isPresentConfig = this.patientAuthorizationService.isPresentConfig;
        this.authorizationOptionConfig = this.patientAuthorizationService.authorizationOptionConfig;
        this.whoIsAuthorizingConfig = this.patientAuthorizationService.whoIsAuthorizingConfig;
        this.fullNameConfig = this.patientAuthorizationService.fullNameConfig;
        this.signatureConfig = this.patientAuthorizationService.signatureConfig;
        this.legalRepFullNameConfig = this.patientAuthorizationService.legalRepFullNameConfig;
        this.relationToPatientConfig = this.patientAuthorizationService.relationToPatientConfig;
        this.legalFullNameConfig = this.patientAuthorizationService.legalFullNameConfig;
        this.legalSignatureConfig = this.patientAuthorizationService.legalSignatureConfig;
        this.witnessAuthorizationConfig = this.patientAuthorizationService.witnessAuthorizationConfig;
        this.witnessInitialsConfig = this.patientAuthorizationService.witnessInitialsConfig;
        this.textMessagingConfig = this.patientAuthorizationService.textMessagingConfig;
        this.consentPatientConfig = this.patientAuthorizationService.consentPatientConfig;
        this.consentAuthorizationConfig = this.patientAuthorizationService.consentAuthorizationConfig;
        this.sendMessageNowConfig = this.patientAuthorizationService.sendMessageNowConfig;
        this.patientOrLegalEmailConfig = this.patientAuthorizationService.patientLegalEmailConfig;
        this.patientOrLegalNumberConfig = this.patientAuthorizationService.patientLegalNumberlConfig;
        this.hipaaContentConfig = this.patientAuthorizationService.hipaaContentConfig;
        this.tcpaContentConfig = this.patientAuthorizationService.tcpaContentConfig;
        this.smsContentConfig = this.patientAuthorizationService.smsContentConfig;
        this.marketingMsgContentConfig = this.patientAuthorizationService.marketingMsgContentConfig;
        this.fcraContentConfig = this.patientAuthorizationService.fcraContentConfig;
        this.asstProgAuthContentConfig = this.patientAuthorizationService.asstProgAuthContentConfig;
        this.medEnrollAuthContentConfig = this.patientAuthorizationService.medEnrollAuthContentConfig;
    }

}
