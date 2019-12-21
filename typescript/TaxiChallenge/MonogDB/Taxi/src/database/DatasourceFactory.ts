import {DataSource, MemoryDataSource} from "./DataSource";
import {RepositoryModel} from "./RepositoryModel";
import {IUnicorn} from "../unicorns/Unicorn";



export class DatasourceFactory {
    static unicornsDatasource: any = null;
    static rentalsDatasource: any = null;
    static returnedRentalsDatasource: any = null;

    static createUnicornsDataSource<T extends RepositoryModel>(): DataSource<T, number> {
        if(this.unicornsDatasource === null) {
            // @ts-ignore
            this.unicornsDatasource = new MemoryDataSource<T>(null);
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

    static createReturnedRentalsDataSource<T extends RepositoryModel>(): DataSource<T, number> {
        if(this.returnedRentalsDatasource === null) {
            this.returnedRentalsDatasource = new MemoryDataSource<T>();
        }

        return this.returnedRentalsDatasource;
    }

    static resetDataSources() {
        this.unicornsDatasource = null;
        this.rentalsDatasource = null;
        this.returnedRentalsDatasource = null;

        DatasourceFactory.createRentalsDataSource();
        DatasourceFactory.createUnicornsDataSource();
        DatasourceFactory.createReturnedRentalsDataSource();
    }

    private static initializeUnicornsData() {
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn('Pinky Pie'));
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn('Rainbow Dash'));
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn('Fluttershy'));
        this.unicornsDatasource.save(DatasourceFactory.createUnicorn( 'Twilight Sparkle', 30));
    }

    private static createUnicorn(name: string, restDuration=15): IUnicorn {
        const unicorn =  <IUnicorn>{id: -1, name: name, isRented: false, restDuration:restDuration};
        return unicorn;
    }
}
