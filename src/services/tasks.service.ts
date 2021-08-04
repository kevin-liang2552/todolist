import { Task } from '../models/task.model';
import { ETaskStatus } from '../models/share';

export const getAllTasks = async (): Promise<Task[]> => {
    return Task.findAll();
}

export const getTaskByStatus = async (status: string): Promise<Task[]> => {
    return Task.findAll({
        where: { status }
    });
}

export const getTaskByID = async (id: string): Promise<Task | null> => {

    return Task.findOne({
        where: { id }
    });
}

export const addTask = async (task: string): Promise<Task> => {
    const newTask = await Task.create({task: task, status: ETaskStatus.Incomplete});
    return(newTask);
}

export const deleteTaskByID = async (id: string): Promise<void> => {
    const task = await getTaskByID(id);
    
    if(!task){
        throw new Error(`Could not find task ${id} in database`);
    }
    
    Task.destroy({
        where:{ id }
    });
}

export const deleteTaskByStatus = async (status: string): Promise<void> => {
    Task.destroy({
        where:{ status }
    });
}

export const updateTask = async (id: string, status: string): Promise<void> => {

    const task = await getTaskByID(id);

    if(!task){
        throw new Error(`Could not find task ${id} in database`);
    }

    await Task.update({status: status},{
        where:{ id }
    });

}