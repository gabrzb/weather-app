package com.clima.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.clima.api.model.DailyWeather;
import com.clima.api.model.DayForecast;
import com.clima.api.model.HourForecast;
import com.clima.api.model.HourlyWeather;

@Component
public class ForecastNormalizer {

    public List<DayForecast> normalizeDaily(DailyWeather daily) {
        if (daily == null || daily.time() == null) {
            return List.of();
        }

        List<DayForecast> forecast = new ArrayList<>(daily.time().size());
        for (int index = 0; index < daily.time().size(); index++) {
            forecast.add(new DayForecast(
                    daily.time().get(index),
                    optionalInteger(daily.weather_code(), index),
                    optionalDouble(daily.temperature_2m_max(), index),
                    optionalDouble(daily.temperature_2m_min(), index),
                    optionalDouble(daily.precipitation_sum(), index),
                    optionalDouble(daily.rain_sum(), index),
                    optionalDouble(daily.showers_sum(), index),
                    optionalDouble(daily.precipitation_probability_max(), index),
                    optionalDouble(daily.wind_speed_10m_max(), index)));
        }

        return forecast;
    }

    public List<HourForecast> normalizeHourly(HourlyWeather hourly) {
        if (hourly == null || hourly.time() == null) {
            return List.of();
        }

        List<HourForecast> forecast = new ArrayList<>(hourly.time().size());
        for (int index = 0; index < hourly.time().size(); index++) {
            String value = hourly.time().get(index);
            String[] dateAndHour = splitDateTime(value);

            forecast.add(new HourForecast(
                    value,
                    dateAndHour[0],
                    dateAndHour[1],
                    optionalDouble(hourly.precipitation(), index),
                    optionalDouble(hourly.rain(), index),
                    optionalDouble(hourly.showers(), index),
                    optionalDouble(hourly.precipitation_probability(), index)));
        }

        return forecast;
    }

    private static double optionalDouble(List<Double> values, int index) {
        if (values == null || index >= values.size()) {
            return 0.0;
        }

        Double value = values.get(index);
        return value != null ? value : 0.0;
    }

    private static int optionalInteger(List<Integer> values, int index) {
        if (values == null || index >= values.size()) {
            return 0;
        }

        Integer value = values.get(index);
        return value != null ? value : 0;
    }

    private static String[] splitDateTime(String value) {
        if (value == null) {
            return new String[]{"", ""};
        }

        int splitIndex = value.indexOf('T');
        if (splitIndex < 0) {
            return new String[]{value, value};
        }

        String date = value.substring(0, splitIndex);
        String hour = value.substring(splitIndex + 1);
        if (hour.length() > 5) {
            hour = hour.substring(0, 5);
        }

        return new String[]{date, hour};
    }
}
