import express from 'express';
import {models} from '../../database/index';

const router = express.Router();

router.get('/tasks', async (_req, res) => {
    const tasks = await models.task.findAll();
    res.send(tasks);
});

export = router;