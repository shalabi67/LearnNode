import {Response} from 'express';
import {GONE, NO_CONTENT, OK} from 'http-status-codes';
import {UnicornRepository} from '../unicorn/UnicornRepository';
import {ReturnedRentalRepository} from './ReturnedRentalRepository';
import {RentalRepository} from './RentalRepository';
import ReturnedRental from '../database/ReturnedRental';

export class ReturnedRentalsController {
    private rentalReturnRepository: ReturnedRentalRepository;
    private rentalRepository: RentalRepository;
    private unicornRepository: UnicornRepository;

    constructor(rentalReturnRepository: ReturnedRentalRepository,
                rentalRepository: RentalRepository,
                unicornRepository: UnicornRepository) {
        this.rentalReturnRepository = rentalReturnRepository;
        this.unicornRepository = unicornRepository;
        this.rentalRepository = rentalRepository;
    }

    public async getReturnedRentals(response: Response): Promise<Response> {
        const rentals = this.rentalReturnRepository.getAll();
        return response.status(OK).json(rentals);
    }

    public async returnRental(rentalId: string, response: Response): Promise<Response> {
        const rental = await this.rentalRepository.find(rentalId);
        if(rental == null) {
            return response.status(NO_CONTENT).json(`could not find rental with id= ${rentalId}`);
        }

        const returnedRental = new ReturnedRental({rental, returningDate: new Date()});
        const returnedUnicorn = await this.unicornRepository.returnUnicorn(rental.unicorn);
        if(returnedUnicorn == null) {
            return response.status(GONE).json(`could not find rented unicorn with id= ${rental.unicorn._id}`);
        }
        const newReturnedRental = await this.rentalReturnRepository.add(returnedRental);

        return response.status(OK).json(newReturnedRental);
    }

}
