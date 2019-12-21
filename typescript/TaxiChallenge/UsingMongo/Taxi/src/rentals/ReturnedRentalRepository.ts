import * as mongoose from 'mongoose';
import {IReturnedRental} from './ReturnedRental';
import ReturnedRental from '../database/ReturnedRental';


export class ReturnedRentalRepository {
    private static returnedRentalRepository: ReturnedRentalRepository;
    public static create(): ReturnedRentalRepository {
        if(!ReturnedRentalRepository.returnedRentalRepository) {
            ReturnedRentalRepository.returnedRentalRepository = new ReturnedRentalRepository();
        }

        return ReturnedRentalRepository.returnedRentalRepository;
    }


    public async getAll(): Promise<IReturnedRental[]> {
        return ReturnedRental.find();
    }

    public async find(rentalId: string): Promise<IReturnedRental> {
        // @ts-ignore
        return ReturnedRental.findById(rentalId);
    }

    public async add(rental: IReturnedRental): Promise<IReturnedRental> {
        const rentalObject = new ReturnedRental(rental);
        return rentalObject.save();
    }

    public async delete(rentalId: string): Promise<any> {
        return ReturnedRental.findByIdAndDelete({_id: rentalId});
    }

    public async update(rental: any): Promise<IReturnedRental> {
        // @ts-ignore
        return ReturnedRental.findByIdAndUpdate(rental._id, {$set:rental},{new: true, runValidators: true});
    }

    public isValidId(unicornId: string) {
        return mongoose.Types.ObjectId.isValid(unicornId);
    }
}
