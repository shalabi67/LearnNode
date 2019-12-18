import {RepositoryModel} from "./RepositoryModel";

export interface Repository<T extends RepositoryModel, ID> {
    save: (model: T) => T;
    update: (model: T) => T;
    findById: (id: ID) => T | undefined;
    list: () => Array<T>;
}

export class MemoryRepository<T extends RepositoryModel> implements Repository<T, number> {
    private dataIndex: Map<number, T> = new Map<number, T>();
    private counter: number = 1;

    save(model: T): T {
        model.id = this.counter;
        this.dataIndex.set(model.id, model);
        this.counter = this.counter + 1;

        return model;
    }

    findById(id: number): T | undefined {
        return this.dataIndex.get(id);
    }

    update(model: T): T {
        this.dataIndex.set(model.id, model);

        return model;
    }

    list(): Array<T> {
        return Array.from(this.dataIndex.values());
    }
}