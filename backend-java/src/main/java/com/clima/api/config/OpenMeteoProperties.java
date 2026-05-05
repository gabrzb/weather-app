package com.clima.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;

@Validated
@ConfigurationProperties(prefix = "open-meteo")
public class OpenMeteoProperties {

    @NotBlank
    private String geocodingUrl;

    @NotBlank
    private String forecastUrl;

    @NotBlank
    private String airQualityUrl;

    public String getGeocodingUrl() {
        return geocodingUrl;
    }

    public void setGeocodingUrl(String geocodingUrl) {
        this.geocodingUrl = geocodingUrl;
    }

    public String getForecastUrl() {
        return forecastUrl;
    }

    public void setForecastUrl(String forecastUrl) {
        this.forecastUrl = forecastUrl;
    }

    public String getAirQualityUrl() {
        return airQualityUrl;
    }

    public void setAirQualityUrl(String airQualityUrl) {
        this.airQualityUrl = airQualityUrl;
    }
}
