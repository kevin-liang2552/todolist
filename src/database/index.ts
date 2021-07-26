import {Sequelize} from "sequelize";
import Task from "./models/task.model";
import dotenv from "dotenv";

dotenv.config({path: __dirname + '/../../.env.local'});

const database = new Sequelize(`mysql://${process.env.DB_USER}:@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {logging:false});


const setupDatabase = async () => {
    await Task(database);
}

setupDatabase();

export = database;