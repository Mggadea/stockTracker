# StockTracker

StockTracker is a React Native app built with Expo for tracking stock prices, managing watchlists, and setting price alerts. It leverages the Finnhub API for real-time stock data and provides a modern, mobile-friendly interface.

## Features

- **Stock Search:** Quickly search for stocks using the built-in search functionality.
- **Watchlist:** Add stocks to your personal watchlist for easy monitoring.
- **Price Alerts:** Set custom price alerts and receive notifications when your target price is reached.
- **Real-Time Data:** View up-to-date stock prices and charts.
- **Authentication:** Secure login and user management.
- **Push Notifications:** Get notified instantly when alerts are triggered (powered by expo-notifications).

## Project Structure

```
app/
  _layout.tsx           # Main app layout
  (tabs)/               # Tab navigation and screens
    _layout.tsx
    AddAlert.tsx
    WatchList.tsx
  graph/                # Stock graph screens
    [symbol].tsx
  hooks/                # Custom React hooks
    useSearchStocks.ts
    useStockPrice.ts
assets/
  images/               # App images and icons
components/             # Reusable UI components
constants/              # Theme and constants
context/                # React Context providers
helpers/                # Utility functions
navigation/             # Navigation setup
screens/                # App screens
services/               # API and notification services
types/                  # TypeScript types
```

## Key Dependencies

- [expo](https://docs.expo.dev/)
- [react-native](https://reactnative.dev/)
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [axios](https://axios-http.com/)
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm start
   ```
3. **Run on device or emulator:**
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For Web: `npm run web`

## Environment Variables

- Configure your Finnhub API key and other secrets as needed. See `services/finnhubApi.ts` for details.

## Scripts

- `npm start` — Start Expo development server
- `npm run ios` — Run on iOS simulator
- `npm run android` — Run on Android emulator
- `npm run web` — Run in web browser
- `npm run lint` — Lint the codebase

