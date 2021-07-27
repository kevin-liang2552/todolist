import express from 'express';
import loggerMiddleware from './middleware';
import mainRouter from './routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use('/', mainRouter);

export = app;