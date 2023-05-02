import { Injectable } from '@angular/core';
import { DocumentFile } from '../../../api/shared/models/documents/document-file.model';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {
  public fileList: DocumentFile[] = [];
  private maxFileSizeInKb : number = 20000;
  private validFileTypes : string[] = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

  constructor(private workflowService: WorkflowService, private translateContentService: TranslateContentService) { }

  public uploadDocument(file: File, details: { documentDescriptor: string, documentTypeId: number }): DocumentFile {
    const fileId = Math.random().toString(36).substring(7);
    const reader = new FileReader();
    const doc : DocumentFile = {
      documentId: fileId,
      fileName: this.fixFileName(file.name),
      file,
      docTypeId: details.documentTypeId,
      docDescriptor: details.documentDescriptor
    };
    reader.readAsDataURL(file);

    reader.onload = (() => {
      doc.fileData = (reader.result as string).split(',')[1];
      this.workflowService.uploadedDocuments.push(doc);
      this.fileList = this.workflowService.uploadedDocuments;
    });

    var sizeInKb = Math.round(file.size / 1024);
    var validType = this.validFileTypes.includes(file.type);
    doc.isValidFile = sizeInKb > this.maxFileSizeInKb || !validType;

    return doc
  }

  public deleteDocument(documentId: string): void {
    const deleteItem = this.workflowService.uploadedDocuments.findIndex(d => d.documentId === documentId);

    if (deleteItem >= 0) {
      this.workflowService.uploadedDocuments.splice(deleteItem, 1);
    }

    this.fileList = this.workflowService.uploadedDocuments;
  }

  public deleteAllDocuments(): void {
    this.workflowService.uploadedDocuments = [];
    this.fileList = this.workflowService.uploadedDocuments;
  }

  public setFileList(): void {
    this.fileList = this.workflowService.uploadedDocuments;
  }

  private fixFileName(fileName: string): string {
    const sections = fileName.split('.');
    if (sections.length > 1) {
      const extension = sections[sections.length - 1];
      let newFileName = sections[0];
      for (let i = 1; i < sections.length - 1; i++) {
        newFileName += '.' + sections[i];
      }
      return newFileName.substring(0, 90) + '.' + extension;
    }
    else {
      return fileName.substring(0, 96);
    }
  }

  public get snackbarDocumentUpload(): string {
    return this.translateContentService.patientAuthorization.snackbarErrorDocumentUpload;
  }
}
