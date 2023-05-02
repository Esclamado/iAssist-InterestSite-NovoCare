import { PrescriberEmailComponent } from './workflow/prescriber-email/prescriber-email.component';
import { PricingBenefitComponent } from './workflow/pricing-benefit/pricing-benefit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './workflow/confirmation/confirmation.component';
import { ConsentComponent } from './workflow/consent/consent.component';
import { WelcomeComponent } from './workflow/welcome/welcome.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { WorkflowCompleteGuard } from './../../guards/workflow-complete-guard';
import { AvailableServicesComponent } from './workflow/available-services/available-services.component';
import { PrescriberNpiComponent } from './workflow/prescriber-npi/prescriber-npi.component';
import { PatientDemographicComponent } from './workflow/patient-demographic/patient-demographic.component';
import { PrescriberNewNpiComponent } from './workflow/prescriber-new-npi/prescriber-new-npi.component';
import { ProviderAttestationComponent } from './workflow/provider-attestation/provider-attestation.component';
import { PatientInformationComponent } from './workflow/patient-information/patient-information.component';
import { PrescriberInformationComponent } from './workflow/prescriber-information/prescriber-information.component';
import { ProductSelectionComponent } from './workflow/product-selection/product-selection.component';
import { DocumentUploadComponent } from './workflow/document-upload/document-upload.component';
import { InsuranceInformationComponent } from './workflow/insurance/insurance-information/insurance-information.component';
import { PrescriberCertificationComponent } from './workflow/prescriber-certification/prescriber-certification.component';
import { PatientAuthorizationComponent } from './workflow/patient-authorization/patient-authorization.component';
import { PatientAssistanceProgramComponent } from './workflow/patient-assistance-program/patient-assistance-program.component';
import { FacilityInformationComponent } from './workflow/facility-information/facility-information.component';
import { PrescriptionInformationComponent } from './workflow/prescription-information/prescription-information.component';
import { IncomeVerificationComponent } from './workflow/income-verification/income-verification.component';
import { ErrorPageComponent } from './workflow/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
    children: [
      {
        path: '',
        pathMatch: '',
        component: ErrorPageComponent
      },
      {
        path: 'consent',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'confirmation',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'available-services',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'pap',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'prescriber-npi',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'provider-attestation',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'patient-demographics',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'pricing-benefit',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'prescriber-certification',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'prescriber-new-npi',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'prescriber-email',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'prescriber-information',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'patient-information',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'product-selection',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'document-upload',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'insurance-information',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'endo/ptauth',
        component: PatientDemographicComponent,
      },
      {
        path: 'endo/ptauth/patient-authorization',
        component: PatientAuthorizationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'endo/ptauth/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'endo/ptauthanddoc',
        component: PatientDemographicComponent,
      },
      {
        path: 'endo/ptauthanddoc/patient-authorization',
        component: PatientAuthorizationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'endo/ptauthanddoc/document-upload',
        component: DocumentUploadComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'endo/ptauthanddoc/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'endo/doc',
        component: PatientDemographicComponent,
      },
      {
        path: 'endo/doc/document-upload',
        component: DocumentUploadComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'endo/doc/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'rb/ptauth',
        component: PatientDemographicComponent
      },
      {
        path: 'rb/ptauth/patient-authorization',
        component: PatientAuthorizationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'rb/ptauth/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'rb/ptauthanddoc',
        component: PatientDemographicComponent
      },
      {
        path: 'rb/ptauthanddoc/patient-authorization',
        component: PatientAuthorizationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'rb/ptauthanddoc/document-upload',
        component: DocumentUploadComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'rb/ptauthanddoc/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'rb/doc',
        component: PatientDemographicComponent
      },
      {
        path: 'rb/doc/document-upload',
        component: DocumentUploadComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'rb/doc/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'obes/ptauth',
        component: PatientDemographicComponent,
      },
      {
        path: 'obes/ptauth/patient-authorization',
        component: PatientAuthorizationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'obes/ptauth/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'obes/ptauthanddoc',
        component: PatientDemographicComponent,
      },
      {
        path: 'obes/ptauthanddoc/patient-authorization',
        component: PatientAuthorizationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'obes/ptauthanddoc/document-upload',
        component: DocumentUploadComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'obes/ptauthanddoc/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'obes/doc',
        component: PatientDemographicComponent,
      },
      {
        path: 'obes/doc/document-upload',
        component: DocumentUploadComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'obes/doc/confirmation',
        component: ConfirmationComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'patient-authorization',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'facility-information',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'income-verification',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      {
        path: 'prescription-information',
        component: ErrorPageComponent,
        canActivate: [WorkflowCompleteGuard]
      },
      { path: '**', component: ErrorPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
