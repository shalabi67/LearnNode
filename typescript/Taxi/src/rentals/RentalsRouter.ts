import {Request, Response, Router} from 'express';
import {RentalsController} from "./RentalsController";
import {RentalRepository} from "./RentalRepository";

export const UnicornsUrl = '/unicorns/rentals';
const router = Router();
const rentalsController = new RentalsController(new RentalRepository());

router.route(UnicornsUrl)
    .get( async (request: Request, response: Response) => {
        return rentalsController.getRentals(response);
    })
    .post(async (request: Request, response: Response) => {
        return rentalsController.addRental(request.body, response);
    });


export default router;
