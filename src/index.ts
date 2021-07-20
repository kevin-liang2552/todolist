#!/usr/bin/env node

import database from './database/index'
import app from './server/app'

const port = 8080;

const authenticateDatabase = async () => {
  try {
      await database.authenticate();
      console.log('Connection has been established successfully.');

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

const init = () => {
  authenticateDatabase();
  app.listen(port, () => {
    console.log(`Hello World! Running on port ${port}`);
  }); 
}

init();