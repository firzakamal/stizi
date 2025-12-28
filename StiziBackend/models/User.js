const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const User = sequelize.define('User', {
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    otp_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;