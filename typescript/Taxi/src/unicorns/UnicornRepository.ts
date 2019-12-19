import { Repository} from "../database/Repository";
import {Unicorn} from "./Unicorn";
import {DatasourceFactory} from "../database/DatasourceFactory";

export class UnicornRepository extends Repository<Unicorn> {
    static createUnicornRepository(): UnicornRepository {
        const dataSource = DatasourceFactory.createDataSource<Unicorn>();

        const unicornRepository =  new UnicornRepository(dataSource);
        unicornRepository.save(UnicornRepository.createUnicorn('Pinky Pie'));
        unicornRepository.save(UnicornRepository.createUnicorn('Rainbow Dash'));
        unicornRepository.save(UnicornRepository.createUnicorn('Fluttershy'));
        unicornRepository.save(UnicornRepository.createUnicorn( 'Twilight Sparkle', 30));

        return unicornRepository;
    }

    private static createUnicorn(name: string, restDuration=15): Unicorn {
        const unicorn =  <Unicorn>{id: -1, name: name, isRented: false, restDuration:restDuration};
        return unicorn;
    }
}

