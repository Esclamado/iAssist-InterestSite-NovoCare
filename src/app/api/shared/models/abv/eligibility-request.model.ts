export interface EligibilityRequestModel {
    nameFirst?: string;
    nameLastOrOrganizationName?: string;
    dob?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    providerNPI?: string;
    providerLastName?: string;
    providerFirstName?: string;
    providerType?: string;
    requestApplicationId?: string;
    isExternal?: boolean
}
