import express from 'express';
import { setup as setupTasks } from './tasks.routes';

export const router = express.Router()

const setupRoutes = (): void => {
  setupTasks(router)
}

setupRoutes()