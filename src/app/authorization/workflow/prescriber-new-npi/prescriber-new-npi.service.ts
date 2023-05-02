import { Injectable } from '@angular/core';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormGroup, Validators } from '@angular/forms'
import { WorkflowService } from '../workflow.service';


@Injectable({
  providedIn: 'root'
})
export class PrescriberNewNpiService {

  private prescriberNewNpiNumber = 'prescriberNewNpiNumber';
  public prescriberGroup: FormGroup;

  constructor( private translateContentService: TranslateContentService, 
    private formCreationService: FormCreationService,
    private workflowService: WorkflowService) { }

  public get stepContent(): any {
    return this.translateContentService.prescriberNewNPI.step
  }

  public createGroup(): FormGroup {
    return this.prescriberGroup = this.formCreationService.createGroup();
  }

  public get prescriberNewNpiConfig(): FormItem {
    return this.formCreationService.createItem(
      this.prescriberNewNpiNumber, this.translateContentService.prescriberNPIView.body.pageHeader, null, null, 
      this.translateContentService.prescriberNPIView.body.textBoxPlaceholder, true,
      this.translateContentService.errorMessages.required, null, {maxLength: 10, isNumeric:true});
  }

  public addControlsToGroup(): void {
    this.formCreationService.addControl(this.prescriberGroup, this.prescriberNewNpiNumber, false, [Validators.required],
      this.workflowService.prescriberNpiFormData.prescriberNpiNumber || null);
  }

  public setFormData(value: any) {
    this.workflowService.prescriberNpiFormData = value;
  }
}
