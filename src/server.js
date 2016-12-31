import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import endpoints from './routes';
import { Recipe } from './models';

const app = express();

// apply middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app routes
app.use('/api', endpoints());

export default app;
