import { Task } from '../models/task.model';

export const getAllTasks = async (): Promise<Task[]> => {
    return await Task.findAll();
}

export const getTaskByStatus = async (status: string): Promise<Task[]> => {
    return await Task.findAll({
        where: { status }
    });
}