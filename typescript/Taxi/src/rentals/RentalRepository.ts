import {Repository} from "../database/Repository";
import {Rental} from "./Rental";
import {DatasourceFactory} from "../database/DatasourceFactory";


export class RentalRepository extends Repository<Rental> {
    static createRentalRepository(): RentalRepository {
        const dataSource = DatasourceFactory.createRentalsDataSource<Rental>();

        return new RentalRepository(dataSource)
    }
}


