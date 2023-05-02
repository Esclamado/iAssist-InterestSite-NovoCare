import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';
import { InitialExternalServiceValues } from 'src/app/api/shared/models/initial-external-service-values.model';

@Injectable({
    providedIn: 'root'
})
export class InitialValuesService {
    private readonly _baseUrl: string;

    constructor(
        private _http: HttpClient,
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig
    ) {
        this._baseUrl = `${applicationConfig.organizationalBaseAddress}external-epa`;
    }

    getInitialValues(
        transactionGroupId: string
    ): Observable<InitialExternalServiceValues> {
        const intialValuesUrl = `${this._baseUrl}/transaction-groups/${transactionGroupId}/initial-values`;
        return this._http.get<InitialExternalServiceValues>(intialValuesUrl);
    }
}
