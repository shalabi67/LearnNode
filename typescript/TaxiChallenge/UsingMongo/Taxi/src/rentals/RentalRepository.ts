import Rental from '../database/Rental';
import * as mongoose from 'mongoose';
import {IRental} from './Rental';


export class RentalRepository {
    private static rentalRepository: RentalRepository;
    public static create(): RentalRepository {
        if(!RentalRepository.rentalRepository) {
            RentalRepository.rentalRepository = new RentalRepository();
        }

        return RentalRepository.rentalRepository;
    }


    public async getAll(): Promise<IRental[]> {
        return Rental.find();
    }

    public async find(rentalId: string): Promise<IRental | null> {
        // @ts-ignore
        return Rental.findById(rentalId);
    }

    public async add(rental: IRental): Promise<IRental> {
        const rentalObject = new Rental(rental);
        return rentalObject.save();
    }

    public async delete(rentalId: string): Promise<any> {
        return Rental.findByIdAndDelete({_id: rentalId});
    }

    public async update(rental: any): Promise<IRental> {
        // @ts-ignore
        return Rental.findByIdAndUpdate(rental._id, {$set:rental},{new: true, runValidators: true});
    }

    public isValidId(unicornId: string) {
        return mongoose.Types.ObjectId.isValid(unicornId);
    }
}
