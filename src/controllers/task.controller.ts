import { Request, Response } from 'express'
import { ETaskStatus } from '../models/share';
import { taskService } from '../services'

export const getAllTasks = async (_: any, res: Response): Promise<void> => {

  const tasks = await taskService.getAllTasks();
  res.status(200).send(tasks);

}

export const getTaskByStatus = async (req: Request, res: Response): Promise<void> => {

  const status = req.params?.status;

  if (status !== ETaskStatus.Complete && status !== ETaskStatus.Incomplete) {
    res.status(400).send('Not a valid status');
  } else {
    const tasks = await taskService.getTaskByStatus(status);
    res.status(200).send(tasks);
  }

}

export const addTask = async (req: Request, res: Response): Promise<void> => {
    
  const data: string = req.body?.task;

  if (data === undefined){
    res.status(400).send('Missing required field: task');
  } else {
    const newTaskID = await taskService.addTask(data);
    res.status(200).send(newTaskID);
  }

}