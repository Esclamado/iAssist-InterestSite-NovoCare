export interface GetPreferredPharmacyModel {
    pharmacyId: string;
    storeName: string;
    ncpdpId: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    primaryPhoneNumber: string;
    faxNumber: string;
    email: string;
    npi: string;
    order: number;
    isPreferred?: boolean;
    exists?: boolean;
}
