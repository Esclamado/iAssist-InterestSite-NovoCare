import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WorkflowService } from '../../../authorization/workflow/workflow.service';
import { TranslateContentService } from '../../../translation/services/translate-content/translate-content.service';

@Component({
  selector: 'app-form-cancel-modal',
  templateUrl: './form-cancel-modal.component.html',
  styleUrls: ['./form-cancel-modal.component.scss']
})

export class FormCancelModalComponent {
  constructor(private workFlowService: WorkflowService, public dialogRef: MatDialogRef<FormCancelModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public translateContentService: TranslateContentService,
    private router: Router) { }

  onLeave(): void {
    this.closeDialog();
    this.workFlowService.reset();
    this.workFlowService.navigateToHome();
  }

  onContinue(): void {
    this.closeDialog();
  }

  private closeDialog() {
    this.dialogRef.close();
  }
}
