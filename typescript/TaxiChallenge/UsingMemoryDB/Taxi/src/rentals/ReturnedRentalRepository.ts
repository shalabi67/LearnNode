import {Repository} from "../database/Repository";
import {DatasourceFactory} from "../database/DatasourceFactory";
import {ReturnedRental} from "./ReturnedRental";

export class ReturnedRentalRepository extends Repository<ReturnedRental> {
    static createReturnedRentalRepository(): ReturnedRentalRepository {
        const dataSource = DatasourceFactory.createRentalsDataSource<ReturnedRental>();

        return new ReturnedRentalRepository(dataSource)
    }
}


