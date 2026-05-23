package openmeteo

import "strings"

func NormalizeDaily(daily DailyWeather) []DayForecast {
	forecast := make([]DayForecast, 0, len(daily.Time))
	for index, date := range daily.Time {
		forecast = append(forecast, DayForecast{
			Date:          date,
			Code:          optionalInt(daily.WeatherCode, index),
			Max:           optionalFloat(daily.Temperature2MMax, index),
			Min:           optionalFloat(daily.Temperature2MMin, index),
			Precipitation: optionalFloat(daily.PrecipitationSum, index),
			Rain:          optionalFloat(daily.RainSum, index),
			Showers:       optionalFloat(daily.ShowersSum, index),
			Probability:   optionalFloat(daily.PrecipitationProbabilityMax, index),
			Wind:          optionalFloat(daily.WindSpeed10MMax, index),
		})
	}

	return forecast
}

func NormalizeHourly(hourly HourlyWeather) []HourForecast {
	forecast := make([]HourForecast, 0, len(hourly.Time))
	for index, value := range hourly.Time {
		date, hour := splitDateTime(value)
		forecast = append(forecast, HourForecast{
			Time:          value,
			Date:          date,
			Hour:          hour,
			Precipitation: optionalFloat(hourly.Precipitation, index),
			Rain:          optionalFloat(hourly.Rain, index),
			Showers:       optionalFloat(hourly.Showers, index),
			Probability:   optionalFloat(hourly.PrecipitationProbability, index),
		})
	}

	return forecast
}

func optionalFloat(values []*float64, index int) float64 {
	if index >= len(values) || values[index] == nil {
		return 0
	}

	return *values[index]
}

func optionalInt(values []*int, index int) int {
	if index >= len(values) || values[index] == nil {
		return 0
	}

	return *values[index]
}

func splitDateTime(value string) (string, string) {
	date, hour, ok := strings.Cut(value, "T")
	if !ok {
		return value, value
	}

	if len(hour) > 5 {
		hour = hour[:5]
	}

	return date, hour
}
