import {Request, Response, Router} from 'express';
import {OK} from 'http-status-codes';

const router = Router();
router.get('', async (request: Request, response: Response) => {
    response.status(OK).json('System is healthy.');
});

export default router;
