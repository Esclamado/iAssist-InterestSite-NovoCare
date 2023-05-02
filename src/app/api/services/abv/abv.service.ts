import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AbvRequestModel } from '../../shared/models/abv/abv-request.model';
import { AbvResponseModel } from '../../shared/models/abv/abv-response.model';
import { EligibilityRequestModel } from '../../shared/models/abv/eligibility-request.model';
import { EligibilityResponseModel } from '../../shared/models/abv/eligibility-response.model';
import { ApplicationConfig } from '../../shared/models/application-config.model';

@Injectable({
  providedIn: 'root'
})
export class AbvService {

  private organizationalUrl = '';

  constructor(@Inject('ApplicationConfig') private applicationConfig: ApplicationConfig,
              private httpClient: HttpClient) {
    this.organizationalUrl = this.applicationConfig.organizationalBaseAddress;
  }

  public patientEligibility(eligibilityRequest: EligibilityRequestModel): Observable<EligibilityResponseModel> {
    return this.httpClient.post<EligibilityResponseModel>(this.organizationalUrl + `integrations/eligibility`, eligibilityRequest);
  }

  public pricingInformation(abvRequest: AbvRequestModel) {
    return this.httpClient.post<AbvResponseModel>(this.organizationalUrl + `pricing/complete`, abvRequest);
  }
}
