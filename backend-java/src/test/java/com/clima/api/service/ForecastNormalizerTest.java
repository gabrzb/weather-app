package com.clima.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.clima.api.model.DailyWeather;
import com.clima.api.model.HourlyWeather;

class ForecastNormalizerTest {

    private final ForecastNormalizer normalizer = new ForecastNormalizer();

    @Test
    void dailyForecastUsesZeroForMissingValues() {
        DailyWeather daily = new DailyWeather(
                List.of("2026-04-28", "2026-04-29"),
                List.of(61),
                Arrays.asList(25.0, null),
                List.of(17.0),
                List.of(3.2),
                List.of(),
                List.of(1.1),
                List.of(80.0),
                List.of(12.0));

        var forecast = normalizer.normalizeDaily(daily);

        assertEquals(2, forecast.size());
        assertEquals(61, forecast.get(0).code());
        assertEquals(0, forecast.get(1).code());
        assertEquals(0.0, forecast.get(1).max());
        assertEquals(0.0, forecast.get(1).rain());
    }

    @Test
    void hourlyForecastSplitsDateAndHour() {
        HourlyWeather hourly = new HourlyWeather(
                List.of("2026-04-28T14:30", "invalid"),
                List.of(2.5),
                List.of(1.5),
                Arrays.asList((Double) null),
                List.of(60.0));

        var forecast = normalizer.normalizeHourly(hourly);

        assertEquals("2026-04-28", forecast.get(0).date());
        assertEquals("14:30", forecast.get(0).hour());
        assertEquals("invalid", forecast.get(1).date());
        assertEquals("invalid", forecast.get(1).hour());
        assertEquals(0.0, forecast.get(1).precipitation());
    }
}
