import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import RentalsRouter from './rentals/RentalsRouter';
import UnicornsRouter, {UnicornsUrl} from "./unicorns/UnicornsRouter";

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('', RentalsRouter);
app.use('', UnicornsRouter);

// Export express instance
export default app;
