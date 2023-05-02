import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';
import { FieldImplementation } from 'src/app/form-configuration/shared/models/field-implementation.model';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss']
})
export class FormRadioComponent implements OnInit, FieldImplementation {
  @Input()
  public formItem: FormItem;

  @Input()
  public formGroup: FormGroup;

  @Input()
  public inline = true;

  @Input()
  public disable: boolean | undefined;

  @Input()
  public radioNobg = false;

  @Output()
  public valueChanges: EventEmitter<any> = new EventEmitter();

  public get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  public get isControlInvalid(): boolean {
    return this.formValidationService.isControlInvalid(this.formControl);
  }

  constructor(private formValidationService: FormValidationService) {
  }

  ngOnInit() {
    this.observeControlChanges();
  }

  private observeControlChanges(): void {
    this.formControl.valueChanges.forEach((value: any) => {
      this.valueChanges.emit(value);
    });
  }

  public getUniqueIdentifier(index: number): string {
    return `${this.formItem.controlName}_${index}`;
  }

}
