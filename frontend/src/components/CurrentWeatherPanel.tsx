import type { WeatherData } from '../models/weather'
import { DEFAULT_CITY } from '../utils/constants'
import {
  formatCurrentTime,
  formatMeasure,
  formatPercent,
  formatTemp,
} from '../utils/formatters'
import { locationLabel } from '../utils/location'
import { weatherDescription } from '../utils/weatherDescription'
import { Metric } from './Metric'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'

type CurrentWeatherPanelProps = {
  weather: WeatherData | null
}

export function CurrentWeatherPanel({ weather }: CurrentWeatherPanelProps) {
  const mood = weather
    ? weatherDescription(weather.current.weather_code, weather.current.is_day === 1)
    : weatherDescription(0)
  const place = weather ? locationLabel(weather.location) || weather.timezone : 'Carregando local'

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-[var(--border)] bg-[var(--weather-soft)]">
        <div className="flex min-h-[17rem] flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Badge className="max-w-full truncate" variant="outline">
                <SvgRepoIcon className="h-4 w-4 shrink-0" name="location" />
                {weather ? weather.location.name : DEFAULT_CITY}
              </Badge>

              <p className="mt-4 text-sm font-medium text-[var(--muted-foreground)]">{place}</p>
              <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-3">
                <p className="text-5xl font-semibold leading-none tracking-normal text-[var(--foreground)] sm:text-6xl">
                  {weather ? formatTemp(weather.current.temperature_2m) : '--\u00b0C'}
                </p>
                <div className="pb-1">
                  <p className="text-lg font-semibold text-[var(--foreground)]">{mood.label}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {weather ? `Atualizado ${formatCurrentTime(weather.current.time)}` : 'Aguardando API'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-md border border-[var(--border)] bg-[var(--weather-icon)] sm:h-20 sm:w-20">
              <SvgRepoIcon className="h-11 w-11 sm:h-14 sm:w-14" name={mood.icon} />
            </div>
          </div>

          <CardDescription className="max-w-md">
            {weather
              ? `Sensação de ${formatTemp(weather.current.apparent_temperature)} com ${formatPercent(weather.current.relative_humidity_2m)} de umidade.`
              : 'Os dados principais aparecem assim que a API responder.'}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-x-4 p-0 sm:grid-cols-2 xl:grid-cols-2">
        <Metric
          icon="thermometer"
          label="Sensação"
          value={weather ? formatTemp(weather.current.apparent_temperature) : '--\u00b0C'}
        />
        <Metric
          icon="droplets"
          label="Umidade"
          value={weather ? formatPercent(weather.current.relative_humidity_2m) : '--'}
        />
        <Metric
          icon="wind"
          label="Vento"
          value={weather ? formatMeasure(weather.current.wind_speed_10m, 'km/h') : '--'}
        />
        <Metric
          icon="umbrella"
          label="Precipitação"
          value={weather ? formatMeasure(weather.current.precipitation, 'mm') : '--'}
        />
        <Metric
          icon="cloud"
          label="Nuvens"
          value={weather ? formatPercent(weather.current.cloud_cover) : '--'}
        />
        <Metric
          icon="rain"
          label="Chuva agora"
          value={weather ? formatMeasure(weather.current.rain + weather.current.showers, 'mm') : '--'}
        />
      </CardContent>
    </Card>
  )
}
