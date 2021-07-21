import express from 'express';

const loggerMiddleware = (request: express.Request, _response: express.Response, next: express.NextFunction) => {
    console.log(`${request.method} ${request.path}`);
    next();
}

export = loggerMiddleware;