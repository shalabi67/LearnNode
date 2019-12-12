import {PatientDao} from '../src/patients/PatientDao';
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import { logError } from '@shared';
import {INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from 'http-status-codes';
import app from '@server';
import {PatientDaoMock} from '../tests/mocks/PatientDao.mock';
import {PatientsUrl} from '../src/patients/PatientsRoute';
import {PatientDaoExceptionMock} from '../tests/mocks/PatientDaoException.mock';

describe('Getting Patients', ()=> {
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    beforeEach(() => {
        PatientDao.createForTest(new PatientDaoMock());
    });

    it('should return all patients',  (done) => {
        agent.get(PatientsUrl)
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                const patients = res.body;
                expect(patients.length).toBe(2);
                done();
            });
    });

    it('should return no patients since the query did not match any patient.',  (done) => {
        const patientObject = {firstName:'not found'};

        agent.get(PatientsUrl)
            .query(patientObject)
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(NOT_FOUND);
                const patients = res.body;
                expect(patients.length).toBe(0);
                done();
            });
    });

    it('should find one patient based on the provided query.',   (done) => {
        const patientObject = {firstName:'one', lastName:'lastName', birthday: Date.now()};

        agent.get(PatientsUrl)
            .query(patientObject)
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(OK);
                const patients = res.body;
                expect(patients.length).toBe(1);
                done();
            });
    });

    it('should handle server exception.',  (done) => {
        PatientDao.createForTest(new PatientDaoExceptionMock());
        agent.get(PatientsUrl)
            .end((err: Error, res: Response) => {
                expect(res.status).toBe(INTERNAL_SERVER_ERROR);
                done();
            });
    });

});
