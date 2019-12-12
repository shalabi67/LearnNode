import {IPatientDao} from '../../src/patients/PatientDao';
import {IPatient} from '../../src/patients/Patient';
import mongoose, { Schema, Document } from 'mongoose';
import {MongoError} from 'mongodb';

export const EXISTING_PATIENT = 'existing';
export const INVALID_NAME = 'invalid';
export const EMPTY_NAME = 'empty';

export class PatientDaoValidationExceptionMock implements IPatientDao {

    public async add(patient: IPatient): Promise<IPatient> {
        this.throwValidationError(patient.firstName);

        throw new Error('Simulate server error.');
    }
    public async getAll(patient: any): Promise<IPatient[]> {
        throw new Error('Simulate server error.');
    }
    public async findPatient(patientId: string): Promise<IPatient> {
        throw new Error('Simulate server error.');
    }
    public async deletePatient(patientId: string): Promise<any> {
        throw new Error('Simulate server error.');
    }

    public async updatePatient(patientId: string, patient: any): Promise<IPatient> {
        this.throwValidationError(patient.firstName);

        throw new Error('Simulate server error.');
    }

    public isValidId(patientId: string): boolean {
        return true;
    }

    private throwValidationError(value: string) {
        switch(value) {
            case EXISTING_PATIENT: throw new MongoError('should not add an exiting patient.');
            case EMPTY_NAME:
            case INVALID_NAME:
            default: throw new mongoose.Error.ValidationError();
        }
    }
}
