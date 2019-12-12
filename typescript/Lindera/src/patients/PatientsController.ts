import {Response} from 'express';
import Patient from './Patient';
import {CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from 'http-status-codes';
import {PatientDao} from './PatientDao';
import {PatientError} from './PatientError';

export class PatientsController {
    public async addPatient(body: object, res: Response): Promise<Response> {
        try {
            const patientDao = PatientDao.create();

            const patient = new Patient(body);

            const newPatient = await patientDao.add(patient);
            return res.status(CREATED).json(newPatient);
        } catch (err) {
            return PatientError.buildErrorResponse(err, res);
        }
    }

    public async getPatients(query: any, res: Response): Promise<Response> {
        try {
            const patientDao = PatientDao.create();
            const patient = PatientsController.getQuery(query);
            const patients = await patientDao.getAll(patient);

            if(patients.length === 0) {
                return res.status(NOT_FOUND).json(patients);
            }
            return res.status(OK).json(patients);
        } catch (err) {
            return PatientError.getErrorResponse(res, err.message, INTERNAL_SERVER_ERROR);
        }
    }

    private static getQuery(query: any): object {
        const patient = {};
        if(query.firstName) {
            // @ts-ignore
            patient.firstName = query.firstName;
        }
        if(query.lastName) {
            // @ts-ignore
            patient.lastName = query.lastName;
        }
        if(query.birthday) {
            // @ts-ignore
            patient.birthday = query.birthday;
        }

        return patient;
    }
}
