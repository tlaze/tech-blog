const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.CLEARDB_DATABASE_URL) {
  // Heroku ClearDB connection
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect: 'mysql',
  });
} else {
  // Local MySQL for development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;