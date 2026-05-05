package com.clima.api.model;

public record HourForecast(
        String time,
        String date,
        String hour,
        double precipitation,
        double rain,
        double showers,
        double probability) {
}
