package com.clima.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clima.api.error.AppException;
import com.clima.api.model.HealthResponse;
import com.clima.api.model.LocationResult;
import com.clima.api.model.WeatherData;
import com.clima.api.service.OpenMeteoService;

@RestController
@RequestMapping("/api")
public class WeatherController {

    private final OpenMeteoService openMeteoService;

    public WeatherController(OpenMeteoService openMeteoService) {
        this.openMeteoService = openMeteoService;
    }

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse("ok", "clima_api");
    }

    @GetMapping("/locations")
    public LocationResult location(@RequestParam(required = false) String city) {
        return openMeteoService.searchLocation(city);
    }

    @GetMapping("/weather")
    public WeatherData weather(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false) String name) {

        if (city != null) {
            return openMeteoService.weatherByCity(city);
        }

        if (latitude != null && longitude != null) {
            return openMeteoService.weatherByCoordinates(latitude, longitude, name);
        }

        throw AppException.badRequest("Informe city ou latitude/longitude.");
    }
}
