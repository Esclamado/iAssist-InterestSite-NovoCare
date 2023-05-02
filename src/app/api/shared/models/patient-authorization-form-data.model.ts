
export interface PatientAuthorizationFormData {
    isPresent?: string;
    authorizationOption?: string;
    whoIsAuthorizing?: string;
    legalRepFullName?: string;
    authorizerName?: string;
    signature?: string;
    legalFullName?: string;
    legalSignature?: string;
    relationToPatient?: string;
    witnessAuthorization?: any;
    witnessInitials?: string;
    sendMessageNow?:string;
    patientOrLegalEmail?:string;
    patientOrLegalNumber?:string;
    hipaaConsent?:any;
    tcpaConsent?:any;
    smsConsent?:any;
    marketingMsgConsent?:any;
    fcraConsent?:any;
    asstProgAuthConsent?:any;
    medEnrollAuthConsent?:any;
    consentTextMessage?: any;
    consentPatient?: any;
    consentAuthorization?: any;
    tokenViaEmail?: string;
    tokenViaSMS?: string;
    //not in html but being use somewhere
    patientOrRepresentativeEmail?: string;
    doAgreeAuthorization?: string;
    optIn?: any;
}
