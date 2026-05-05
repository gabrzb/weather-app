package com.clima.api.service;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.clima.api.config.OpenMeteoProperties;
import com.clima.api.error.AppException;
import com.clima.api.model.AirQuality;
import com.clima.api.model.AirQualityResponse;
import com.clima.api.model.ForecastResponse;
import com.clima.api.model.GeocodingResponse;
import com.clima.api.model.LocationResult;
import com.clima.api.model.WeatherData;
import com.clima.api.validation.CoordinateValidator;

@Service
public class OpenMeteoService {

    private static final String CURRENT_FIELDS =
            "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,is_day";
    private static final String DAILY_FIELDS =
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,precipitation_probability_max,wind_speed_10m_max";
    private static final String HOURLY_FIELDS = "precipitation,rain,showers,precipitation_probability";
    private static final String AIR_QUALITY_FIELDS =
            "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,european_aqi,us_aqi";

    private static final Logger LOGGER = LoggerFactory.getLogger(OpenMeteoService.class);

    private final RestClient restClient;
    private final OpenMeteoProperties properties;
    private final ForecastNormalizer normalizer;

    public OpenMeteoService(RestClient restClient, OpenMeteoProperties properties, ForecastNormalizer normalizer) {
        this.restClient = restClient;
        this.properties = properties;
        this.normalizer = normalizer;
    }

    public LocationResult searchLocation(String city) {
        String cityName = city == null ? "" : city.trim();
        if (cityName.isEmpty()) {
            throw AppException.badRequest("Informe uma cidade para buscar.");
        }

        if (cityName.length() > 120) {
            throw AppException.badRequest("O nome da cidade esta muito longo.");
        }

        URI uri = UriComponentsBuilder
                .fromUriString(properties.getGeocodingUrl())
                .queryParam("name", cityName)
                .queryParam("count", 1)
                .queryParam("language", "pt")
                .queryParam("format", "json")
                .build()
                .encode()
                .toUri();

        GeocodingResponse response = get(uri, GeocodingResponse.class);
        List<LocationResult> results = response.results();
        if (results == null || results.isEmpty()) {
            throw AppException.cityNotFound();
        }

        return results.get(0);
    }

    public WeatherData weatherByCity(String city) {
        return weatherByLocation(searchLocation(city));
    }

    public WeatherData weatherByCoordinates(double latitude, double longitude, String name) {
        CoordinateValidator.validate(latitude, longitude);
        String locationName = name == null ? "" : name.trim();
        if (locationName.isEmpty()) {
            locationName = "Localizacao atual";
        }
        if (locationName.length() > 120) {
            throw AppException.badRequest("O nome da localizacao esta muito longo.");
        }

        LocationResult location = new LocationResult(
                null,
                locationName,
                latitude,
                longitude,
                null,
                null,
                null);

        return weatherByLocation(location);
    }

    private WeatherData weatherByLocation(LocationResult location) {
        ForecastResponse forecast = fetchForecast(location.latitude(), location.longitude());

        AirQuality airQuality = null;
        try {
            airQuality = fetchAirQuality(location.latitude(), location.longitude());
        } catch (AppException exception) {
            if (exception.getType() != AppException.Type.UPSTREAM) {
                throw exception;
            }
            LOGGER.warn("air quality upstream failed: {}", exception.getMessage());
        }

        return new WeatherData(
                location,
                forecast.current(),
                normalizer.normalizeDaily(forecast.daily()),
                normalizer.normalizeHourly(forecast.hourly()),
                forecast.timezone() == null ? "UTC" : forecast.timezone(),
                airQuality,
                List.of(
                        "Open-Meteo Geocoding API",
                        "Open-Meteo Forecast API",
                        "Open-Meteo Air Quality API"));
    }

    private ForecastResponse fetchForecast(double latitude, double longitude) {
        URI uri = UriComponentsBuilder
                .fromUriString(properties.getForecastUrl())
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam("current", CURRENT_FIELDS)
                .queryParam("daily", DAILY_FIELDS)
                .queryParam("hourly", HOURLY_FIELDS)
                .queryParam("timezone", "auto")
                .queryParam("forecast_days", 7)
                .build()
                .encode()
                .toUri();

        return get(uri, ForecastResponse.class);
    }

    private AirQuality fetchAirQuality(double latitude, double longitude) {
        URI uri = UriComponentsBuilder
                .fromUriString(properties.getAirQualityUrl())
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam("current", AIR_QUALITY_FIELDS)
                .queryParam("timezone", "auto")
                .build()
                .encode()
                .toUri();

        AirQualityResponse response = get(uri, AirQualityResponse.class);
        return response.current();
    }

    private <T> T get(URI uri, Class<T> responseType) {
        try {
            T response = restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(responseType);

            if (response == null) {
                throw AppException.upstream();
            }

            return response;
        } catch (AppException exception) {
            throw exception;
        } catch (org.springframework.web.client.RestClientException exception) {
            throw AppException.upstream();
        }
    }
}
