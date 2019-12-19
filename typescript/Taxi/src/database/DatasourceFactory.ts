import {DataSource, MemoryDataSource} from "./DataSource";
import {RepositoryModel} from "./RepositoryModel";

export class DatasourceFactory {
    static datasource: any = null;
    static createDataSource<T extends RepositoryModel>(): DataSource<T, number> {
        if(this.datasource === null) {
            this.datasource = new MemoryDataSource<T>();
        }
        return this.datasource;
    }
}
