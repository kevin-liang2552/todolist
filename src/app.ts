#!/usr/bin/env node
//import {database} from './models/index'
import express from 'express';

import mainRouter from './routes/index';

const app = express();
const port = 8080;

function loggerMiddleware(request: express.Request, _response: express.Response, next: express.NextFunction) {
  console.log(`${request.method} ${request.path}`);
  next();
}

//database();
app.use(loggerMiddleware);

app.listen(port, () => {
  console.log(`Hello World! Running on port ${port}`);
});

app.use('/', mainRouter);
