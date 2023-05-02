import { Component, EventEmitter, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import { FieldImplementation } from 'src/app/form-configuration/shared/models/field-implementation.model';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { TextMaskValues } from '../../shared/enums/text-mask-values.enum';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements FieldImplementation, OnInit, AfterViewInit {
  @Input()
  public formItem: FormItem;

  @Input()
  public formGroup: FormGroup;

  @Output()
  public valueChanges: EventEmitter<any> = new EventEmitter();

  public get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  public get isControlInvalid(): boolean {
    return this.formValidationService.isControlInvalid(this.formControl);
  }

  public get maxLength(): number {
    return this.formItem.maskType && this.formItem.maskType.maxLength
      ? this.formItem.maskType.maxLength : null;
  }

  public inputMask: any = false;

  constructor(private formValidationService: FormValidationService) {
  }

  ngOnInit() {
    this.enableMasking();
    this.enablePlaceHolder();
  }

  ngAfterViewInit() {
    this.observeControlChanges();
  }

  private observeControlChanges(): void {
    this.formControl.valueChanges.forEach((value: any) => {
      this.valueChanges.emit(value);
    });
  }

  private enableMasking(): void {
    if (!this.formItem.maskType) {
      return;
    }

    const { isDate, isPhoneNumber, isNumeric, isAlphaNumeric, isPostalCode,  isNPI, isTax, isIcd10Code} = this.formItem.maskType;

    if (isDate) {
      this.inputMask = TextMaskValues.Date;
    }

    if (isPhoneNumber) {
      this.inputMask = TextMaskValues.Phone;
    }

    if (isNumeric) {
      this.inputMask = TextMaskValues.Numeric;
    }

    if (isAlphaNumeric) {
      this.inputMask = TextMaskValues.AlphaNumeric;
    }

    if (isPostalCode) {
      this.inputMask = TextMaskValues.Postal;
    }

    if (isNPI) {
      this.inputMask = TextMaskValues.NPI;
    }

    if (isTax) {
      this.inputMask = TextMaskValues.Tax;
    }

    if (isIcd10Code) {
      this.inputMask = TextMaskValues.ICD10Code;
    }
  }

  private enablePlaceHolder(): void {
    if (!this.formItem.placeholder) {
      this.formItem.placeholder ="";
    }
  }

}
