package com.clima.api.model;

import java.util.List;

public record WeatherData(
        LocationResult location,
        CurrentWeather current,
        List<DayForecast> daily,
        List<HourForecast> hourly,
        String timezone,
        AirQuality air_quality,
        List<String> sources) {
}
