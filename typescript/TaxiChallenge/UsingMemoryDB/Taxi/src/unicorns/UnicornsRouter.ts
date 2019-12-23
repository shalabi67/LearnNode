import {Request, Response, Router} from 'express';
import {UnicornRepository} from "./UnicornRepository";
import {UnicornsController} from "./UnicornsController";

export const UnicornsUrl = '/unicorns';
const router = Router();

const unicornsController = new UnicornsController(UnicornRepository.createUnicornRepository());

router.route(UnicornsUrl)
    .get( async (request: Request, response: Response) => {
        return unicornsController.getUnicorns(response);
    });

export default router;
