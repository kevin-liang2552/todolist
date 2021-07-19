import { Sequelize } from "sequelize";

const database = new Sequelize("mysql://root:@localhost:3306/tododb");

export = database;