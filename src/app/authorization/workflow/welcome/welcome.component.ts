import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCancelModalComponent } from '../../../ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { VerificationService } from '../verification/verification.service';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [VerificationService]
})
export class WelcomeComponent {
  public pesAddressLink: any;
  constructor(@Inject('ApplicationConfig') private applicationConfig: ApplicationConfig,
              public translationService: TranslateContentService,
              private workflowService: WorkflowService,
              public dialog: MatDialog ) {
    this.workflowService.setWorkflowComplete(false);
    this.pesAddressLink = this.applicationConfig.PESAddress;
    this.retrieveContent();
  }

  private retrieveContent(): void {
    const welcomeView = this.translationService.welcomeView;
  }

  public getStarted(service?: string): void {
    if (service == '5') {
      this.workflowService.selectedServiceType = null
    }
    this.workflowService.setSelectedOffering(Number(service));
    this.workflowService.navigateToNextStep();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(FormCancelModalComponent);

    dialogRef.afterClosed().subscribe();
  }
}
