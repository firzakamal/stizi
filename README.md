# 🏆 Stizi App

Stizi is a location-based Augmented Reality (AR) experience. It allows users to find virtual treasures on a map, navigate to them in real-time, and collect digital stamps using an AR camera view.

## 🚀 Features
- **Secure Authentication**: OTP-based login system for users.
- **Interactive Map**: Real-time GPS tracking to find treasures near you.
- **AR Experience**: View 3D objects in the real world through your camera.
- **Live Database**: Instant status updates when a treasure is collected.
- **Success Tracking**: View your total collected stamps and progress.

## 🛠️ Tech Stack
- **Frontend**: React Native (Expo), Expo Camera, React Native Maps.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL with Sequelize ORM.
- **Navigation**: React Navigation (Stack).

## 📂 Project Structure
```text
📁 Stizi-AR-Project
├── 📁 Stizi            # Frontend (Mobile App)
└── 📁 StiziBackend     # Backend (Server & API)
📋 Installation & Setup
1. Database Setup
Create a database named stizi_db in MySQL.

Use the provided seed.js or manual queries to create the stamps and users tables.

Default OTP for testing is 123456.

2. Backend Setup
Open terminal in the StiziBackend folder.

Run npm install to install dependencies.

Update the .env file with your MySQL credentials.

Run node server.js to start the server.

3. Frontend Setup
Open terminal in the Stizi folder.

Run npm install --legacy-peer-deps.

Important: Update the IP address in HomeScreen.js, ARScreen.js, and SuccessScreen.js to match your laptop's current IP.

Run npx expo start.

Scan the QR code using the Expo Go app on your phone.

⚙️ API Endpoints
POST /api/auth/get-code: Get OTP for login.

GET /api/stamps: Fetch all treasure locations.

PATCH /api/stamps/collect/:id: Mark a stamp as collected.

POST /api/stamps/reset: Reset all data for a new game.
