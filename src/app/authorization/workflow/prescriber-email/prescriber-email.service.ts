import { Regex } from './../../../api/shared/constants/regex.constant';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormGroup, Validators } from '@angular/forms';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { FormCreationService } from './../../../form-configuration/services/form-creation/form-creation.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrescriberService } from 'src/app/api/services/prescriber/prescriber.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriberEmailService {
  private prescriberEmailControlId = 'prescriberEmail';

  public prescriberEmailGroup: FormGroup;

  constructor(private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private workflowService: WorkflowService,
    private prescriberService: PrescriberService) { }

  public get stepContent(): any {
    return this.translateContentService.prescriberEmail.step;
  }

  public createGroup(): FormGroup {
    return this.prescriberEmailGroup = this.formCreationService.createGroup();
  }

  public get cancelButtonText(): string {
    return this.translateContentService.prescriberEmail.actions.cancelButton;
  }

  public get continueButtonText(): string {
    return this.translateContentService.prescriberEmail.actions.continueButton;
  }

  public get skipLinkText(): string {
    return this.translateContentService.prescriberEmail.actions.skipLink;
  }

  public get prescriberEmailDescriptionText(): string {
    return this.translateContentService.prescriberEmail.body.description;
  }

  public get emailUnregisteredText(): string {
    return this.translateContentService.prescriberEmail.body.emailUnregistered;
  }

  public get kbaLinkText(): string {
    return this.translateContentService.prescriberEmail.body.kbaAuthenticationLinkText;
  }

  public get validationMessage(): any {
    return this.translateContentService.errorMessages;
  }

  public get prescriberEmailConfig(): FormItem {
    return this.formCreationService.createItem(
      this.prescriberEmailControlId,
      this.translateContentService.prescriberEmail.body.email,
      null, null,
      this.translateContentService.prescriberEmail.body.emailPlaceholder
    );
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(this.prescriberEmailGroup, this.prescriberEmailControlId, false, [Validators.required, Validators.email, Validators.pattern(Regex.EMAIL)],
      null, null);
  }

  public setEmailValue(value: string): void {
    this.prescriberEmailGroup.patchValue({"prescriberEmail" : value});
  }

  public isEmailRegisteredWithNPI(npi: string, emailAddress: string): Observable<any> {
    return this.prescriberService.isEmailRegistered(npi, emailAddress);
  }

}
