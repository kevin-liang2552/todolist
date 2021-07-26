import { models } from '../database/index';

export const get_all_tasks = async () => {
    return await models.task.findAll();
}

export async function get_tasks(status:string){
    return await models.task.findAll({
        where: {status: status}
    });
}