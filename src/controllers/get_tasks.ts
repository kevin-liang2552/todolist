import { taskModel } from "../database/models/task.model";

export const get_all_tasks = async () => {
    return await taskModel.findAll();
}

export const get_tasks = async (status:string) => {
    return await taskModel.findAll({
        where: {status: status}
    });
}