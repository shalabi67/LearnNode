import {PatientDao} from '../src/patients/PatientDao';
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import { logError } from '@shared';
import {INTERNAL_SERVER_ERROR, OK} from 'http-status-codes';
import app from '@server';
import {exitingPatientId, getPatientUrl, notExistingPatientId, PatientDaoMock} from '../tests/mocks/PatientDao.mock';
import {PatientDaoExceptionMock} from '../tests/mocks/PatientDaoException.mock';

describe('Deleting Patient by patientId', ()=> {
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    beforeEach( () => {
        PatientDao.createForTest(new PatientDaoMock());
    });

    it('should delete requested patient and return HTTP status code 200',  (done) => {
        agent.delete(getPatientUrl(exitingPatientId))
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
    });

    it('should return HTTP status code 200 when the patient does not exist.',  (done) => {
        agent.delete(getPatientUrl(notExistingPatientId))
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
    });

    it('should handle server exception.', (done) => {
        PatientDao.createForTest(new PatientDaoExceptionMock());
        agent.delete(getPatientUrl(exitingPatientId))
            .end((err: Error, res: Response) => {
                expect(res.status).toBe(INTERNAL_SERVER_ERROR);
                done();
            });
    });

});
