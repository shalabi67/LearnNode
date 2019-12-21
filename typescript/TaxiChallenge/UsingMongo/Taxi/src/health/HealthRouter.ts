import {Request, Response, Router} from 'express';
import {OK} from 'http-status-codes';
import {Database} from '../database/Database';
import {isHealthyUnicorn} from '../unicorn/UnicornsRouter';

const router = Router();
router.get('', async (request: Request, response: Response) => {
    const unicornHealth = await isHealthyUnicorn();
    const health = {databaseHealth: Database.isHealthyDatabase(), unicornHealth: unicornHealth.length > 0};
    return response.status(OK).json(health);
});

export default router;
