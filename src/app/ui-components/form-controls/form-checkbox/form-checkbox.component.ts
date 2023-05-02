import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidationService } from 'src/app/form-configuration/services/form-validation/form-validation.service';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FormCheckboxComponent implements OnInit {
  @Input()
  public formItem: FormItem;

  @Input()
  public formGroup: FormGroup;

  @Input()
  public withBackground: boolean = false;

  @Input()
  public checkboxTwo: boolean;

  @Input()
  public customConsent: boolean = false;
  
  @Input()
  public disableCheckbox?:boolean;

  @Input()
  public ifShowScrollError?:boolean = true;

  @Output()
  public valueChanges: EventEmitter<any> = new EventEmitter();
  
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

public getUniqueIdentifier(index: number): string {
  return `${this.formItem.controlName}_${index}`;
}

public didScroll(): void {
  if(this.ifShowScrollError) {

  }
}

private observeControlChanges(): void {
  this.formControl.valueChanges.forEach((value: any) => {
    this.valueChanges.emit(value);
  });
}

}

