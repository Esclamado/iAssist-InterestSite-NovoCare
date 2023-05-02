import { Injectable, Inject } from '@angular/core';
import { AssistRxSupportLanguageComponent } from 'flex-start/lib/takeda/takeda-patient-demographic/components/assist-rx-support-language/assist-rx-support-language.component';
import { SupportedLanguages } from '../../shared/enums/supported-languages.enum';
import { ConsentContent } from '../../shared/language/consent-translations';
import { ErrorMessages } from '../../shared/language/error-messages';
import { FormPlaceholderTranslation, InsuranceInformationTranslation } from '../../shared/language/translations.models';

@Injectable({
  providedIn: 'root'
})
export class TranslateContentService {
  consentContent: ConsentContent;

  constructor( ) {
      this.consentContent = new ConsentContent();
    }

  public get headerIntroStatement(): string {
    return this.consentContent[this.languageSelected].header.introductionStatement;
  }

  public get header(): any {
    return this.consentContent[this.languageSelected].header;
  }

  public get errorMessages(): ErrorMessages {
    return new ErrorMessages();
  }

  public get footer(): any {
    return this.consentContent[this.languageSelected].footer;
  }

  public get formPlaceholder(): FormPlaceholderTranslation {
    return this.consentContent[this.languageSelected].formPlaceholder;
  }

  public get patientView(): any {
    return this.consentContent[this.languageSelected].views.patient;
  }

  public get consentView(): any {
    return this.consentContent[this.languageSelected].views.consent;
  }

  public get confirmationView(): any {
    return this.consentContent[this.languageSelected].views.confirmation;
  }

  public get welcomeView(): any {
    return this.consentContent[this.languageSelected].views.welcome;
  }

  public get availableServicesView(): any {
    return this.consentContent[this.languageSelected].views.availableServices;
  }

  public get patientAssistanceProgramView(): any {
    return this.consentContent[this.languageSelected].views.patientAssistanceProgramView;
  }

  public get prescriberCertificationView(): any {
    return this.consentContent[this.languageSelected].views.prescriberCertificationView;
  }

  public get prescriberNPIView(): any {
    return this.consentContent[this.languageSelected].views.prescriberNPIView;
  }

  public get prescriberNewNPI(): any {
    return this.consentContent[this.languageSelected].views.prescriberNewNPI;
  }

  public get prescriberEmailSearch(): any {
    return this.consentContent[this.languageSelected].views.prescriberEmailSearch;
  }

  public get cancelModalView(): any {
    return this.consentContent[this.languageSelected].views.cancelModal;
  }

  public get providerAttestationView(): any {
    return this.consentContent[this.languageSelected].views.providerAttestationView;
  }
  public get patientDemographics(): any {
    return this.consentContent[this.languageSelected].views.patientDemographics;
  }

  public get pricingBenefit(): any {
    return this.consentContent[this.languageSelected].views.pricingBenefit;
  }

  public get prescriberEmail(): any {
    return this.consentContent[this.languageSelected].views.prescriberEmail;
  }

  public get productSelection(): any {
    return this.consentContent[this.languageSelected].views.productSelection;
  }

  public get prescriberInformationView(): any {
    return this.consentContent[this.languageSelected].views.prescriberInformation;
  }

  public get chatTranslationView(): any {
    return this.consentContent[this.languageSelected].views.chat;
  }

  public get needAssistanceView(): any {
    return this.consentContent[this.languageSelected].views.needAssistance;
  }

  public get snackbarView(): any {
    return this.consentContent[this.languageSelected].views.snackbar;
  }

  public get documentUploadView(): any {
    return this.consentContent[this.languageSelected].views.documentUpload;
  }

  public get bifoldLayout(): any {
    return this.consentContent[this.languageSelected].views.bifoldLayout;
  }

  public get cancelModal(): any {
    return this.consentContent[this.languageSelected].views.cancelModal;
  }

  public get actions(): any {
    return this.consentContent[this.languageSelected].views.actions;
  }

  public get insuranceInformationView(): InsuranceInformationTranslation {
    return this.consentContent[this.languageSelected].views.insuranceInformation;
  }

  public get patientAuthorization(): any {
    return this.consentContent[this.languageSelected].views.patientAuthorization;
  }

  public get facilityInformationView(): any {
    return this.consentContent[this.languageSelected].views.facilityInformation;
  }

  public get prescriptionInformationView(): any {
    return this.consentContent[this.languageSelected].views.prescriptionInformation;
  }

  public get incomeVerificationView(): any {
    return this.consentContent[this.languageSelected].views.incomeVerification;
  }

  public get errorPage(): any {
    return this.consentContent[this.languageSelected].views.errorPage;
  }

  public languageSelected = SupportedLanguages.English;
}
