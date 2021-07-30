import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { ETaskStatus } from "./share";

export class Task extends Model {
    public id: string
    public task: string
    public status: ETaskStatus
}

Task.init({
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
}, {
    sequelize,
    tableName: 'tasks',
    underscored: true,
    timestamps: false,
})
