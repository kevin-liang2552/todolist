import { DataTypes, ModelDefined, Optional } from "sequelize";
import database from "..";
export interface TaskAttributes {
    id: string;
    task: string;
    status: string;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

export const taskModel : ModelDefined<TaskAttributes, TaskCreationAttributes> = database.define('task', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//Currently doing this to add data to the database - attempted to do seeds but couldn't get it working.
async () => await taskModel.sync({force: true}).then(() => {
    return taskModel.bulkCreate([
        {task: 'Buy Milk',
        status: 'incomplete'},
        {task: 'Buy Eggs',
        status: 'complete'},
    ]);
});

