import {Unicorn} from "../unicorns/Unicorn";
import {RepositoryModel} from "../database/RepositoryModel";

export interface Rental extends RepositoryModel {
    rentalId: number;
    unicorn: Unicorn;
    rentingDate: Date;
}
