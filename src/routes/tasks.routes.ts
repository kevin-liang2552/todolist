import express from 'express';
import * as taskController from '../controllers/task.controller';

export const setup = (router: express.Router): void => {
    router.get('/tasks', taskController.getAllTasks);
    router.post('/tasks', taskController.addTask);

    router.get('/tasks/:status', taskController.getTaskByStatus);
}
