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
    try{
        const task = await getTaskByID(id);
        
        if(task === null){
            throw new Error(`Could not find ${id} in database`);
        }
        
        await Task.destroy({
            where:{ id }
        });

    }catch(err){
        return(err);
    }
}

export const deleteTaskByStatus = async (status: string): Promise<void> => {
    await Task.destroy({
        where:{ status }
    });
}

export const updateTask = async (id: string): Promise<void> => {

    const task = await getTaskByID(id);

    if(task === null){
        throw new Error(`Could not find ${id} in database`);
    }

    if(task.status === ETaskStatus.Incomplete){
        await Task.update({status: ETaskStatus.Complete},{
            where:{ id }
        });
    }else{
        await Task.update({status: ETaskStatus.Incomplete},{
            where:{ id }
        });
    } 

}