package openmeteo

import (
	"context"
	"encoding/json"
	"log"
	"net"
	"net/http"
	"net/url"
	"strings"

	"clima-api-golang/internal/apperror"
	"clima-api-golang/internal/config"
)

const (
	currentFields    = "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,is_day"
	dailyFields      = "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,precipitation_probability_max,wind_speed_10m_max"
	hourlyFields     = "precipitation,rain,showers,precipitation_probability"
	airQualityFields = "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,european_aqi,us_aqi"
)

type Client struct {
	httpClient *http.Client
	config     config.OpenMeteoConfig
}

func NewClient(openMeteoConfig config.OpenMeteoConfig, httpConfig config.HTTPConfig) *Client {
	transport := &http.Transport{
		DialContext: (&net.Dialer{
			Timeout: httpConfig.ConnectTimeout,
		}).DialContext,
	}

	return &Client{
		httpClient: &http.Client{
			Timeout:   httpConfig.ReadTimeout,
			Transport: transport,
		},
		config: openMeteoConfig,
	}
}

func (c *Client) SearchLocation(city string) (LocationResult, error) {
	cityName := strings.TrimSpace(city)
	if cityName == "" {
		return LocationResult{}, apperror.BadRequest("Informe uma cidade para buscar.")
	}

	if len([]rune(cityName)) > 120 {
		return LocationResult{}, apperror.BadRequest("O nome da cidade esta muito longo.")
	}

	values := url.Values{}
	values.Set("name", cityName)
	values.Set("count", "1")
	values.Set("language", "pt")
	values.Set("format", "json")

	var response geocodingResponse
	if err := c.get(context.Background(), c.config.GeocodingURL, values, &response); err != nil {
		return LocationResult{}, err
	}

	if len(response.Results) == 0 {
		return LocationResult{}, apperror.CityNotFound()
	}

	return response.Results[0], nil
}

func (c *Client) WeatherByCity(city string) (WeatherData, error) {
	location, err := c.SearchLocation(city)
	if err != nil {
		return WeatherData{}, err
	}

	return c.weatherByLocation(location)
}

func (c *Client) WeatherByCoordinates(latitude float64, longitude float64, name string) (WeatherData, error) {
	if err := ValidateCoordinates(latitude, longitude); err != nil {
		return WeatherData{}, err
	}

	locationName := strings.TrimSpace(name)
	if locationName == "" {
		locationName = "Localizacao atual"
	}

	if len([]rune(locationName)) > 120 {
		return WeatherData{}, apperror.BadRequest("O nome da localizacao esta muito longo.")
	}

	return c.weatherByLocation(LocationResult{
		Name:      locationName,
		Latitude:  latitude,
		Longitude: longitude,
	})
}

func (c *Client) weatherByLocation(location LocationResult) (WeatherData, error) {
	forecast, err := c.fetchForecast(location.Latitude, location.Longitude)
	if err != nil {
		return WeatherData{}, err
	}

	airQuality, err := c.fetchAirQuality(location.Latitude, location.Longitude)
	if err != nil {
		log.Printf("air quality upstream failed: %v", err)
	}

	timezone := forecast.Timezone
	if timezone == "" {
		timezone = "UTC"
	}

	return WeatherData{
		Location:   location,
		Current:    forecast.Current,
		Daily:      NormalizeDaily(forecast.Daily),
		Hourly:     NormalizeHourly(forecast.Hourly),
		Timezone:   timezone,
		AirQuality: airQuality,
		Sources: []string{
			"Open-Meteo Geocoding API",
			"Open-Meteo Forecast API",
			"Open-Meteo Air Quality API",
		},
	}, nil
}

func (c *Client) fetchForecast(latitude float64, longitude float64) (forecastResponse, error) {
	values := url.Values{}
	values.Set("latitude", strconvFormatFloat(latitude))
	values.Set("longitude", strconvFormatFloat(longitude))
	values.Set("current", currentFields)
	values.Set("daily", dailyFields)
	values.Set("hourly", hourlyFields)
	values.Set("timezone", "auto")
	values.Set("forecast_days", "7")

	var response forecastResponse
	err := c.get(context.Background(), c.config.ForecastURL, values, &response)
	return response, err
}

func (c *Client) fetchAirQuality(latitude float64, longitude float64) (*AirQuality, error) {
	values := url.Values{}
	values.Set("latitude", strconvFormatFloat(latitude))
	values.Set("longitude", strconvFormatFloat(longitude))
	values.Set("current", airQualityFields)
	values.Set("timezone", "auto")

	var response airQualityResponse
	if err := c.get(context.Background(), c.config.AirQualityURL, values, &response); err != nil {
		return nil, err
	}

	return response.Current, nil
}

func (c *Client) get(ctx context.Context, baseURL string, query url.Values, target any) error {
	parsed, err := url.Parse(baseURL)
	if err != nil {
		return apperror.Upstream()
	}

	parsed.RawQuery = query.Encode()

	request, err := http.NewRequestWithContext(ctx, http.MethodGet, parsed.String(), nil)
	if err != nil {
		return apperror.Upstream()
	}

	response, err := c.httpClient.Do(request)
	if err != nil {
		return apperror.Upstream()
	}
	defer response.Body.Close()

	if response.StatusCode < http.StatusOK || response.StatusCode >= http.StatusMultipleChoices {
		return apperror.Upstream()
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		return apperror.Upstream()
	}

	return nil
}
