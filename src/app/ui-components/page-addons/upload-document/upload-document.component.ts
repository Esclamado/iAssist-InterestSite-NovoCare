import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { FlexStartStepHeadersModule } from 'flex-start';
import { MIME_TYPES_ARR } from 'src/app/api/shared/constants/mime-types.constants';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { DocumentFile } from '../../../api/shared/models/documents/document-file.model';
import { UploadDocumentService } from './upload-document.service';

const MAX_TOTAL_FILE_SIZE = 20971520;
const MAX_FILE_SIZE = 4718592;
@Component({
    selector: 'app-upload-document',
    templateUrl: './upload-document.component.html',
    styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {
    @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef;

    @Input() public uploadDocumentContent: any;
    @Output() isDocumentFileInValid = new EventEmitter<any>();

    @Input()
    public insurancePage = false;

    public progressValue: number;
    public uploadState: string;
    public displayRestrictionsError: boolean = false;
    private invalidUpload: string = 'warn';
    private validUpload: string = 'accent';
    private snackbarDocumentUpload: string;
    private invalidDocumentId: number;

    public get uploadedDocuments(): DocumentFile[] {
        return this.uploadDocumentService.fileList;
    }

    constructor(private uploadDocumentService: UploadDocumentService, private workflowService: WorkflowService) {
        this.progressValue = 0;
    }

    ngOnInit(): void {
        this.uploadDocumentService.setFileList();
    }

    ngOnDestroy(): void{
        this.deleteAllDocuments();
    }


    public uploadDocument(): void {
        this.fileUpload.nativeElement.click();
    }

    public async onFileSelect(files: File[]): Promise<void> {
        const documentDetails = {
            documentDescriptor: this.uploadDocumentContent.documentDescriptor,
            documentTypeId: this.uploadDocumentContent.documentTypeId
        };
        for (const file of files) {
            this.displayRestrictionsError = false;
            this.snackbarDocumentUpload = this.uploadDocumentService.snackbarDocumentUpload;
            const doc = this.uploadDocumentService.uploadDocument(file, documentDetails);

            if (!doc.isValidFile) {
              let hasInvalid = this.uploadedDocuments.findIndex( item => item.isValidFile == true );
              if (hasInvalid < 0) {
                this.displayRestrictionsError = true;
                this.isDocumentFileInValid.emit(this.displayRestrictionsError);
              }
                await this.UploadAnimation(doc);
                this.invalidDocumentId = this.uploadedDocuments.length;

                // accent theme indicates succesfull upload
                this.uploadState = this.validUpload;
                doc.fileUploadState = this.validUpload;
            } else {
                this.displayRestrictionsError = false;
                this.isDocumentFileInValid.emit(this.displayRestrictionsError);

                setTimeout(() => {
                  this.deleteDocument(doc.documentId);
                }, 5000);

                this.progressValue = 100;
                this.uploadState = this.invalidUpload;

                // warn theme indicates invalid upload
                doc.fileUploadProgress = 100;
                doc.fileUploadState = this.invalidUpload;

                this.workflowService.openSnackBar(this.snackbarDocumentUpload);
            }
        }
        this.fileUpload.nativeElement.value = [];
    }

    public deleteDocument(documentId: string): void {
        this.uploadDocumentService.deleteDocument(documentId);
        let hasInvalid = this.uploadedDocuments.findIndex( item => item.isValidFile == true );

        if ((hasInvalid < 0) && this.uploadedDocuments.length > 0) {
          this.displayRestrictionsError = true;
          this.isDocumentFileInValid.emit(this.displayRestrictionsError);
        } else {
          this.displayRestrictionsError = false;
          this.isDocumentFileInValid.emit(this.displayRestrictionsError);
        }
    }

    public deleteAllDocuments(): void {
        this.uploadDocumentService.deleteAllDocuments();
    }

    public preview(documentId: string): void {
        const file = this.uploadDocumentService.fileList.filter(doc => {
            return doc.documentId === documentId;
        })[0].file;

        const pdfContentUrl = URL.createObjectURL(file);
        window.open(pdfContentUrl);
    }

    private async UploadAnimation(doc: DocumentFile) {
        this.uploadState = 'primary';
        for (let i = 0; i <= 100; i += 10) {
            await this.UploadFakeDelay(100);

            this.progressValue = i;
            doc.fileUploadProgress = i;
        }
    }

    private async UploadFakeDelay(ms: number) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}
