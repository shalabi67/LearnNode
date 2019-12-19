import { Repository} from "../database/Repository";
import {Unicorn} from "./Unicorn";
import {DatasourceFactory} from "../database/DatasourceFactory";

export class UnicornRepository extends Repository<Unicorn> {
    static createUnicornRepository(): UnicornRepository {
        const dataSource = DatasourceFactory.createUnicornsDataSource<Unicorn>();
        const unicornRepository =  new UnicornRepository(dataSource);

        return unicornRepository;
    }


}

