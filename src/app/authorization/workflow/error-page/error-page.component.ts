import { Component, OnInit } from '@angular/core';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  title: string;
  description: string;

  constructor(public translationService: TranslateContentService) { }

  ngOnInit(): void {
    this.setViewContent();
  }

  private setViewContent(): void {
    this.title = this.translationService.errorPage.title;
    this.description = this.translationService.errorPage.description;
  }

}
