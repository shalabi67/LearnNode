import {Unicorn} from "../unicorns/Unicorn";
import {RepositoryModel} from "../database/RepositoryModel";

export interface Rental extends RepositoryModel {
    unicorn: Unicorn;
    rentingDate: Date;
}
