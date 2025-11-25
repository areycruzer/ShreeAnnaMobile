# Shree Anna — i18n files, Mock Data & Local Mock Server

This repository fragment contains example translations (English + Hindi) and a sample mock dataset for local development of the Shree Anna — Millet Value Chain mobile app.

## Files included

- `src/i18n/en.json` — English translation strings
- `src/i18n/hi.json` — Hindi translation strings (Devanagari)
- `mock-server/data/mock_data.json` — Mock dataset (commodities, users, batches, trace_events)

## Purpose

1.  Provide a translation bundle (English + Hindi) for the mobile UI.
2.  Provide a small mock backend dataset to develop and demo app flows without a real server.
3.  Use consistent keys (commodity_code, grade, moisture_pct, etc.) that map to eNAM-style fields so later integration is straightforward.

## Table of contents

1.  Project layout
2.  Quick start (i18n + app)
3.  Start mock server (json-server)
4.  Endpoints available (examples + curl)
5.  i18n loader example (TypeScript + i18next)
6.  Using mock data in the app
7.  Demo script (2–3 minute walkthrough)
8.  Notes on images & assets
9.  Troubleshooting
10. License

## 1. Project layout

Place files in your app repo like this:

```
/project-root
  /src
    /i18n
      en.json
      hi.json
  /mock-server
    /data
      mock_data.json
    /public
      /assets (optional test images)
  README.md
```

## 2. Quick start

1.  Copy `en.json` and `hi.json` to `src/i18n/`.
2.  Place `mock_data.json` under `mock-server/data/mock_data.json`.
3.  Start the mock server (instructions below).
4.  Configure your app’s dev server to call the mock server endpoints (defaults use port 4000).

## 3. Start mock server (json-server)

We recommend `json-server` for a quick mock:

**Install:**

```bash
npm install -g json-server
# or as a dev dependency:
# npm install --save-dev json-server
```

**Run the server:**

```bash
json-server --watch mock-server/data/mock_data.json --port 4000 --host 0.0.0.0
```

*Notes:*
- `--host 0.0.0.0` helps mobile emulators or devices access the host machine.
- You can also run a Node/Express mock server if you prefer more control.

## 4. Endpoints available (examples + curl)

With the provided `mock_data.json`, `json-server` exposes REST endpoints:

- `GET /commodities` — list commodity master
- `GET /users` — list users (farmers / FPOs)
- `GET /batches` — list batches
- `GET /batches?farm_user_id=user-1001` — filter batches by farmer
- `GET /trace_events` — list trace events

**Example curl:**

```bash
# Get commodities
curl http://localhost:4000/commodities

# Get a single batch
curl http://localhost:4000/batches/batch-2001

# Filter batches by user
curl "http://localhost:4000/batches?farm_user_id=user-1001"
```

If you need endpoints that mimic the production API contract, create a small Express stub to map the mock JSON to:
- `POST /auth/request-otp`
- `POST /auth/verify-otp`
- `GET /commodities`
- `POST /batches`
- `POST /batches/:id/upload-images`
- `GET /trace/:batch_id`

(See the API CONTRACT section of your Antigravity prompt for expected fields.)

## 5. i18n loader example (TypeScript + i18next)

Drop this file at `src/i18n/index.ts`. It uses `i18next` + `react-i18next` for React Native / Expo apps.

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import JSON bundles
import en from './en.json';
import hi from './hi.json';

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language; change at runtime (e.g., from settings)
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react handles escaping
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
```

**Usage in React Native components:**

```tsx
import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return <Text>{t('welcome')}</Text>;
}
```

**To change language at runtime:**

```typescript
import i18n from './src/i18n';
i18n.changeLanguage('hi'); // switch to Hindi
```

## 6. Using mock data in the app

1.  Point your app’s API base URL to `http://<host-ip>:4000` (replace `<host-ip>` with `localhost` on emulator or your machine’s LAN IP for real device).
2.  Map the mock batch object fields to your local models; the mock uses eNAM-like keys (`commodity_code`, `grade`, `moisture_pct`).
3.  For images referenced in the mock data (`/assets/mock/...`) place actual files in `mock-server/public/assets` or replace URLs with hosted test images.

**Example fetch in app:**

```typescript
const res = await fetch('http://192.168.1.10:4000/batches');
const batches = await res.json();
```

## 7. Demo script (2–3 minute walkthrough)

Record a short video showing:

1.  **Open app** → select language → login with phone (mock OTP flow).
2.  **Home** → **Upload New Batch** → fill commodity, grade, qty, attach sample photo → **Save Draft** offline.
3.  **Sync** (simulate network on) → show batch listed in **My Batches** with `batch_id`.
4.  Simulate or show an offer by hitting the mock endpoint (or show local notification) → **Accept** offer.
5.  **Show batch trace**: open batch → tap QR → display public trace events (from mock `trace_events`).
6.  Attach the mock server and explain mapping to eNAM quality parameters.

## 8. Notes on images & assets

- Placeholder image paths in mock JSON (`/assets/mock/...`) are relative to the mock server public folder when using `json-server`. If you run `json-server` from `mock-server`, put images in `mock-server/public/assets/mock/`.
- If images are not present, either:
    1.  Replace image fields with external image URLs, or
    2.  Add placeholder images to `mock-server/public/assets/mock/`.

**Image compression rules (for app):**
- Compress sample photos to ≤ 300 KB before upload.
- Capture both `sample_image` (close-up) and `field_image` (context).

## 9. Troubleshooting

- **CORS errors on emulator/device**: Start `json-server` with `--host 0.0.0.0` and use the machine LAN IP from the device/emulator.
- **Android emulator cannot reach host**: Use `10.0.2.2` for Android emulator (default AVD) or `adb reverse` to forward ports. For Genymotion use `10.0.3.2`. For physical device use your machine LAN IP.
- **i18n not showing Hindi**: Ensure fonts support Devanagari (Noto Sans Devanagari). Use `expo-font` to load fonts for RN apps.
- **Mock server slow / large JSON**: Break mock dataset into multiple files or use a lightweight Express mock that returns paginated responses.

## 10. License

MIT — use and adapt freely for your SIH prototype.
