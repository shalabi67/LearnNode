import Unicorn from '../database/Unicorn';
import * as mongoose from 'mongoose';
import {IUnicorn} from './Unicorn';


export class UnicornRepository {
    private static unicornRepository: UnicornRepository;
    public static create(): UnicornRepository {
        if(!UnicornRepository.unicornRepository) {
            UnicornRepository.unicornRepository = new UnicornRepository();
        }

        return UnicornRepository.unicornRepository;
    }


    public async getAll(): Promise<IUnicorn[]> {
        return Unicorn.find();
    }

    public async find(unicornId: string): Promise<IUnicorn> {
        // @ts-ignore
        return Unicorn.findById(unicornId);
    }

    public async add(unicorn: IUnicorn): Promise<IUnicorn> {
        return unicorn.save();
    }

    public async delete(unicornId: string): Promise<any> {
        return Unicorn.findByIdAndDelete({_id: unicornId});
    }

    public async update(unicornId: string, unicorn: any): Promise<IUnicorn> {
        // @ts-ignore
        return Unicorn.findByIdAndUpdate(unicornId, {$set:unicorn},{new: true, runValidators: true});
    }

    public isValidId(unicornId: string) {
        return mongoose.Types.ObjectId.isValid(unicornId);
    }
}
