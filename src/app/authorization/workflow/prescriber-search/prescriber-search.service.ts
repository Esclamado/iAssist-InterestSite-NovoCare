import { Injectable } from '@angular/core';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormGroup, Validators } from '@angular/forms'
import { WorkflowService } from '../workflow.service';
import { PrescriberService } from '../../../api/services/prescriber/prescriber.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrescriberSearchService {

  private prescriberSearchEmail = 'prescriberSearchEmail';
  private controlMarketingConsent = 'agreeMarketingConsent';
  public prescriberSearchGroup: FormGroup;

  constructor(private translateContentService: TranslateContentService,
    private formCreationService: FormCreationService,
    private workflowService: WorkflowService, private prescriberService: PrescriberService) { }

  public get emailUnregisteredText(): string {
    return this.translateContentService.prescriberEmailSearch.emailUnregistered;
  }

  public get kbaLinkText(): string {
    return this.translateContentService.prescriberEmailSearch.kbaAuthenticationLinkText;
  }

  public isEmailRegisteredWithNPI(npi: string, emailAddress: string): Observable<any> {
    return this.prescriberService.isEmailRegistered(npi, emailAddress);
  }
}
