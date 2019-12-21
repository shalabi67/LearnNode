import mongoose, {Schema} from 'mongoose';
import {IRental} from '../rentals/Rental';
import {unicornSchema} from './Unicorn';

export const rentalSchema: Schema = new Schema({
    unicorn: { type: unicornSchema, required: true},
    rentingDate: { type: Date, required: true, default: Date.now}
});


// Export the model and return your Unicorn interface
export default mongoose.model<IRental>('Rental', rentalSchema);
