export interface ResourceCollection<T> {
    totalCount: number;
    filteredCount: number;
    list: T[];
    pageCount: number;
    pageIndex: number;
}
