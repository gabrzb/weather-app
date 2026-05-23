# Go Backend

Gin implementation of the Clima API. It exposes the same frontend-facing endpoints as the other backends:

- `GET /api/health`
- `GET /api/locations?city=London`
- `GET /api/weather?city=London`
- `GET /api/weather?latitude=-23.55&longitude=-46.63&name=Sao%20Paulo`

## Run

```powershell
cd backend-golang
Copy-Item .env.example .env
go run ./cmd/clima-api
```

The API binds to `127.0.0.1:8081` by default.

## Test

```powershell
cd backend-golang
go test ./...
```

## Environment

| Variable | Default | Description |
| --- | --- | --- |
| `BIND_ADDRESS` | `127.0.0.1:8081` | Host and port for the API server |
| `OPEN_METEO_GEOCODING_URL` | `https://geocoding-api.open-meteo.com/v1/search` | Geocoding endpoint |
| `OPEN_METEO_FORECAST_URL` | `https://api.open-meteo.com/v1/forecast` | Forecast endpoint |
| `OPEN_METEO_AIR_QUALITY_URL` | `https://air-quality-api.open-meteo.com/v1/air-quality` | Air quality endpoint |
| `RATE_LIMIT_ENABLED` | `true` | Enables request rate limiting |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | `120` | Max requests per minute per client |
| `HTTP_CONNECT_TIMEOUT_MS` | `3000` | HTTP connect timeout |
| `HTTP_READ_TIMEOUT_MS` | `6000` | HTTP client timeout |
