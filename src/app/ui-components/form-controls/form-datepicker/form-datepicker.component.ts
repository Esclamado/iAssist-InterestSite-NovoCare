import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormValidationService } from "src/app/form-configuration/services/form-validation/form-validation.service";
import { FieldImplementation } from "src/app/form-configuration/shared/models/field-implementation.model";
import { FormItem } from "src/app/form-configuration/shared/models/form-item.model";
import { AppDateAdapter,APP_DATE_FORMATS } from "./custom-date-format";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";

@Component({
    selector: 'app-form-datepicker',
    templateUrl: './form-datepicker.component.html',
    styleUrls: ['./form-datepicker.component.scss'],
    providers: [
      {
          provide: DateAdapter, useClass: AppDateAdapter
      },
      {
          provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
      }
      ]
  })
  export class FormDatePickerComponent implements FieldImplementation, OnInit, AfterViewInit {

    @Input()
    public formItem: FormItem;

    @Input()
    public formGroup: FormGroup;

    @Output()
    public valueChanges: EventEmitter<any> = new EventEmitter();

    public maxDate = new Date();
    public minDate = new Date(1900,0,1);

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

    public keyPressNumbers(event) {
      var charCode = (event.which) ? event.which : event.keyCode;
      // Only Numbers 0-9
      if ((charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
      } else {
        return true;
      }
    }

    constructor(private formValidationService: FormValidationService) { }

    ngOnInit() {
      this.enablePlaceHolder();
    }

    ngAfterViewInit() {
      this.observeControlChanges();
    }

  public onPaste(e: any) {
    e.preventDefault();
  }

  private observeControlChanges(): void {
    this.formControl.valueChanges.forEach((value: any) => {
      this.valueChanges.emit(value);
    });
  }

  private enablePlaceHolder(): void {
    if (!this.formItem.placeholder) {
      this.formItem.placeholder ="";
    }
  }
}
