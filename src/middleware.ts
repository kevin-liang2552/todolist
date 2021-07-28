import express from 'express';

const loggerMiddleware = (request: express.Request, _response: express.Response, next: express.NextFunction): void => {
    console.log(`${request.method} ${request.path}`)
    next();
}

export function applyMiddleware(app: express.Express): void {
    app.use(loggerMiddleware);
}