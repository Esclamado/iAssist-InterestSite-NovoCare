import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldImplementation } from 'src/app/form-configuration/shared/models/field-implementation.model';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-select-sm',
  templateUrl: './form-select-sm.component.html',
  styleUrls: ['./form-select-sm.component.scss']
})
export class FormSelectSmComponent implements FieldImplementation, OnInit {
  @Input()
  public formItem: FormItem;

  @Input()
  public formGroup: FormGroup;

  @Output()
  public valueChanges: EventEmitter<any> = new EventEmitter();

  public get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  constructor() { }

  ngOnInit() {
    this.observeControlChanges();
  }

  private observeControlChanges(): void {
    this.formControl.valueChanges.forEach((value: any) => {
      this.valueChanges.emit(value);
    });
  }
}
