import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { EmailService } from 'src/app/api/services/email/email.service';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { EmailRequestModel } from 'src/app/api/shared/models/email/email-request.model';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { checkBoxValueValidator } from 'src/app/form-configuration/shared/validators/check-box.validator';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { WorkflowService } from '../workflow.service';
import { Regex } from "src/app/api/shared/constants/regex.constant";

@Injectable({
    providedIn: 'root'
})
export class PatientAuthorizationService {
    public patientAuthorizationGroup: FormGroup;
    public controlLegalRepFullName = 'legalRepFullName';
    private controlIsPresent = 'isPresent';
    private controlAuthorizationOption = 'authorizationOption';
    private controlWhoIsAuthorizing = 'whoIsAuthorizing';
    public controlConsentAuthorization = 'consentAuthorization';
    public controlConsentPatient = 'consentPatient';
    public controlHipaaConsent = 'hipaaConsent';
    public controlTcpaConsent = 'tcpaConsent';
    public controlSmsConsent = 'smsConsent';
    public controlMarketingMsgConsent = 'marketingMsgConsent';
    public controlFcraConsent = 'fcraConsent';
    public controlAsstProgAuthConsent = 'asstProgAuthConsent';
    public controlMedEnrollAuthConsent = 'medEnrollAuthConsent';
    public controlConsentTextMessage = 'consentTextMessage';
    public controlWitnessCheckbox = 'witnessCheckbox';
    private controlFullName = 'authorizerName';
    private controlSignature = 'signature';
    private controlLegalFullName = 'legalFullName';
    private controlLegalSignature = 'legalSignature';
    private controlRelationToPatient = 'relationToPatient';
    private controlWitnessAuthorization = 'witnessAuthorization';
    private controlWitnessInitials = 'witnessInitials';
    private controlSendMessageNow = 'sendMessageNow';
    private controlPatientOrLegalEmail = 'patientOrLegalEmail';
    private controlPatientOrLegalNumber = 'patientOrLegalNumber';
    private controlTokenViaEmail = 'tokenViaEmail';
    private controlTokenViaSMS = 'tokenViaSMS';
    private controlDoAgreeAuthorization = 'doAgreeAuthorization';
    private controloptIn = 'optIn';

    public get isPresentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlIsPresent,
            this.translateContentService.patientAuthorization.isPresent.label,
            null,
            this.translateContentService.patientAuthorization.isPresent.option,
            null,
            true
        );
    }

    public get authorizationOptionConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlAuthorizationOption,
            this.translateContentService.patientAuthorization.authorizationOption.label,
            null,
            this.translateContentService.patientAuthorization.authorizationOption.option,
            null,
            true
        );
    }

    public get whoIsAuthorizingConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlWhoIsAuthorizing,
            this.translateContentService.patientAuthorization.whoIsAuthorizing.label,
            null,
            this.translateContentService.patientAuthorization.whoIsAuthorizing.option,
            null,
            true
        );
    }

    public get fullNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlFullName,
            this.translateContentService.patientAuthorization.signature.signerFullName,
            null,
            null,
            this.translateContentService.patientAuthorization.signature.placeholder,
            true,
            this.translateContentService.errorMessages.signatureInvalid
        );
    }

    public get signatureConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlSignature,
            this.translateContentService.patientAuthorization.signature,
            null,
            null,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get legalRepFullNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlLegalRepFullName,
            this.translateContentService.patientAuthorization.legalRepFullName,
            null,
            null,
            this.translateContentService.patientAuthorization.placeholders.legalRepName,
            true,
            this.translateContentService.errorMessages.nameInvalid
        );
    }

    public get relationToPatientConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlRelationToPatient,
            this.translateContentService.patientAuthorization.relationToPatient.label,
            null,
            null,
            this.translateContentService.patientAuthorization.placeholders.relationshipToPatient,
            true,
            this.translateContentService.errorMessages.relationshipInvalid,
            null,
            null,
            null
        );
    }

    public get legalFullNameConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlLegalFullName,
            this.translateContentService.patientAuthorization.legalSignature.signerFullName,
            null,
            null,
            this.translateContentService.patientAuthorization.legalSignature.placeholder,
            true,
            this.translateContentService.errorMessages.signatureInvalid,
            null
        );
    }

    public get legalSignatureConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlLegalSignature,
            this.translateContentService.patientAuthorization.legalSignature,
            null,
            null,
            null,
            null,
            this.translateContentService.errorMessages.required
        );
    }

    public get witnessAuthorizationConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlWitnessAuthorization,
            this.translateContentService.patientAuthorization.witnessAuthorization.label,
            null,
            this.translateContentService.patientAuthorization.witnessAuthorization.options,
            this.translateContentService.patientAuthorization.placeholders.witnessName,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get witnessInitialsConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlWitnessInitials,
            this.translateContentService.patientAuthorization.witnessInitials,
            null,
            null,
            null,
            true,
            this.translateContentService.errorMessages.required
        );
    }

    public get sendMessageNowConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlSendMessageNow,
            this.translateContentService.patientAuthorization.sendMessageNow.label,
            null,
            this.translateContentService.patientAuthorization.sendMessageNow.option,
            null,
            true
        );
    }

    public get patientLegalEmailConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPatientOrLegalEmail,
            this.translateContentService.patientAuthorization.patientOrLegalEmail,
            null,
            null,
            this.translateContentService.patientAuthorization.placeholders.patientOrLegalEmail,
            false,
            this.translateContentService.errorMessages.emailInvalid,
            null
        );
    }

    public get patientLegalNumberlConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlPatientOrLegalNumber,
            this.translateContentService.patientAuthorization.patientOrLegalNumber,
            null,
            null,
            this.translateContentService.patientAuthorization.placeholders.patientOrLegalNumber,
            false,
            this.translateContentService.errorMessages.phoneNumberInvalid,
            null,
            { isPhoneNumber: true });
    }

    public get consentAuthorizationConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlConsentAuthorization,
            null,
            null,
            this.translateContentService.patientAuthorization.patientAuthorizationStatement.options,
            null,
            true,
            this.translateContentService.errorMessages.scrollToAcknowledge
        );
    }
    public get consentPatientConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlConsentPatient,
            null,
            null,
            this.translateContentService.patientAuthorization.patientConsentAndCertifications.options,
            null,
            true,
            this.translateContentService.errorMessages.scrollToAcknowledge
        );
    }

    public get textMessagingConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlConsentTextMessage,
            null,
            null,
            this.translateContentService.patientAuthorization.textMessagingConsent.options,
            null,
            false
        );
    }

    public get hipaaContentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlHipaaConsent,
            null,
            null,
            this.translateContentService.patientAuthorization.hipaaConsent.options,
            null,
            true,
            null
        );
    }

    public get tcpaContentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlTcpaConsent,
            null,
            null,
            this.translateContentService.patientAuthorization.tcpaConsent.options,
            null,
            false,
            this.translateContentService.errorMessages.scrollToAcknowledge
        );
    }

    public get smsContentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlSmsConsent,
            null,
            null,
            this.translateContentService.patientAuthorization.smsConsent.options,
            null,
            false,
            this.translateContentService.errorMessages.scrollToAcknowledge
        );
    }

    public get marketingMsgContentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlMarketingMsgConsent,
            null,
            null,
            this.translateContentService.patientAuthorization.marketingMsgConsent.options,
            null,
            false,
            this.translateContentService.errorMessages.scrollToAcknowledge
        );
    }

    public get asstProgAuthContentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlAsstProgAuthConsent,
            null,
            null,
            this.translateContentService.patientAuthorization.asstProgAuthConsent.options,
            null,
            true,
            null
        );
    }

    public get medEnrollAuthContentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlMedEnrollAuthConsent,
            null,
            null,
            this.translateContentService.patientAuthorization.medEnrollAuthConsent.options,
            null,
            false,
            this.translateContentService.errorMessages.scrollToAcknowledge
        );
    }

    public get fcraContentConfig(): FormItem {
        return this.formCreationService.createItem(
            this.controlFcraConsent,
            null,
            null,
            this.translateContentService.patientAuthorization.fcraConsent.options,
            null,
            false,
            this.translateContentService.errorMessages.scrollToAcknowledge
        );
    }

    constructor(
        private formCreationService: FormCreationService,
        private formValidationService: FormValidationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService,
        private emailService: EmailService
    ) {}

    public createGroup(): FormGroup {
        return (this.patientAuthorizationGroup = this.formCreationService.createGroup());
    }

    public addControlsToGroup(): void {
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlIsPresent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.isPresent || ''
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlAuthorizationOption,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.authorizationOption || ''
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlWhoIsAuthorizing,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.whoIsAuthorizing || ''
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlFullName,
            false,
            [Validators.pattern(Regex.NAME_UPDATED)],
            this.workflowService.patientAuthorizationFormData.authorizerName || null
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlSignature,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.signature || null
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlLegalRepFullName,
            false,
            [Validators.pattern(Regex.NAME_UPDATED)],
            this.workflowService.patientAuthorizationFormData.legalRepFullName
        );

        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlRelationToPatient,
            false,
            [Validators.pattern(Regex.ALPHA_ONLY)],
            this.workflowService.patientAuthorizationFormData.relationToPatient || ''
        );

        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlLegalFullName,
            false,
            [Validators.pattern(Regex.NAME_UPDATED)],
            this.workflowService.patientAuthorizationFormData.legalFullName || null
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlLegalSignature,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.legalSignature || null
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlWitnessAuthorization,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.witnessAuthorization || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.witnessAuthorizationConfig),
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlWitnessInitials,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.witnessInitials
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlSendMessageNow,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.sendMessageNow || ''
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlPatientOrLegalEmail,
            false,
            [Validators.pattern(Regex.EMAIL)],
            this.workflowService.patientAuthorizationFormData.patientOrLegalEmail || null
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlPatientOrLegalNumber,
            false,
            [Validators.pattern(Regex.PHONE_NUMBER)],
            this.workflowService.patientAuthorizationFormData.patientOrLegalNumber || null
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlConsentAuthorization,false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.consentAuthorization || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.consentAuthorizationConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlConsentPatient,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.consentPatient || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.consentPatientConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlHipaaConsent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.hipaaConsent || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.hipaaContentConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlTcpaConsent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.tcpaConsent || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.tcpaContentConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlSmsConsent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.smsConsent || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.smsContentConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlMarketingMsgConsent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.marketingMsgConsent || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.marketingMsgContentConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlFcraConsent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.fcraConsent || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.fcraContentConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlAsstProgAuthConsent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.asstProgAuthConsent || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.asstProgAuthContentConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlMedEnrollAuthConsent,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.medEnrollAuthConsent || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.medEnrollAuthContentConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlConsentTextMessage,
            false,
            [Validators.required],
            this.workflowService.patientAuthorizationFormData.consentTextMessage || null,
            this.formCreationService.createCheckboxConsentFormGroup(this.textMessagingConfig)
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlTokenViaEmail,
            false,
            [],
            this.workflowService.patientAuthorizationFormData.tokenViaEmail || null
        );
        this.formCreationService.addControl(
            this.patientAuthorizationGroup,
            this.controlTokenViaSMS,
            false,
            [],
            this.workflowService.patientAuthorizationFormData.tokenViaSMS || null
        );
    }

    public get stepContent(): any {
        return this.translateContentService.patientAuthorization.step;
    }

    public get hipaaContent(): any {
        return this.translateContentService.patientAuthorization.hipaaConsent;
    }

    public get tcpaContent(): any {
        return this.translateContentService.patientAuthorization.tcpaConsent;
    }

    public get smsContent(): any {
        return this.translateContentService.patientAuthorization.smsConsent;
    }

    public get marketingMsgContent(): any {
        return this.translateContentService.patientAuthorization.marketingMsgConsent;
    }

    public get fcraContent(): any {
        return this.translateContentService.patientAuthorization.fcraConsent;
    }

    public get PapAuthContent(): any {
        return this.translateContentService.patientAuthorization.PapAuthorization;
    }

    public get asstProgAuthContent(): any {
        return this.translateContentService.patientAuthorization.asstProgAuthConsent;
    }

    public get medEnrollAuthContent(): any {
        return this.translateContentService.patientAuthorization.medEnrollAuthConsent;
    }

    public get textMessagingContent(): any {
        return this.translateContentService.patientAuthorization.textMessagingConsent;
    }
    public get patientConsentContent(): any {
        return this.translateContentService.patientAuthorization.patientConsentAndCertifications;
    }
    public get authorizationContent(): any {
        return this.translateContentService.patientAuthorization.patientAuthorizationStatement;
    }

    public get proceedModal():any{
        return this.translateContentService.patientAuthorization.proceedModal
    }

    public get patientParticipation(): any {
        return this.translateContentService.patientAuthorization.patientParticipation;
    }
    public get missingPatient(): any {
        return this.translateContentService.patientAuthorization.missingPatient;
    }
    public get determineEligiblity(): any {
        return this.translateContentService.patientAuthorization.determineEligiblity;
    }

    public get legalDiscloser(): any {
        return this.translateContentService.patientAuthorization.legalDiscloser;
    }

    public touchForm(): void {
        this.formValidationService.markControlsAsTouched(this.patientAuthorizationGroup, true);
    }

    public get continueButtonText(): string {
        return this.translateContentService.patientAuthorization.action.submitBtn;
    }

    public get cancelButtonText(): string {
        return this.translateContentService.patientAuthorization.action.cancelBtn;
    }

    public get orText(): string {
        return this.translateContentService.patientAuthorization.action.or;
    }

    public get sendButtonText(): string {
        return this.translateContentService.patientAuthorization.action.send;
    }

    public get sentButtonText(): string {
        return this.translateContentService.patientAuthorization.action.sent;
    }

    public get patientReqFields():any{
        return this.translateContentService.patientAuthorization.patientReqFields;
    }
    public get legalRepReqFields():any{
        return this.translateContentService.patientAuthorization.legalRepReqFields;
    }

    public get patientReqFieldsPatientAuthOnly(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlAuthorizationOption,
            this.controlHipaaConsent,
            this.controlFullName,
            this.controlSignature
        ];
    }

    public get patientReqFieldsPapAuthOnly(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlAuthorizationOption,
            this.controlAsstProgAuthConsent,
            this.controlFullName,
            this.controlSignature
        ];
    }

    public get patientReqFieldsPatientAndPapAuth(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlAuthorizationOption,
            this.controlHipaaConsent,
            this.controlAsstProgAuthConsent,
            this.controlFullName,
            this.controlSignature
        ];
    }

    public get legalReqFieldsPatientAuthOnly(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlAuthorizationOption,
            this.controlLegalRepFullName,
            this.controlRelationToPatient,
            this.controlHipaaConsent,
            this.controlLegalFullName,
            this.controlLegalSignature
        ];
    }

    public get legalReqFieldsPapAuthOnly(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlAuthorizationOption,
            this.controlLegalRepFullName,
            this.controlRelationToPatient,
            this.controlAsstProgAuthConsent,
            this.controlLegalFullName,
            this.controlLegalSignature
        ];
    }

    public get legalReqFieldsPatientAndPapAuth(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlAuthorizationOption,
            this.controlLegalRepFullName,
            this.controlRelationToPatient,
            this.controlHipaaConsent,
            this.controlAsstProgAuthConsent,
            this.controlLegalFullName,
            this.controlLegalSignature
        ];
    }

    public get obesPatientReqFieldsPatientAuthOnly(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlHipaaConsent,
            this.controlFullName,
            this.controlSignature
        ];
    }

    public get obesLegalReqFieldsPatientAuthOnly(): any {
        return [
            this.controlWhoIsAuthorizing,
            this.controlLegalRepFullName,
            this.controlRelationToPatient,
            this.controlHipaaConsent,
            this.controlLegalFullName,
            this.controlLegalSignature
        ];
    }

    public setFormData(value: any) {
        this.workflowService.patientAuthorizationFormData = value;
    }

    public get signatureContent(): any {
        return this.translateContentService.patientAuthorization.signature;
    }

    public get legalSignatureContent(): any {
        return this.translateContentService.patientAuthorization.legalSignature;
    }

    public get provideText(): string {
        return this.translateContentService.patientAuthorization.provideText;
    }

    public get emailContinue(): string {
      return this.translateContentService.patientAuthorization.emailContinue;
    }

    public get skipContinueText(): string {
      return this.translateContentService.patientAuthorization.skipContinueText;
    }

    public get cancelModal(): any {
        return this.translateContentService.patientAuthorization.cancelModal;
    }

    public get snackBarText(): string{
        return this.translateContentService.patientAuthorization.snackbarErrorForConsent;
    }

    public get snackBarScrollText(): string{
      return this.translateContentService.patientAuthorization.snackbarErrorScroll;
  }

    public sendEmail(): Observable<any> {
        const date = moment();
        const emailRequest: EmailRequestModel = {
            senderEmail: 'notify@assistrx.com',
            senderEmailName: 'Notify User',
            recipientEmail: this.patientAuthorizationGroup?.controls['patientOrRepresentativeEmail']?.value,
            sendGridTemplateId: 'd-dee86957304143838bb72bea9b72db18',
            substitutions: {
                createdDate: date.format('DD'),
                createdMonth: date.format('MMM'),
                createdYear:  date.format('YYYY'),
                createdTime: date.format('HH:mm')
            }
        };
        return this.emailService.sendEmail(emailRequest);
    }

    public restorePreviousValues(): void {
      this.formCreationService.restoreForm(this.patientAuthorizationGroup, this.workflowService.patientAuthorizationFormData);
    }
}
