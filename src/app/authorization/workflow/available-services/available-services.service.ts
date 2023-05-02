import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { WorkflowService } from '../workflow.service';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { checkBoxValueValidator } from 'src/app/form-configuration/shared/validators/check-box.validator';

@Injectable({
  providedIn: 'root'
})
export class AvailableServicesService {

  private controlServiceType = 'serviceTypeSelected';

  public avseGroup: FormGroup;

  constructor(private formCreationService: FormCreationService,
    private translateContentService: TranslateContentService,
    private workflowService: WorkflowService) {
  }

  public get stepContent(): any {
    return this.translateContentService.availableServicesView.step
  }

  public createGroup(): FormGroup {
    return this.avseGroup = this.formCreationService.createGroup();
  }

  public get avseTypeConfig(): FormItem {
    return this.formCreationService.createItem(
      this.controlServiceType,
      this.translateContentService.availableServicesView.serviceType.label,
      this.translateContentService.availableServicesView.serviceType.description,
      this.translateContentService.availableServicesView.serviceType.options
    );
  }

  public get continueButtonText(): string {
    return this.translateContentService.availableServicesView.action.submitBtn;
  }

  public get cancelButtonText(): string {
    return this.translateContentService.availableServicesView.action.cancelBtn;
  }

  public setSelectedServiceType(formValue: any) {
    this.workflowService.selectedServiceType = formValue;
    this.setSelectedOffering();
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(
      this.avseGroup,
      this.controlServiceType,
      false,
      [checkBoxValueValidator],
      null,
      this.formCreationService.createCheckboxFormGroup(this.avseTypeConfig, this.workflowService.selectedServiceType)
    );
  }

  private setSelectedOffering(): void {
    // For setting up the workflow route based on selected services
    if (this.workflowService.selectedServiceType.serviceTypeSelected[3]) this.workflowService.setSelectedOffering(3)

    else if ((this.workflowService.selectedServiceType.serviceTypeSelected[0] ||
      this.workflowService.selectedServiceType.serviceTypeSelected[1] ||
      this.workflowService.selectedServiceType.serviceTypeSelected[2]) &&
      !this.workflowService.selectedServiceType.serviceTypeSelected[3]) this.workflowService.setSelectedOffering(0)

    else if (this.workflowService.selectedServiceType.serviceTypeSelected[4] &&
      !this.workflowService.selectedServiceType.serviceTypeSelected[0] &&
      !this.workflowService.selectedServiceType.serviceTypeSelected[1] &&
      !this.workflowService.selectedServiceType.serviceTypeSelected[2] &&
      !this.workflowService.selectedServiceType.serviceTypeSelected[3]) this.workflowService.setSelectedOffering(4)

    // For setting up the service type to be sent in the API
    let serviceTypeForApi = 'ProgramEnrollment';
    let numberOfSelectedServices = 0;
    for (const property in this.workflowService.selectedServiceType.serviceTypeSelected) {
      this.workflowService.selectedServiceType.serviceTypeSelected[property] && numberOfSelectedServices++;
    }
    (numberOfSelectedServices == 1 && this.workflowService.selectedServiceType.serviceTypeSelected[2]) && (serviceTypeForApi = 'Copay');
    (numberOfSelectedServices == 1 && this.workflowService.selectedServiceType.serviceTypeSelected[3]) && (serviceTypeForApi = 'PAP');
    this.workflowService.serviceTypeForApi = serviceTypeForApi;
  }
}
