import mongoose, {Schema} from 'mongoose';
import {rentalSchema} from './Rental';
import {IReturnedRental} from '../rentals/ReturnedRental';

export const returnedRentalSchema: Schema = new Schema({
    rental: { type: rentalSchema, required: true},
    returningDate: { type: Date, required: true, default: Date.now}
});


// Export the model and return your Unicorn interface
export default mongoose.model<IReturnedRental>('ReturnedRental', returnedRentalSchema);
