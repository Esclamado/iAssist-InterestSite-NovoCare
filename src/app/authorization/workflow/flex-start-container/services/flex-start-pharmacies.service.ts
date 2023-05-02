import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    GetLimitedDistributionNetworkModel,
    GetPharmaciesRequest,
    GetPharmaciesResponse,
    GetPharmacyResponse,
    PharmacyService
} from 'flex-start';
import { Pharmacy } from 'flex-start/lib/shared/models/pharmacy';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';
import { GetPharmacySearchRecordModel } from 'src/app/api/shared/models/flex-start-container/get-pharmacy-record.model';
import { GetPharmacySearchModel } from 'src/app/api/shared/models/flex-start-container/get-pharmacy-search.model';

@Injectable({
    providedIn: 'root'
})
export class FlexStartPharmaciesService implements PharmacyService {
    private readonly _baseUrl: string;

    constructor(
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
        private _http: HttpClient
    ) {
        this._baseUrl = `${applicationConfig.organizationalBaseAddress}pharmacies`;
    }

    getPage(request: GetPharmaciesRequest): Observable<GetPharmaciesResponse> {
        let params: HttpParams = new HttpParams();
        params = params.append('request.search', request.searchText.toString());
        params = params.append(
            'request.zipCode',
            request.postalCode.toString()
        );
        params = params.append(
            'request.pageIndex',
            request.pageIndex.toString()
        );
        params = params.append('request.pageSize', request.pageSize.toString());

        return this._http
            .get<GetPharmacySearchModel>(this._baseUrl, { params })
            .pipe(
                map((ph: GetPharmacySearchModel) => {
                    const pharmaciesResponse: GetPharmaciesResponse = {
                        filteredCount: ph.filteredCount,
                        totalCount: ph.totalCount,
                        list: ph.list.map((p) => {
                            const pharmacy =
                                this.mapGetPharmacySearchRecordModelToGetPharmaciesResponse(
                                    p
                                );
                            return pharmacy;
                        })
                    };
                    return pharmaciesResponse;
                })
            );
    }

    get(ncpdpId: string): Observable<GetPharmacyResponse> {
        return this._http
            .get<GetPharmacySearchRecordModel>(`${this._baseUrl}/${ncpdpId}`)
            .pipe(
                map((ph) => {
                    const pharmacy =
                        this.mapGetPharmacySearchRecordModelToGetPharmaciesResponse(
                            ph
                        );
                    return pharmacy;
                })
            );
    }

    getLimitedDistributionNetwork(
        ndc: string
    ): Observable<GetLimitedDistributionNetworkModel> {
        return of(<any>null);
    }

    savePharmacy(pharmacy: Pharmacy): Observable<void> {
        return of(void 0);
    }

    showUserWarning(): Observable<boolean> {
        return of(false);
    }

    private mapGetPharmacySearchRecordModelToGetPharmaciesResponse(
        searchRecordModel: GetPharmacySearchRecordModel
    ): GetPharmacyResponse {
        return {
            ncpdpId: searchRecordModel.ncpdpId,
            npi: searchRecordModel.npi,
            storeName: searchRecordModel.storeName,
            primaryPhoneNumber: searchRecordModel.primaryPhoneNumber,
            faxNumber: searchRecordModel.faxNumber,
            address: {
                addressLine1: searchRecordModel.addressLine1,
                addressLine2: searchRecordModel.addressLine2,
                city: searchRecordModel.city,
                stateCode: searchRecordModel.state,
                postalCode: searchRecordModel.zipCode
            }
        };
    }
}
