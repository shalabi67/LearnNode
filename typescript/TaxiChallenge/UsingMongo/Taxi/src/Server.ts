import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import UnicornsRouter from './unicorn/UnicornsRouter';
import BodyParser from 'body-parser';



// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('', UnicornsRouter);
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

// Export express instance
export default app;
