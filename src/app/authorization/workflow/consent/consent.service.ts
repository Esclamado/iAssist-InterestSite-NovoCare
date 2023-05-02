import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { FactIntakeResponse } from 'src/app/api/shared/models/fact-intake/fact-intake-response.model';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from '../../../form-configuration/services/form-creation/form-creation.service';
import { FormItem } from '../../../form-configuration/shared/models/form-item.model';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  public consentGroup: FormGroup;

  private controlAuthorizing = 'authorizing';
  private controlAgree = 'agreeToConsent';
  private controlFullName = 'caregiverName';
  private controlSignature = 'sigValue';
  private controlRelToPatient = 'relToPatient';


  public get authorizingConfig(): FormItem {
    return this.formCreationService.createItem(this.controlAuthorizing, this.translateContentService.consentView.whoIsAuthorizing.label,
      null, this.translateContentService.consentView.whoIsAuthorizing.option, null, true,
      this.translateContentService.errorMessages.required);
  }

  public get relToPatientConfig(): FormItem {
    return this.formCreationService.createItem(this.controlRelToPatient, this.translateContentService.consentView.relationshipToPatient,
      null, null, null, true, this.translateContentService.errorMessages.required);
  }

  public get agreeConsentConfig(): FormItem {
    return this.formCreationService.createItem(this.controlAgree, this.translateContentService.consentView.consentForm.label, null,
      this.translateContentService.consentView.consentForm.option, null, true, this.translateContentService.errorMessages.required,
      this.translateContentService.consentView.consentFormContent);
  }

  public get fullNameConfig(): FormItem {
    return this.formCreationService.createItem(this.controlFullName, this.translateContentService.consentView.signature.signerFullName,
      null, null, null, true, this.translateContentService.errorMessages.required);
  }

  public get signatureConfig(): FormItem {
    return this.formCreationService.createItem(this.controlSignature, null, null, null, null, true,
      this.translateContentService.errorMessages.required);
  }

  public get stepContent(): any {
    return this.translateContentService.consentView.step;
  }

  public get actionContent(): any {
    return this.translateContentService.consentView.actions;
  }

  public get signatureContent(): any {
    return this.translateContentService.consentView.signature;
  }

  constructor(
    private formCreationService: FormCreationService,
    private formValidationService: FormValidationService,
    private translateContentService: TranslateContentService,
    private patientService: PatientService,
    private workflowService: WorkflowService) {
  }

  public createGroup(): FormGroup {
    return this.consentGroup = this.formCreationService.createGroup();
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(
      this.consentGroup,
      this.controlAuthorizing,
      false,
      [Validators.required]
    );

    this.formCreationService.addControl(
      this.consentGroup,
      this.controlAgree,
      false,
      [Validators.required],
      null,
      this.formCreationService.createCheckboxFormGroup(this.agreeConsentConfig, null));

    this.formCreationService.addControl(
      this.consentGroup,
      this.controlFullName,
      false,
      [Validators.required]
    );

    this.formCreationService.addControl(
      this.consentGroup,
      this.controlSignature,
      false,
      [Validators.required]
    );
  }

  public addRelToPatientControl(): void {
    this.formCreationService.addControl(
      this.consentGroup,
      this.controlRelToPatient,
      false,
      [Validators.required]
    );
  }

  public removeRelToPatientControl(): void {
    this.formCreationService.removeControl(
      this.consentGroup,
      this.controlRelToPatient
    );
  }

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.consentGroup, true);
  }

  public submitData(formValue: any): Observable<any> {
    this.workflowService.consentFormData = formValue;

    return this.patientService.generateDocuments()
      .pipe(switchMap((documentIds: Array<string>) => {
        if (this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.Dermatology) {
          this.workflowService.patientAuthorizationDocumentId = documentIds.shift();
        }
        if (this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.Allergy ||
          this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.ENT) {
          this.workflowService.enrollmentDocumentId = documentIds.shift();
        }
        this.workflowService.submissionPacketId = documentIds.shift();
        return this.patientService.saveToTransactional();
      }));
  }
}
