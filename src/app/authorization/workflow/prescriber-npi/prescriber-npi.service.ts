import { Injectable } from '@angular/core';
import { FormItem, FormOption } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormGroup, Validators } from '@angular/forms'
import { WorkflowService } from '../workflow.service';
import { Regex } from 'src/app/api/shared/constants/regex.constant';

@Injectable({
  providedIn: 'root'
})
export class PrescriberNpiService {

  private prescriberNpiNumber = 'prescriberNpiNumber';
  private prescriberFirstname = 'prescriberFirstname';
  private prescriberLastname = 'prescriberLastname';
  private prescriberZip = 'prescriberZip';
  public controlPrescriberSelected = 'prescriberSelected';
  public prescriberInfo: FormOption[] = [];
  public prescriberNpiGroup: FormGroup;

  constructor(private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private workflowService: WorkflowService) {
  }

  public get stepContent(): any {
    return this.translateContentService.prescriberNPIView.step
  }

  public createGroup(): FormGroup {
    return this.prescriberNpiGroup = this.formCreationService.createGroup();
  }

  public get continueButtonText(): string {
    return this.translateContentService.prescriberNPIView.action.submitBtn;
  }

  public get cancelButtonText(): string {
    return this.translateContentService.prescriberNPIView.action.cancelBtn;
  }

  public get skipLinkText(): string {
    return this.translateContentService.prescriberNPIView.action.skipLink;
  }

  public get invalidNpiMessage(): string {
    return this.translateContentService.prescriberNPIView.body.invalidNpiMessage;
  }
  public get npiValidationMessage(): string {
    return this.translateContentService.prescriberNPIView.body;
  }

  public get npiRegisteredMessage(): string {
    return this.translateContentService.prescriberNPIView.body.registeredNPI;
  }

  public get npiNonRegisteredMessage(): string {
    return this.translateContentService.prescriberNPIView.body.nonRegisteredNPI;
  }

  public get validationMessage(): any {
    return this.translateContentService.errorMessages;
  }

  public get snackbarMessage(): any {
    return this.translateContentService.snackbarView;
  }

  public prescriberSelection(): FormItem {
    return this.formCreationService.createItem(
      this.controlPrescriberSelected,
      null,
      null,
      this.prescriberInfo,
      null,
      false,
      null
    );
  }

  public get prescriberNpiNumberConfig(): FormItem {
    return this.formCreationService.createItem(
      this.prescriberNpiNumber, this.translateContentService.prescriberNPIView.body.pageHeader, null, null,
      this.translateContentService.prescriberNPIView.body.textBoxPlaceholder, true,
      null, null, {maxLength: 10, isNumeric: true});
  }

  public get prescriberFirstnameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.prescriberFirstname, 
      this.translateContentService.prescriberNPIView.info.firstName, 
      null, 
      null,
      this.translateContentService.prescriberNPIView.info.firstNameTextBoxPlaceholder, 
      true,
      this.translateContentService.errorMessages.firstNameInvalid, 
      null, 
      {maxLength:35}
    );
  }

  public get prescriberLastnameConfig(): FormItem {
    return this.formCreationService.createItem(
      this.prescriberLastname, 
      this.translateContentService.prescriberNPIView.info.lastName, 
      null, 
      null,
      this.translateContentService.prescriberNPIView.info.lastNameTextBoxPlaceholder, 
      true,
      this.translateContentService.errorMessages.lastNameInvalid, 
      null, 
      {maxLength:35}
    );
  }

  public get prescriberZipConfig(): FormItem {
    return this.formCreationService.createItem(
      this.prescriberZip, 
      this.translateContentService.prescriberNPIView.info.zip, 
      null, 
      null,
      this.translateContentService.prescriberNPIView.info.zipTextBoxPlaceholder, 
      true,
      this.translateContentService.errorMessages.zipInvalid, 
      null, 
      {maxLength: 5, isNumeric: true}
    );
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(this.prescriberNpiGroup, this.prescriberNpiNumber, false, [Validators.required, Validators.pattern(Regex.NPI)],
      this.workflowService.prescriberNpiFormData.prescriberNpiNumber || null);

    this.formCreationService.addControl(
      this.prescriberNpiGroup, 
      this.prescriberFirstname, 
      false, 
      [
        Validators.required, 
        Validators.pattern(Regex.ALPHA_ONLY)
      ],
      this.workflowService.prescriberNpiFormData.prescriberFirstname || null
      );

    this.formCreationService.addControl(
      this.prescriberNpiGroup, 
      this.prescriberLastname, 
      false, 
      [
        Validators.required, 
        Validators.pattern(Regex.ALPHA_ONLY)
      ],
    this.workflowService.prescriberNpiFormData.prescriberLastname || null
    );

    this.formCreationService.addControl(
      this.prescriberNpiGroup, 
      this.prescriberZip, 
      false, 
      [Validators.required],
      this.workflowService.prescriberNpiFormData.prescriberZip || null
    );

    this.formCreationService.addControl(
      this.prescriberNpiGroup,
      this.controlPrescriberSelected,
      false,
      [Validators.required],
      this.workflowService.prescriberNpiFormData.prescriberSelected
    );
  }

  public setFormData(value: any) {
    this.workflowService.prescriberNpiFormData = value;
  }
}
