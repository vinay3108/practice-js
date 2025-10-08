const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('url_short', 'vinay', 'Vinay@123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true,
});

module.exports = sequelize;
