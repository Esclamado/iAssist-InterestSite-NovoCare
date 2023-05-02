import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { SupportedLanguages } from 'src/app/translation/shared/enums/supported-languages.enum';
import { ServiceOfferingsEnum } from './service-offerings.enum';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {

  showPills = false;
  isHeaderLinkVisible = false;
  constructor(public translateContentService: TranslateContentService,
              private workflowService: WorkflowService,
              private router: Router) {
    this.workflowService.setWorkflowComplete(false);
    this.workflowService.selectedURL = router.url;
  }

  public onUpdateLanguage(language: SupportedLanguages): void {
    this.workflowService.publishWorkflowLanguage(language);
  }
}
