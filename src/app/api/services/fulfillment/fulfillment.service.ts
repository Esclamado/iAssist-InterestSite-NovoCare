import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfig } from '../../shared/models/application-config.model';

@Injectable({
  providedIn: 'root'
})
export class FulfillmentService {
  private fulfillmentRoute: string;
  private authToken: string;

  constructor(
    @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
    private httpClient: HttpClient
  ) {
    this.authToken = applicationConfig.oauthAccessToken;

    this.fulfillmentRoute = `${applicationConfig.integrationFabricApiBaseAddress}integration/v3/sanofi/icare/enrollment`;
  }

  public submitFulfillment(transactionGroupId: string): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${this.authToken}`
    });
    const options = { headers: httpHeaders }
    return this.httpClient.post<any>(this.fulfillmentRoute, { transactionGroupId: transactionGroupId }, options);
  }

}
