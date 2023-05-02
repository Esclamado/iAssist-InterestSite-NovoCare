import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss']
})
export class FormAlertComponent {

    @Input() public controlName = 'alert';
    @Input() public alertContent = '';
    @Input() public type: 'error' | 'warning' | 'success' = 'error';
    @Input() public formGroup: FormGroup;
    @Input() public get showAlert() {
        return this._showAlert;
    }
    public set showAlert(newShowAlert: boolean) {
        this._showAlert =  newShowAlert;

        if (this.formGroup && this._showAlert && this.isError) {
            this.formCreationService.addControl(this.formGroup, this.controlName, false, [Validators.required]);
        } else if (this.formGroup) {
            this.formCreationService.removeControl(this.formGroup, this.controlName);
        }
    }

    public get isError(): boolean {
        return this.type === 'error';
    }

    public get isWarning(): boolean {
        return this.type === 'warning';
    }

    public get isSuccess(): boolean {
        return this.type === 'success';
    }

    private _showAlert = true;

    constructor(private formCreationService: FormCreationService) { }
}
