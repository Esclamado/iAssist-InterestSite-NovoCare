import { GetPharmacySearchRecordModel } from './get-pharmacy-record.model';

export interface GetPharmacySearchModel {
    filteredCount: number;
    totalCount: number;
    pageIndex: number;
    pageCount: number;
    list: GetPharmacySearchRecordModel[];
}
