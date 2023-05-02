import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { WorkflowService } from '../workflow.service';
import { PrescriptionInformationService } from './prescription-information.service';

@Component({
  selector: 'app-prescription-information',
  templateUrl: './prescription-information.component.html',
  styleUrls: ['./prescription-information.component.scss']
})
export class PrescriptionInformationComponent implements OnInit {
  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;
  @Output() continue: boolean;

  public stepContent: any;
  public uploadDocumentContent: any;
  public prescriptionInformationGroup: FormGroup;
  public prescriptionInformationProductSelectedConfig: FormItem;
  public prescriptionInformationIcd10CodeConfig: FormItem;
  public prescriptionInformationDosageConfig: FormItem;
  public prescriptionInformationQuantityConfig: FormItem;
  public prescriptionInformationRefillsConfig: FormItem;
  public prescriptionInformationSpecialtyPharmacyConfig: FormItem;
  public showRefillInput: boolean = false;
  public showSpecialtyPharmacyOption: boolean = false;
  public drugLinkUrl: string;
  public showPrevious: boolean = true;
  public verbiage:string;

  constructor(
    private prescriptionInformationService: PrescriptionInformationService,
    private workFlowService: WorkflowService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.prescriptionInformationGroup = this.prescriptionInformationService.createGroup();
    this.prescriptionInformationService.addControlsToGroup();
    this.setControlConfigs();
    this.setViewContent();
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  public submit(): void {
    if (this.prescriptionInformationGroup.valid) {
      this.prescriptionInformationService.setFormData(this.prescriptionInformationGroup.value);
      this.workFlowService.navigateToNextStep();
    } else {
      this.prescriptionInformationService.touchForm();
    }
  }

  private setViewContent(): void {
    this.stepContent = this.prescriptionInformationService.stepContent;
    this.uploadDocumentContent = this.prescriptionInformationService.uploadDocumentContent;
    switch (this.workFlowService.selectedDrugName) {
      case 'Elitek': 
        this.drugLinkUrl = this.stepContent.drugLinkUrlElitek
        this.verbiage = `Please see full <a href=${this.stepContent.drugLinkUrlElitek} target="_blank">Prescribing Information</a>, including Boxed WARNING.`
        break;
      case 'Jevtana':
        this.drugLinkUrl = this.stepContent.drugLinkUrlJevtana
        this.showRefillInput = true;
        this.verbiage = `Please see full <a href=${this.stepContent.drugLinkUrlJevtana} target="_blank">Prescribing Information</a>, including Boxed WARNING.`
        break;
      case 'Sarclisa':
        this.drugLinkUrl = this.stepContent.drugLinkUrlSarclisa
        this.showRefillInput = true;
        this.showSpecialtyPharmacyOption = true;
        this.verbiage = `Please see full <a href=${this.stepContent.drugLinkUrlSarclisa} target="_blank">Prescribing Information</a>.`
        break;
      default:
        break;
    }
  }

  private setControlConfigs(): void {
    this.continueButtonText = this.prescriptionInformationService.continueButtonText;
    this.cancelButtonText = this.prescriptionInformationService.cancelButtonText;
    this.prescriptionInformationProductSelectedConfig = this.prescriptionInformationService.productSelectedConfig;
    this.prescriptionInformationIcd10CodeConfig = this.prescriptionInformationService.icd10CodeConfig;
    this.prescriptionInformationDosageConfig = this.prescriptionInformationService.dosageConfig
    this.prescriptionInformationQuantityConfig = this.prescriptionInformationService.quantityConfig
    this.prescriptionInformationRefillsConfig = this.prescriptionInformationService.refillsConfig
    this.prescriptionInformationSpecialtyPharmacyConfig = this.prescriptionInformationService.specialtyPharmacyConfig
  }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }

  public toUpperCase(value: any) {
    if (!value.includes('_')) {
      this.prescriptionInformationGroup.patchValue(
        {
          icd10Code: value.toUpperCase()
        },
        { onlySelf: true, emitEvent: false})
    }
  }
}
