package com.clima.api.model;

import java.util.List;

public record HourlyWeather(
        List<String> time,
        List<Double> precipitation,
        List<Double> rain,
        List<Double> showers,
        List<Double> precipitation_probability) {
}
