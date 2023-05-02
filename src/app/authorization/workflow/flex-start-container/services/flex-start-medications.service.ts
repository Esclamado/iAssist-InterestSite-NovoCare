import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    GetMedicationDetailsResponse,
    GetMedicationResponse,
    GetMedicationsRequest,
    GetMedicationsResponse,
    MedicationDetails,
    MedicationService
} from 'flex-start';
import { GetNdcAlertsResponse } from 'flex-start/lib/medications/models/server/get-ndc-alerts-reponse';
import { Observable, of } from 'rxjs';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';

@Injectable({
    providedIn: 'root'
})
export class FlexStartMedicationsService implements MedicationService {
    private readonly _baseUrl: string;

    constructor(
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
        private _http: HttpClient
    ) {
        this._baseUrl = `${applicationConfig.organizationalBaseAddress}drugs`;
    }

    getPage(
        request: GetMedicationsRequest
    ): Observable<GetMedicationsResponse> {
        const params = new HttpParams()
            .set('pageIndex', request.pageIndex.toString())
            .set('pageSize', request.pageSize.toString())
            .set('searchText', request.searchText)
            .set('accessPointId', '1');

        return this._http.get<GetMedicationsResponse>(this._baseUrl, {
            params
        });
    }

    get(ndc: string): Observable<GetMedicationResponse> {
        const url = `${this._baseUrl}/${ndc}`;
        return this._http.get<GetMedicationResponse>(url);
    }

    getDetails(ndc: string): Observable<GetMedicationDetailsResponse> {
        return of(<any>null);
    }

    getPopularDrugs(): Observable<string[]> {
        return of([]);
    }

    getNdcAlerts(): Observable<GetNdcAlertsResponse[]> {
        return of([]);
    }

    saveMedicationDetails(
        medicationDetails: MedicationDetails
    ): Observable<void> {
        return of(<any>null);
    }
}
