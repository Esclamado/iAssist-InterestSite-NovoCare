import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { WorkflowService } from '../workflow.service';

@Injectable({
    providedIn: 'root'
})
export class ProductSelectionService {
    private _index: number;
    public productSelectionGroup: FormGroup;
    public controlProductSelected = 'productSelectedType';


    constructor(
        private formCreationService: FormCreationService,
        private translateContentService: TranslateContentService,
        private workflowService: WorkflowService
    ) {
        this._index = 0;
    }

    public get productSelection(): FormItem {
        return this.formCreationService.createItem(
            this.controlProductSelected,
            this.translateContentService.productSelection.productType.label,
            null,
            this.translateContentService.productSelection.productType.options[this._index],
            null,
            false,
            null
        );
    }

    public get stepContent(): any {
        return this.translateContentService.productSelection.step;
    }

    public createGroup(): FormGroup {
        return (this.productSelectionGroup = this.formCreationService.createGroup());
    }

    public get continueButtonText(): string {
        return this.translateContentService.productSelection.action.submitBtn;
    }

    public get cancelButtonText(): string {
        return this.translateContentService.productSelection.action.cancelBtn;
    }

    public get prescriberButtonText(): string {
      return this.translateContentService.productSelection.prescriberNote;
    }

    public addControlsToGroup(): void {
        this.formCreationService.addControl(
            this.productSelectionGroup,
            this.controlProductSelected,
            false,
            [Validators.required],
            this.workflowService.productFormData.productSelectedType || null
        );
    }

    public setSelectedProduct(formValue: any) {
        this.workflowService.productFormData = formValue;
    }
}
