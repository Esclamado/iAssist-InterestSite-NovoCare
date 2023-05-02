export enum ConsentStatus {
  Unknown = 0,
  Consented = 1,
  Declined = 2,
  Pending = 3,
}

export enum ConsentSource {
  Unknown = 0,
  EInformatix = 1,
  Fax = 2,
  IAssist = 3,
  Verbal = 4,
  Written = 5,
  Electronic = 6,
}

export enum ConsentType {
  Unknown = 0,
  FinancialAssistance = 1,
  Hipaa = 2,
  HubServices = 3,
  Manufacturer = 4,
  Marketing = 5,
  Pharmacy = 6,
  PASS = 7,
}
