import {Document} from 'mongoose';
import {IRental} from './Rental';

export interface IReturnedRental extends Document {
    rental: IRental;
    rentingDate: Date;
}
