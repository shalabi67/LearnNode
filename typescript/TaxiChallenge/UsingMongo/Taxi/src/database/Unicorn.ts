import mongoose, {Schema} from "mongoose";
import {IUnicorn} from "../unicorn/Unicorn";

const unicorn: Schema = new Schema({
    name: { type: String, required: true, trim: true},
    isRented: { type: Boolean, required: true, default: false},
    restDuration: { type: Number, required: true, default: 15}
});


// Export the model and return your Unicorn interface
export default mongoose.model<IUnicorn>('Unicorn', unicorn);

