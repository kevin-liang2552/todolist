#!/usr/bin/env node
import express from 'express';

import database from './database/index'
import mainRouter from './routes/index';

const app = express();
const port = 8080;

const loggerMiddleware = (request: express.Request, _response: express.Response, next: express.NextFunction) => {
  console.log(`${request.method} ${request.path}`);
  next();
}

const authenticateDatabase = async () => {
  try {
      await database.authenticate();
      console.log('Connection has been established successfully.');

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

const init = () => {

  authenticateDatabase();
  app.use(loggerMiddleware);

  app.listen(port, () => {
    console.log(`Hello World! Running on port ${port}`);
  });
  
  app.use('/', mainRouter);
  
}

init();