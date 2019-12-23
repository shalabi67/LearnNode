import {Rental} from "./Rental";

export interface ReturnedRental extends Rental {
    returningDate: Date;
}