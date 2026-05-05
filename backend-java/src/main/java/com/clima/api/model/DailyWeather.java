package com.clima.api.model;

import java.util.List;

public record DailyWeather(
        List<String> time,
        List<Integer> weather_code,
        List<Double> temperature_2m_max,
        List<Double> temperature_2m_min,
        List<Double> precipitation_sum,
        List<Double> rain_sum,
        List<Double> showers_sum,
        List<Double> precipitation_probability_max,
        List<Double> wind_speed_10m_max) {
}
