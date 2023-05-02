import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { WorkflowService } from '../workflow.service';
import { PricingBenefitService } from './pricing-benefit.service';

@Component({
  selector: 'app-consent',
  templateUrl: './pricing-benefit.component.html',
  styleUrls: ['./pricing-benefit.component.scss']
})
export class PricingBenefitComponent implements OnInit {

  public stepContent: any;
  public actionContent: any;
  public pricingBenefitGroup: FormGroup;

  public submitting = false;
  public drugUrl: string;
  public supportLinkURL: string;

  constructor(
    private pricingBenefitService: PricingBenefitService,
    private workflowService: WorkflowService) { }

  ngOnInit() {
    this.pricingBenefitGroup = this.pricingBenefitService.createGroup();
    this.pricingBenefitService.addControlsToGroup();
    this.subscribeWorkflowLanguage();
    this.drugUrl = this.workflowService.medicationFormData.drugUrl;
  }

  public submit(): void {
    // Exit if already submitting
    if (this.submitting) return;

    if (this.pricingBenefitGroup.invalid) {
      this.pricingBenefitService.touchForm();
    } else {
      this.submitting = true;
      this.workflowService.navigateToNextStep();
    }
  }

  private subscribeWorkflowLanguage(): void {
    this.workflowService.subscribeWorkflowLanguage()
      .subscribe(res => {
        this.setControlConfigs();
        this.setViewContent();
      });
  }

  private setControlConfigs(): void {
  }

  private setViewContent(): void {
    this.stepContent = this.pricingBenefitService.stepContent;
    this.actionContent = this.pricingBenefitService.actionContent;
    this.supportLinkURL = this.pricingBenefitService.supportLinkURL;
  }
}
