import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { WorkflowService } from '../workflow.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { switchMap } from 'rxjs/operators';
import { PatientService } from 'src/app/api/services/patient/patient.service';
import { ServiceOfferingsEnum } from '../service-offerings.enum';

@Injectable({
  providedIn: 'root'
})
export class ProviderAttestationService {
  private controlAgree = 'agreeToConsent';
  private controlSignature = 'sigValue';
  private controlFullName = 'providerName';

  constructor(
    private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private workflowService: WorkflowService,
    private patientService: PatientService,
    private formValidationService: FormValidationService
  ) { }

  public provAttestGroup: FormGroup;

  public createGroup(): FormGroup {
    return (this.provAttestGroup = this.formCreationService.createGroup());
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(
      this.provAttestGroup,
      this.controlAgree,
      false,
      [Validators.required],
      null,
      this.formCreationService.createCheckboxFormGroup(this.agreeConsentConfig, null)
    );

    this.formCreationService.addControl(this.provAttestGroup, this.controlFullName, false, [Validators.required]);

    this.formCreationService.addControl(this.provAttestGroup, this.controlSignature, false, [Validators.required]);
  }

  public get stepContent(): any {
    return this.translateContentService.providerAttestationView.step;
  }

  public get continueButtonText(): string {
    return this.translateContentService.providerAttestationView.action.submitBtn;
  }

  public get cancelButtonText(): string {
    return this.translateContentService.providerAttestationView.action.cancelBtn;
  }

  public get agreeConsentConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlAgree,
      this.translateContentService.providerAttestationView.attestationForm.label,
      null,
      this.translateContentService.providerAttestationView.attestationForm.option,
      null,
      true,
      this.translateContentService.errorMessages.required,
      this.getAttestationFormContent()
    );
  }

  public get signatureConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlSignature,
      null,
      null,
      null,
      null,
      true,
      this.translateContentService.errorMessages.required
    );
  }

  public get fullNameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlFullName,
      'Name',
      null,
      null,
      null,
      true,
      this.translateContentService.errorMessages.required
    );
  }

  public get signatureContent(): any {
    return this.translateContentService.providerAttestationView.signature;
  }

  private getSelectedMedicationType(): string {
    let selectedEnumDrug: string;
    this.translateContentService.availableServicesView.serviceType.options.forEach(element => {
      element.forEach(t => {
        if (this.workflowService.medicationFormData.selectedDrug === t.valueString) {
          selectedEnumDrug = t.displayedString
            .replace(/ .*/, '')
            .replace(/\w\S*/g, x => x.charAt(0).toUpperCase() + x.substring(1).toLowerCase());
        }
      });
    });
    return selectedEnumDrug;
  }

  private getAttestationFormContent(): string {
    let attestationFormContent: string;
    let selectedDrug: string = this.getSelectedMedicationType();
    if (selectedDrug == 'Gilenya') {
      attestationFormContent = this.translateContentService.providerAttestationView.attestationFormContentGilenya;
    } else if (selectedDrug == 'Mayzent') {
      attestationFormContent = this.translateContentService.providerAttestationView.attestationFormContentMayzent;
    } else {
      attestationFormContent = this.translateContentService.providerAttestationView.attestationFormContentMayzent;
    }
    return attestationFormContent;
  }

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.provAttestGroup, true);
  }

  public submitData(formValue: any) {
    this.workflowService.provideAttestationFormData = formValue;
    this.patientService.generateDocuments()
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
      })).subscribe(factIntake => {
        if (factIntake?.clientTransactionGroupId) {
          this.workflowService.transactionGroupId = factIntake.clientTransactionGroupId;
        }
      });
  }
}
