import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ArxSignaturePadModule } from './signature-pad/signature-pad.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationModule } from './translation/translation.module';
import { LookupModule } from './lookup/lookup.module';
import { ApiModule } from './api/api.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FlexStartCoreModule,
  FlexStartDocumentDownloadModule,
  FlexStartInsuranceModule,
  FlexStartMedicationsModule,
  FlexStartModule,
  FlexStartPatientsModule,
  FlexStartPharmaciesModule,
  FlexStartPrescribersModule,
  FlexStartPricingModule,
  FlexStartPriorAuthorizationModule,
  FlexStartWorkflowModule
} from 'flex-start';
import { FlexStartInsurancesService } from './authorization/workflow/flex-start-container/services/flex-start-insurances.service';
import { FlexStartMedicationsService } from './authorization/workflow/flex-start-container/services/flex-start-medications.service';
import { FlexStartPatientsService } from './authorization/workflow/flex-start-container/services/flex-start-patients.service';
import { FlexStartPharmaciesService } from './authorization/workflow/flex-start-container/services/flex-start-pharmacies.service';
import { FlexStartPrescribersService } from './authorization/workflow/flex-start-container/services/flex-start-prescribers.service';
import { FlexStartPricingService } from './authorization/workflow/flex-start-container/services/flex-start-pricing.service';
import { PriorAuthorizationService } from './authorization/workflow/flex-start-container/services/flex-start-prior-authorization.service';
import { FlexStartWorkflowService } from './authorization/workflow/flex-start-container/services/flex-start-workflow.service';
import { FlowLifecycleHandler } from './authorization/workflow/flex-start-container/services/flow-lifecycle-handler.service';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AuthService } from './core/auth/auth.service';
import { FlexStartDocumentDownloadService } from './authorization/workflow/flex-start-container/services/flex-start-document-download.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './core/url/lower-case-url-serializer.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslationModule,
    LookupModule,
    ApiModule,
    NgxWebstorageModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    FlexLayoutModule,
    FlexStartCoreModule.forRoot(),
    FlexStartModule.forRoot(),
    FlexStartCoreModule.forRoot(),
    FlexStartPatientsModule.forRoot(FlexStartPatientsService),
    FlexStartPrescribersModule.forRoot(FlexStartPrescribersService),
    FlexStartMedicationsModule.forRoot(FlexStartMedicationsService),
    FlexStartPriorAuthorizationModule.forRoot(PriorAuthorizationService),
    FlexStartPharmaciesModule.forRoot(FlexStartPharmaciesService),
    FlexStartInsuranceModule.forRoot(FlexStartInsurancesService),
    FlexStartWorkflowModule.forRoot(FlexStartWorkflowService),
    FlexStartPricingModule.forRoot(FlexStartPricingService),
    FlexStartDocumentDownloadModule.forRoot(FlexStartDocumentDownloadService)
  ],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: UrlSerializer,
        useClass: LowerCaseUrlSerializer
      },
      AuthService,
      FlowLifecycleHandler
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
