import {Response} from 'express';
import {CREATED} from "http-status-codes";
import {Rental} from "./Rental";
import {RentalRepository} from "./RentalRepository";

export class RentalsController {
    private rentalRepository: RentalRepository;
    constructor(rentalRepository: RentalRepository) {
        this.rentalRepository = rentalRepository
    }

    public async getRentals(response: Response): Promise<Response> {
        const rentals = this.rentalRepository.list();
        return response.status(CREATED).json(rentals);
    }

    public async addRental(body: Rental, response: Response): Promise<Response> {
        const updatedModule = this.rentalRepository.save(body);
        return response.status(CREATED).json(updatedModule);
    }
}
