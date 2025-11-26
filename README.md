# Shree Anna Mobile App 🌾

A comprehensive mobile platform for the Millet Value Chain, connecting Farmers, FPOs, SHGs, and Consumers. This app facilitates traceability, market access, and government scheme integration for "Shree Anna" (Millets).

## 🚀 Features

### 1. Role-Based Access Control
- **Farmer**: Manage batches, view schemes, check weather, and track earnings.
- **FPO (Farmer Producer Org)**: Aggregate produce, manage farmer members.
- **SHG (Self Help Group)**: Sell value-added products.
- **Buyer/Consumer**: Browse and purchase millet products (Marketplace).
- **Admin (Govt Official)**: Monitor platform stats and manage approvals.

### 2. Dashboards
- **Farmer Dashboard**: Personalized stats, active batches, and quick access to government schemes.
- **Consumer Dashboard**: E-commerce style marketplace with categories (Millets, Flours, Snacks) and search.
- **Admin Dashboard**: High-level overview of total farmers, active FPOs, and volume traded.

### 3. Traceability (Seed to Feed)
- **Batch Tracking**: Track the journey of millet batches from sowing to harvest to processing.
- **QR Code Integration**: Scan to view the full history of a product.
- **Timeline View**: Visual representation of each stage (Sowing, Harvest, Processing, Logistics).

### 4. Key Functionalities
- **Multilingual Support**: Full English and Hindi (Devanagari) support.
- **Offline Capable**: Save batch data as drafts when offline.
- **Secure Authentication**: Role-based login with demo credentials.
- **Marketplace**: Product listing with images, prices, and farmer details.

## 📱 Screens

- **Login/Role Selection**: Choose your role to enter the app.
- **Home**: Dynamic dashboard based on user role.
- **My Batches**: List of active and historical batches.
- **Add Batch**: Wizard-style form for recording new harvest.
- **Traceability**: Detailed view of batch journey.
- **Profile**: Manage personal details and settings.
- **Orders**: Track purchase orders (for Buyers).

## 🛠 Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Styling**: Custom Design System (Typography, Spacing, Colors)
- **State Management**: Zustand
- **Navigation**: React Navigation (Native Stack)
- **Icons**: Ionicons & MaterialIcons
- **Mock Backend**: JSON Server

## 🏃‍♂️ Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Mock Server**
    ```bash
    npm run mock-server
    ```
    *Runs on port 4000*

3.  **Run App**
    ```bash
    npm start
    ```
    *Press `a` for Android, `i` for iOS, or scan QR code with Expo Go.*

## 🧪 Demo Credentials

| Role | Phone | Password |
|------|-------|----------|
| **Farmer** | `1234567890` | `demo1234` |
| **FPO** | `1234567891` | `demo1234` |
| **SHG** | `1234567892` | `demo1234` |
| **Buyer** | `1234567893` | `demo1234` |
| **Admin** | `1234567894` | `demo1234` |

*Tip: Use the "Demo User" button on the login screen to auto-fill credentials based on selected role.*

## 📂 Project Structure

```
/src
  /components   # Reusable UI components (Button, Card, Typography)
  /screens      # App screens (Auth, Home, Batches, Orders)
  /navigation   # Navigation setup (AppNavigator)
  /store        # Zustand stores (Auth, Batches)
  /theme        # Design tokens (Colors, Spacing)
  /utils        # Helper functions
  /assets       # Images and static files
/mock-server    # JSON Server data and config
```

## 📄 License

MIT License
