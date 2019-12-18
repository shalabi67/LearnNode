import {Request, Response, Router} from 'express';
import {UnicornsController} from "./UnicornsController";

export const UnicornsUrl = '/unicorns/rentals';
const router = Router();
const unicornController = new UnicornsController();

router.route(UnicornsUrl)
    .get( async (request: Request, response: Response) => {

    })
    .post(async (request: Request, response: Response) => {
        return unicornController.addRental(request.body, response);
    });


export default router;
