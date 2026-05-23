use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct HealthResponse {
    pub status: &'static str,
    pub service: &'static str,
}

#[derive(Debug, Deserialize)]
pub struct CityQuery {
    pub city: String,
}

#[derive(Debug, Deserialize)]
pub struct WeatherQuery {
    pub city: Option<String>,
    pub latitude: Option<f64>,
    pub longitude: Option<f64>,
    pub name: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct LocationResult {
    pub id: Option<i64>,
    pub name: String,
    pub latitude: f64,
    pub longitude: f64,
    pub admin1: Option<String>,
    pub country: Option<String>,
    pub timezone: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct GeocodingResponse {
    pub results: Option<Vec<LocationResult>>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct CurrentWeather {
    pub time: String,
    pub temperature_2m: f64,
    pub apparent_temperature: f64,
    pub relative_humidity_2m: f64,
    pub precipitation: f64,
    pub rain: f64,
    pub showers: f64,
    pub weather_code: i32,
    pub cloud_cover: f64,
    pub wind_speed_10m: f64,
    pub is_day: i32,
}

#[derive(Debug, Deserialize)]
pub struct DailyWeather {
    #[serde(default)]
    pub time: Vec<String>,
    #[serde(default)]
    pub weather_code: Vec<Option<i32>>,
    #[serde(default)]
    pub temperature_2m_max: Vec<Option<f64>>,
    #[serde(default)]
    pub temperature_2m_min: Vec<Option<f64>>,
    #[serde(default)]
    pub precipitation_sum: Vec<Option<f64>>,
    #[serde(default)]
    pub rain_sum: Vec<Option<f64>>,
    #[serde(default)]
    pub showers_sum: Vec<Option<f64>>,
    #[serde(default)]
    pub precipitation_probability_max: Vec<Option<f64>>,
    #[serde(default)]
    pub wind_speed_10m_max: Vec<Option<f64>>,
}

#[derive(Debug, Deserialize)]
pub struct HourlyWeather {
    #[serde(default)]
    pub time: Vec<String>,
    #[serde(default)]
    pub precipitation: Vec<Option<f64>>,
    #[serde(default)]
    pub rain: Vec<Option<f64>>,
    #[serde(default)]
    pub showers: Vec<Option<f64>>,
    #[serde(default)]
    pub precipitation_probability: Vec<Option<f64>>,
}

#[derive(Debug, Deserialize)]
pub struct ForecastResponse {
    pub timezone: String,
    pub current: CurrentWeather,
    pub daily: DailyWeather,
    pub hourly: HourlyWeather,
}

#[derive(Debug, Serialize)]
pub struct DayForecast {
    pub date: String,
    pub code: i32,
    pub max: f64,
    pub min: f64,
    pub precipitation: f64,
    pub rain: f64,
    pub showers: f64,
    pub probability: f64,
    pub wind: f64,
}

#[derive(Debug, Serialize)]
pub struct HourForecast {
    pub time: String,
    pub date: String,
    pub hour: String,
    pub precipitation: f64,
    pub rain: f64,
    pub showers: f64,
    pub probability: f64,
}

#[derive(Debug, Deserialize)]
pub struct AirQualityResponse {
    pub current: Option<AirQuality>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AirQuality {
    pub time: String,
    pub pm10: Option<f64>,
    pub pm2_5: Option<f64>,
    pub carbon_monoxide: Option<f64>,
    pub nitrogen_dioxide: Option<f64>,
    pub ozone: Option<f64>,
    pub european_aqi: Option<f64>,
    pub us_aqi: Option<f64>,
}

#[derive(Debug, Serialize)]
pub struct WeatherData {
    pub location: LocationResult,
    pub current: CurrentWeather,
    pub daily: Vec<DayForecast>,
    pub hourly: Vec<HourForecast>,
    pub timezone: String,
    pub air_quality: Option<AirQuality>,
    pub sources: Vec<&'static str>,
}
