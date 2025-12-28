const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const Stamp = sequelize.define('Stamp', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    isCollected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    qr_code_value: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Stamp;