import { Sequelize } from "sequelize";
import Tasks from "./models/task";
import dotenv from "dotenv";

dotenv.config({path: __dirname + '/../../.env.local'});

const database = new Sequelize(`mysql://${process.env.DB_USER}:@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {logging:false});

const setupDatabase = () => {
    Tasks(database);
}

setupDatabase();

export = database;