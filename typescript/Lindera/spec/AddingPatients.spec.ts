import {PatientDao} from '../src/patients/PatientDao';
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import { logError } from '@shared';
import {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import app from '@server';
import { PatientDaoMock} from '../tests/mocks/PatientDao.mock';
import {PatientsUrl} from '../src/patients/PatientsRoute';
import {PatientDaoExceptionMock} from '../tests/mocks/PatientDaoException.mock';
import {
    EMPTY_NAME,
    EXISTING_PATIENT,
    INVALID_NAME,
    PatientDaoValidationExceptionMock
} from '../tests/mocks/PatientDaoValidationException.mock';
import {NextFunction} from 'express';

function addInvalidPatient(agent: SuperTest<Test>, patientObject: any, done: NextFunction) {
    agent.post(PatientsUrl).type('json').send(patientObject)
        .end((err: Error, res: Response) => {
            logError(err);
            expect(res.status).toBe(BAD_REQUEST);
            done();
        });
}

describe('Adding Patient', ()=> {
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    beforeEach( () => {
        PatientDao.createForTest(new PatientDaoValidationExceptionMock());
    });

    it('should create a Patient with and id',  (done) => {
        const patientObject = {firstName:'firstName', lastName:'lastName', birthday: Date.now()};
        PatientDao.createForTest(new PatientDaoMock());

        agent.post(PatientsUrl).type('json').send(patientObject)
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(CREATED);
                expect(res.body.error).toBeUndefined();
                expect(res.body.firstName).toBe('mock');
                done();
            });
    });

    it('should has exiting first name.', (done) => {
        const patientObject = {lastName:'lastName', birthday: Date.now()};

        addInvalidPatient(agent, patientObject, done);
    });

    it('should has exiting last name.', (done) => {
        const patientObject = {firstName:'firstName', birthday: Date.now()};

        addInvalidPatient(agent, patientObject, done);
    });

    it('should has exiting birthday.', (done) => {
        const patientObject = {firstName:'firstName', lastName:'lastName'};

        addInvalidPatient(agent, patientObject, done);
    });

    it('should not has exiting patient.', (done) => {
        const patientObject = {firstName: EXISTING_PATIENT, lastName:'lastName', birthday: Date.now()};

        addInvalidPatient(agent, patientObject, done);
    });

    it('should not provide invalid name.', (done) => {
        const patient = {firstName: INVALID_NAME, lastName:'lastName', birthday: Date.now()};

        addInvalidPatient(agent, patient, done);
    });

    it('should not provide empty name.', (done) => {
        const patient = {firstName: EMPTY_NAME, lastName:'lastName', birthday: Date.now()};

        addInvalidPatient(agent, patient, done);
    });

    it('should handle server exception.', (done) => {
        const patientObject = {firstName:'firstName', lastName:'lastName', birthday: Date.now()};
        PatientDao.createForTest(new PatientDaoExceptionMock());
        agent.post(PatientsUrl).type('json').send(patientObject)
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(INTERNAL_SERVER_ERROR);
                done();
            });
    });

});
