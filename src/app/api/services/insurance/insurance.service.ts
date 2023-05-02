import { Injectable } from '@angular/core';
import { Data, FactIds, InsurancePolicy, State } from 'flex-start';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { PharmacyBenefitPlanType } from '../../shared/enums/pharmacy-benefit-plan-type.enum';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  constructor(private workflowService: WorkflowService,private translateContentService: TranslateContentService,) {}

  public get uploadDocumentContent(): any {
    return this.translateContentService.pricingBenefit.body.uploadDoc;
  }

  setupInsurance(state: State): void {
    const insuranceTypeId = state.data['InsurancePolicy.PharmacyBenefitPlanTypeId']
      ? +state.data['InsurancePolicy.PharmacyBenefitPlanTypeId']
      : state.data['InsurancePolicy.TypeId']
      ? +state.data['InsurancePolicy.TypeId']
      : PharmacyBenefitPlanType.Unknown;

    this.workflowService.insuranceFormData.planName = state.data['InsurancePolicy.PlanName'];
    this.workflowService.insuranceFormData.insuranceType = this.getInsuranceTypeName(insuranceTypeId);
    this.workflowService.insuranceFormData.insuranceTypeId = insuranceTypeId;
    this.workflowService.insuranceFormData.insurancePolicyId = state.data['InsurancePolicy.Id'];

    this.workflowService.insuranceFormData.eligibilityResultId = state.data['InsurancePolicy.EligibilityResultId'];
    if (state.data['InsurancePolicy.RxPolicyHolderFirstName']) {
      // Necessary
      this.workflowService.insuranceFormData.primaryInsurancePayer = `${state.data['InsurancePolicy.RxPolicyHolderFirstName']} ${state.data['InsurancePolicy.RxPolicyHolderLastName']}`;
      this.workflowService.insuranceFormData.insuranceName = state.data['InsurancePolicy.PharmacyBenefitManagerCompanyName'];
      this.workflowService.insuranceFormData.policyHolderName = this.workflowService.insuranceFormData.primaryInsurancePayer;
      this.workflowService.insuranceFormData.policyHolderDateOfBirth = state.data['InsurancePolicy.RxPolicyHolderBirthDate'];

      this.workflowService.insuranceFormData.phoneNumber = state.data['InsurancePolicy.PharmacyBenefitManagerPhoneNumber'];
      this.workflowService.insuranceFormData.policyNumber = state.data['InsurancePolicy.RxMemberNumber'];
      this.workflowService.insuranceFormData.groupNumber = state.data['InsurancePolicy.RxGroupNumber'];
      this.workflowService.insuranceFormData.bin = state.data['InsurancePolicy.RxBankIdentificationNumber'];
      this.workflowService.insuranceFormData.pcn = state.data['InsurancePolicy.RxProcessorControlNumber'];
      this.workflowService.insuranceFormData.relationshipToPatient = state.data['InsurancePolicy.RxRelationshipToMember'];
      this.workflowService.insuranceFormData.payerId = state.data['InsurancePolicy.RxPayerId'];
    } else {
      // Necessary
      this.workflowService.insuranceFormData.primaryInsurancePayer = `${state.data['InsurancePolicy.PolicyHolderFirstName']} ${state.data['InsurancePolicy.PolicyHolderLastName']}`;
      this.workflowService.insuranceFormData.insuranceName = state.data['InsurancePolicy.CompanyName'];
      this.workflowService.insuranceFormData.policyHolderName = this.workflowService.insuranceFormData.primaryInsurancePayer;
      this.workflowService.insuranceFormData.policyHolderDateOfBirth = state.data['InsurancePolicy.PolicyHolderBirthDate'];

      this.workflowService.insuranceFormData.phoneNumber = state.data['InsurancePolicy.PhoneNumber'];
      this.workflowService.insuranceFormData.policyNumber = state.data['InsurancePolicy.MemberNumber'];
      this.workflowService.insuranceFormData.groupNumber = state.data['InsurancePolicy.GroupNumber'];
      this.workflowService.insuranceFormData.relationshipToPatient = state.data['InsurancePolicy.RelationshipToMember'];
    }
  }

  mapEpaSelectedInsuranceData(data: Data): InsurancePolicy {
    const selectedInsurance = {
      insurancePolicyId: data[FactIds.INSURANCE_POLICY_ID],
      insurancePolicyType: parseInt(data[FactIds.INSURANCE_POLICY_TYPE_ID]),
      levelId: parseInt(data[FactIds.INSURANCE_POLICY_LEVEL_ID]),
      effectiveDate: data[FactIds.INSURANCE_POLICY_EFFECTIVE_DATE] ? new Date(data[FactIds.INSURANCE_POLICY_EFFECTIVE_DATE]) : null,
      expirationDate: data[FactIds.INSURANCE_POLICY_EXPIRATION_DATE] ? new Date(data[FactIds.INSURANCE_POLICY_EXPIRATION_DATE]) : null,

      // Eligibility
      eligibilityResultId: data[FactIds.INSURANCE_POLICY_ELIGIBILITY_RESULT_ID],
      pbmMemberId: data[FactIds.INSURANCE_POLICY_MEMBER_NUMBER],
      planName: data[FactIds.INSURANCE_POLICY_PLAN_NAME],
      // Required for paqsfinder call in ePA
      messageId: data[FactIds.INSURANCE_POLICY_RICN],

      // Medical Benefits
      insuranceTypeId: parseInt(data[FactIds.INSURANCE_POLICY_TYPE_ID]),
      insuranceCompanyName: data[FactIds.INSURANCE_POLICY_COMPANY_NAME],
      insuranceGroupNumber: data[FactIds.INSURANCE_POLICY_GROUP_NUMBER],
      insuranceMemberNumber: data[FactIds.INSURANCE_POLICY_MEMBER_NUMBER],
      relationshipToMember: data[FactIds.INSURANCE_POLICY_RELATIONSHIP_TO_MEMBER],
      policyHolderBirthDate: data[FactIds.INSURANCE_POLICY_POLICY_HOLDER_BIRTH_DATE],
      policyHolderFirstName: data[FactIds.INSURANCE_POLICY_POLICY_HOLDER_FIRST_NAME],
      policyHolderLastName: data[FactIds.INSURANCE_POLICY_POLICY_HOLDER_LAST_NAME],
      insurancePhoneNumber: data[FactIds.INSURANCE_POLICY_PHONE_NUMBER],
      insuranceFaxPhoneNumber: data[FactIds.INSURANCE_POLICY_FAX_PHONE_NUMBER],

      // Pharmacy Benefits
      pharmacyBenefitPlanTypeId: parseInt(data[FactIds.INSURANCE_POLICY_PBM_PLAN_TYPE_ID]),
      pharmacyBenefitManagerCompanyName: data[FactIds.INSURANCE_POLICY_PBM_COMPANY_NAME],
      rxPayerId: data[FactIds.INSURANCE_POLICY_RX_PAYERID],
      rxBankIdentificationNumber: data[FactIds.INSURANCE_POLICY_RX_BIN],
      rxProcessorControlNumber: data[FactIds.INSURANCE_POLICY_RX_PCN],
      rxGroupNumber: data[FactIds.INSURANCE_POLICY_RX_GROUP_NUMBER],
      rxMemberNumber: data[FactIds.INSURANCE_POLICY_RX_MEMBER_NUMBER],
      rxRelationshipToMember: data[FactIds.INSURANCE_POLICY_RX_RELATIONSHIP_TO_MEMBER],
      rxPolicyHolderBirthDate: data[FactIds.INSURANCE_POLICY_RX_POLICY_HOLDER_BIRTH_DATE],
      rxPolicyHolderFirstName: data[FactIds.INSURANCE_POLICY_RX_POLICY_HOLDER_FIRST_NAME],
      rxPolicyHolderLastName: data[FactIds.INSURANCE_POLICY_RX_POLICY_HOLDER_LAST_NAME],
      pbmPhoneNumber: data[FactIds.INSURANCE_POLICY_PBM_PHONE_NUMBER]
    };

    return selectedInsurance;
  }

  private getInsuranceTypeName(insuranceType: PharmacyBenefitPlanType): string {
    switch (insuranceType) {
      case PharmacyBenefitPlanType.MedicareAB:
      case PharmacyBenefitPlanType.MedicareB:
      case PharmacyBenefitPlanType.MedicareD:
        return 'Medicare';
      case PharmacyBenefitPlanType.Medicaid:
      case PharmacyBenefitPlanType.ManagedCareMedicaid:
        return 'Medicaid';
      case PharmacyBenefitPlanType.Commercial:
        return 'CommercialOrPrivate';
      case PharmacyBenefitPlanType.NoPharmacyBenefits:
        return 'Uninsured';
      default:
        return 'Other';
    }
  }
}
