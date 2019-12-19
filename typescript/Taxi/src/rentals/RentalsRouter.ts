import {Request, Response, Router} from 'express';
import {RentalsController} from "./RentalsController";
import {RentalRepository} from "./RentalRepository";
import {UnicornRepository} from "../unicorns/UnicornRepository";

export const RentalsUrl = '/unicorns/rentals';
const router = Router();

const rentalsController = new RentalsController(
    RentalRepository.createRentalRepository(),
    UnicornRepository.createUnicornRepository());

router.route(RentalsUrl)
    .get( async (request: Request, response: Response) => {
        return rentalsController.getRentals(response);
    })
    .post(async (request: Request, response: Response) => {
        return rentalsController.addRental(request.body, response);
    });

export default router;
