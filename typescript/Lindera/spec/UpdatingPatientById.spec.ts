import {PatientDao} from '../src/patients/PatientDao';
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import { logError } from '@shared';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from 'http-status-codes';
import app from '@server';
import {
    exitingPatientId,
    getPatientUrl,
    notExistingPatientId,
    PatientDaoMock
} from '../tests/mocks/PatientDao.mock';
import {PatientDaoExceptionMock} from '../tests/mocks/PatientDaoException.mock';
import {
    EMPTY_NAME,
    EXISTING_PATIENT,
    INVALID_NAME,
    PatientDaoValidationExceptionMock
} from '../tests/mocks/PatientDaoValidationException.mock';
import {NextFunction} from 'express';

function updateInvalidPatient(agent: SuperTest<Test>, patientId: string, patient: any,  done: NextFunction) {
    agent.patch(getPatientUrl(patientId))
        .type('json').send(patient)
        .end((err: Error, res: Response) => {
            expect(res.status).toBe(BAD_REQUEST);
            done();
        });
}

describe('Updating Patient by patientId', ()=> {
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    beforeEach(() => {
        PatientDao.createForTest(new PatientDaoMock());
    });

    it('should update requested patient first name and return HTTP status code 200',  (done) => {
        const patient = {firstName:'newfirstName', lastName:'newlastName'};

        agent.patch(getPatientUrl(exitingPatientId))
            .type('json').send(patient)
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
    });

    it('should not update requested patient, because no update information is provided and return HTTP status code 200',
        (done) => {

        agent.patch(getPatientUrl(exitingPatientId))
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
    });

    it('should return HTTP status code NOT-FOUND when the patient does not exist.',  (done) => {
        const patient = {firstName:'newfirstName', lastName:'newlastName'};

        agent.patch(getPatientUrl(notExistingPatientId))
            .type('json').send(patient)
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(NOT_FOUND);
                expect(res.body.error).toBeUndefined();
                done();
            });
    });

    it('should not update ending with an exiting patient.', (done) => {
        PatientDao.createForTest(new PatientDaoValidationExceptionMock());
        const patient = {firstName: EXISTING_PATIENT, lastName:'newlastName'};

        updateInvalidPatient(agent, exitingPatientId, patient, done);
    });

    it('should not provide invalid name.', (done) => {
        PatientDao.createForTest(new PatientDaoValidationExceptionMock());
        const patient = {firstName: INVALID_NAME, lastName:'lastName'};

        updateInvalidPatient(agent, exitingPatientId, patient, done);
    });

    it('should not provide empty name.', (done) => {
        PatientDao.createForTest(new PatientDaoValidationExceptionMock());
        const patient = {firstName: EMPTY_NAME, lastName:'lastName'};

        updateInvalidPatient(agent, exitingPatientId, patient, done);
    });

    it('should handle server exception.', (done) => {
        PatientDao.createForTest(new PatientDaoExceptionMock());
        agent.patch(getPatientUrl(exitingPatientId))
            .end((err: Error, res: Response) => {
                expect(res.status).toBe(INTERNAL_SERVER_ERROR);
                done();
            });
    });

});
