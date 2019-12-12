/**
 * This is not used. I kept it as an example of the possibility to remove PatientDao.create.
 */
const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
const mocks = '../../tests/mocks/';
let patientDaoPath = mocks;
if (usingMockDb === 'true') {
    patientDaoPath += 'PatientDao.mock';
} else {
    patientDaoPath = '../patients/PatientDao';
}

// tslint:disable:no-var-requires
export const { PatientDao } = require(patientDaoPath);
