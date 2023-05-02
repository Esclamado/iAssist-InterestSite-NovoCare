import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldImplementation } from '../../../form-configuration/shared/models/field-implementation.model';
import { FormItem } from '../../../form-configuration/shared/models/form-item.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements FieldImplementation, OnInit {
  @Input()
  public formItem: FormItem;

  @Input()
  public formGroup: FormGroup;

  @Output()
  public valueChanges: EventEmitter<any> = new EventEmitter<any>();

  public get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  public get isControlInvalid(): boolean {
    return this.formValidationService.isControlInvalid(this.formControl);
  }

  constructor(private formValidationService: FormValidationService) { }

  ngOnInit() {
    this.observeControlChanges();
  }

  public showEmptyStringOption(): boolean {
    return this.formControl.value !== undefined && this.formControl.value !== null;
  }

  public showNullOption(): boolean {
    return this.formControl.value === null;
  }

  public showUndefinedOption(): boolean {
    return this.formControl.value === undefined;
  }

  private observeControlChanges(): void {
    this.formControl.valueChanges.forEach((value: any) => {
      this.valueChanges.emit(value);
    });
  }
}
