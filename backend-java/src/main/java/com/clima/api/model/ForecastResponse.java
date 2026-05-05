package com.clima.api.model;

public record ForecastResponse(
        String timezone,
        CurrentWeather current,
        DailyWeather daily,
        HourlyWeather hourly) {
}
