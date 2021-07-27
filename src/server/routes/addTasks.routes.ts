import express from 'express';
import * as _ from '../../controllers/add_tasks';

const addRouter = express.Router();

addRouter.post('/tasks', async (req, res)=> {
    const data = req.body;
    if(data.task === undefined){
        res.status(400).send('Received data does not contain required fields');
    }else{
        const newTaskID = await _.add_task(data.task);
        res.status(200).send(newTaskID);
    }
    
});

export = addRouter;