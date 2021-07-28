import { Task } from '../models/task.model';
import { ETaskStatus } from '../models/share';

export const getAllTasks = async (): Promise<Task[]> => {
    return await Task.findAll();
}

export const getTaskByStatus = async (status: string): Promise<Task[]> => {
    return await Task.findAll({
        where: { status }
    });
}

export const addTask = async (task: string): Promise<string> => {
    const newTask = await Task.create({task: task, status: ETaskStatus.Incomplete});
    return(newTask.id);
}