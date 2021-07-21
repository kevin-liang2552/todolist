import express from 'express';
import router from './tasks.routes';

const mainRouter = express.Router();

mainRouter.use('/', router);

export = mainRouter;