use crate::models::{DailyWeather, DayForecast, HourForecast, HourlyWeather};

pub(crate) fn normalize_daily(daily: DailyWeather) -> Vec<DayForecast> {
    daily
        .time
        .into_iter()
        .enumerate()
        .map(|(index, date)| DayForecast {
            date,
            code: optional_i32(&daily.weather_code, index),
            max: optional_f64(&daily.temperature_2m_max, index),
            min: optional_f64(&daily.temperature_2m_min, index),
            precipitation: optional_f64(&daily.precipitation_sum, index),
            rain: optional_f64(&daily.rain_sum, index),
            showers: optional_f64(&daily.showers_sum, index),
            probability: optional_f64(&daily.precipitation_probability_max, index),
            wind: optional_f64(&daily.wind_speed_10m_max, index),
        })
        .collect()
}

pub(crate) fn normalize_hourly(hourly: HourlyWeather) -> Vec<HourForecast> {
    hourly
        .time
        .into_iter()
        .enumerate()
        .map(|(index, time)| {
            let (date, hour) = split_datetime(&time);

            HourForecast {
                time,
                date,
                hour,
                precipitation: optional_f64(&hourly.precipitation, index),
                rain: optional_f64(&hourly.rain, index),
                showers: optional_f64(&hourly.showers, index),
                probability: optional_f64(&hourly.precipitation_probability, index),
            }
        })
        .collect()
}

fn optional_f64(values: &[Option<f64>], index: usize) -> f64 {
    values.get(index).and_then(|value| *value).unwrap_or(0.0)
}

fn optional_i32(values: &[Option<i32>], index: usize) -> i32 {
    values.get(index).and_then(|value| *value).unwrap_or(0)
}

fn split_datetime(value: &str) -> (String, String) {
    match value.split_once('T') {
        Some((date, hour)) => (date.to_string(), hour.chars().take(5).collect()),
        None => (value.to_string(), value.to_string()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn daily_forecast_uses_zero_for_missing_values() {
        let forecast = normalize_daily(DailyWeather {
            time: vec!["2026-04-28".to_string(), "2026-04-29".to_string()],
            weather_code: vec![Some(61)],
            temperature_2m_max: vec![Some(25.0), None],
            temperature_2m_min: vec![Some(17.0)],
            precipitation_sum: vec![Some(3.2)],
            rain_sum: vec![],
            showers_sum: vec![Some(1.1)],
            precipitation_probability_max: vec![Some(80.0)],
            wind_speed_10m_max: vec![Some(12.0)],
        });

        assert_eq!(forecast.len(), 2);
        assert_eq!(forecast[0].code, 61);
        assert_eq!(forecast[1].code, 0);
        assert_eq!(forecast[1].max, 0.0);
        assert_eq!(forecast[1].rain, 0.0);
    }

    #[test]
    fn hourly_forecast_splits_date_and_hour() {
        let forecast = normalize_hourly(HourlyWeather {
            time: vec!["2026-04-28T14:30".to_string(), "invalid".to_string()],
            precipitation: vec![Some(2.5)],
            rain: vec![Some(1.5)],
            showers: vec![None],
            precipitation_probability: vec![Some(60.0)],
        });

        assert_eq!(forecast[0].date, "2026-04-28");
        assert_eq!(forecast[0].hour, "14:30");
        assert_eq!(forecast[1].date, "invalid");
        assert_eq!(forecast[1].hour, "invalid");
        assert_eq!(forecast[1].precipitation, 0.0);
    }
}
