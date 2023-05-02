import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WorkflowService } from '../../../authorization/workflow/workflow.service';
import { TranslateContentService } from '../../../translation/services/translate-content/translate-content.service';

@Component({
  selector: 'app-form-no-modal',
  templateUrl: './form-no-modal.component.html',
  styleUrls: ['./form-no-modal.component.scss']
})
export class FormNoModalComponent {

  constructor(
    private workFlowService: WorkflowService,
    public dialogRef: MatDialogRef<FormNoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translateContentService: TranslateContentService,
    private router: Router
) {}

message = this.data;

onLeave(): void {
    this.closeDialog('yes');
}

onContinue(): void {
    this.closeDialog('no');
}

private closeDialog(buttonClicked: string) {
    this.dialogRef.close(buttonClicked);
}
}
