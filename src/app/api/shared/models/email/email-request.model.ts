export interface EmailRequestModel {
    senderEmail: string;
    senderEmailName: string;
    recipientEmail: string;
    sendGridTemplateId: string;
    substitutions: {
        createdDate: string;
        createdMonth: string;
        createdYear: string;
        createdTime: string;
    }
}
