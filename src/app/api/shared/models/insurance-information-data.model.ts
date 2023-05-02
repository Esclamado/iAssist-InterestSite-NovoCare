export interface InsuranceInformationFormData {
  isInformationCorrect?: string
  hasInsurance?: string;
  wantToUpload?: string;
  insuranceFormPrimary?: InsuranceInformationFormFormData;
  hasSecondaryInsurance?: string;
  insuranceFormSecondary?: InsuranceInformationFormFormData;
}

// This interface exists under the above interface but, the name is set based on the id
export interface InsuranceInformationFormFormData {
  insurancePlanType?: string;
  pbmName?: string;
  pbmPhoneNumber?: string;
  policyholderIdNumber?: string;
  groupNumber?: string;
  binNumber?: string;
  pcnNumber?: string;
  policyholderRelationshipToPatient?: string;
  policyholderDateOfBirth?: Date;
  policyholderFirstName?: string;
  policyholderLastName?: string;
}
