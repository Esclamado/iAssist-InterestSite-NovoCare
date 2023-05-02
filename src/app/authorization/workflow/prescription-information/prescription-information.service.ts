import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { WorkflowService } from '../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionInformationService {

  public prescriptionInformationGroup: FormGroup;
  private controlProductSelectedConfig = 'productSelected'
  private controlIcd10CodeConfig = 'icd10Code'
  private controlDosageConfig = 'dosage'
  private controlQuantityConfig = 'quantity'
  private controlRefillsConfig = 'refills'
  private controlSpecialtyPharmacyConfig = 'specialtyPharmacy'

  constructor(
    private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private formValidationService: FormValidationService,
    private workflowService: WorkflowService
  ) { }

  private convertToProductName(): string {
    switch (this.workflowService.selectedDrugName) {
      case 'Elitek':
        return 'ELITEK® (rasburicase)'
      case 'Jevtana':
        return 'JEVTANA® (cabazitaxel) injection'
      case 'Sarclisa':
        return 'SARCLISA® (isatuximab-irfc)'
      default:
        break;
    }
  }

  public get stepContent(): any {
    return this.translateContentService.prescriptionInformationView.step;
  }

  public get uploadDocumentContent(): any {
    return this.translateContentService.prescriptionInformationView.body.uploadedDocsPrescription;
  }

  public get productSelectedConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlProductSelectedConfig,
      this.translateContentService.prescriptionInformationView.body.productSelected,
      null,
      null,
      null,
      false,
      null,
      null,
      null
    )
  }

  public get icd10CodeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlIcd10CodeConfig,
      this.translateContentService.prescriptionInformationView.body.icd10Code,
      null,
      null,
      this.translateContentService.prescriptionInformationView.body.icd10CodePlaceholder,
      true,
      this.translateContentService.errorMessages.icd10CodeInvalid,
      null,
      { isIcd10Code: true }
    )
  }

  public get dosageConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlDosageConfig,
      this.translateContentService.prescriptionInformationView.body.dosage,
      null,
      null,
      this.translateContentService.prescriptionInformationView.body.dosagePlaceholder,
      true,
      this.translateContentService.errorMessages.dosageInvalid,
      null,
      { maxLength: 100, isNumeric: true }
    )
  }

  public get quantityConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlQuantityConfig,
      this.translateContentService.prescriptionInformationView.body.quantity,
      null,
      null,
      this.translateContentService.prescriptionInformationView.body.quantityPlaceholder,
      true,
      this.translateContentService.errorMessages.quantityInvalid,
      null,
      { maxLength: 100, isNumeric: true }
    )
  }

  public get refillsConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlRefillsConfig,
      this.translateContentService.prescriptionInformationView.body.refills,
      null,
      null,
      this.translateContentService.prescriptionInformationView.body.refillsPlaceholder,
      true,
      this.translateContentService.errorMessages.quantityInvalid,
      null,
      { maxLength: 100, isNumeric: true }
    )
  }

  public get specialtyPharmacyConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlSpecialtyPharmacyConfig,
      this.translateContentService.prescriptionInformationView.body.specialtyPharmacy.label,
      null,
      this.translateContentService.prescriptionInformationView.body.specialtyPharmacy.option,
      this.translateContentService.prescriptionInformationView.body.specialtyPharmacyPlaceholder,
      false,
      null,
      null,
      { maxLength: 100, isNumeric: true }
    )
  }

  public createGroup(): FormGroup {
    return (this.prescriptionInformationGroup = this.formCreationService.createGroup());
  }

  public get continueButtonText(): string {
    return this.translateContentService.prescriptionInformationView.action.submitBtn;
  }

  public get cancelButtonText(): string {
    return this.translateContentService.prescriptionInformationView.action.cancelBtn;
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(
      this.prescriptionInformationGroup,
      this.controlProductSelectedConfig,
      true,
      [Validators.required],
      this.convertToProductName() || null
    )

    this.formCreationService.addControl(
      this.prescriptionInformationGroup,
      this.controlIcd10CodeConfig,
      false,
      [Validators.required, , Validators.pattern(Regex.ICD_10_CODE)],
      this.workflowService.prescriptionInformationFormData.icd10Code || null
    )

    this.formCreationService.addControl(
      this.prescriptionInformationGroup,
      this.controlDosageConfig,
      false,
      [Validators.required, Validators.pattern(Regex.NUMERIC_ONLY)],
      this.workflowService.prescriptionInformationFormData.dosage || null
    )

    this.formCreationService.addControl(
      this.prescriptionInformationGroup,
      this.controlQuantityConfig,
      false,
      [Validators.required, Validators.pattern(Regex.NUMERIC_ONLY)],
      this.workflowService.prescriptionInformationFormData.quantity || null
    )

    this.formCreationService.addControl(
      this.prescriptionInformationGroup,
      this.controlRefillsConfig,
      false,
      this.workflowService.selectedDrugName != 'Elitek' && [Validators.required],
      this.workflowService.prescriptionInformationFormData.refills || null
    )

    this.formCreationService.addControl(
      this.prescriptionInformationGroup,
      this.controlSpecialtyPharmacyConfig,
      false,
      null,
      this.workflowService.prescriptionInformationFormData.specialtyPharmacy || null
    )
  }

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.prescriptionInformationGroup, true);
  }

  public setFormData(value: any) {
    this.workflowService.prescriptionInformationFormData = value;
  }
}
