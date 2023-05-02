import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WorkflowService } from '../../../authorization/workflow/workflow.service';
import { TranslateContentService } from '../../../translation/services/translate-content/translate-content.service';

@Component({
  selector: 'app-form-custom-modal',
  templateUrl: './form-custom-modal.component.html',
  styleUrls: ['./form-custom-modal.component.scss']
})
export class FormCustomModalComponent {

  constructor(
    private workFlowService: WorkflowService, 
    public dialogRef: MatDialogRef<FormCustomModalComponent>, 
    @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    public translateContentService: TranslateContentService,
    private router: Router
    ) { }

    onLeave(): void {
      this.closeDialog();
    }
  
    onContinue(): void {
      this.closeDialog();
      this.workFlowService.navigateToNextStep();
    }
  
    private closeDialog() {
      this.dialogRef.close();
    }

}
