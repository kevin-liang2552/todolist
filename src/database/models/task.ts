import {DataTypes, Sequelize} from "sequelize";

const Task = (sequelize: Sequelize) => {

    const taskModel = sequelize.define('task', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
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

    taskModel.sync();
}

export = Task;