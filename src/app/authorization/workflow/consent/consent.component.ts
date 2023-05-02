import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { WorkflowService } from '../workflow.service';
import { ConsentService } from './consent.service';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {

  public stepContent: any;
  public actionContent: any;
  public signatureContent: any;
  public consentGroup: FormGroup;
  public authorizingConfig: FormItem;
  public agreeConsentConfig: FormItem;
  public fullNameConfig: FormItem;
  public signatureConfig: FormItem;
  public relToPatientConfig: FormItem;

  public fullName = '';
  public displayRelToPatient: boolean;
  public submitting = false;

  constructor(
    private consentService: ConsentService,
    private workflowService: WorkflowService) { }

  ngOnInit() {
    this.consentGroup = this.consentService.createGroup();
    this.consentService.addControlsToGroup();
    this.subscribeWorkflowLanguage();
  }

  public onFullNameValueChange(value: any): void {
    this.fullName = value;
  }

  public onAuthorizingValueChange(value: string): void {
    const displayRelToPatientField = (value === 'Guardian/Caregiver');

    // detect state change
    if (this.displayRelToPatient !== displayRelToPatientField) {
      if (displayRelToPatientField) {
        this.consentService.addRelToPatientControl();
      } else {
        this.consentService.removeRelToPatientControl();
      }
      this.displayRelToPatient = displayRelToPatientField;
    }
  }

  public submit(): void {
      // Exit if already submitting
      if (this.submitting) return;

    if (this.consentGroup.invalid) {
      this.consentService.touchForm();
    } else {
      this.submitting = true;
      this.workflowService.consentFormData = this.consentGroup.value;
      this.submitting = false;
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
    this.authorizingConfig = this.consentService.authorizingConfig;
    this.agreeConsentConfig = this.consentService.agreeConsentConfig;
    this.fullNameConfig = this.consentService.fullNameConfig;
    this.signatureConfig = this.consentService.signatureConfig;
    this.relToPatientConfig = this.consentService.relToPatientConfig;
  }

  private setViewContent(): void {
    this.stepContent = this.consentService.stepContent;
    this.actionContent = this.consentService.actionContent;
    this.signatureContent = this.consentService.signatureContent;
  }
}
