package com.clima.api.model;

public record CurrentWeather(
        String time,
        double temperature_2m,
        double apparent_temperature,
        double relative_humidity_2m,
        double precipitation,
        double rain,
        double showers,
        int weather_code,
        double cloud_cover,
        double wind_speed_10m,
        int is_day) {
}
