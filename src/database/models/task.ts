import {DataTypes, Sequelize} from "sequelize";

const Task = (sequelize: Sequelize) => {

    const taskModel = sequelize.define('task', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    taskModel.sync();
}

export = Task;