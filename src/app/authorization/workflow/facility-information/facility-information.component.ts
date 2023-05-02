import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { WorkflowService } from '../workflow.service';
import { FacilityInformationService } from './facility-information.service';

@Component({
  selector: 'app-facility-information',
  templateUrl: './facility-information.component.html',
  styleUrls: ['./facility-information.component.scss']
})
export class FacilityInformationComponent implements OnInit {
  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;
  @Output() continue: boolean;

  public stepContent: any;
  public facilityInformationGroup: FormGroup
  public facilityInformationFacilityTypeConfig: FormItem;
  public facilityInformationFacilityNameConfig: FormItem;
  public facilityInformationAddressLine1Config: FormItem;
  public facilityInformationAddressLine2Config: FormItem;
  public facilityInformationCityConfig: FormItem;
  public facilityInformationStateConfig: FormItem;
  public facilityInformationZipCodeConfig: FormItem;
  public facilityInformationPrimaryContactNameConfig: FormItem;
  public facilityInformationRoleConfig: FormItem;
  public facilityInformationPrimaryPhoneNumberConfig: FormItem;
  public facilityInformationPrimaryFaxNumberConfig: FormItem;
  public facilityInformationPrimaryEmailConfig: FormItem;
  public showPrevious: boolean = true;

  constructor(
    private facilityInformationService: FacilityInformationService,
    private workFlowService: WorkflowService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.facilityInformationGroup = this.facilityInformationService.createGroup();
    this.facilityInformationService.addControlsToGroup();
    this.setControlConfigs();
    this.setViewContent();
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  public submit(): void {
    if (this.facilityInformationGroup.valid) {
      this.facilityInformationService.setFormData(this.facilityInformationGroup.value);
      this.workFlowService.navigateToNextStep();
    } else {
      this.facilityInformationService.touchForm();
    }
  }

  private setViewContent(): void {
    this.stepContent = this.facilityInformationService.stepContent;
  }

  private setControlConfigs(): void {
    this.continueButtonText = this.facilityInformationService.continueButtonText;
    this.cancelButtonText = this.facilityInformationService.cancelButtonText;
    this.facilityInformationFacilityTypeConfig = this.facilityInformationService.facilityTypeConfig;
    this.facilityInformationFacilityNameConfig = this.facilityInformationService.facilityNameConfig;
    this.facilityInformationAddressLine1Config = this.facilityInformationService.addressLine1Config;
    this.facilityInformationAddressLine2Config = this.facilityInformationService.addressLine2Config;
    this.facilityInformationCityConfig = this.facilityInformationService.cityConfig;
    this.facilityInformationStateConfig = this.facilityInformationService.stateConfig;
    this.facilityInformationZipCodeConfig = this.facilityInformationService.zipCodeConfig;
    this.facilityInformationPrimaryContactNameConfig = this.facilityInformationService.primaryContactNameConfig;
    this.facilityInformationRoleConfig = this.facilityInformationService.roleConfig;
    this.facilityInformationPrimaryPhoneNumberConfig = this.facilityInformationService.primaryPhoneNumberConfig;
    this.facilityInformationPrimaryFaxNumberConfig = this.facilityInformationService.primaryFaxNumberConfig;
    this.facilityInformationPrimaryEmailConfig = this.facilityInformationService.primaryEmailConfig;
  }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }

  public onFacilityTypeSelected(value: any) { }
}
