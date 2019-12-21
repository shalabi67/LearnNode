import mongoose, {Document, Schema} from "mongoose";

export interface IUnicorn extends Document {
    name: string
    isRented: boolean
    restDuration: number
}

export const unicornSchema: Schema = new Schema({
    name: { type: String, required: true, trim: true},
    isRented: { type: Boolean, required: true, default: false},
    restDuration: { type: Number, required: true, default: 15}
});


// Export the model and return your Unicorn interface
export default mongoose.model<IUnicorn>('Unicorn', unicornSchema);
