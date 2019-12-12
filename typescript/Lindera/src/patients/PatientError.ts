import {Response} from 'express';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {logger} from '@shared';

export class PatientError {
    public static getErrorResponse(res: Response, error: string, httpStatus: number) {
        return res.status(httpStatus).json({error});
    }

    public static buildErrorResponse(err: any, res: Response) {
        if(err.name ===  'ValidationError' || err.name === 'MongoError') {
            return this.getErrorResponse(res, err.message, BAD_REQUEST);
        }

        logger.error(err.message);
        return this.getErrorResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}
