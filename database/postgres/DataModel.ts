export interface DataModel {
    convert(): Array<any>;
    getQuery(): string;
    getInsert(): string;
}