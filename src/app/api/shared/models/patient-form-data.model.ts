import { Gender } from "../enums/gender.enum";

export interface PatientFormData {
    addressLine1?: string;
    addressLine2?: string;
    bestTimeToReach?: string;
    city?: string;
    dateOfBirth?: Date;
    dmdPrescriberName?: string;
    emailAddress?: string;
    firstName?: string;
    gender?: Gender;
    homeNumber?: string;
    lastName?: string;
    mobileNumber?: string;
    okToLeaveMessage?: string;
    postalCode?: string;
    preferredContactType?: string;
    altPhoneType?: string;
    altPhone?: string;
    preferredPharmacy?: string;
    preferredPharmacyIfOther?: string; 
    preferredLanguage?: string; 
    languageIfOther?: string;
    phoneType?: string;
    primaryPhone?: string; 
    stateCode?: string;
    altContactOrCaregiver?:string;
    preferredNumber?:string;
    caregiverFirstName?:string;
    caregiverLastName?:string;
    caregiverEmail?:string;
    caregiverPhone?:string;
    caregiverPhoneType?:string;
    caregiverPatientConsent?:string;
    caregiverRelationshipToPatient?:string;
}