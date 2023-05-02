import { Injectable } from '@angular/core';
import { InsuranceViewModel } from 'src/app/api/shared/models/abv/insurance-view.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { ViewInsuranceModalTranslation } from 'src/app/translation/shared/language/translations.models';
import { WorkflowService } from '../../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class ViewInsuranceModalService {

  constructor(private translateContentService: TranslateContentService,
              private workflowService: WorkflowService) { }

  public get insuranceFormTranslation(): ViewInsuranceModalTranslation {
    return this.translateContentService.insuranceInformationView.static.viewInsuranceModal;
  }

  public get insuranceData(): InsuranceViewModel {
    const eligibilityResponse = this.workflowService.eligibilityResponseModel;
    if (!eligibilityResponse?.eligibilityResults) {
      return {
        insurancePlanType: '',
        pbmName: '',
        pbmPhone: '',
        policyIDNumber: '',
        groupNumber: '',
        binNumber: '',
        pcnNumber: '',
        policyholderRelationshipToPatient: '',
        policyholderDateOfBirth: '',
        policyholderFirstName: '',
        policyholderLastName: '',
      };
    }
    const result = eligibilityResponse.eligibilityResults[0];
    return {
      insurancePlanType: result.planName || '',
      pbmName: result.pbmName || '',
      pbmPhone: result.pbmPhone || '',
      policyIDNumber: result.memberId || '',
      groupNumber: result.groupId || '',
      binNumber: result.bankIdentificationNumber || '',
      pcnNumber: result.processorControlNumber || '',
      policyholderRelationshipToPatient: '',
      policyholderDateOfBirth: result.dateOfBirth || '',
      policyholderFirstName: result.firstName || '',
      policyholderLastName: result.lastName || '',
    };
  }
}
