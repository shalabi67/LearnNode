import {Response} from 'express';
import {OK} from "http-status-codes";
import {UnicornRepository} from "./UnicornRepository";

export class UnicornsController {
    private unicornRepository: UnicornRepository;

    constructor(unicornRepository: UnicornRepository) {
        this.unicornRepository = unicornRepository;
    }

    public async getUnicorns(response: Response): Promise<Response> {
        const rentals = await this.unicornRepository.list();
        return response.status(OK).json(rentals);
    }
}
