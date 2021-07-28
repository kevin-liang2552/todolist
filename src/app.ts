import express from 'express';
import { applyMiddleware } from './middleware';
import { router } from './routes';

const app = express();
// should setup other things here as well
applyMiddleware(app)
// setting up routes
app.use('/', router);

export = app;