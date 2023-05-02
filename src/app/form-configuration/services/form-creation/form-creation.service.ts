import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormItem, FormOption, MaskType } from '../../shared/models/form-item.model';
import { checkBoxValueValidator } from '../../shared/validators/check-box.validator';

@Injectable({
    providedIn: 'root'
})
export class FormCreationService {

    constructor(
        private formBuilder: FormBuilder,
        private translateService: TranslateContentService
    ) { }

    public createItem(
        controlName: string,
        text?: string,
        optionalText?: string,
        option?: Array<FormOption>,
        placeholder?: string,
        required?: boolean,
        errorMessages?: object,
        description?: string,
        maskType?: MaskType,
        tooltip?: string
    ): FormItem {
        return new FormItem(this.translateService, controlName, text, optionalText, placeholder, option, required, errorMessages, description,
            maskType, tooltip);
    }

    public createGroup(extra?: object): FormGroup {
        return this.formBuilder.group({}, extra);
    }

    public addControl(
        formGroup: FormGroup,
        name: string,
        disabled: boolean,
        validators: Array<ValidatorFn>,
        value?: any,
        controlGroup?: FormGroup): void {
        formGroup.addControl(name, controlGroup ||
            this.formBuilder.control({ disabled, value }, validators));
    }

    public removeControl(formGroup: FormGroup, controlName: string): void {
        formGroup.removeControl(controlName);
    }

    public createCheckboxFormGroup(formItem: FormItem, value: any): FormGroup {
        const extra = formItem.required ? { validator: checkBoxValueValidator } : null;

        let valueArray = [];
        if (value.serviceTypeSelected) {

            valueArray = Object.keys(value.serviceTypeSelected).map((key) => value.serviceTypeSelected[key]);
        }

        const newGroup = this.createGroup(extra);

        if (!formItem.option) {
            return newGroup;
        }
        
        formItem.option.forEach((optionObject, index) => {
            newGroup.addControl(optionObject.valueString, this.formBuilder.control({ disabled: null, value: valueArray[index] || null }));
        });

        return newGroup;
    }

    public createCheckboxConsentFormGroup(formItem: FormItem): FormGroup {
        const extra = formItem.required ? { validator: checkBoxValueValidator } : null;

        const newGroup = this.createGroup(extra);

        if (!formItem.option) {
            return newGroup;
        }

        formItem.option.forEach((optionObject, index) => {
            newGroup.addControl(optionObject.valueString, this.formBuilder.control({ disabled: null, value: null }));
        });

        return newGroup;
    }

    public modifyValidators(formGroup: FormGroup, name: string, validators: ValidatorFn[]) {
        const control = formGroup.controls[name];
        control.setValidators(validators);
        control.setErrors(null);
        formGroup.updateValueAndValidity();
    }

    public restoreForm(formGroup: FormGroup, oldData: any) {
        const keys = Object.keys(oldData);
        // tslint:disable-next-line: forin
        for (const index in keys) {
            const patch = {};
            patch[keys[index]] = oldData[keys[index]];
            formGroup.patchValue(patch);
        }
    }

    public getFormControlValue(formGroup: FormGroup, controlName: string): any {
        return formGroup.value[controlName];
    }
}
