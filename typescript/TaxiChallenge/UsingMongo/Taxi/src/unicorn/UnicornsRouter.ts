import {Request, Response, Router} from 'express';
import {UnicornRepository} from './UnicornRepository';
import {UnicornsController} from './UnicornsController';
import {Database} from '../database/Database';
import {TAXI_URL} from '../index';
const fetch = require('node-fetch');

export const UnicornsUrl = '/unicorns';
const router = Router();

Database.connect();

const unicornsController = new UnicornsController(UnicornRepository.create());

export async function isHealthyUnicorn() {
    //return await fetch(TAXI_URL + UnicornsUrl)
    const response = await fetch(TAXI_URL + UnicornsUrl);
    const json = await response.json();
    return json;

        /*
        .then((response) => {
            return response.statusText;
        })
        .catch((response)=>{
            return 'unicorn is not healthy';
        })
        
         */
}

router.route(UnicornsUrl)
    .get( async (request: Request, response: Response) => {
        return unicornsController.getUnicorns(response);
    })
    .post(async (request: Request, response: Response) => {
        return unicornsController.initializeUnicorns(response);
    });

export default router;
