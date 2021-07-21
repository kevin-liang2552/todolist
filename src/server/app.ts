import express from 'express';
import loggerMiddleware from './middleware';
import mainRouter from './routes/index';

const app = express();

app.use(loggerMiddleware);
app.use('/', mainRouter);

export = app;