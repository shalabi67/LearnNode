import {IPatientDao} from '../../src/patients/PatientDao';
import Patient, {IPatient} from '../../src/patients/Patient';
import {PatientsUrl} from '../../src/patients/PatientsRoute';

export const exitingPatientId = 'id';
export const notExistingPatientId = 'not found';
export const invalidPatientId = 'invalid';
export const patientObject = {firstName:'firstName', lastName:'lastName', birthday: Date.now()};

export function getPatientUrl(patientId: string) {
    return `${PatientsUrl}/${patientId}`;
}

export class PatientDaoMock implements IPatientDao {

    public async add(patient: IPatient): Promise<IPatient> {
        const newPatient = new Patient(patient);
        newPatient.firstName = 'mock';
        return Promise.resolve(newPatient);
    }

    public async getAll(patient: any): Promise<IPatient[]> {
        switch (patient.firstName) {
            case 'not found': return Promise.resolve([]);
            case 'one': return  Promise.resolve([new Patient(patientObject)]);
        }

        const patients = [
            new Patient(patientObject),
            new Patient({
                firstName: patientObject.firstName + '1',
                lastName: patientObject.lastName + '1',
                birthday: patientObject.birthday})
        ];

        return Promise.resolve(patients);
    }

    public async findPatient(patientId: string): Promise<IPatient> {
        switch (patientId) {
            case 'id': return  Promise.resolve(new Patient(patientObject));
        }
        // @ts-ignore
        return Promise.resolve(null);
    }

    public async deletePatient(patientId: string): Promise<any> {
        switch (patientId) {
            case 'id': return  Promise.resolve(patientId);
        }
        // @ts-ignore
        return Promise.resolve(null);
    }

    public async updatePatient(patientId: string, patient: any): Promise<IPatient> {
        if(patientId === notExistingPatientId) {
            // @ts-ignore
            return Promise.resolve(null);
        }

        Object.entries(patient).forEach( (item) => {
            // @ts-ignore
            patientObject[item[0]] = item[1];
        });
        return Promise.resolve(new Patient(patientObject));
    }

    public isValidId(patientId: string): boolean {
        if(patientId === invalidPatientId) {
            return false;
        }
        return true;
    }

}
