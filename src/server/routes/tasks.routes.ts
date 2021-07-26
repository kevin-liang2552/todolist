import express from 'express';
import * as _ from '../../controllers/get_tasks';

const router = express.Router();
const valid_status = 'complete'||'incomplete';

router.get('/tasks', async (_req, res) => {
    const tasks = _.get_all_tasks();
    res.status(200).send(tasks);
});

router.get('/tasks/:status', async (req, res) => {
    const status = req.params.status;
    if(status != valid_status){
        res.status(400);
    }else{
        const tasks = _.get_tasks(status);
        res.status(200).send(tasks);
    }
    
});

export = router;