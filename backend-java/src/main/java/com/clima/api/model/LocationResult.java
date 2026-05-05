package com.clima.api.model;

public record LocationResult(
        Long id,
        String name,
        double latitude,
        double longitude,
        String admin1,
        String country,
        String timezone) {
}
