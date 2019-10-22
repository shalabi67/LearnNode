export abstract class DataModel {
    idName: string = "id";
    tableName: string = "";
    queryColumnsString: string = " * ";
    insertColumnsString: string = '';
    insertValuesString: string = '';

    abstract convert(): Array<any>;

    // @ts-ignore
    abstract setId(row: any);
}