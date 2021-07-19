import {DataTypes, Sequelize} from "sequelize";

const Task = (sequelize: Sequelize) => {

    sequelize.define('task', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        task: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN
        }
    })

}

export = Task;