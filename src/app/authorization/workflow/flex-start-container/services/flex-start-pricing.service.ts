import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    GetCashPricingRequest,
    GetPricingRequest,
    GetPricingResponse,
    GoodRxPriceResponse,
    PricingService
} from 'flex-start';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseUrl } from 'src/app/api/shared/functions/parseUrl';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';

@Injectable({
    providedIn: 'root'
})
export class FlexStartPricingService implements PricingService {
    private readonly _baseUrl: string;

    constructor(
        private _http: HttpClient,
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig
    ) {
        this._baseUrl = `${parseUrl(
            applicationConfig.organizationalBaseAddress
        )}pricing`;
    }

    getPricing(request: GetPricingRequest): Observable<GetPricingResponse> {
        return this._http
            .post<GetPricingResponse>(`${this._baseUrl}/complete`, request, {
                observe: 'response'
            })
            .pipe(
                map((response) => {
                    const requestId = response.headers.get('X-Request-Id');
                    response.body.requestId = requestId;
                    return response.body;
                })
            );
    }

    getCashPricing(
        request: GetCashPricingRequest,
        onlyResultsWithNcpdpIds?: boolean
    ): Observable<GoodRxPriceResponse> {
        return of(null);
    }
}
