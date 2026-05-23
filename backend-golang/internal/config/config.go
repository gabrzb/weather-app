package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	BindAddress string
	OpenMeteo   OpenMeteoConfig
	HTTP        HTTPConfig
	RateLimit   RateLimitConfig
}

type OpenMeteoConfig struct {
	GeocodingURL  string
	ForecastURL   string
	AirQualityURL string
}

type HTTPConfig struct {
	ConnectTimeout time.Duration
	ReadTimeout    time.Duration
}

type RateLimitConfig struct {
	Enabled           bool
	RequestsPerMinute int
}

func LoadEnv() {
	candidates := []string{
		filepath.Join("backend-golang", ".env"),
		".env",
		filepath.Join("backend", ".env"),
	}

	for _, candidate := range candidates {
		if _, err := os.Stat(candidate); err == nil {
			_ = godotenv.Load(candidate)
			return
		}
	}
}

func FromEnv() (AppConfig, error) {
	connectTimeoutMS, err := envInt("HTTP_CONNECT_TIMEOUT_MS", 3000)
	if err != nil {
		return AppConfig{}, err
	}

	readTimeoutMS, err := envInt("HTTP_READ_TIMEOUT_MS", 6000)
	if err != nil {
		return AppConfig{}, err
	}

	requestsPerMinute, err := envInt("RATE_LIMIT_REQUESTS_PER_MINUTE", 120)
	if err != nil {
		return AppConfig{}, err
	}

	return AppConfig{
		BindAddress: envString("BIND_ADDRESS", "127.0.0.1:8081"),
		OpenMeteo: OpenMeteoConfig{
			GeocodingURL:  envString("OPEN_METEO_GEOCODING_URL", "https://geocoding-api.open-meteo.com/v1/search"),
			ForecastURL:   envString("OPEN_METEO_FORECAST_URL", "https://api.open-meteo.com/v1/forecast"),
			AirQualityURL: envString("OPEN_METEO_AIR_QUALITY_URL", "https://air-quality-api.open-meteo.com/v1/air-quality"),
		},
		HTTP: HTTPConfig{
			ConnectTimeout: time.Duration(connectTimeoutMS) * time.Millisecond,
			ReadTimeout:    time.Duration(readTimeoutMS) * time.Millisecond,
		},
		RateLimit: RateLimitConfig{
			Enabled:           envBool("RATE_LIMIT_ENABLED", true),
			RequestsPerMinute: requestsPerMinute,
		},
	}, nil
}

func envString(key string, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}

	return value
}

func envBool(key string, fallback bool) bool {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}

	parsed, err := strconv.ParseBool(value)
	if err != nil {
		return fallback
	}

	return parsed
}

func envInt(key string, fallback int) (int, error) {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback, nil
	}

	parsed, err := strconv.Atoi(value)
	if err != nil {
		return 0, fmt.Errorf("%s must be an integer", key)
	}

	return parsed, nil
}
