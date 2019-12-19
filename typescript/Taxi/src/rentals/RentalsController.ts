import {Response} from 'express';
import {BAD_REQUEST, CREATED, GONE, NOT_FOUND} from "http-status-codes";
import {Rental} from "./Rental";
import {RentalRepository} from "./RentalRepository";
import {UnicornRepository} from "../unicorns/UnicornRepository";

export class RentalsController {
    private rentalRepository: RentalRepository;
    private unicornRepository: UnicornRepository;

    constructor(rentalRepository: RentalRepository,
                unicornRepository: UnicornRepository) {
        this.rentalRepository = rentalRepository;
        this.unicornRepository = unicornRepository;
    }

    public async getRentals(response: Response): Promise<Response> {
        const rentals = this.rentalRepository.list();
        return response.status(CREATED).json(rentals);
    }

    public async addRental(rental: Rental, response: Response): Promise<Response> {
        if(rental.unicorn == null || rental.unicorn.id<=0) {
            return response.status(BAD_REQUEST).json('valid unicorn id is required');
        }

        //TODO: notice this code has racing problem where the same unicorn could be rented by more than one customer at the same time.
        const unicorn = this.unicornRepository.findById(rental.unicorn.id);
        if(unicorn == null) {
            return response.status(NOT_FOUND).json('Unicorn not found');
        }

        if(unicorn.isRented) {
            return response.status(GONE).json('Unicorn not available');
        }

        unicorn.isRented = true;
        this.unicornRepository.save(unicorn);
        rental.unicorn = unicorn;
        const updatedModule = this.rentalRepository.save(rental);

        return response.status(CREATED).json(updatedModule);
    }
}
