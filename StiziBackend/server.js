const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// --- MySQL Connection using Sequelize ---
const sequelize = new Sequelize(
    process.env.DB_NAME || 'stizi_db', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASS || 'Firza@123', 
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
        logging: false
    }
);

sequelize.authenticate()
    .then(() => console.log("✅ Stizi Server connected to MySQL"))
    .catch(err => console.error("❌ MySQL Connection Error:", err));

// --- 1. User Model ---
const User = sequelize.define('User', {
    phoneNumber: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    lastOtp: { 
        type: DataTypes.STRING, 
        defaultValue: "123456" 
    }
});

// --- 2. Stamp Model ---
const Stamp = sequelize.define('Stamp', {
    name: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.DOUBLE, allowNull: false },
    longitude: { type: DataTypes.DOUBLE, allowNull: false },
    isCollected: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// --- Database Sync ---
sequelize.sync({ alter: true })
    .then(() => console.log("✅ Database Tables Synced (Users & Stamps Ready)"))
    .catch(err => console.error("❌ Sync Error:", err));

// --- API Routes ---

/**
 * @route   POST /api/auth/get-code
 * @desc    Mock 2FA Auth: Save user and return static code
 */
app.post('/api/auth/get-code', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) return res.status(400).json({ success: false, error: "Phone number is required" });

        console.log(`OTP Request received for: ${phoneNumber}`);

        const [user, created] = await User.findOrCreate({
            where: { phoneNumber: phoneNumber },
            defaults: { lastOtp: "123456" }
        });

        res.json({ success: true, code: "123456", isNewUser: created });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, error: "Database error during login" });
    }
});

/**
 * @route   GET /api/stamps
 * @desc    Fetch all stamps for Map Screen
 */
app.get('/api/stamps', async (req, res) => {
    try {
        const stamps = await Stamp.findAll();
        res.json(stamps);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch data" });
    }
});

/**
 * @route   PATCH /api/stamps/collect/:id
 * @desc    Update stamp status when scanned in AR
 */
app.patch('/api/stamps/collect/:id', async (req, res) => {
    try {
        const stamp = await Stamp.findByPk(req.params.id);
        if (stamp) {
            stamp.isCollected = true;
            await stamp.save();
            res.json({ success: true, message: "Stamp collected!", data: stamp });
        } else {
            res.status(404).json({ error: "Stamp not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});

/**
 * @route   POST /api/stamps/reset
 * @desc    Reset all stamps to uncollected (isCollected = false)
 */
app.post('/api/stamps/reset', async (req, res) => {
    try {
        // Sab stamps ko 0 kar do
        await Stamp.update({ isCollected: false }, { where: {} });
        console.log("🔄 All treasures reset to uncollected state.");
        res.json({ success: true, message: "All treasures have been reset!" });
    } catch (err) {
        console.error("Reset Error:", err);
        res.status(500).json({ success: false, error: "Reset failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Stizi API active on port ${PORT}`));