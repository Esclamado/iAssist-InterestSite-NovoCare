import { FormGroup } from '@angular/forms';

export function checkBoxValueValidator(group: FormGroup): object {
    const hasValue = Object.keys(group.controls).some(control => group.controls[control].value);

    return hasValue ? null : { required: true };
}
