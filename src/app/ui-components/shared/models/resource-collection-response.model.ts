export interface ResourceCollectionResponseModel<T> {
    totalCount: number;
    filteredCount: number;
    list: T[];
    pageCount: number;
    pageIndex: number;
    pageSize: number;
}
