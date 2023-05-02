class FactIntakePatientAddress {
  public addressTypeId = 0;
  public levelId = 0;
  public addressLine1: string;
  public addressLine2: string;
  public city: string;
  public stateCode: string;
  public postalCode: string;
  public country: string = null;
  public countryCode: string = null;
}

class FactIntakePatient {
  public patientId: string;
  public firstName: string;
  public lastName: string;
  public middleName: string = null;
  public dateOfBirth: string;
  public gender: string;
  public ssn: number = null;
  public emailAddress: string;
  public isAllowedToEmail: string = null;
  public isUsResident: string = null;
  public preferredLanguage: string = null;
  public sourceOfRecord: string = null;
  public externalId: string = null;
  public grossHouseholdIncome: string = null;
  public householdSize: string = null;
  public caregiverFirstName: string = null;
  public caregiverLastName: string = null;
  public caregiverPhone: string = null;
  public preferredContactType: string;
  public factPatientAddress: FactIntakePatientAddress = new FactIntakePatientAddress();
  public factPatientMobilePhone: FactPatientMobilePhone = null;
  public factPatientHomePhone: FactPatientHomePhone = null;
  public factPatientWorkPhone: FactPatientWorkPhone = null;
  public consents: Array<FactPatientConsent> = [];
  public externalSystems: Array<{}> = null;
  public contactPersons: Array<{}> = null;
  public ageInYears: number = null;
  public ageInMonths: number = null;
  public bestTimeToContact: string = null;
}

class FactIntakeInsurance {
  public eligibilityResultId?: string;
  public levelId?: number;
  public patientId: string = null;
  public insurancePolicyId: string = null;

  public planName?: string = null;
  public insuranceCompanyName?: string = null;
  public policyHolderFirstName?: string = null;
  public policyHolderLastName?: string = null;
  public insuranceTypeId?: number = null;
  public insuranceGroupNumber?: string = null;
  public insuranceMemberNumber?: string = null;
  public insurancePhoneNumber?: FactIntakeInsurancePhone = null;
  public relationshipToMember?: string = null;
  public policyHolderBirthDate?: string = null;

  public pharmacyBenefitPlanTypeId?: number = null;
  public pharmacyBenefitManagerCompanyName?: string = null; // PBM
  public rxBankIdentificationNumber?: string = null; // BIN
  public rxProcessorControlNumber?: string = null; // PCN
  public rxGroupNumber?: string = null;
  public rxMemberNumber?: string = null;
  public pbmPhoneNumber?: FactIntakeInsurancePhone = null;
  public pharmacyBenefitPlanName?: string = null;
  public rxRelationshipToMember?: string = null;
  public rxPolicyHolderBirthDate?: string = null;
  public rxPolicyHolderFirstName?: string = null;
  public rxPolicyHolderLastName?: string = null;
  public rxPersonCode?: string = null;
  public rxPayerId?: string = null;
}

class FactIntake {
  public transactionGroupId: string;
  public documents: Array<FactDocument>;
  public features: Array<{}>;
  public questionSetId: string;
  public accessPointId: number;
  public currentDateTime: string;
  public miscFactItems: Array<Fact> = [];
  public creationSourceId: number = null;
  public organizationId: string = null;
  public journeyId: string = null;
  public workflowId: string = null;
  public serviceTypeId: number = null;
  public transactionGroupRecordId: string = null;
  public linkedTransactionGroupId: string = null;
  public copiedFromTransactionGroupId: string = null;
  public labResults: Array<[]> = null;
  public pharmacy: object = null;
  public practice: FactPractice = null;
  public prescriber: FactIntakePrescriber = null;
  public primaryInsurance: FactIntakeInsurance = null;
  public secondaryInsurance: FactIntakeInsurance = null;
  public tertiaryInsurance: FactIntakeInsurance = null;
  public priorAuthorization: object = null;
  public prescriptions: Array<object> = null;
  public prescription: object = null;
  public electronicPriorAuthorization: object = null;
  public secondaryPrescription: object = null;
  public patient: FactIntakePatient = new FactIntakePatient();
}

class FactPatientMobilePhone {
  public isAllowedToLeaveMessage: boolean;
  public isContactTimeMorning: boolean;
  public isContactTimeAfternoon: boolean;
  public isContactTimeEvening: boolean;
  public phoneLevelId = 0;
  public number = '';
  public ext: string = null;
  public countryCode: string = null;
}

class FactPatientHomePhone {
  public isAllowedToLeaveMessage: boolean;
  public isContactTimeMorning: boolean;
  public isContactTimeAfternoon: boolean;
  public isContactTimeEvening: boolean;
  public phoneLevelId = 1;
  public number = '';
  public ext: string = null;
  public countryCode: string = null;
}

class FactIntakeInsurancePhone {
  public levelId: number = 0;
  public number: string = '';
  public ext: string = null;
  public countryCode: string = null;
}

class FactPatientWorkPhone {
  public isAllowedToLeaveMessage: boolean;
  public isContactTimeMorning: boolean;
  public isContactTimeAfternoon: boolean;
  public isContactTimeEvening: boolean;
  public phoneLevelId = 0;
  public number = '';
  public ext: string = null;
  public countryCode: string = null;
}

class FactPatientConsent {
  public consentName?: string;
  public consentTypeId?: number;
  public consentSourceId?: number;
  public consentStatusId?: number;
  public effectiveDate?: string;
  public expirationDate?: string;
  public receivedDate?: string;
  public consentOptOutDate?: string;
  public signatureOnConsent?: boolean;
  public signatureOnConsentDate?: string;
  public consentProvidedBy?: string;
}

class Fact {
  public factId: string;
  public factValue: string;
  public factValueType?: string;
}

class FactDocument {
  public documentId: string;
  public documentTypeId: number;
  public documentFileName: string;
  public documentDescriptor: string;
}

class FactIntakePrescriber {
  public prescriberId: string = null;
  public firstName: string = null;
  public lastName: string = null;
  public npi: string = null;
  public externalId: string = null;
  public title: string = null;
  public middleName: string = null;
  public drugEnforcementAdminNumber: string = null;
  public suffix: string = null;
  public degree: string = null;
  public specialty: string = null;
  public stateLicenseNumber: string = null;
  public supervisingPhysicianNpi: string = null;
  public role: string = null;
  public surescriptsProviderIdentifier: string = null;
}

class FactPractice {
  practiceId?: string;
  externalId: string;
  practiceName: string;
  practiceCode: string;
  address: FactPracticeAddress;
  phoneNumber: FactPracticePhone;
  faxPhoneNumber: FactPracticeFaxPhone;
}
class FactPracticeAddress {
  addressTypeId: number;
  levelId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateCode: string;
  postalCode: string;
  country: string;
  countryCode: string;
}
class FactPracticePhone {
  levelId: number;
  number: string;
  ext: string;
  countryCode: string;
}
class FactPracticeFaxPhone {
  levelId: number;
  number: string;
  ext: string;
  countryCode: string;
}

export {
  FactIntake,
  Fact,
  FactDocument,
  FactIntakeInsurance,
  FactIntakePrescriber,
  FactPractice,
  FactPracticeAddress,
  FactPracticePhone,
  FactPracticeFaxPhone,
  FactIntakeInsurancePhone
};