import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  IFrameComponent,
  IFrameMessageData,
  iframeResizer
} from 'iframe-resizer';
import { ApplicationConfig } from '../../../api/shared/models/application-config.model';
import { WorkflowService } from '../workflow.service';
import { PrescriberNewNpiService } from './prescriber-new-npi.service';

@Component({
  selector: 'app-prescriber-new-npi',
  templateUrl: './prescriber-new-npi.component.html',
  styleUrls: ['./prescriber-new-npi.component.scss']
})
export class PrescriberNewNpiComponent implements OnInit {
  public stepContent: any;

  private iframeRef: IFrameComponent[];
  private maxIframeHeight: number;
  private frameSize: number;

  public enableSubmit: boolean = false;
  public iframeUri: SafeUrl;
  public hcpVerificationActionContent: any;
  public drugUrl: string;

  constructor(
    @Inject('ApplicationConfig') private applicationConfig: ApplicationConfig,
    private prescriberNewNpiService: PrescriberNewNpiService,
    private workFlowService: WorkflowService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.drugUrl = this.workFlowService.medicationFormData.drugUrl;
    if (this.iframeUri) {
      this.iframeUri = '';
    }
    if (this.iframeRef) {
      this.clearIFrameRef();
    }
    this.initIframe();
    this.setViewContent();
  }

  onLoad(): void {
    if (this.iframeRef) {
      return;
    }

    this.iframeRef = iframeResizer(
      {
        autoResize: false,
        checkOrigin: false,
        maxHeight: this.maxIframeHeight,
        scrolling: false,
        sizeHeight: false,
        warningTimeout: 0,
        messageCallback: (message) => {
          this.handleMessage(message);
        }
      },
      '#iframe'
    );

    this.resizeIframe();
  }

  resizeIframe(): void {
    this.maxIframeHeight = this.calcMaxIframeHeight();
    if (this.iframeRef) {
      this.iframeRef.forEach((iframe) => {
        iframe.iFrameResizer.resize();
      });
    }
  }

  initIframe(): void {
    if (this.workFlowService.npi && this.workFlowService.registrationPath) {
      this.iframeUri = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.applicationConfig.hcpVerifyBaseAddress}/${this.workFlowService.registrationPath}/${this.workFlowService.npi}`
      );
    } else {
      this.iframeUri = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.applicationConfig.hcpVerifyBaseAddress}registration?npi=${this.workFlowService.npi}`
      );
    }

    this.resizeIframe();
  }

  private setViewContent(): void {
    this.stepContent = this.prescriberNewNpiService.stepContent;
  }

  private handleMessage(iframeMessage: IFrameMessageData): void {}

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeIframe();
    if (this.iframeRef) {
      this.iframeRef.forEach((iframe) => {
        iframe.iFrameResizer.sendMessage('resize');
      });
    }
  }

  @HostListener('window:message', ['$event'])
  onMessageReceive(event: MessageEvent): void {
    if (event.data.messageType) {
      switch (event.data.messageType) {
        case 'REGISTRATION_SUCCESS':
          this.workFlowService.npi = event.data.npi;
          this.workFlowService.emailAddress = event.data.emailAddress;
          this.workFlowService.navigateToNextStep();
          break;
        case 'CONTENT_HEIGHT_UPDATED':
          this.frameSize = event.data.height;
          this.resizeIframe();
          break;
      }
    }
  }

  private calcMaxIframeHeight(): number {
    return this.frameSize + 60;
  }

  private clearIFrameRef(): void {
    if (this.iframeRef) {
      this.iframeRef.forEach((iframe) => {
        iframe.iFrameResizer.close();
      });
      this.iframeRef = null;
    }
  }
}
