import { Injectable, Inject } from '@angular/core';
import { UploadDocumentRequest } from '../../shared/models/documents/upload-doc-request.model';
import { Observable, zip, of, throwError } from 'rxjs';
import { ApplicationConfig } from '../../shared/models/application-config.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private uploadDocumentRoute: string;
    private organizationalBaseAddress : string;
    private transactionalApiBaseAddress : string;

    constructor(
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
        private httpClient: HttpClient,
        private workflowService: WorkflowService
    ) {
        this.uploadDocumentRoute = `${applicationConfig.transactionalApiBaseAddress}document/createdocumentandassociate`;
        this.organizationalBaseAddress = `${applicationConfig.organizationalBaseAddress}`
        this.transactionalApiBaseAddress = `${applicationConfig.organizationalBaseAddress}`
    }

    public uploadAllDocuments(transactionGroupId: string): Observable<string[]> {
        const requests = this.buildUploadRequest(transactionGroupId);
        if (requests.length > 0) {
            return zip(...requests.map(req => of(req).pipe(mergeMap(a => this.uploadDocument(a)))));
        } else {
            return of(null);
        }
    }

    private buildUploadRequest(transactionGroupId: string): UploadDocumentRequest[] {
        const financialUploadedDocuments = this.workflowService.financialUploadedDocuments;
        const uploadedDocuments = this.workflowService.uploadedDocuments;
        const requests: UploadDocumentRequest[] = [];
        if (financialUploadedDocuments) {
            financialUploadedDocuments.forEach(d => {
                requests.push({
                    transactionGroupId,
                    documentFileName: d.fileName,
                    documentData: d.fileData,
                    documentTypeId: d.docTypeId,
                    documentDescriptor: d.docDescriptor
                });
            });
        }
        if (uploadedDocuments) {
            uploadedDocuments.forEach(d => {
                requests.push({
                    transactionGroupId,
                    documentFileName: d.fileName,
                    documentData: d.fileData,
                    documentTypeId: d.docTypeId,
                    documentDescriptor: d.docDescriptor
                });
            });
        }
        return requests;
    }

    public previewDocument(documentId: string): void {
        const documentViewingUri$ = this.getDocumentNonce(documentId).pipe(
            map((nonce: string) => this.getDocumentViewingUrl(documentId, nonce)),
            filter((documentViewingUri: string) => !!documentViewingUri)
        );

        // When the viewing uri comes back, open the window.
        documentViewingUri$.subscribe((documentViewingUri: string) => {
            window.open(documentViewingUri);
        });
    }

    getDocumentNonce(documentId: string): Observable<string> {
        if (!documentId) {
            return throwError('Error while attempting to get document nonce for preview. DocumentId is empty, but it must have a value.');
        }

        const params = new HttpParams().set('api-version', '1.0');
        return this.httpClient.post<string>(`${this.organizationalBaseAddress}document/${documentId}/nonce`, { params });
    }

    getDocumentViewingUrl(documentId: string, nonce: string): string {
        return `${this.transactionalApiBaseAddress}document/${documentId}/content?nonce=${encodeURIComponent(
            nonce
        )}&api-version=2`;
    }

    private uploadDocument(request: UploadDocumentRequest): Observable<string> {
        const params = new HttpParams().append('api-version', '2.0');
        return this.httpClient.post<string>(this.uploadDocumentRoute, request, { params });
    }
}
