const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'stizi_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'Firza@123',
    { host: process.env.DB_HOST || '127.0.0.1', dialect: 'mysql' }
);

const Stamp = sequelize.define('Stamp', {
    name: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.DOUBLE, allowNull: false },
    longitude: { type: DataTypes.DOUBLE, allowNull: false },
    isCollected: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const seedDatabase = async () => {
    try {
        // Warning: 'force: true' se purana data delete ho jayega
        await sequelize.sync({ force: true }); 

        await Stamp.bulkCreate([
            { name: "Alpha Treasure", latitude: 24.8607, longitude: 67.0011, isCollected: false },
            { name: "Beta Stamp", latitude: 24.8710, longitude: 67.0250, isCollected: false },
            { name: "Gamma Mystery", latitude: 24.8500, longitude: 67.0100, isCollected: false },
            { name: "Delta Secret", latitude: 24.8800, longitude: 67.0400, isCollected: false }
        ]);

        console.log("✅ Database Seeded: 4 Stamps added to MySQL!");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
};

seedDatabase();