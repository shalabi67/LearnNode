import {Response} from 'express';
import {OK} from 'http-status-codes';
import {UnicornRepository} from './UnicornRepository';
import {Database} from '../database/Database';

export class UnicornsController {
    private unicornRepository: UnicornRepository;

    constructor(unicornRepository: UnicornRepository) {
        this.unicornRepository = unicornRepository;
    }

    public async getUnicorns(response: Response): Promise<Response> {
        const rentals = await this.unicornRepository.getAll();
        return response.status(OK).json(rentals);
    }

    public async initializeUnicorns(response: Response): Promise<Response> {
        Database.initializeUnicorn();

        return response.status(OK).json({});
    }
}
