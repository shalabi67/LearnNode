import {DataSource, MemoryDataSource} from "./DataSource";
import {RepositoryModel} from "./RepositoryModel";
import {Unicorn} from "../unicorns/Unicorn";

export class DatasourceFactory {
    static unicornsDatasource: any = null;
    static rentalsDatasource: any = null;

    static createUnicornsDataSource<T extends RepositoryModel>(): DataSource<T, number> {
        if(this.unicornsDatasource === null) {
            this.unicornsDatasource = new MemoryDataSource<T>();
            DatasourceFactory.initializeUnicornsData();
        }

        return this.unicornsDatasource;
    }

    static createRentalsDataSource<T extends RepositoryModel>(): DataSource<T, number> {
        if(this.rentalsDatasource === null) {
            this.rentalsDatasource = new MemoryDataSource<T>();
        }

        return this.rentalsDatasource;
    }

    private static initializeUnicornsData() {
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn('Pinky Pie'));
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn('Rainbow Dash'));
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn('Fluttershy'));
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn( 'Twilight Sparkle', 30));
    }

    private static createUnicorn(name: string, restDuration=15): Unicorn {
        const unicorn =  <Unicorn>{id: -1, name: name, isRented: false, restDuration:restDuration};
        return unicorn;
    }
}
