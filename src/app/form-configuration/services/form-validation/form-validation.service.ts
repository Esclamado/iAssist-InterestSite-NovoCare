import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment_ from 'moment/moment';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  public isControlInvalid(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  public markControlsAsTouched(formGroup: FormGroup, touched: boolean): void {
    if (!formGroup) { return; }

    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);

      if (control instanceof FormControl) {
        touched ? control.markAsTouched() : control.markAsUntouched();
      } else if (control instanceof FormGroup) {
        this.markControlsAsTouched(control, touched);
      }
    });
  }

  // TODO: create service that handles custom validators
  public forbidFutureDateValidator(beforeThisDate: string = moment().format()): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (control.value) {
        const dateIsValid = moment(control.value).isValid();

        const isForbidden = dateIsValid ? moment(control.value).isAfter(beforeThisDate) : true;

        return isForbidden ? { forbiddenFutureDate: { value: control.value } } : null;
      }
    };

  }

}
