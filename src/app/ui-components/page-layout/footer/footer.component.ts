import { Component, OnInit, Input } from '@angular/core';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input()
  public footerLineContent: any;

  @Input()
  public privacyText: string;

  @Input()
  public privacyLink: string;

  @Input()
  public clientLegalText: string;

  @Input()
  public legalLink: string;

  @Input()
  public contactUs: string;

  @Input()
  public novoNordiskUs: string;

  public clientTermsConditionLink: string

  public termsUseLink: string;

  public liveChat: string;

  public clientPrivacyLink: string;
  public clientContactUsLink: string;
  public clientLine: string;
  public newClientLine: string;
  public additionalClientLine: string;
  public legalText: string;
  public clientNovoNordiskUsLink: string;
  public termsAndCondition: string;
  public clientLineMobile: string;

  constructor(private translateService: TranslateContentService, private router: Router, private workflowService: WorkflowService) {
    this.liveChat = this.translateService.chatTranslationView;
    this.privacyLink = this.translateService.footer.privacyPolicy;
    this.termsUseLink = this.translateService.footer.termAndConditions;
    this.clientContactUsLink = this.translateService.footer.clientContactUsLink
    this.clientPrivacyLink = this.translateService.footer.clientPrivacyLink
    this.clientLine = this.translateService.footer.clientLine
    this.additionalClientLine = this.translateService.footer.additionalClientLine
    this.newClientLine = this.clientLine
    this.legalText = this.translateService.footer.legalText
    this.contactUs = this.translateService.footer.contactUs;
    this.novoNordiskUs = this.translateService.footer.novoNordiskUs;
    this.clientNovoNordiskUsLink = this.translateService.footer.clientNovoNordiskUsLink;
    this.clientTermsConditionLink = this.translateService.footer.termAndConditions;
    this.termsAndCondition = this.translateService.footer.clientLegalText;
    this.clientLineMobile = this.translateService.footer.clientLineMobile;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let insertFooterString = ""
        if (event.url == '/product-selection') {
          insertFooterString = "JEVTANA, ELITEK, SARCLISA,"
        }
        else if (event.url == '/prescription-information') {
          switch (this.workflowService.selectedDrugName) {
            case 'Elitek':
              insertFooterString = "ELITEK,"
              break;
            case 'Jevtana':
              insertFooterString = "JEVTANA,"
              break;
            case 'Sarclisa':
              insertFooterString = "SARCLISA,"
              break;
            default:
              break;
          }
        }
        else {
          insertFooterString = ""
        }
        this.newClientLine = this.clientLine.substring(0, this.clientLine.lastIndexOf("CareASSIST")) + `${insertFooterString} ` + this.clientLine.substring(this.clientLine.lastIndexOf("CareASSIST"));
      });
  }
}
