import { ServiceOfferingsEnum } from 'src/app/authorization/workflow/service-offerings.enum';

export const WORKFLOW = [
  {
    workFlowId: ServiceOfferingsEnum.RareBloodPatientAuth,
    route: [
      'rb/ptauth',
      'rb/ptauth/patient-authorization',
      'rb/ptauth/confirmation'
    ],
    steps: [
      'patient-demographics',
      'patient-authorization',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.RareBloodDoc,
    route: [
      'rb/doc',
      'rb/doc/document-upload',
      'rb/doc/confirmation'
    ],
    steps: [
      'patient-demographics',
      'document-upload',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.RareBloodPTAuthandDoc,
    route: [
      'rb/ptauthanddoc',
      'rb/ptauthanddoc/patient-authorization',
      'rb/ptauthanddoc/document-upload',
      'rb/ptauthanddoc/confirmation'
    ],
    steps: [
      'patient-demographics',
      'patient-authorization',
      'document-upload',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.ObesityPatientAuth,
    route: [
      'obes/ptauth',
      'obes/ptauth/patient-authorization',
      'obes/ptauth/confirmation'
    ],
    steps: [
      'patient-demographics',
      'patient-authorization',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.ObesityDoc,
    route: [
      'obes/doc',
      'obes/doc/document-upload',
      'obes/doc/confirmation'
    ],
    steps: [
      'patient-demographics',
      'document-upload',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.ObesityPTAuthandDoc,
    route: [
      'obes/ptauthanddoc',
      'obes/ptauthanddoc/patient-authorization',
      'obes/ptauthanddoc/document-upload',
      'obes/ptauthanddoc/confirmation'
    ],
    steps: [
      'patient-demographics',
      'patient-authorization',
      'document-upload',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.GrowthPatientAuth,
    route: [
      'endo/ptauth',
      'endo/ptauth/patient-authorization',
      'endo/ptauth/confirmation'
    ],
    steps: [
      'patient-demographics',
      'patient-authorization',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.GrowthDoc,
    route: [
      'endo/doc',
      'endo/doc/document-upload',
      'endo/doc/confirmation'
    ],
    steps: [
      'patient-demographics',
      'document-upload',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.GrowthPTAuthandDoc,
    route: [
      'endo/ptauthanddoc',
      'endo/ptauthanddoc/patient-authorization',
      'endo/ptauthanddoc/document-upload',
      'endo/ptauthanddoc/confirmation'
    ],
    steps: [
      'patient-demographics',
      'patient-authorization',
      'document-upload',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.PriorAuthorizationAssistance,
    route: [
      'product-selection',
      'available-services',
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'insurance-information',
      'document-upload',
      'prescriber-certification',
      'confirmation'
    ],
    steps: [
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'insurance-information',
      'document-upload',
      'prescriber-certification',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.ClaimsAppealsAssistance,
    route: [
      'product-selection',
      'available-services',
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'insurance-information',
      'document-upload',
      'prescriber-certification',
      'confirmation'
    ],
    steps: [
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'insurance-information',
      'document-upload',
      'prescriber-certification',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.CareAssistCopayProgram,
    route: [
      'product-selection',
      'available-services',
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'insurance-information',
      'document-upload',
      'prescriber-certification',
      'confirmation'
    ],
    steps: [
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'insurance-information',
      'document-upload',
      'prescriber-certification',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.CareAssistPatientAssistanceProgram,
    route: [
      'product-selection',
      'available-services',
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'prescription-information',
      'insurance-information',
      'income-verification',
      'document-upload',
      'prescriber-certification',
      'confirmation'
    ],
    steps: [
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'prescription-information',
      'insurance-information',
      'income-verification',
      'document-upload',
      'prescriber-certification',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.ResourceSupport,
    route: [
      'product-selection',
      'available-services',
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
      'confirmation'
    ],
    steps: [
      'prescriber-npi',
      'prescriber-information',
      'facility-information',
      'patient-information',
      'patient-authorization',
    ]
  },
  {
    workFlowId: ServiceOfferingsEnum.UploadDocumentation,
    route: [
      'patient-information',
      'document-upload',
      'confirmation'
    ],
    steps: [
      'patient-information',
      'document-upload',
    ]
  }
];
