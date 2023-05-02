import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormCancelModalComponent } from 'src/app/ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { WorkflowService } from '../workflow.service';
import { ProviderAttestationService } from './provider-attestation.service';

@Component({
  selector: 'app-provider-attestation',
  templateUrl: './provider-attestation.component.html',
  styleUrls: ['./provider-attestation.component.scss']
})
export class ProviderAttestationComponent implements OnInit, AfterViewInit {

  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;

  public stepContent: any;
  public signatureContent: any;
  public provAttestGroup: FormGroup;
  public agreeConsentConfig: FormItem;
  public signatureConfig: FormItem;
  public fullNameConfig: FormItem;

  public fullName = '';
  public submitting = false;

  constructor(private provideAttestationService: ProviderAttestationService,
              private workFlowService: WorkflowService,
              private changeDetector: ChangeDetectorRef, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setViewContent();   
    this.setControlConfigs(); 
    this.provAttestGroup = this.provideAttestationService.createGroup();
    this.provideAttestationService.addControlsToGroup();
    this.continueButtonText = this.provideAttestationService.continueButtonText;
    this.cancelButtonText = this.provideAttestationService.cancelButtonText;
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();   
  }

  public onFullNameValueChange(value: any): void {
    this.fullName = value;
  }

  private setViewContent(): void {
    this.stepContent = this.provideAttestationService.stepContent;
    this.signatureContent = this.provideAttestationService.signatureContent;
  }

  private setControlConfigs(): void {
    this.agreeConsentConfig = this.provideAttestationService.agreeConsentConfig;
    this.signatureConfig = this.provideAttestationService.signatureConfig;
    this.fullNameConfig = this.provideAttestationService.fullNameConfig;
  }

  public submit(): void {
    // Exit if already submitting
    if (this.submitting) return;

    if (this.provAttestGroup.invalid) {
      this.provideAttestationService.touchForm();
    } else {
      this.submitting = true;
      this.provideAttestationService.submitData(this.provAttestGroup.value)

      this.workFlowService.navigateToNextStep();
        
    }
  }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }
}
