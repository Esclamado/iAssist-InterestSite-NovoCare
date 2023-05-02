import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalRoutingModule } from './legal-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    UiComponentsModule,
    LegalRoutingModule
  ],
  exports: [PrivacyPolicyComponent]
})
export class LegalModule { }
