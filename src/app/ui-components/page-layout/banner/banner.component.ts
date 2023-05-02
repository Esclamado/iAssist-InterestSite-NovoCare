import { TranslateContentService } from './../../../translation/services/translate-content/translate-content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public bannerText : string

  constructor(private translateService : TranslateContentService) {
    this.bannerText = this.translateService.header.bannerText
  }

  ngOnInit(): void {
  }

}
