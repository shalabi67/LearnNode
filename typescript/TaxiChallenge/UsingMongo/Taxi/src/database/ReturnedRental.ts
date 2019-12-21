import mongoose, {Schema} from 'mongoose';
import {IRental} from '../rentals/Rental';
import {rentalSchema} from './Rental';

export const returnedRentalSchema: Schema = new Schema({
    rental: { type: rentalSchema, required: true},
    returningDate: { type: Date, required: true, default: Date.now}
});


// Export the model and return your Unicorn interface
export default mongoose.model<IRental>('ReturnedRental', returnedRentalSchema);
