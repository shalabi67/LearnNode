import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import UnicornsRouter from './unicorn/UnicornsRouter';
import RentalsRouter from './rentals/RentalsRouter';
import HealthRouter from './health/HealthRouter';
import BodyParser from 'body-parser';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('', UnicornsRouter);
app.use('', RentalsRouter);
app.use('/healtz', HealthRouter);
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

// Export express instance
export default app;
