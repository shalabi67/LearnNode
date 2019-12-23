import {Response} from 'express';
import { CREATED, GONE, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from 'http-status-codes';
import {IRental} from './Rental';
import {RentalRepository} from './RentalRepository';
import {UnicornRepository} from '../unicorn/UnicornRepository';


export class RentalsController {
    private rentalRepository: RentalRepository;
    private unicornRepository: UnicornRepository;

    constructor(rentalRepository: RentalRepository,
                unicornRepository: UnicornRepository) {
        this.rentalRepository = rentalRepository;
        this.unicornRepository = unicornRepository;
    }


    public async getRentals(response: Response): Promise<Response> {
        const rentals = this.rentalRepository.getAll();
        return response.status(OK).json(rentals);
    }

    public async addRental(rental: IRental, response: Response): Promise<Response> {
        const unicorn = await this.unicornRepository.findByName(rental.unicorn.name);
        if(unicorn == null) {
            return response.status(NOT_FOUND).json('Unicorn not found');
        }

        if(unicorn.isRented) {
            return response.status(GONE).json('Unicorn not available');
        }

        const updatedUnicorn = await this.unicornRepository.rent(unicorn);
        if(updatedUnicorn == null) {
            return response.status(GONE).json('Unicorn not available');
        }
        rental.unicorn = updatedUnicorn;
        rental.rentingDate = new Date();

        const updatedRental = await this.rentalRepository.add(rental);
        if(updatedRental==null || updatedRental.unicorn==null || !updatedRental.unicorn.isRented) {
            return response.status(INTERNAL_SERVER_ERROR).json(updatedRental);
        }

        return response.status(CREATED).json(updatedRental);
    }
}
