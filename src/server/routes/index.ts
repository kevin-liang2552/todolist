import express from 'express';
import getRouter from './getTasks.routes';
import addRouter from './addTasks.routes';

const mainRouter = express.Router();

mainRouter.use('/', getRouter);
mainRouter.use('/', addRouter);

export = mainRouter;