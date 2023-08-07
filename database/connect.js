const { Sequelize } = require("sequelize");

const host = process.env.RDS_HOST;
const port = 554; // 554
const database = "codearea";
const username = process.env.RDS_USER;
const password = process.env.RDS_PASSWORD;
const dialect = "postgres";
const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  freezeTableName: true,
  underscored: true,
  schema: "codearea",
  host: host,
  port: port,
  omitNull: true,
  autoIncrement: true,
  logging: false,
  searchPath: "codearea",
  dialectOptions: {
    prependSearchPath: true,
  },
  timezone: timeZone,
  pool: { max: 5, idle: 0, min: 0, acquire: 3000 },
});

module.exports = sequelize;
