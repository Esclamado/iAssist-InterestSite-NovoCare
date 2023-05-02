import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';

@Component({
  selector: 'app-need-assistance',
  templateUrl: './need-assistance.component.html',
  styleUrls: ['./need-assistance.component.scss']
})
export class NeedAssistanceComponent implements OnInit {

  @Input() public title: string;
  @Input() public body: string;
  @Input() public footer: string;
  @Input() public isCentered = false;
  @Input() public isFullWidth = false;

  constructor(public translationService: TranslateContentService,
              public router: Router) { }

  ngOnInit(): void {
    this.title = this.translationService.needAssistanceView.title;
    this.body = this.replacePhoneNumberByTherapy(this.router.url, this.translationService.needAssistanceView);
    this.footer = this.translationService.needAssistanceView.footer;
  }

  replacePhoneNumberByTherapy(url: string, view: any): string {
    const urlArr = url.split('/');
    const placeholder = '$needAssistancePhoneNumber';
    let therapyNumber = view.needAssistancePhoneNumberDefault;
    if (urlArr.length >= 2) {
      const urlTherapy = urlArr[1];
      switch (urlTherapy) {
        case 'rb':
          therapyNumber = view.needAssistancePhoneNumberRb;
          break;
        case 'obes':
          therapyNumber = view.needAssistancePhoneNumberObes;
          break;
        case 'endo':
          therapyNumber = view.needAssistancePhoneNumberGrowth;
          break;
        default:
          break;
      }
    }
    return view.body.replace(placeholder, therapyNumber);
  }

}
