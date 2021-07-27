import { models } from '../database/index';
import { Model } from 'sequelize';
import { TaskAttributes, TaskCreationAttributes } from '../database/models/task.model';

export const get_all_tasks = async (): Promise<Model<TaskAttributes,TaskCreationAttributes>[]>=> {
    return await models.task.findAll();
}

export const get_tasks = async (status:string) => {
    return await models.task.findAll({
        where: {status: status}
    });
}