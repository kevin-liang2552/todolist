import express from 'express';
import * as _ from '../../controllers/get_tasks';

const router = express.Router();

router.get('/tasks', async (_req, res) => {
    const tasks = await _.get_all_tasks();
    res.status(200).send(tasks);
});

router.get('/tasks/:status', async (req, res) => {
    const status = req.params.status;
    if(status !== 'complete' && status !== 'incomplete'){
        res.status(400).send('Not a valid status');
    }else{
        const tasks = await _.get_tasks(status);
        res.status(200).send(tasks);
    }
    
});

export = router;