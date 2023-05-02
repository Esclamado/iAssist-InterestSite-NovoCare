import { Component, OnInit } from '@angular/core';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  constructor(public translateContentService: TranslateContentService) { }

  ngOnInit(): void {
  }

}
