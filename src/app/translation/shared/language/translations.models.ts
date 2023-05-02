import { DocumentType } from "src/app/api/shared/enums/document-type.enum";

export class StepTranslation {
  header: string;
  description: string;
  requiredText: string;
  back: string;
}

export class ActionTranslation {
  submitBtn: string;
  cancelBtn?: string;
}

export class RadioTranslation {
  label?: string;
  option: { valueString: string; displayedString: string }[];
}

export class SelectBoxTranslation {
  label?: string;
  option: { valueString: string; displayedString: string }[];
  dropdownPlaceHolder?: string;
}

export class InsuranceInformationStaticTranslation {
  completeMessage: string;
  noInsuranceError: string;
  unableToFindInsurance: string;
  foundInsuranceMessage: string;
  insuranceInfoText: string;
  viewInfoText: string;
  uploadedDocs: UploadDocumentContent;
  uploadedDocsInsurance: UploadDocumentInsuranceContent;
  viewInsuranceModal: ViewInsuranceModalTranslation;
}

export class InsuranceInformationFormTranslation {
  view: InsuranceInformationFormViewTranslation;
  insurancePlanType: SelectBoxTranslation;
  pbmName: string;
  placeholderPbmName: string;
  pbmPhoneNumber: string;
  placeholderPbmPhoneNumber: string;
  policyIdNumber: string;
  placeholderPolicyIDNumber: string;
  groupNumber: string;
  placeholderGroupNumber: string;
  binNumber: string;
  pcnNumber: string;
  policyholderRelationshipToPatient: SelectBoxTranslation;
  policyholderDateOfBirth: string;
  policyholderFirstName: string;
  placeholderPolicyholderFirstName: string;
  policyholderLastName: string;
  placeholderPolicyholderLastName: string;
}

export class InsuranceInformationFormViewTranslation {
  header: string;
}

export class InsuranceInformationTranslation {
  step: StepTranslation;
  static: InsuranceInformationStaticTranslation;
  actions: ActionTranslation;
  isInformationCorrect: RadioTranslation;
  hasInsurance: RadioTranslation;
  wantToUpload: RadioTranslation;
  form: InsuranceInformationFormTranslation;
  hasSecondaryInsurance: RadioTranslation;
}

export class UploadDocumentContent {
  uploadLabel: string;
  uploadLabelInsurance: string;
  description: string;
  restrictions: string;
  documentHeader: string;
  documentTypeId: DocumentType;
  documentDescriptor: string;
  deleteButton: string;
  previewButton: string;
  uploadButtonText: string;
  fileSize: string;
  required: string;
}

export class UploadDocumentInsuranceContent {
  uploadLabel: string;
  description: string;
  restrictions: string;
  documentHeader: string;
  documentTypeId: DocumentType;
  documentDescriptor: string;
  deleteButton: string;
  previewButton: string;
  uploadButtonText: string;
  fileSize: string;
  required: string;
}

export class ViewInsuranceModalTranslation {
  viewInsuranceTitle: string;
  insurancePlanType: string;
  pbmName: string;
  placeholderPbmName: string;
  pbmPhone: string;
  placeholderPbmPhone: string;
  policyIDNumber: string;
  placeholderPolicyIDNumber: string;
  groupNumber: string;
  placeholderGroupNumber: string;
  binNumber: string;
  pcnNumber: string;
  policyholderRelationshipToPatient: string;
  policyholderDateOfBirth: string;
  policyholderFirstName: string;
  placeholderPolicyholderFirstName: string;
  policyholderLastName: string;
  placeholderPolicyholderLastName: string;
}

export class FormPlaceholderTranslation {
  dobPlaceholder: string;
}
