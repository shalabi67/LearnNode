import {IPatientDao} from '../../src/patients/PatientDao';
import Patient, {IPatient} from '../../src/patients/Patient';

export class PatientDaoExceptionMock implements IPatientDao {

    public async add(patient: IPatient): Promise<IPatient> {
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
        throw new Error('Simulate server error.');
    }

    public isValidId(patientId: string): boolean {
        return true;
    }
}
