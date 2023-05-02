import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HeaderService } from './header.service';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { ServiceUserSelectionsEnum } from '../../../authorization/workflow/service-userselection.enum';
import { WorkflowService } from '../../../authorization/workflow/workflow.service';
import { TranslateContentService } from '../../../translation/services/translate-content/translate-content.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public introStatement: string;

  @Input()
  public isHeaderLinkVisible = true;

  @Input()
  public showPills = true;

  public showCompanyLogo = true;
  public headerLinkUrl = '';
  public headerLogoLinkUrl: string;

  constructor(public translateContentService: TranslateContentService,
              public workflowService: WorkflowService,
              private router: Router) {
  }

  ngOnInit() {
    this.headerLinkUrl = '//' + this.translateContentService.header.headerLinkUrl;
    this.headerLogoLinkUrl = '//' + this.translateContentService.header.headerLogoLinkUrl;
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      if (event.url == '/') {
        this.showCompanyLogo = false
      }
      else {
        this.showCompanyLogo = true
      }
    });
  }

  toggleSideNav() {
    this.workflowService.setShowNav(true);
  }
}
