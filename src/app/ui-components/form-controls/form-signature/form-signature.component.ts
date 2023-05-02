import { FormValidationService } from './../../../form-configuration/services/form-validation/form-validation.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsentService } from 'src/app/authorization/workflow/consent/consent.service';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { ArxSignaturePadComponent } from 'src/app/signature-pad/signature-pad.component';

@Component({
  selector: 'app-form-signature',
  templateUrl: './form-signature.component.html',
  styleUrls: ['./form-signature.component.scss']
})
export class FormSignatureComponent implements OnInit {
  public signatureContent: any;
  @Input() public formItem: FormItem;
  @Input() public formGroup: FormGroup;
  @Input() public name: string;

  @ViewChild('signaturePad', { static: true }) formSignature: ArxSignaturePadComponent;

  constructor(
    private consentService: ConsentService,
    private formValidationService: FormValidationService,
    private workflowService: WorkflowService) { }

  private get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  public get isControlInvalid(): boolean {
    return this.formValidationService.isControlInvalid(this.formControl);
  }

  ngOnInit() {
    this.subscribeWorkflowLanguage();
  }

  private subscribeWorkflowLanguage(): void {
    this.workflowService.subscribeWorkflowLanguage()
      .subscribe(res => {
        this.setViewContent();
      });
  }

  public onTextKeyup(text: string): void {
    this.observeControlChanges();
    if (!text) { this.clear(); }
  }

  public onSignEnd(): void {
    this.observeControlChanges();
  }

  public onClear(): void {
    this.clear();
  }

  private observeControlChanges(): void {
    this.saveSignatureDataToControl();
  }

  private saveSignatureDataToControl(): void {
    this.formControl.setValue(this.getSignatureData());
  }

  private getSignatureData(): string {
    const base64Data = this.formSignature ? this.formSignature.toDataURL() : '';
    // use enum for data:...
    return base64Data.replace('data:image/png;base64,'.toString(), '');
  }

  private clear(): void {
    this.formControl.setValue(null);
  }

  private setViewContent(): void {
    this.signatureContent = this.formItem.text;
  }
}
