export interface PrescriberNpiFormData {
    prescriberNpiNumber?: number;
    prescriberFirstname?:string;
    prescriberLastname?:string;
    prescriberZip?:string;
    prescriberSelected?: string;
}
export interface PrescriberResponseData {
    npi?: string;
    entityTypeCode?: number;
    organizationName?: any;
    lastName?: string;
    firstName?: string;
    prescriberSpecialty?: string;
    taxIdNumber?: number;
    stateNumber?: any;
    namePrefix?: string;
    credentialText?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    countryCode?: string;
    telephoneNumber?: string;
    faxNumber?: any;
    npiDeactivationDate?: any;
  
    firstLineBusinessPracticeLocationAddress?: string;
    secondLineBusinessPracticeLocationAddress?: any;
    businessPracticeLocationAddressCityName?: string;
    businessPracticeLocationAddressStateName?: string;
    businessPracticeLocationAddressPostalCode?: string;
    businessPracticeLocationAddressCountryCode?: string;
    businessPracticeLocationAddressTelephoneNumber?: string;
    businessPracticeLocationAddressFaxNumber?: string;
  
    licenseNumber_1?: string;
    licenseNumberStateCode_1?: string;
    licenseNumber_2?: any;
    licenseNumberStateCode_2?: any;
    licenseNumber_3?: any;
    licenseNumberStateCode_3?: any;
    licenseNumber_4?: any;
    licenseNumberStateCode_4?: any;
    licenseNumber_5?: any;
    licenseNumberStateCode_5?: any;
    licenseNumber_6?: any;
    licenseNumberStateCode_6?: any;
    licenseNumber_7?: any;
    licenseNumberStateCode_7?: any;
    licenseNumber_8?: any;
    licenseNumberStateCode_8?: any;
    licenseNumber_9?: any;
    licenseNumberStateCode_9?: any;
    licenseNumber_10?: any;
    licenseNumberStateCode_10?: any;
    licenseNumber_11?: any;
    licenseNumberStateCode_11?: any;
    licenseNumber_12?: any;
    licenseNumberStateCode_12?: any;
    licenseNumber_13?: any;
    licenseNumberStateCode_13?: any;
    licenseNumber_14?: any;
    licenseNumberStateCode_14?: any;
    licenseNumber_15?: any;
    licenseNumberStateCode_15?: any;
  }