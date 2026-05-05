package com.clima.api.model;

public record AirQuality(
        String time,
        Double pm10,
        Double pm2_5,
        Double carbon_monoxide,
        Double nitrogen_dioxide,
        Double ozone,
        Double european_aqi,
        Double us_aqi) {
}
