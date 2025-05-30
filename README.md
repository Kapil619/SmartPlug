# EnergyIQ - Smart Energy Monitoring System

<p align="center">
  <img src="assets/realplug.png" alt="EnergyIQ Logo" width="200"/>
</p>

## Overview

EnergyIQ is a comprehensive mobile application built with React Native and Expo that helps users monitor and manage their energy consumption through smart plugs. The app provides real-time power usage data, cost analysis, and device control features.

## Features

### Real-time Monitoring
- Live power consumption tracking
- Current, voltage, and energy measurements
- Real-time device status updates

### Energy Analytics
- Daily, weekly, and monthly usage graphs
- Cost breakdown analysis
- Energy consumption patterns
- Billing amount calculations

### Device Management
- Multiple device support
- Custom device naming
- Location and appliance categorization 
- Remote power control

### Smart Features
- Timer scheduling
- Usage alerts
- Power state toggling
- Device status monitoring

## Screenshots

<div align="center">
  <p float="left">
    <img src="https://github.com/user-attachments/assets/fade053d-05c7-4776-ada1-3b2cb8bf682e" width="180" alt="Home Screen"/>&nbsp;&nbsp;
    <img src="https://github.com/user-attachments/assets/ad696cef-e103-47b4-8220-b3da55240b39" width="180" alt="Device Control Screen"/>
    <img src="https://github.com/user-attachments/assets/cea838ac-c55c-43db-8969-7f4ff1c09a0e" width="180" alt="Device Control Screen"/>
    <img src="https://github.com/user-attachments/assets/842c37c2-05b6-485d-be0d-e2a05f220dc5" width="180" alt="Dashboard Screen"/>&nbsp;&nbsp;
    <img src="https://github.com/user-attachments/assets/99dd135a-e04f-4c40-9917-b2f715bf84c1" width="180" alt="Analytics Screen"/>&nbsp;&nbsp;
    <img src="https://github.com/user-attachments/assets/f3511acd-5847-4c26-b3e8-799e48d85d71" width="180" alt="Analytics Screen"/>&nbsp;&nbsp;
    <img src="https://github.com/user-attachments/assets/6ca2a4f3-a473-43a8-a4f7-2afcbe704f69" width="180" alt="Analytics Screen"/>&nbsp;&nbsp;
  </p>
</div>

> **Note**: From left to right: Login interface, Dashboard view, Device Details panel, and Profile screen


## Technology Stack

- **Frontend**: React Native, Expo
- **Backend**: Firebase (Authentication, Realtime Database, Firestore)
- **UI Components**: 
  - React Native Gifted Charts
  - React Native Linear Gradient
  - React Native Animatable
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Authentication**: Firebase Auth

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SmartPlug.git
```

2. Install dependencies:
```bash
cd SmartPlug
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_DATABASE_URL=your_database_url
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── screens/       # App screens/pages
├── styles/        # Stylesheet definitions
└── utils/         # Helper functions and types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Twitter - [kapil619](https://x.com/kapil_badokar)

Project Link: [https://github.com/kapil619/SmartPlug](https://github.com/Kapil619/SmartPlug)
