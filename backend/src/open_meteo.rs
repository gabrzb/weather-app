use crate::config::OpenMeteoConfig;
use crate::error::AppError;
use crate::forecast::{normalize_daily, normalize_hourly};
use crate::models::{
    AirQuality, AirQualityResponse, ForecastResponse, GeocodingResponse, LocationResult,
    WeatherData,
};
use crate::validation::validate_coordinates;

const CURRENT_FIELDS: &str = "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,is_day";
const DAILY_FIELDS: &str = "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,precipitation_probability_max,wind_speed_10m_max";
const HOURLY_FIELDS: &str = "precipitation,rain,showers,precipitation_probability";
const AIR_QUALITY_FIELDS: &str =
    "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,european_aqi,us_aqi";

#[derive(Clone)]
pub struct OpenMeteoClient {
    client: reqwest::Client,
    config: OpenMeteoConfig,
}

impl OpenMeteoClient {
    pub fn new(config: OpenMeteoConfig) -> Self {
        Self {
            client: reqwest::Client::new(),
            config,
        }
    }

    pub async fn search_location(&self, city: &str) -> Result<LocationResult, AppError> {
        let city = city.trim();
        if city.is_empty() {
            return Err(AppError::BadRequest(
                "Informe uma cidade para buscar.".to_string(),
            ));
        }

        let response = self
            .client
            .get(&self.config.geocoding_url)
            .query(&[
                ("name", city),
                ("count", "1"),
                ("language", "pt"),
                ("format", "json"),
            ])
            .send()
            .await?
            .error_for_status()?
            .json::<GeocodingResponse>()
            .await?;

        response
            .results
            .and_then(|mut results| results.drain(..).next())
            .ok_or(AppError::CityNotFound)
    }

    pub async fn weather_by_location(
        &self,
        location: LocationResult,
    ) -> Result<WeatherData, AppError> {
        let forecast = self
            .fetch_forecast(location.latitude, location.longitude)
            .await?;
        let air_quality = match self
            .fetch_air_quality(location.latitude, location.longitude)
            .await
        {
            Ok(air_quality) => air_quality,
            Err(error) => {
                log::warn!("air quality upstream failed: {error}");
                None
            }
        };

        Ok(WeatherData {
            location,
            current: forecast.current,
            daily: normalize_daily(forecast.daily),
            hourly: normalize_hourly(forecast.hourly),
            timezone: forecast.timezone,
            air_quality,
            sources: vec![
                "Open-Meteo Geocoding API",
                "Open-Meteo Forecast API",
                "Open-Meteo Air Quality API",
            ],
        })
    }

    pub async fn weather_by_coordinates(
        &self,
        latitude: f64,
        longitude: f64,
        name: Option<String>,
    ) -> Result<WeatherData, AppError> {
        validate_coordinates(latitude, longitude)?;

        self.weather_by_location(LocationResult {
            id: None,
            name: name
                .map(|value| value.trim().to_string())
                .filter(|value| !value.is_empty())
                .unwrap_or_else(|| "Localizacao atual".to_string()),
            latitude,
            longitude,
            admin1: None,
            country: None,
            timezone: None,
        })
        .await
    }

    async fn fetch_forecast(
        &self,
        latitude: f64,
        longitude: f64,
    ) -> Result<ForecastResponse, AppError> {
        let latitude = latitude.to_string();
        let longitude = longitude.to_string();

        Ok(self
            .client
            .get(&self.config.forecast_url)
            .query(&[
                ("latitude", latitude.as_str()),
                ("longitude", longitude.as_str()),
                ("current", CURRENT_FIELDS),
                ("daily", DAILY_FIELDS),
                ("hourly", HOURLY_FIELDS),
                ("timezone", "auto"),
                ("forecast_days", "7"),
            ])
            .send()
            .await?
            .error_for_status()?
            .json::<ForecastResponse>()
            .await?)
    }

    async fn fetch_air_quality(
        &self,
        latitude: f64,
        longitude: f64,
    ) -> Result<Option<AirQuality>, AppError> {
        let latitude = latitude.to_string();
        let longitude = longitude.to_string();

        Ok(self
            .client
            .get(&self.config.air_quality_url)
            .query(&[
                ("latitude", latitude.as_str()),
                ("longitude", longitude.as_str()),
                ("current", AIR_QUALITY_FIELDS),
                ("timezone", "auto"),
            ])
            .send()
            .await?
            .error_for_status()?
            .json::<AirQualityResponse>()
            .await?
            .current)
    }
}
