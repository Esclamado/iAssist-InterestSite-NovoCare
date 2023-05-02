import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormCreationService } from '../../../form-configuration/services/form-creation/form-creation.service';
import { WorkflowService } from '../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class PricingBenefitService {
  public pricingBenefitGroup: FormGroup;

  public get stepContent(): any {
    return this.translateContentService.pricingBenefit.step;
  }

  public get actionContent(): any {
    return this.translateContentService.pricingBenefit.actions;
  }

  public get supportLinkURL(): any {
    const drugSelected = this.workflowService.medicationFormData.selectedDrug;
    switch (drugSelected) {
      case '00078096589':
      case '00078060715':
      case '00078060789':
        return this.translateContentService.pricingBenefit.step.gilenyaCopayLinkURL;
      case '00078097912':
      case '00078097950':
      case '00078098615':
        return this.translateContentService.pricingBenefit.step.mayzentCopayLinkURL;
    }
  }

  constructor(
    private formCreationService: FormCreationService,
    private formValidationService: FormValidationService,
    private translateContentService: TranslateContentService,
    private workflowService: WorkflowService
  ) {}

  public createGroup(): FormGroup {
    return (this.pricingBenefitGroup = this.formCreationService.createGroup());
  }

  public addControlsToGroup(): void {}

  public touchForm(): void {
    this.formValidationService.markControlsAsTouched(this.pricingBenefitGroup, true);
  }
}
