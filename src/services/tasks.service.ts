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

export const getTaskByID = async (id: string): Promise<Task> => {
    try{
        const task = await Task.findOne({
            where: { id }
        });

        if(task !== null){
            return task;
        }else{
            throw('Could not find task ID in database');
        }   
    }catch(err){
        return(err);
    }
}

export const addTask = async (task: string): Promise<string> => {
    const newTask = await Task.create({task: task, status: ETaskStatus.Incomplete});
    return(newTask.id);
}

export const deleteTaskByID = async (id: string): Promise<void> => {
    try{
        await getTaskByID(id);
        await Task.destroy({
            where:{ id }
        });
    }catch(err){
        return(err);
    }
}

export const deleteTaskByStatus = async (status: string): Promise<void> => {
    try{
        await Task.destroy({
            where:{ status }
        });
    }catch(err){
        return(err);
    }
}