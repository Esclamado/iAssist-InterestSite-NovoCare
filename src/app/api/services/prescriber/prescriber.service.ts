import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { GetProviderRequest, GetProviderRequestByName } from 'src/app/ui-components/shared/models/resource-collection-request.model';
import { ResourceCollectionResponseModel } from 'src/app/ui-components/shared/models/resource-collection-response.model';
import { ApplicationConfig } from '../../shared/models/application-config.model';
import { PrescriberResponseData } from '../../shared/models/prescriber-form-data.model';
import { ProviderExternalLoginRequest } from 'src/app/api/shared/models/provider-external-login.model';
import { ExternalServicesSetupResponse } from 'src/app/api/shared/models/external-services-response.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriberService {

  private providerUrl: string;
  private msProviderUrl: string;
  private authToken: string;

  private readonly _baseUrl: string;

  constructor(@Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
              private http: HttpClient,
              private workflowService: WorkflowService) {
    this.providerUrl = applicationConfig.integrationFabricApiBaseAddress;
    this.msProviderUrl = applicationConfig.providerApiBaseAddress;
    this.authToken = applicationConfig.oauthAccessToken; 
    this._baseUrl = `${applicationConfig.organizationalBaseAddress}`;
  }

  public searchProviders(request : any ): Observable<ResourceCollectionResponseModel<PrescriberResponseData>> {
    const url = this.providerUrl + 'integration/v1/providers';
    const requestParams: HttpParams = this.buildProviderRequestParams(request);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });
    const options = { headers: httpHeaders, params: requestParams };

    return this.http
      .get<ResourceCollectionResponseModel<PrescriberResponseData>>(url, options);
  }

  private buildProviderRequestParams(request: GetProviderRequest): HttpParams {
    return Object.getOwnPropertyNames(request)
      .reduce((params, key) => params.set(key, request[key]), new HttpParams());
  }

  public isEmailRegistered(npi: string, emailAddress: string): Observable<any> {
    const url = `${this._baseUrl}providers/${npi}/authorize`;
    let data: any = {
      "emailAddress": emailAddress
    }
    return this.http.post<any>(url, data);
  }

   public verifyNpi(npi: string): Observable<any> {
    return this.http.get<any>(
      `${this.providerUrl}integration/v1/provider/arx/verified?npi=${npi}`);
  }

  public getEpaToken(request: ProviderExternalLoginRequest): Observable<ExternalServicesSetupResponse> {
    return this.http .post<ExternalServicesSetupResponse>(
        `${this._baseUrl}auth/provider-external-login`,
        request
    );
}
}

