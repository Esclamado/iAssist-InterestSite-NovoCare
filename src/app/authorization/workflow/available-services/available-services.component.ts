import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormCancelModalComponent } from '../../../ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { WorkflowService } from '../workflow.service';
import { AvailableServicesService } from './available-services.service';
import { checkBoxValueValidator } from 'src/app/form-configuration/shared/validators/check-box.validator';

@Component({
  selector: 'app-available-services',
  templateUrl: './available-services.component.html',
  styleUrls: ['./available-services.component.scss']
})
export class AvailableServicesComponent implements OnInit {

  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;

  public availableServicesGroup: FormGroup;
  public avseTypeConfig: FormItem;
  public stepContent: any;

  public get serviceTypeSelected(): FormControl {
    return this.availableServicesGroup.get('serviceTypeSelected') as FormControl;
  }

  constructor(private avseService: AvailableServicesService,
    private workFlowService: WorkflowService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.availableServicesGroup = this.avseService.createGroup();
    this.avseService.addControlsToGroup();
    this.setButtonText();
    this.setFormPreview();
    this.setViewContent();
    this.addRequiredValidator([{ name: 'serviceTypeSelected' }]);
   }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }

  public continueButtonClick(): void {
    this.avseService.setSelectedServiceType(this.availableServicesGroup.value);
    this.workFlowService.navigateToNextStep();
  }

  private setViewContent(): void {
    this.stepContent = this.avseService.stepContent;
  }

  private setButtonText(): void {
    this.continueButtonText = this.avseService.continueButtonText;
    this.cancelButtonText = this.avseService.cancelButtonText;
  }

  private setFormPreview() {
    this.avseTypeConfig = this.avseService.avseTypeConfig;
  }

  private addRequiredValidator(controlNameArray: Array<any>) {
    controlNameArray.forEach(element => {
      const formControl = this.availableServicesGroup.get(element.name);
      const controlName = element.name;
      if (controlName === 'serviceTypeSelected') {
        formControl.setValidators(checkBoxValueValidator);
      }
      formControl.updateValueAndValidity();
    });
  }
}
