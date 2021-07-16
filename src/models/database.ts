import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mysql://root:@localhost:3306/tododb");

export const database = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}