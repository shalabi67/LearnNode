import Unicorn from '../database/Unicorn';
import * as mongoose from 'mongoose';
import {IUnicorn} from './Unicorn';


export class UnicornRepository {
    private static unicornRepository: UnicornRepository;
    public static create(): UnicornRepository {
        if(!UnicornRepository.unicornRepository) {
            UnicornRepository.unicornRepository = new UnicornRepository();
        }

        return new UnicornRepository();
    }


    public async getAll(): Promise<IUnicorn[]> {
        return Unicorn.find();
    }

    public async find(unicornId: string): Promise<IUnicorn> {
        // @ts-ignore
        return Unicorn.findById(unicornId);
    }

    public async findByName(unicornName: string): Promise<IUnicorn | null> {
        const query = {name: unicornName};
        // @ts-ignore
        return Unicorn.findOne(query);
    }

    public async add(unicorn: IUnicorn): Promise<IUnicorn> {
        return unicorn.save();
    }

    public async delete(unicornId: string): Promise<any> {
        return Unicorn.findByIdAndDelete({_id: unicornId});
    }

    // if you are going to change this code be careful from racing problem where the same unicorn could be rented by
    // more than one customer at the same time.
    public async rent(unicorn: any): Promise<IUnicorn> {
        const filter = { _id: unicorn._id, isRented: false };
        // @ts-ignore
        return Unicorn.findOneAndUpdate(filter, {$set:{isRented: true}},{new: true, runValidators: true});
    }

    public async returnUnicorn(unicorn: any): Promise<IUnicorn> {
        const filter = { _id: unicorn._id, isRented: true };
        // @ts-ignore
        return Unicorn.findOneAndUpdate(filter, {$set:{isRented: false}},{new: true, runValidators: true});
    }

    public isValidId(unicornId: string) {
        return mongoose.Types.ObjectId.isValid(unicornId);
    }
}
