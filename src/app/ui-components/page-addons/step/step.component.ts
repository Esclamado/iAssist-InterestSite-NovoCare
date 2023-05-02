import { Component, Input, ViewEncapsulation } from '@angular/core';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() description: string;
  @Input() descriptionline2: string;
  @Input() drugLink: string;
  @Input() drugLinkUrl: string;
  @Input() homeLink: string;
  @Input() homeLinkUrl: string;
  @Input() requiredText: string;
  @Input() backText: string;
  @Input() importantDrugUrl: string;
  @Input() supportSubtitle: string;
  @Input() supportDescription: string;
  @Input() supportLink: string;
  @Input() supportLinkURL: string;
  @Input() supportSubDescription: string;
  @Input() showBackLink: boolean;
  @Input() showRequired: boolean;
  @Input() showSupportOption: boolean;
  @Input() showNeedAssistance: boolean = true;

  constructor(private workflowService: WorkflowService,) { }

  goBack() {
    this.workflowService.navigateToPreviousStep();
  }

}
