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
    <img src="https://github.com/user-attachments/assets/4c0fa16a-b0f9-479a-8011-a2acd19e3923" width="180" alt="Home Screen"/>&nbsp;&nbsp;
    <img src="https://github.com/user-attachments/assets/83754792-e695-4f84-a95e-3789b213b33d" width="180" alt="Device Control Screen"/>
    <img src="https://github.com/user-attachments/assets/4bc9f15f-9d79-40b8-a7c3-babceeef8251" width="180" alt="Dashboard Screen"/>&nbsp;&nbsp;
    <img src="https://github.com/user-attachments/assets/0cc8f4af-dd3d-4579-9669-f02f6be45abb" width="180" alt="Analytics Screen"/>&nbsp;&nbsp;
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
