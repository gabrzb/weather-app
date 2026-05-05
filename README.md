# Weather App

A full-stack weather dashboard with a **React + TypeScript frontend** and two backend options:

- **Rust (Actix Web)** in `backend`
- **Java (Spring Boot)** in `backend-java`

The app fetches weather, forecast, and air quality data from Open-Meteo services.

## Features

- City-based weather search
- Current weather and perceived temperature
- 7-day forecast
- Hourly precipitation view
- Air quality summary (AQI)
- Geolocation-based lookup ("use my location")
- API health status check
- Light/dark theme toggle

## Project structure

```text
clima/
├─ frontend/      # React + Vite application
├─ backend/       # Rust API (Actix Web)
└─ backend-java/  # Java API (Spring Boot)
```

## Prerequisites

- **Node.js** 18+
- **npm** 9+
- For Rust backend: **Rust toolchain** (cargo)
- For Java backend: **Java 17** + **Maven**

## Quick start

> Start **only one backend** at a time (both default to `127.0.0.1:8081`).

### 1. Start a backend

#### Option A: Rust backend

```powershell
cd backend
Copy-Item .env.example .env
cargo run
```

#### Option B: Java backend

```powershell
cd backend-java
Copy-Item .env.example .env
mvn spring-boot:run
```

### 2. Start the frontend

In a new terminal:

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment variables

### Frontend (`frontend/.env`)

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://127.0.0.1:8081` | Base URL used by the frontend for API requests |

### Backends (`backend/.env` or `backend-java/.env`)

| Variable | Default | Description |
| --- | --- | --- |
| `BIND_ADDRESS` | `127.0.0.1:8081` | Host and port for the API server |
| `OPEN_METEO_GEOCODING_URL` | `https://geocoding-api.open-meteo.com/v1/search` | Geocoding endpoint |
| `OPEN_METEO_FORECAST_URL` | `https://api.open-meteo.com/v1/forecast` | Forecast endpoint |
| `OPEN_METEO_AIR_QUALITY_URL` | `https://air-quality-api.open-meteo.com/v1/air-quality` | Air quality endpoint |
| `RATE_LIMIT_ENABLED` | `true` (Java backend) | Enables request rate limiting |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | `120` (Java backend) | Max requests per minute per client |
| `HTTP_CONNECT_TIMEOUT_MS` | `3000` (Java backend) | HTTP connect timeout |
| `HTTP_READ_TIMEOUT_MS` | `6000` (Java backend) | HTTP read timeout |

## API endpoints

All endpoints are under `/api`:

- `GET /api/health`
- `GET /api/locations?city=London`
- `GET /api/weather?city=London`
- `GET /api/weather?latitude=-23.55&longitude=-46.63&name=Sao%20Paulo`

## Useful commands

### Frontend

```powershell
cd frontend
npm run dev
npm run build
npm run lint
npm run preview
```

### Rust backend

```powershell
cd backend
cargo run
cargo test
```

### Java backend

```powershell
cd backend-java
mvn spring-boot:run
mvn test
```
