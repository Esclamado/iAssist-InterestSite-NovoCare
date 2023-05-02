import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    CreatePatientRequest,
    GetPatientResponse,
    GetPatientsRequest,
    GetPatientsResponse,
    Note,
    PatientService,
    UpdatePatientRequest
} from 'flex-start';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';

@Injectable({
    providedIn: 'root'
})
export class FlexStartPatientsService implements PatientService {
    private readonly _baseUrl: string;

    constructor(
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
        private _http: HttpClient
    ) {
        this._baseUrl = `${applicationConfig.organizationalBaseAddress}patients`;
    }

    getPage(request: GetPatientsRequest): Observable<GetPatientsResponse> {
        // Map the patient filter properties onto http params, where not empty.
        const params = Object.entries(request).reduce(
            (patientParams, [property, parameter]) => {
                if (parameter !== undefined && parameter !== '') {
                    return patientParams.set(property, parameter);
                } else {
                    return patientParams;
                }
            },
            new HttpParams()
        );

        const url = this._baseUrl;
        return this._http.get<GetPatientsResponse>(url, { params });
    }

    getPatients(request: GetPatientsRequest): Observable<GetPatientResponse> {
        return this._http.get<GetPatientResponse>(`${this._baseUrl}`);
    }

    get(patientId: string): Observable<GetPatientResponse> {
        return this._http.get<GetPatientResponse>(
            `${this._baseUrl}/${patientId}`
        );
    }

    create(request: CreatePatientRequest): Observable<GetPatientResponse> {
        return this._http.post<GetPatientResponse>(this._baseUrl, request);
    }

    update(
        patientId: string,
        request: UpdatePatientRequest
    ): Observable<GetPatientResponse> {
        const url = this._baseUrl;
        return this.get(patientId).pipe(
            first(),
            switchMap((patient: GetPatientResponse) => {
                patient.firstName = request.firstName;
                patient.lastName = request.lastName;
                patient.dateOfBirth = request.dateOfBirth;
                patient.gender = request.gender;
                patient.address = request.address;
                return this._http.put<GetPatientResponse>(url, patient);
            })
        );
    }

    getPatientNotes(patientId: string): Observable<Note[]> {
        return of([]);
    }

    reactivate(patientId: string): Observable<GetPatientResponse> {
        return of(<any>null);
    }
}
