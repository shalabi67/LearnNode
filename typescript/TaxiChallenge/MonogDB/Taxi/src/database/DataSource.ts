import {RepositoryModel} from "./RepositoryModel";
import mongoose, {Model} from "mongoose";
import {ReturnedRental} from "../rentals/ReturnedRental";


export interface DataSource<T extends RepositoryModel, ID> {
    save: (model: T) => Promise<T>;
    update: (model: T) => Promise<T>;
    findById: (id: ID) => Promise<T | null>;
    list: () => Promise<Array<T>>;
}
export class MemoryDataSource<T extends RepositoryModel> implements DataSource<T, number> {
    private dataIndex: Map<number, T> = new Map<number, T>();
    private counter: number = 1;

    save(model: T): Promise<T> {
        model.id = this.counter;
        this.dataIndex.set(model.id, model);
        this.counter = this.counter + 1;

        return Promise.resolve(model);
    }

    findById(id: number): Promise<T | null>  {
        const x = this.dataIndex.get(id);
        if(x == null) {
            return Promise.resolve(null);
        }
        return Promise.resolve(x);
    }

    update(model: T): Promise<T> {
        this.dataIndex.set(model.id, model);

        return Promise.resolve(model);
    }

    list(): Promise<Array<T>> {
        return Promise.resolve(Array.from(this.dataIndex.values()));
    }
}
