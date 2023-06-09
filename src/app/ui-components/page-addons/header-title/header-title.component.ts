import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit {
  @Input() public logoLink: string;
  @Input() public title: string;

  constructor() { }

  ngOnInit() {
  }

}
