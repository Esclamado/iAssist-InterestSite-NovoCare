import { Component, HostListener, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { WorkflowService } from '../workflow.service';
import { PrescriberSearchService } from './prescriber-search.service';

@Component({
  selector: 'app-prescriber-search',
  templateUrl: './prescriber-search.component.html',
  styleUrls: ['./prescriber-search.component.scss']
})
export class PrescriberSearchComponent implements OnInit {

  emailUnregisteredErrorText: string;
  kbaLinkText: string;
  public enableSubmit: boolean = false;
  public iframeUri: SafeUrl;
  public hcpVerificationActionContent: any;

  constructor(private prescriberSearchService: PrescriberSearchService,
    private workFlowService: WorkflowService, private sanitizer: DomSanitizer) {
  }

  
  ngOnInit(): void {
    
  }

  public continueBtnClick(): void {
    // Email Address Value to be fetched from UI component
    this.prescriberSearchService.isEmailRegisteredWithNPI('1508870122', 'g.j@test.local')
      .subscribe((res: any) => {
        if (res) {
          this.emailUnregisteredErrorText = 'Success'
          // To the Patient Demographics page (NOV-650)
        }
        else {
          this.emailUnregisteredErrorText = this.prescriberSearchService.emailUnregisteredText;
          this.kbaLinkText = this.prescriberSearchService.kbaLinkText;
        }
      },
        (e: any) => {
          console.log(e);
        }
      )
  }
}
