import {Request, Response, Router} from 'express';
import {PatientsController} from './PatientsController';
import {PatientController} from './PatientController';
import {NextFunction} from 'express-serve-static-core';
import {NOT_FOUND} from 'http-status-codes';
import {PatientDao} from './PatientDao';

export const PatientsUrl = '/patients';
export const PatientUrl = '/patients/:patientId';

const router = Router();
const patientsController = new PatientsController();
const patientController = new PatientController();

/**
 * validate patient id on the request.
 */
router.use(PatientUrl, (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId;
    const patientDao = PatientDao.create();
    if(patientDao.isValidId(patientId)) {
        return next();
    }

    return res.status(NOT_FOUND).json(`Invalid patient id: ${patientId}`);
});

router.route(PatientsUrl)
    .get( async (req: Request, res: Response) => {
        return await patientsController.getPatients(req.query, res);
    })
    .post(async (req: Request, res: Response) => {
        return await patientsController.addPatient(req.body, res);
    });

router.route(PatientUrl)
    .get(async (req: Request, res: Response) => {
        return await patientController.getPatient(req.params.patientId, res);
    })
    .delete(async (req: Request, res: Response) => {
        return await patientController.deletePatient(req.params.patientId, res);
    })
    .patch(async (req: Request, res: Response) => {
        return await patientController.updatePatient(req.params.patientId, req.body, res);
    });

export default router;
