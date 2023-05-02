export class DocumentRequest {
  public transactionGroupId: string;
  public templateDocumentId: string;
  public formData: {
    data: {};
  };
  public documentName?: string = undefined;
  public contextData: object = {};
  public flatten = true;
}

export class DocumentRequestImage {
  '@type': string;
  'value': string;
}