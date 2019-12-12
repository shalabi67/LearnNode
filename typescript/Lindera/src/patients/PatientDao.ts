import Patient, {IPatient} from './Patient';

import mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO || '', { useNewUrlParser: true, useUnifiedTopology: true });

export interface IPatientDao {
    getAll: (patient: any) => Promise<IPatient[]>;
    add: (patient: IPatient) => Promise<IPatient>;
    findPatient: (patientId: string) => Promise<any>;
    deletePatient: (patientId: string) => Promise<any>;
    updatePatient: (patientId: string, patient: any) => Promise<IPatient>;
    isValidId: (patientId: string) => boolean;

}

export class PatientDao implements IPatientDao {
    private static patientDao: IPatientDao;
    public static create(): IPatientDao {
        if(!PatientDao.patientDao) {
            PatientDao.patientDao = new PatientDao();
        }

        return PatientDao.patientDao;
    }

    public static createForTest(patientDao: IPatientDao): IPatientDao {
        PatientDao.patientDao = patientDao;
        return PatientDao.create();
    }

    public async getAll(patient: any): Promise<IPatient[]> {
        return Patient.find(patient);
    }

    public async findPatient(patientId: string): Promise<IPatient> {
        // @ts-ignore
        return Patient.findById(patientId);
    }

    public async add(patient: IPatient): Promise<IPatient> {
        return patient.save();
    }

    public async deletePatient(patientId: string): Promise<any> {
        return Patient.findByIdAndDelete({_id: patientId});
    }

    public async updatePatient(patientId: string, patient: any): Promise<IPatient> {
        // @ts-ignore
        return Patient.findByIdAndUpdate(patientId, {$set:patient},{new: true, runValidators: true});
    }

    public isValidId(patientId: string) {
        return mongoose.Types.ObjectId.isValid(patientId);
    }
}
