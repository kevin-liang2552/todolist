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
    res.status(200).send({ id: newTaskID.id });
  }

}

export const deleteTaskByID = async (req: Request, res: Response): Promise<void> => {
    
  const id = req.params?.id;
  try{
    await taskService.deleteTaskByID(id);
    res.status(200).send();
  }catch(err){
    res.status(400).send(err);
  }
  
}

export const deleteTaskByStatus = async (req: Request, res: Response): Promise<void> => {
    
  const status: string = req.params?.status;

  if (status !== ETaskStatus.Complete && status !== ETaskStatus.Incomplete) {
    res.status(400).send('Not a valid status');
  } else {
    await taskService.deleteTaskByStatus(status);
    res.status(200).send();
  }

}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    
  const id: string = req.params?.id;
  const status: string = req.params?.status;

  try{

    if (status !== ETaskStatus.Complete && status !== ETaskStatus.Incomplete) {
      throw(new Error('Not a valid Status'));
    } 
    
    await taskService.updateTask(id, status);
    res.status(200).send();
    
  }catch(err){
    res.status(400).send(err);
  }

}
