import { DataTypes, Sequelize} from "sequelize";

export const Task = async (sequelize: Sequelize) => {

    const taskModel = sequelize.define('task', {
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
    await taskModel.sync({force: true}).then(() => {
        return taskModel.bulkCreate([
            {task: 'Buy Milk',
            status: 'incomplete'},
            {task: 'Buy Eggs',
            status: 'complete'},
        ]);
    });
}
