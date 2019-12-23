import {Document} from 'mongoose';

export interface IUnicorn extends Document {
    name: string;
    isRented: boolean;
    restDuration: number;
}
