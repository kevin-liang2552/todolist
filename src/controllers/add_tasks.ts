import { models } from '../database/index';

export const add_task = async (task:string) => {
    const new_task = await models.task.create({ task: task, status: 'incomplete'});
    return(new_task.get('id'));
}