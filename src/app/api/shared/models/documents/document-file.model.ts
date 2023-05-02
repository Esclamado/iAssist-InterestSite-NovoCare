export interface DocumentFile {
  documentId: string;
  file: File;
  fileName: string;
  fileData?: string;
  docTypeId?: number;
  docDescriptor?: string;
  fileUploadState?: string;
  fileUploadProgress?: number;
  isValidFile?: boolean;
}
