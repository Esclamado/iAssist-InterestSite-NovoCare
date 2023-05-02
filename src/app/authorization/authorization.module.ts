import { PricingBenefitComponent } from './workflow/pricing-benefit/pricing-benefit.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormConfigurationModule } from '../form-configuration/form-configuration.module';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ConfirmationComponent } from './workflow/confirmation/confirmation.component';
import { ConsentComponent } from './workflow/consent/consent.component';
import { VerificationComponent } from './workflow/verification/verification.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { WelcomeComponent } from './workflow/welcome/welcome.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WorkflowCompleteGuard } from './../../guards/workflow-complete-guard';
import { AvailableServicesComponent } from './workflow/available-services/available-services.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PrescriberNpiComponent } from './workflow/prescriber-npi/prescriber-npi.component';
import { PatientDemographicComponent } from './workflow/patient-demographic/patient-demographic.component';
import { PrescriberNewNpiComponent } from './workflow/prescriber-new-npi/prescriber-new-npi.component';
import { PrescriberEmailComponent } from './workflow/prescriber-email/prescriber-email.component';
import { ProviderAttestationComponent } from './workflow/provider-attestation/provider-attestation.component';
import { FlexStartContainerComponent } from './workflow/flex-start-container/flex-start-container.component';
import { FlexStartCoreModule } from 'flex-start';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PatientInformationComponent } from './workflow/patient-information/patient-information.component';
import { PrescriberInformationComponent } from './workflow/prescriber-information/prescriber-information.component';
import { ProductSelectionComponent } from './workflow/product-selection/product-selection.component';
import { DocumentUploadComponent } from './workflow/document-upload/document-upload.component';
import { InsuranceInformationComponent } from './workflow/insurance/insurance-information/insurance-information.component';
import { InsuranceFormComponent } from './workflow/insurance/insurance-form/insurance-form.component';
import { PatientAuthorizationComponent } from './workflow/patient-authorization/patient-authorization.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PrescriberCertificationComponent } from './workflow/prescriber-certification/prescriber-certification.component';
import { PatientAssistanceProgramComponent } from './workflow/patient-assistance-program/patient-assistance-program.component';
import { ViewInsuranceModalComponent } from './workflow/insurance/view-insurance-modal/view-insurance-modal.component';
import { FacilityInformationComponent } from './workflow/facility-information/facility-information.component';
import { PrescriptionInformationComponent } from './workflow/prescription-information/prescription-information.component';
import { IncomeVerificationComponent } from './workflow/income-verification/income-verification.component';
import { ErrorPageComponent } from './workflow/error-page/error-page.component';

@NgModule({
  declarations: [
    WorkflowComponent,
    VerificationComponent,
    ConsentComponent,
    ConfirmationComponent,
    WelcomeComponent,
    AvailableServicesComponent,
    PatientAssistanceProgramComponent,
    PrescriberCertificationComponent,
    PrescriberNpiComponent,
    ProviderAttestationComponent,
    PatientDemographicComponent,
    PricingBenefitComponent,
    PrescriberNewNpiComponent,
    PrescriberEmailComponent,
    FlexStartContainerComponent,
    PrescriberInformationComponent,
    PatientInformationComponent,
    ProductSelectionComponent,
    DocumentUploadComponent,
    InsuranceInformationComponent,
    InsuranceFormComponent,
    PatientAuthorizationComponent,
    ViewInsuranceModalComponent,
    FacilityInformationComponent,
    PrescriptionInformationComponent,
    IncomeVerificationComponent,
    ErrorPageComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiComponentsModule,
    FormConfigurationModule,
    AuthorizationRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    FlexStartCoreModule,
    FlexLayoutModule
  ],
  providers: [WorkflowCompleteGuard]
})
export class AuthorizationModule {}
