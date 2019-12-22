import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import RentalsRouter from './rentals/RentalsRouter';
import UnicornsRouter from "./unicorns/UnicornsRouter";
import HealthRouter from './health/HealthRouter';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('', RentalsRouter);
app.use('', UnicornsRouter);
app.use('/healtz', HealthRouter);

// Export express instance
export default app;
