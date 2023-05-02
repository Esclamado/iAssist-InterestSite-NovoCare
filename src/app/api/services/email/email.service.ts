import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfig } from '../../shared/models/application-config.model';
import { EmailRequestModel } from '../../shared/models/email/email-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private integrationFabricUrl: string;

  constructor(@Inject('ApplicationConfig') private applicationConfig: ApplicationConfig,
              private httpClient: HttpClient) {
    this.integrationFabricUrl = this.applicationConfig.integrationFabricApiBaseAddress;
  }

  public sendEmail(emailRequest: EmailRequestModel): Observable<any> {
    return this.httpClient.post(this.integrationFabricUrl + `integration/v1/message/templatedemail`, emailRequest);
  }
}
