const dotenv = (require("dotenv").config()).parsed

module.exports = {
  "development": {
    username: dotenv.USERNAME,
    password: dotenv.PASSWORD,
    database: dotenv.DATABASE,
    host: dotenv.HOST,
    dialect: dotenv.DIALECT
},
  "test": {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  "production": {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
  

// const dotenv = (require("dotenv").config()).parsed

// let config = {
//     username: dotenv.DB_USERNAME,
//     password: dotenv.DB_PASSWORD,
//     database: dotenv.DB_NAME,
//     host: dotenv.DB_HOST,
//     port: dotenv.DB_PORT,
//     dialect: dotenv.DB_DIALECT,
//     migrationStorageTableName: "sequelize_migrations",
//     seederStorageTableName: "sequelize_seeds"
// };

// module.exports = {
//     development: config,
//     test: config,
//     production: config
// }




