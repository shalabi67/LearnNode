import {RepositoryModel} from "./RepositoryModel";
import {DataSource} from "./DataSource";

export class Repository<T extends RepositoryModel>  {
    private dataSource: DataSource<T, number>;
    constructor(dataSource: DataSource<T, number>) {
        this.dataSource = dataSource;
    }

    save(model: T): T {
        return this.dataSource.save(model)
    }

    findById(id: number): T | undefined {
        return this.dataSource.findById(id)
    }

    update(model: T): T {
        return this.dataSource.update(model)
    }

    list(): Array<T> {
        return this.dataSource.list()
    }
}
