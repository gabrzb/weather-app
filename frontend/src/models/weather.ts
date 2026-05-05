export type LocationResult = {
  id: number | null
  name: string
  latitude: number
  longitude: number
  admin1: string | null
  country: string | null
  timezone: string | null
}

export type CurrentWeather = {
  time: string
  temperature_2m: number
  apparent_temperature: number
  relative_humidity_2m: number
  precipitation: number
  rain: number
  showers: number
  weather_code: number
  cloud_cover: number
  wind_speed_10m: number
  is_day: number
}

export type DayForecast = {
  date: string
  code: number
  max: number
  min: number
  precipitation: number
  rain: number
  showers: number
  probability: number
  wind: number
}

export type HourForecast = {
  time: string
  date: string
  hour: string
  precipitation: number
  rain: number
  showers: number
  probability: number
}

export type AirQuality = {
  time: string
  pm10: number | null
  pm2_5: number | null
  carbon_monoxide: number | null
  nitrogen_dioxide: number | null
  ozone: number | null
  european_aqi: number | null
  us_aqi: number | null
}

export type WeatherData = {
  location: LocationResult
  current: CurrentWeather
  daily: DayForecast[]
  hourly: HourForecast[]
  timezone: string
  air_quality: AirQuality | null
  sources: string[]
}

export type WeatherParams =
  | { city: string; latitude?: never; longitude?: never; name?: never }
  | { city?: never; latitude: number; longitude: number; name: string }
