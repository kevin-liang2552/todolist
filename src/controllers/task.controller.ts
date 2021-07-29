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

// Unsure if there is a better way to do this.
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    
  const type = req.params?.type;

  if(type !== ETaskStatus.Complete && type !== ETaskStatus.Incomplete){
    try{
      await taskService.deleteTaskByID(type);
      res.status(200).send();
    }catch(err){
      res.status(400).send(err);
    }
  }else{
    const tasks = await taskService.deleteTaskByStatus(type);
    res.status(200).send(tasks);
  }

}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    
  const id: string = req.params?.id;

  try{
    await taskService.updateTask(id);
    res.status(200).send();
    
  }catch(err){
    res.status(400).send(err);
  }

}
