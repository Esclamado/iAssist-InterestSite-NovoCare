export interface EligibilityResponseModel {
    eligibilityId: string;
    requestInterchangeControlNumber: string;
    responseInterchangeControlNumber: string;
    eligibilityResults: EligibilityResultResponseModel[];
}

export interface EligibilityResultResponseModel {
    messageId: string;
    eligibilityResultId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    gender: string;
    dateOfBirth: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    stateCode: string;
    hasDemographicChange: false;
    payerId: string;
    bankIdentificationNumber: string;
    processorControlNumber: string;
    planName: string;
    memberId: string;
    groupId: string;
    groupName: string;
    pbmMemberId: string;
    pbmName: string;
    pbmPhone: string;
    insuranceName: string;
    insurancePhone: string;
    insuranceFax: string;
    coverages: EligibilityCoverageResponseModel[];
    formularyId: string;
    effectiveDate: string;
    terminationDate: string
}

export interface EligibilityCoverageResponseModel {
    coverageTypeId: number;
    coverageStatusId: number
}
