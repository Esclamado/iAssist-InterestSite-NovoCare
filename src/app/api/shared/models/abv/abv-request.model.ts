export interface AbvRequestModel {
    messageId: string;
    patient: AbvPatientRequestModel;
    prescriber: AbvPrescriberRequestModel;
    medication: AbvMedicationRequestModel;
    insurances: AbvInsuranceRequestModel[];
    pharmacy: AbvPharmacyRequestModel;
}

export interface AbvPatientRequestModel {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    state: string;
    postalCode: string;
}

export interface AbvPrescriberRequestModel {
    npi: string;
}

export interface AbvMedicationRequestModel {
    ndc: string;
    longName: string;
    quantity: number;
    daysSupply: number;
    formCode: string;
}

export interface AbvInsuranceRequestModel {
    eligibilityResultId: string;
    formularyId: string;
    payerId: string;
    pbmMemberId: string;
    memberId: string;
}

export interface AbvPharmacyRequestModel {
    storeName: string;
    ncpdpId: string;
    npi: string;
    primaryPhoneNumber: string;
    postalCode: string;
}
