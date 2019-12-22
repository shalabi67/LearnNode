import {Request, Response, Router} from 'express';
import {UnicornRepository} from './UnicornRepository';
import {UnicornsController} from './UnicornsController';
import {Database} from '../database/Database';
const fetch = require('node-fetch');
export async function isHealthyUnicorn() {
    const TAXI_URL= `http://${process.env.HOST}:${process.env.PORT}`;
    const response = await fetch(TAXI_URL + UnicornsUrl);
    const json = await response.json();
    return json;
}

export const UnicornsUrl = '/unicorns';
const router = Router();

Database.connect();

const unicornsController = new UnicornsController(UnicornRepository.create());



router.route(UnicornsUrl)
    .get( async (request: Request, response: Response) => {
        return unicornsController.getUnicorns(response);
    })
    .post(async (request: Request, response: Response) => {
        return unicornsController.initializeUnicorns(response);
    });

export default router;
