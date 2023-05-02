import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkflowService } from '../workflow.service';
import { ProductSelectionService } from './product-selection.service';
import { MatDialog } from '@angular/material/dialog';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';

@Component({
    selector: 'app-product-selection',
    templateUrl: './product-selection.component.html',
    styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {
    @Output() continueButtonText: string;
    @Output() cancelButtonText: string;
    @Output() prescriberButtText: string;

    public productSelectionGroup: FormGroup;
    public stepContent: any;
    public productSelectedConfig: FormItem;

    public get productType(): FormControl {
        return this.productSelectionGroup.get('productSelected') as FormControl;
    }

    constructor(
        private workflowService: WorkflowService,
        private productSelectionService: ProductSelectionService,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.productSelectionGroup = this.productSelectionService.createGroup();
        this.productSelectionService.addControlsToGroup();
        this.setButtonText();
        this.setFormPreview();
        this.setViewContent();
        this.setPrescriberNoteText();     
    }

    public cancelBtnClick(): void {
        this.dialog.open(FormCancelModalComponent);
    }

    public continueButtonClick(): void {
        this.productSelectionService.setSelectedProduct(this.productSelectionGroup.value);
        this.setSelectedDrug();
        this.workflowService.navigateToNextStep();
    }

    public onChangeActiveMedGroupIndex($event) {
        this.setFormPreview();
    }

    public onProductSelected(value: any) {}


    private setFormPreview() {
        this.productSelectedConfig = this.productSelectionService.productSelection;
    }

    private setViewContent(): void {
        this.stepContent = this.productSelectionService.stepContent;
    }

    private setButtonText(): void {
        this.continueButtonText = this.productSelectionService.continueButtonText;
        this.cancelButtonText = this.productSelectionService.cancelButtonText;
    }

    private setPrescriberNoteText(): void {
        this.prescriberButtText = this.productSelectionService.prescriberButtonText;
    }

    public setSelectedDrug() {
        switch (this.productSelectionGroup.get(this.productSelectionService.controlProductSelected).value) {
            case 'Elitek':
                this.workflowService.selectedDrugName = 'Elitek';
                this.workflowService.selectedDrug = '00024515010'
                this.workflowService.selectedDrugGenericName = 'rasburicase'
                this.workflowService.selectedDrugFull = 'ELITEK® (rasburicase)'
                break;
            case 'Jevtana':
                this.workflowService.selectedDrugName = 'Jevtana';
                this.workflowService.selectedDrug = '00024582411'
                this.workflowService.selectedDrugGenericName = 'cabazitaxel'
                this.workflowService.selectedDrugFull = 'JEVTANA® (cabazitaxel) injection'
                break;
            case 'Sarclisa':
                this.workflowService.selectedDrugName = 'Sarclisa';
                this.workflowService.selectedDrug = '00024065401'
                this.workflowService.selectedDrugGenericName = 'isatuximab-irfc'
                this.workflowService.selectedDrugFull = 'SARCLISA® (isatuximab-irfc)'
                break;
            default:
                break;
        }
      }
}
