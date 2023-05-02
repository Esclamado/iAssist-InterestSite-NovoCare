export interface UploadDocumentRequest {
  transactionGroupId: string;
  documentFileName: string;
  documentTypeId: number;
  documentData: any;
  documentDescriptor?: string;
  content?: string;
}
