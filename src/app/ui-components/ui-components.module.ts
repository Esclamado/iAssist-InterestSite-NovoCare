import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './page-layout/nav-bar/nav-bar.component';
import { HeaderComponent } from './page-layout/header/header.component';
import { FooterComponent } from './page-layout/footer/footer.component';
import { FormInputComponent } from './form-controls/form-input/form-input.component';
import { FormSelectComponent } from './form-controls/form-select/form-select.component';
import { HeaderTitleComponent } from './page-addons/header-title/header-title.component';
import { StepComponent } from './page-addons/step/step.component';
import { FormSelectSmComponent } from './form-controls/form-select-sm/form-select-sm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRadioComponent } from './form-controls/form-radio/form-radio.component';
import { FormCheckboxComponent } from './form-controls/form-checkbox/form-checkbox.component';
import { FormSignatureComponent } from './form-controls/form-signature/form-signature.component';
import { ArxSignaturePadModule } from '../signature-pad/signature-pad.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FormAlertComponent } from './form-controls/form-alert/form-alert.component';
import { FormCancelModalComponent } from './form-controls/form-cancel-modal/form-cancel-modal.component';
import { ZipCodePipe } from '../api/shared/pipes/zip-code.pipe';
import { SnackbarIconComponent } from '../api/shared/component/snackbar-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { LiveChatComponent } from './page-layout/live-chat/live-chat.component';
import { RouterModule } from '@angular/router';
import { NeedAssistanceComponent } from './page-addons/need-assistance/need-assistance.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SideNavComponent } from './page-layout/side-nav/side-nav.component';
import { StepperComponent } from './page-addons/stepper/stepper.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './page-addons/progress-bar/progress-bar.component';
import { UploadDocumentComponent } from './page-addons/upload-document/upload-document.component';
import { FormNoModalComponent } from './form-controls/form-no-modal/form-no-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormDatePickerComponent } from './form-controls/form-datepicker/form-datepicker.component';
import { ThrobberComponent } from './page-addons/throbber/throbber.component';
import { SnackbarComponent } from './page-addons/snackbar/snackbar.component';
import { DropdownMenuComponent } from './page-addons/dropdown-menu/dropdown-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { BottomExpandingBarComponent } from './page-layout/bottom-expanding-bar/bottom-expanding-bar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BannerComponent } from './page-layout/banner/banner.component';
import { FormCustomModalComponent } from './form-controls/form-custom-modal/form-custom-modal.component';

@NgModule({
    declarations: [
        FooterComponent,
        FormAlertComponent,
        FormCancelModalComponent,
        FormCheckboxComponent,
        FormDatePickerComponent,
        FormInputComponent,
        FormNoModalComponent,
        FormRadioComponent,
        FormSelectComponent,
        FormSelectSmComponent,
        FormSignatureComponent,
        HeaderComponent,
        HeaderTitleComponent,
        LiveChatComponent,
        NavBarComponent,
        NeedAssistanceComponent,
        ProgressBarComponent,
        SideNavComponent,
        SnackbarComponent,
        SnackbarIconComponent,
        StepComponent,
        StepperComponent,
        ThrobberComponent,
        UploadDocumentComponent,
        ZipCodePipe,
        DropdownMenuComponent,
        BottomExpandingBarComponent,
        BannerComponent,
        FormCustomModalComponent
    ],
    entryComponents: [MatDialogModule],
    imports: [
        ArxSignaturePadModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatStepperModule,
        MatToolbarModule,
        MatTooltipModule,
        MatExpansionModule,
        MatMenuModule,
        ReactiveFormsModule,
        RouterModule,
        TextMaskModule
    ],
    exports: [
        FooterComponent,
        FormAlertComponent,
        FormCancelModalComponent,
        FormCustomModalComponent,
        FormCheckboxComponent,
        FormDatePickerComponent,
        FormInputComponent,
        FormRadioComponent,
        FormSelectComponent,
        FormSignatureComponent,
        HeaderComponent,
        HeaderTitleComponent,
        NavBarComponent,
        NeedAssistanceComponent,
        SideNavComponent,
        SnackbarComponent,
        SnackbarIconComponent,
        StepComponent,
        StepperComponent,
        UploadDocumentComponent,
        ZipCodePipe,
        ThrobberComponent,
        BottomExpandingBarComponent,
        BannerComponent
    ]
})
export class UiComponentsModule {}
