import mongoose, { Schema, Document } from 'mongoose';
import {ReturnedRental} from "../rentals/ReturnedRental";
import {unicornSchema} from "../unicorns/Unicorn";



const returnedRentalSchema: Schema = new Schema({
    unicorn: { type: unicornSchema, required: true},
    rentingDate: { type: Date, required: true},
    returningDate: { type: Date, required: true}
});


// Export the model and return your Unicorn interface
export default mongoose.model<ReturnedRental>('ReturnedRental', returnedRentalSchema);
