const { Sequelize } = require('sequelize');
require('dotenv').config(); // Taaki password secure rahe

const sequelize = new Sequelize(
  'stizi_db',       // Database ka naam
  'root',           // Aapka MySQL username (aksar 'root' hota hai)
  'Firza@123',  // Aapka MySQL password jo aapne install karte waqt rakha tha
  {
    host: '127.0.0.1', // Localhost ke liye
    dialect: 'mysql',
    logging: false,    // Console mein faltu logs band karne ke liye
  }
);

// Connection test karne ke liye function
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database Connected Successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };