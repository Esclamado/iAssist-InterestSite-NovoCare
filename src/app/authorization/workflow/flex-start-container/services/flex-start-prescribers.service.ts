import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    GetPrescriberResponse,
    PrescriberService,
    UpdatePreferredPharmaciesRequest
} from 'flex-start';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';
import { GetUserModel } from 'src/app/api/shared/models/flex-start-container/get-user.model';
import { ResourceCollection } from 'src/app/api/shared/models/flex-start-container/resource-collection';

@Injectable({
    providedIn: 'root'
})
export class FlexStartPrescribersService implements PrescriberService {
    private readonly _baseUrl: string;
    private readonly _usersBaseUrl: string;

    constructor(
        @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
        private _http: HttpClient
    ) {
        this._baseUrl = `${applicationConfig.organizationalBaseAddress}prescribers`;
        this._usersBaseUrl = `${applicationConfig.organizationalBaseAddress}user`;
    }

    updatePreferredPharmacies(
        request: UpdatePreferredPharmaciesRequest
    ): Observable<void> {
        return of(void 0);
    }

    getAll(): Observable<GetPrescriberResponse[]> {
        const params = new HttpParams().set('api-version', '2');
        return this._http
            .get<ResourceCollection<GetUserModel>>(`${this._baseUrl}`, {
                params
            })
            .pipe(
                map((prescribers: ResourceCollection<GetUserModel>) => {
                    return prescribers.list.map((p: GetUserModel) => {
                        const prescriber: GetPrescriberResponse =
                            this.mapGetUserModelToGetPrescriberResponse(p);
                        return prescriber;
                    });
                })
            );
    }

    get(npi: string): Observable<GetPrescriberResponse> {
        return this.getAll().pipe(
            map((prescribers) => {
                const prescriber = prescribers.find((p) => p.npi === npi);
                return prescriber as GetPrescriberResponse;
            })
        );
    }

    private mapGetUserModelToGetPrescriberResponse(
        getUserModel: GetUserModel
    ): GetPrescriberResponse {
        return {
            userId: getUserModel.userId,
            prescriberId: getUserModel.prescriberDetails.prescriberId,
            npi: getUserModel.prescriberDetails.npi,
            firstName: getUserModel.firstName,
            middleName: getUserModel.middleName,
            lastName: getUserModel.lastName,
            dateOfBirth: new Date(getUserModel.dateOfBirth),
            gender: getUserModel.gender,
            phoneNumber: getUserModel.phoneNumber
                ? {
                      phoneNumberId: getUserModel.phoneNumber.phoneNumberId,
                      phoneTypeId: getUserModel.phoneNumber.phoneTypeId,
                      countryCode: getUserModel.phoneNumber.countryCode,
                      number: getUserModel.phoneNumber.number,
                      ext: getUserModel.phoneNumber.ext
                  }
                : undefined,
            suffix: getUserModel.prescriberDetails.suffix,
            prescriberSpecialty: getUserModel.prescriberDetails
                .prescriberSpecialty
                ? {
                      code: getUserModel.prescriberDetails.prescriberSpecialty
                          .code,
                      id: getUserModel.prescriberDetails.prescriberSpecialty.id,
                      text: getUserModel.prescriberDetails.prescriberSpecialty
                          .text
                  }
                : undefined,
            relationships: getUserModel.relationships.map((r) => {
                return {
                    relationshipId: r.relationshipId,
                    officeStaffUserId: r.officeStaff.userId,
                    prescriberUserId: r.prescriber.userId,
                    permissionId: r.permissionId,
                    permission: {
                        permissionId: r.permission.permissionId,
                        permissionValue: r.permission.permissionValue
                    }
                };
            }),
            preferredPharmacies:
                getUserModel.prescriberDetails.preferredPharmacies.map((pp) => {
                    return {
                        ...pp
                    };
                }),
            isActive:
                getUserModel.prescriberDetails.prescriberStatus === 'active' ||
                getUserModel.prescriberDetails.prescriberStatus ===
                    'manuallyActivated',
            deletedOn: getUserModel.deletedOn,
            drugEnforcementAdminNumber:
                getUserModel.prescriberDetails.drugEnforcementAdminNumber,
            taxId: getUserModel.prescriberDetails.taxId,
            prescriberSignature: getUserModel.prescriberDetails.signatureData
        };
    }
}
