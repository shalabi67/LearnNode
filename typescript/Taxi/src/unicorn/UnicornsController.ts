import {Response} from 'express';
import {CREATED} from "http-status-codes";

export class UnicornsController {
    public async addRental(body: object, res: Response): Promise<Response> {
        return res.status(CREATED)
    }
}
