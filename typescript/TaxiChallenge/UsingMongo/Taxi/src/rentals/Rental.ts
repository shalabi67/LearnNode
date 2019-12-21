import {IUnicorn} from '../unicorn/Unicorn';
import {Document} from 'mongoose';

export interface IRental extends Document {
    unicorn: IUnicorn;
    rentingDate: Date;
}
