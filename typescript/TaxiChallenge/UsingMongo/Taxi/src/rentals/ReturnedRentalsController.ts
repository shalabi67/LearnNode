import {Response} from 'express';
import {GONE, NO_CONTENT, OK} from 'http-status-codes';
import {UnicornRepository} from '../unicorn/UnicornRepository';
import {ReturnedRentalRepository} from './ReturnedRentalRepository';
import {RentalRepository} from './RentalRepository';
import ReturnedRental from '../database/ReturnedRental';
import {logMessage} from "@shared";

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

        // TODO: what if the system went down. to do this se can use messaging system
        setTimeout(() => {
                this.unicornRepository.returnUnicorn(rental.unicorn)
                    .then((returnedUnicorn) => {
                        //This can be send as notification.
                        logMessage(`unicorn with name name="${returnedUnicorn.name}" is ready for renting`);
                    })
            },rental.unicorn.restDuration*60*1000
        );

        const returnedRental = new ReturnedRental({rental, returningDate: new Date()});
        const newReturnedRental = await this.rentalReturnRepository.add(returnedRental);

        return response.status(OK).json(newReturnedRental);
    }

}
