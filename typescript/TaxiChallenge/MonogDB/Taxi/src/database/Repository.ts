import {RepositoryModel} from "./RepositoryModel";
import {DataSource} from "./DataSource";

export class Repository<T extends RepositoryModel>  {
    private dataSource: DataSource<T, number>;
    constructor(dataSource: DataSource<T, number>) {
        this.dataSource = dataSource;
    }

    save(model: T): Promise<T> {
        return this.dataSource.save(model)
    }

    findById(id: number):  Promise<T | null> {
        return this.dataSource.findById(id)
    }

    update(model: T):  Promise<T> {
        return this.dataSource.update(model)
    }

    list():  Promise<Array<T>> {
        return this.dataSource.list()
    }
}
