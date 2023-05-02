import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { SupportedLanguages } from 'src/app/translation/shared/enums/supported-languages.enum';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { WorkflowService } from '../workflow.service';
import { PrescriberInformationService } from './prescriber-information.service';

@Component({
  selector: 'app-prescriber-information',
  templateUrl: './prescriber-information.component.html',
  styleUrls: ['./prescriber-information.component.scss']
})
export class PrescriberInformationComponent implements OnInit {

  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;
  @Output() continue: boolean;

  public stepContent: any;
  public drugUrl: string;
  public isLanguageSpanish: boolean;

  public prescriberInformationGroup: FormGroup;
  public prescriberFirstNameConfig: FormItem;
  public prescriberLastNameConfig: FormItem;
  public prescriberSpecialtyConfig: FormItem;
  public prescriberStateNumberConfig: FormItem;
  public taxIdNumberConfig: FormItem;
  public prescriberNpiConfig: FormItem;

  constructor(public dialog: MatDialog,
    private workflowService: WorkflowService,
    private prescriberInformationService: PrescriberInformationService) {
  }

  ngOnInit(): void {
    this.prescriberInformationGroup = this.prescriberInformationService.createGroup();
    this.prescriberInformationService.addControlsToGroup();
    this.subscribeWorkflowLanguage();
    this.setViewContent();
  }

  private setViewContent(): void {
    this.stepContent = this.prescriberInformationService.stepContent;
  }

  public cancelButtonClick(event: any): void {
    this.dialog.open(FormCancelModalComponent);
  }

  private subscribeWorkflowLanguage(): void {
    this.workflowService.subscribeWorkflowLanguage()
      .subscribe(res => {
        this.isLanguageSpanish = res === SupportedLanguages.Spanish;
        this.setControlConfigs();
        this.setViewContent();
      });
  }


  private setControlConfigs(): void {
    this.continueButtonText = this.prescriberInformationService.continueButtonText;
    this.cancelButtonText = this.prescriberInformationService.cancelButtonText;
    this.prescriberFirstNameConfig = this.prescriberInformationService.prescriberFirstNameConfig;
    this.prescriberLastNameConfig = this.prescriberInformationService.prescriberLastNameConfig;
    this.prescriberSpecialtyConfig = this.prescriberInformationService.prescriberSpecialtyConfig;
    this.prescriberStateNumberConfig = this.prescriberInformationService.prescriberStateNumberConfig;
    this.taxIdNumberConfig = this.prescriberInformationService.taxIdNumberConfig;
    this.prescriberNpiConfig = this.prescriberInformationService.prescriberNpiConfig;
  }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }

  public continueBtnClick(): void {
    this.prescriberInformationService.setFormData(this.prescriberInformationGroup.value);
    this.workflowService.navigateToNextStep();
  }
}
