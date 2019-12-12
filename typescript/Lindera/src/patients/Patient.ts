import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
    firstName: string;
    lastName: string;
    birthday: Date;
}

const nameValidator = (name: string) => {
        const noSpaceName = name.trim();
        return (noSpaceName.length > 0 && noSpaceName.length <= 50);
    };

const stringName = /^[a-zA-Z]+$/;
const patientSchema: Schema = new Schema({
    firstName: { type: String, required: true, trim: true, match: stringName, validate: nameValidator},
    lastName: { type: String, required: true, trim: true, match: stringName, validate: nameValidator},
    birthday: { type: Date, required: true}
});
patientSchema.index({firstName: 1});
patientSchema.index({lastName: 1});
patientSchema.index({birthday: 1});
patientSchema.index({ firstName: 1, lastName: 1, birthday: 1}, { unique: true });

// Export the model and return your IPatient interface
export default mongoose.model<IPatient>('Patient', patientSchema);
