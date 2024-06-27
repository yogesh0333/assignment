# Real Estate Unlock App

Welcome to the Real Estate Unlock App! This mobile application allows real estate companies to remotely unlock homes for potential buyers to view. This README will guide you through setting up and running the app.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm (Node Package Manager) or yarn
- Expo CLI (Install globally using npm install -g expo-cli)
- Expo Go app installed on your iOS or Android device

## Setting Up the App

1. Clone the repository:

git clone <repository-url>
cd real-estate-unlock-app

2. Install dependencies:
   npm install
   or
   yarn install

3. Start the Expo development server:

npm start

This will start the Metro bundler. You can press `i` to open an iOS simulator or `a` to open an Android emulator, or scan the QR code with Expo Go on your device.

4. Running on a physical device:

- Install Expo Go app from App Store (iOS) or Google Play Store (Android).
- Scan the QR code displayed in the Metro bundler using Expo Go app.

## Running the Mock Server

The app uses a mock server to simulate API responses. Follow these steps to run the server:

1. Navigate to the mock server directory:
   cd mock-server

2. Install JSON Server:

npm install -g json-server

or
yarn global add json-server

3. Start the JSON Server:
   json-server --watch db.json --port 3000

This command starts the mock server with mock data stored in `db.json` file on port 3000.

## Using the App

- **Login Screen:** Enter a username and password to log in. Use any credentials from the `db.json` file.
- **Home List:** After logging in, you'll see a list of homes. Select a home to view details.
- **Home Details:** View home details and if you're within 30 meters of the home, unlock it using the "Unlock" button.

## Additional Notes

- Make sure your device and development machine are on the same Wi-Fi network to ensure the Expo Go app can connect to the development server.
- If you encounter any issues, refer to the error messages in the Metro bundler or terminal where the Expo server is running.
