import {Response} from 'express';
import {INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from 'http-status-codes';
import {PatientDao} from './PatientDao';
import {PatientError} from './PatientError';

export class PatientController {
    public async getPatient(patientId: string, res: Response): Promise<Response> {
        try {
            const patientDao = PatientDao.create();
            const patient = await patientDao.findPatient(patientId);

            if(patient) {
                return res.status(OK).json(patient);
            }
            return res.status(NOT_FOUND).json(patient);
        } catch (err) {
            return PatientError.getErrorResponse(res, err.message, INTERNAL_SERVER_ERROR);
        }
    }

    public async deletePatient(patientId: string, res: Response): Promise<Response> {
        try {
            const patientDao = PatientDao.create();
            const result = await patientDao.deletePatient(patientId);

            // let us ignore the null result as if the item does not exist and return always the same result.
            // another option is to return no content(204).
            return res.status(OK).json(patientId);
        } catch (err) {
            return PatientError.getErrorResponse(res, err.message, INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Notice no need to check if extra field will be added, this is done through mongoose
     * @param patientId
     * @param patient
     * @param res
     */
    public async updatePatient(patientId: string, patient: any, res: Response): Promise<Response> {
        try {
            const patientDao = PatientDao.create();
            const updatedPatient = await patientDao.updatePatient(patientId, patient);

            if(updatedPatient) {
                return res.status(OK).json(updatedPatient);
            }
            return res.status(NOT_FOUND).json(patientId);
        } catch (err) {
            return PatientError.buildErrorResponse(err, res);
        }
    }
}
