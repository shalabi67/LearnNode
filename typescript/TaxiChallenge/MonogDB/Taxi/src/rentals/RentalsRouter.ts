import {Request, Response, Router} from 'express';
import {RentalsController} from "./RentalsController";
import {RentalRepository} from "./RentalRepository";
import {UnicornRepository} from "../unicorns/UnicornRepository";
import {ReturnedRentalRepository} from "./ReturnedRentalRepository";
import {ReturnedRentalsController} from "./ReturnedRentalsController";

export const RentalsUrl = '/unicorns/rentals';
export const RentalReturnUrl = RentalsUrl + '/:rentalId'
const router = Router();

const rentalsController = new RentalsController(
    RentalRepository.createRentalRepository(),
    UnicornRepository.createUnicornRepository());

const returnedRentalsController = new ReturnedRentalsController(
    ReturnedRentalRepository.createReturnedRentalRepository(),
    RentalRepository.createRentalRepository(),
    UnicornRepository.createUnicornRepository());

router.route(RentalReturnUrl)
    .delete(async (request: Request, response: Response) => {
        return returnedRentalsController.returnRental(Number(request.params.rentalId), response);
    });

router.route(RentalsUrl)
    .get( async (request: Request, response: Response) => {
        return rentalsController.getRentals(response);
    })
    .post(async (request: Request, response: Response) => {
        return rentalsController.addRental(request.body, response);
    });

export default router;
