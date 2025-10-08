const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const Urls = sequelize.define('Urls', {
  long_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  short_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Urls;
