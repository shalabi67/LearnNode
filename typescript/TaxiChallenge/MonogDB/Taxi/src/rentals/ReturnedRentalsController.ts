import {Response} from 'express';
import {NO_CONTENT, OK} from "http-status-codes";
import {UnicornRepository} from "../unicorns/UnicornRepository";
import {ReturnedRentalRepository} from "./ReturnedRentalRepository";
import {RentalRepository} from "./RentalRepository";
import {ReturnedRental} from "./ReturnedRental";
import ReturnedRentalSchema from "../database/ReturnedRentalSchema";

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
        const rentals = await this.rentalReturnRepository.list();
        return response.status(OK).json(rentals);
    }

    public async returnRental(rentalId: number, response: Response): Promise<Response> {
        const rental = await this.rentalRepository.findById(rentalId);
        if(rental == null) {
            return response.status(NO_CONTENT).json(`could not find rental with is= ${rentalId}`);
        }

        rental.unicorn.isRented = false;
        const returnedRental = new ReturnedRentalSchema({id: rental.id, unicorn: rental.unicorn, rentingDate: rental.rentingDate, returningDate: new Date()});
        await this.unicornRepository.update(rental.unicorn);

        const newReturnedRental = await this.rentalReturnRepository.save(returnedRental);

        return response.status(OK).json(newReturnedRental);
    }

}
