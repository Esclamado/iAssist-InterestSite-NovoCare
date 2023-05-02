import { Injectable } from '@angular/core';
import { IGetDocumentsService } from 'flex-start';
import { UploadDocumentService } from 'src/app/ui-components/page-addons/upload-document/upload-document.service';
import { DocumentService } from '../../../../api/services/document/document.service';
import { InsuranceService } from '../../../../api/services/insurance/insurance.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FlexStartDocumentDownloadService implements IGetDocumentsService {
  constructor(
    private documentService: DocumentService,
    private uploadService: UploadDocumentService,
    private insuranceService: InsuranceService) {
  }

  downloadDocument(documentName: string, documentIds: string[]): Observable<any> {
    throw new Error('Method not implemented.');
  }

  removeUploadedDocument(documentId: string): Observable<void> {
    return of(this.uploadService.deleteDocument(documentId));
  }

  openDocument(documentId: string): void {
    this.documentService.previewDocument(documentId);
  }

  uploadDocument(incomingFile: File): Observable<string> {
    const documentDetails = {
      documentDescriptor: this.insuranceService.uploadDocumentContent.documentDescriptor,
      documentTypeId: this.insuranceService.uploadDocumentContent.documentTypeId
    };
    this.uploadService.uploadDocument(incomingFile, documentDetails);
    return of(null);
  }
}
