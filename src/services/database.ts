import { Options, Sequelize } from "sequelize";

const sequelizeOptions: Options = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  dialect: 'mysql',
  logging: process.env?.MYSQL_LOG ? console.log : false,
  dialectOptions: {
    decimalNumbers: true,
  },
  pool: {
    max: 100,
    min: 1,
    idle: 10000,
  },
}

const sequelize = new Sequelize(
  process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, sequelizeOptions,
)

export { Op, Transaction } from 'sequelize'
export {
  sequelize
}