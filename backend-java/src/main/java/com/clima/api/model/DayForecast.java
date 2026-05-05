package com.clima.api.model;

public record DayForecast(
        String date,
        int code,
        double max,
        double min,
        double precipitation,
        double rain,
        double showers,
        double probability,
        double wind) {
}
