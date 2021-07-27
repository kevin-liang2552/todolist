import { taskModel } from "../database/models/task.model";

export const add_task = async (task:string) => {
    const new_task = await taskModel.create({ task: task, status: 'incomplete'});
    return(new_task.get('id'));
}