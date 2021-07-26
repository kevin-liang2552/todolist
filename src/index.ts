#!/usr/bin/env node

import sequelize from './database/index'
import app from './server/app'

const port = 8080;

const authenticateDatabase = async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

const init = async () => {

  await authenticateDatabase();
  app.listen(port, () => {
    console.log(`Hello World! Running on port ${port}`);
  }); 
}

Promise.resolve(init());