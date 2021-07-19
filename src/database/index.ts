import { Sequelize } from "sequelize";
import Tasks from "./models/task";

const database = new Sequelize("mysql://root:@localhost:3306/tododb", {logging:false});

Tasks(database);

export = database;