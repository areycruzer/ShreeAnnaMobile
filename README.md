# Shree Anna Mobile

A React Native (Expo) app for the millet value chain. It is the mobile part of Shree Anna, the project that won Smart India Hackathon 2025. Farmers, farmer producer organizations (FPOs), self-help groups (SHGs), buyers and government admins each get their own dashboard.

Web version: https://shreeanna-indol.vercel.app

Status: hackathon prototype. Data comes from a local mock server ([json-server](https://github.com/typicode/json-server)), not a production backend.

## What it does

- **Roles.** Separate login and dashboards for Farmer, FPO, SHG, Buyer and Admin. Demo accounts are listed below.
- **Batches.** A step-by-step form to record a harvest batch, and a list of your batches.
- **Offline use.** Batches are stored on the device with `expo-sqlite`. Requests made while offline are queued and sent again when the device reconnects (`src/services/SyncService.ts`).
- **Trace screen.** A timeline of a batch's stages: sowing, harvest, processing and logistics. The QR code on this screen is a static example image; scanning is not built yet.
- **Languages.** English, Hindi and eight more Indian languages through i18next (`src/i18n/`).
- **Farmer dashboard extras.** Current weather for the device location from the Open-Meteo API, and a market price ticker with sample prices.

## Stack

- React Native 0.81 with Expo SDK 54, TypeScript in strict mode
- Zustand for state, React Navigation (native stack) for navigation
- expo-sqlite, AsyncStorage and NetInfo for offline storage and sync
- json-server as the mock backend

## Run it

```bash
npm install
npm run mock-server   # mock API on port 4000
npm start             # then press a (Android), i (iOS) or scan the QR code with Expo Go
```

## Checks

```bash
npm run typecheck   # tsc --noEmit
npm test            # unit tests for the form validators in src/utils/validation.ts
```

CI runs both on every push to `master`.

## Demo accounts

These accounts exist only in the mock server data.

| Role | Phone | Password |
|------|-------|----------|
| Farmer | `1234567890` | `demo1234` |
| FPO | `1234567891` | `demo1234` |
| SHG | `1234567892` | `demo1234` |
| Buyer | `1234567893` | `demo1234` |
| Admin | `1234567894` | `demo1234` |

The "Demo User" button on the login screen fills these in for the selected role.

## Project layout

```
src/
  components/   reusable UI (Button, Card, Typography, WeatherWidget)
  screens/      Auth, Home, Batches, Trace, Orders, Notifications
  navigation/   AppNavigator
  services/     API client, SQLite storage, offline sync
  store/        Zustand stores
  i18n/         translation files
  theme/        colors, spacing, typography
  utils/        validation and helpers
mock-server/    json-server data
tests/          unit tests (node:test)
```

## License

MIT, see [LICENSE](LICENSE).
