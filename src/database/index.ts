import { sequelize } from "./models/index";
import Task from "./models/task.model";
import dotenv from "dotenv";

dotenv.config({path: __dirname + '/../../.env.local'});

const setupDatabase = async () => {
    await Task(sequelize);
}

setupDatabase();

export = sequelize;