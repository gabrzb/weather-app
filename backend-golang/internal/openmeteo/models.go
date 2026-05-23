package openmeteo

type LocationResult struct {
	ID        *int64  `json:"id"`
	Name      string  `json:"name"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Admin1    *string `json:"admin1"`
	Country   *string `json:"country"`
	Timezone  *string `json:"timezone"`
}

type geocodingResponse struct {
	Results []LocationResult `json:"results"`
}

type CurrentWeather struct {
	Time                string  `json:"time"`
	Temperature2M       float64 `json:"temperature_2m"`
	ApparentTemperature float64 `json:"apparent_temperature"`
	RelativeHumidity2M  float64 `json:"relative_humidity_2m"`
	Precipitation       float64 `json:"precipitation"`
	Rain                float64 `json:"rain"`
	Showers             float64 `json:"showers"`
	WeatherCode         int     `json:"weather_code"`
	CloudCover          float64 `json:"cloud_cover"`
	WindSpeed10M        float64 `json:"wind_speed_10m"`
	IsDay               int     `json:"is_day"`
}

type DailyWeather struct {
	Time                        []string   `json:"time"`
	WeatherCode                 []*int     `json:"weather_code"`
	Temperature2MMax            []*float64 `json:"temperature_2m_max"`
	Temperature2MMin            []*float64 `json:"temperature_2m_min"`
	PrecipitationSum            []*float64 `json:"precipitation_sum"`
	RainSum                     []*float64 `json:"rain_sum"`
	ShowersSum                  []*float64 `json:"showers_sum"`
	PrecipitationProbabilityMax []*float64 `json:"precipitation_probability_max"`
	WindSpeed10MMax             []*float64 `json:"wind_speed_10m_max"`
}

type HourlyWeather struct {
	Time                     []string   `json:"time"`
	Precipitation            []*float64 `json:"precipitation"`
	Rain                     []*float64 `json:"rain"`
	Showers                  []*float64 `json:"showers"`
	PrecipitationProbability []*float64 `json:"precipitation_probability"`
}

type forecastResponse struct {
	Timezone string         `json:"timezone"`
	Current  CurrentWeather `json:"current"`
	Daily    DailyWeather   `json:"daily"`
	Hourly   HourlyWeather  `json:"hourly"`
}

type DayForecast struct {
	Date          string  `json:"date"`
	Code          int     `json:"code"`
	Max           float64 `json:"max"`
	Min           float64 `json:"min"`
	Precipitation float64 `json:"precipitation"`
	Rain          float64 `json:"rain"`
	Showers       float64 `json:"showers"`
	Probability   float64 `json:"probability"`
	Wind          float64 `json:"wind"`
}

type HourForecast struct {
	Time          string  `json:"time"`
	Date          string  `json:"date"`
	Hour          string  `json:"hour"`
	Precipitation float64 `json:"precipitation"`
	Rain          float64 `json:"rain"`
	Showers       float64 `json:"showers"`
	Probability   float64 `json:"probability"`
}

type airQualityResponse struct {
	Current *AirQuality `json:"current"`
}

type AirQuality struct {
	Time            string   `json:"time"`
	PM10            *float64 `json:"pm10"`
	PM25            *float64 `json:"pm2_5"`
	CarbonMonoxide  *float64 `json:"carbon_monoxide"`
	NitrogenDioxide *float64 `json:"nitrogen_dioxide"`
	Ozone           *float64 `json:"ozone"`
	EuropeanAQI     *float64 `json:"european_aqi"`
	USAQI           *float64 `json:"us_aqi"`
}

type WeatherData struct {
	Location   LocationResult `json:"location"`
	Current    CurrentWeather `json:"current"`
	Daily      []DayForecast  `json:"daily"`
	Hourly     []HourForecast `json:"hourly"`
	Timezone   string         `json:"timezone"`
	AirQuality *AirQuality    `json:"air_quality"`
	Sources    []string       `json:"sources"`
}
