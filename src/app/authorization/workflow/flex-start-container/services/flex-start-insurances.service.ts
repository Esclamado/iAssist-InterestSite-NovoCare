import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { isEqual } from 'date-fns';
import {
    CreateInsurancePolicyRequest,
    GetEligibilityRequest,
    GetEligibilityResponse,
    InsurancePolicy,
    InsurancePolicyResponse,
    InsuranceService,
    UpdateInsurancePolicyRequest
} from 'flex-start';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';
import { v4 as newId } from 'uuid';
import { WorkflowService } from '../../workflow.service';

@Injectable({
    providedIn: 'root'
})
export class FlexStartInsurancesService implements InsuranceService {
    private readonly _baseUrl: string;
    private readonly _patientsUrl: string;

    constructor(
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
        private _http: HttpClient,
        private _workflowService: WorkflowService
    ) {
        this._baseUrl = `${applicationConfig.organizationalBaseAddress}integrations`;
        this._patientsUrl = `${applicationConfig.organizationalBaseAddress}patients`;
    }

    create(insurance: CreateInsurancePolicyRequest): Observable<InsurancePolicyResponse> {
        const policyId = newId();
        const patientInsurance: InsurancePolicyResponse = {
            insurancePolicyId: policyId,
            ...insurance,
            effectiveDate: insurance.effectiveDate,
            expirationDate: insurance.expirationDate,
            pharmacyBenefitPlanTypeId: insurance.pharmacyBenefitPlanTypeId,
            pharmacyBenefitManagerCompanyName: insurance.pharmacyBenefitManagerCompanyName,
            rxBankIdentificationNumber: insurance.rxBankIdentificationNumber,
            rxProcessorControlNumber: insurance.rxProcessorControlNumber,
            rxGroupNumber: insurance.rxGroupNumber,
            pbmPhoneNumber: insurance.pbmPhoneNumber,
            rxMemberNumber: insurance.rxMemberNumber,
            rxPolicyHolderBirthDate: insurance.rxPolicyHolderBirthDate,
            rxPolicyHolderFirstName: insurance.rxPolicyHolderFirstName,
            rxPolicyHolderLastName: insurance.rxPolicyHolderLastName,
            rxRelationshipToMember: insurance.rxRelationshipToMember,
            medicarePolicies: insurance.medicarePolicies?.map(mp => {
                return {
                    insurancePolicyId: policyId,
                    medicarePlanTypeId: mp.medicarePlanTypeId
                };
            })
        };
        return of(patientInsurance);
    }

    getEligibility(request: GetEligibilityRequest): Observable<GetEligibilityResponse> {
        return this._http
            .get<GetEligibilityResponse>(`${this._baseUrl}/eligibility?transactionGroupId=${this._workflowService.transactionGroupId}`)
            .pipe(
                tap(response => {
                    if (response && response.eligibilityResults) {
                        response.eligibilityResults.forEach(r => {
                            if (!r.effectiveDate || (r.effectiveDate && isEqual(new Date(r.effectiveDate), new Date('0001-01-01')))) {
                                r.effectiveDate = '';
                            }

                            if (!r.terminationDate || (r.terminationDate && isEqual(new Date(r.terminationDate), new Date('0001-01-01')))) {
                                r.terminationDate = '';
                            }
                        });
                    }
                })
            );
    }

    getOnFileInsurances(patientId: string): Observable<InsurancePolicyResponse[]> {
        return of([]);
    }

    update(insurancePolicyId: string, insurance: UpdateInsurancePolicyRequest): Observable<void> {
        return of(void 0);
    }

    getInsurancePolicyById(insurancePolicyId: string): Observable<InsurancePolicy> {
        return this._http.get<InsurancePolicy>(`${this._patientsUrl}/insurance/${insurancePolicyId}`);
    }

    saveInsurancePolicy(insurancePolicy: InsurancePolicy): Observable<void> {
        return of(void 0);
    }
}
