const express = require('express');
const app = express();
const sequelize = require('./config/dbConnection');
const routes = require('./routes');

const redis = require('./config/redisConnection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

const PORT = 4001;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully!');
    await sequelize.sync({ alter: true }); // creates tables if not exists
    console.log('✅ Tables synced');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});
