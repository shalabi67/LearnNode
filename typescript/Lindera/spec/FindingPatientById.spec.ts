import {PatientDao} from '../src/patients/PatientDao';
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import { logError } from '@shared';
import {INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from 'http-status-codes';
import app from '@server';
import {exitingPatientId, getPatientUrl, notExistingPatientId, PatientDaoMock} from '../tests/mocks/PatientDao.mock';
import {PatientDaoExceptionMock} from '../tests/mocks/PatientDaoException.mock';

describe('Finding Patient by patientId', ()=> {
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    beforeEach(() => {
        PatientDao.createForTest(new PatientDaoMock());
    });

    it('should return requested patient',  (done) => {
        agent.get(getPatientUrl(exitingPatientId))
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
    });

    it('should return no patients since the query did not match any patient.',  (done) => {
        agent.get(getPatientUrl(notExistingPatientId))
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(NOT_FOUND);
                done();
            });
    });

    it('should handle server exception.', (done) => {
        PatientDao.createForTest(new PatientDaoExceptionMock());
        agent.get(getPatientUrl(exitingPatientId))
            .end((err: Error, res: Response) => {
                expect(res.status).toBe(INTERNAL_SERVER_ERROR);
                done();
            });
    });

});
