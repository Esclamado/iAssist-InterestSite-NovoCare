import { PrescriberEmailService } from './prescriber-email.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import { PrescriberSearchService } from '../prescriber-search/prescriber-search.service';
import { FormCancelModalComponent } from '../../../ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { Regex } from 'src/app/api/shared/constants/regex.constant';
import { FormNoModalComponent } from 'src/app/ui-components/form-controls/form-no-modal/form-no-modal.component';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { ServiceOfferingsEnum } from '../service-offerings.enum';

@Component({
  selector: 'app-prescriber-email',
  templateUrl: './prescriber-email.component.html',
  styleUrls: ['./prescriber-email.component.scss']
})
export class PrescriberEmailComponent implements OnInit, AfterViewInit {
  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;
  @Output() skipLinkText: string;
  @Output() continue: boolean;
  @Output() incorrectEmailText: string;
  @Output() emailBodyText: string;

  public stepContent: any;
  public validationMessage: any;
  public drugUrl: string;
  public emailUnregisteredErrorText: string;
  public showSkip: boolean;
  public prescriberEmailGroup: FormGroup;
  public prescriberEmailConfig: FormItem;
  private agreementDialog: MatDialogRef<FormNoModalComponent>;

  constructor(public dialog: MatDialog, private workflowService: WorkflowService,
    public translationService: TranslateContentService,
    private prescriberSearchService: PrescriberSearchService,
    private prescriberEmailService: PrescriberEmailService) {
    this.continue = false;
  }

  ngOnInit(): void {
    this.prescriberEmailGroup = this.prescriberEmailService.createGroup();
    this.prescriberEmailService.addControlsToGroup();
    this.setControlConfigs();
    this.setViewContent();
    this.drugUrl = this.workflowService.medicationFormData.drugUrl;
    this.emailBodyText = this.prescriberEmailService.prescriberEmailDescriptionText;
  }

  ngAfterViewInit(): void {

  }

  public get prescriberEmail(): FormControl {
    return this.prescriberEmailGroup.get('prescriberEmail') as FormControl;
  }

  private setViewContent(): void {
    this.stepContent = this.prescriberEmailService.stepContent;
    this.validationMessage = this.prescriberEmailService.validationMessage;
  }

  private setControlConfigs(): void {
    this.continueButtonText = this.prescriberEmailService.continueButtonText;
    this.cancelButtonText = this.prescriberEmailService.cancelButtonText;
    this.skipLinkText = this.prescriberEmailService.skipLinkText;
    this.prescriberEmailConfig = this.prescriberEmailService.prescriberEmailConfig;
  }

  public onSkipClick(): void {
    this.agreementDialog = this.dialog.open(FormNoModalComponent, {
      data: this.translationService.prescriberNPIView.cancelModal
    });
    this.agreementDialog.afterClosed().subscribe(buttonClicked => {
      if (buttonClicked === 'yes') {
          this.workflowService.setSelectedOffering(ServiceOfferingsEnum.ENT);
          this.workflowService.navigateToSpecificPath("product-selection");
      }
    });
  }

  public continueButtonClick(event: any): void {
    if (this.emailUnregisteredErrorText) {
      this.kbaAuthenticate();
    } else {
      this.validateEmail();
    }
  }

  private validateEmail() {
    let emailAddress = this.prescriberEmailGroup.get('prescriberEmail').value;
    this.workflowService.emailAddress = emailAddress;
    if (emailAddress) {
      this.prescriberSearchService.isEmailRegisteredWithNPI(this.workflowService.npi, emailAddress)
        .subscribe((res: any) => {
          if (res) {
            this.continue = true;
            this.showSkip = false;
            this.emailUnregisteredErrorText = null;
            this.workflowService.navigateToSpecificPath("product-selection");
          }
          else {
            this.emailUnregisteredErrorText = this.prescriberEmailService.emailUnregisteredText;
            this.prescriberEmailGroup.controls['prescriberEmail'].setErrors({ 'email': true });
            this.continue = true;
            this.showSkip = true;
          }
        },
          (e: any) => {
            this.continue = false;
            this.showSkip = false;
            this.emailUnregisteredErrorText = null;
          }
        );
    }
  }

  public cancelButtonClick(event: any): void {
    this.dialog.open(FormCancelModalComponent);
  }

  public onKeyDown(event: any): void {
    this.emailUnregisteredErrorText = null;
    this.showSkip = false;
    if (Regex.EMAIL.test(event)) {
      this.prescriberEmailGroup.controls['prescriberEmail'].setErrors(null);
      this.continue = true;
    }
    else{
      this.continue = false;
    }
  }

  public kbaAuthenticate(): void {
    this.workflowService.setSelectedOffering(ServiceOfferingsEnum.Gastroenterology);
    this.workflowService.registrationPath = "authorize";
    this.workflowService.navigateToSpecificPath('prescriber-new-npi');
  }
}
