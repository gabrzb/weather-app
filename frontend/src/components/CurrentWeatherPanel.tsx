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

type CurrentWeatherPanelProps = {
  weather: WeatherData | null
}

export function CurrentWeatherPanel({ weather }: CurrentWeatherPanelProps) {
  const mood = weather
    ? weatherDescription(weather.current.weather_code, weather.current.is_day === 1)
    : weatherDescription(0)
  const place = weather ? locationLabel(weather.location) || weather.timezone : 'Carregando local'

  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)] shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className={`border-b ${mood.surface} p-4 sm:p-5`}>
        <div className="flex min-h-[20rem] flex-col justify-between gap-6">
          <div className="min-w-0">
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--control-bg)] px-3 py-2 text-sm font-medium text-[var(--text)]">
              <SvgRepoIcon className="h-5 w-5" name="location" />
              {weather ? weather.location.name : DEFAULT_CITY}
            </div>

            <p className="text-sm font-medium text-[var(--muted)]">{place}</p>
            <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-3">
              <p className="text-6xl font-light leading-none tracking-normal text-[var(--text)] sm:text-7xl">
                {weather ? formatTemp(weather.current.temperature_2m) : '--\u00b0C'}
              </p>
              <div className="pb-3">
                <p className="text-2xl font-semibold text-[var(--text)]">{mood.label}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {weather ? `Atualizado ${formatCurrentTime(weather.current.time)}` : 'Aguardando API'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4">
            <p className="max-w-sm text-sm leading-6 text-[var(--subtle)]">
              {weather
                ? `Sensação de ${formatTemp(weather.current.apparent_temperature)} com ${formatPercent(weather.current.relative_humidity_2m)} de umidade.`
                : 'Os dados principais aparecem assim que a API responder.'}
            </p>
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--icon-bg)] shadow-lg shadow-black/20">
              <SvgRepoIcon className="h-14 w-14" name={mood.icon} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-x-4 px-4 sm:grid-cols-2 sm:px-5 xl:grid-cols-2 2xl:grid-cols-3">
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
      </div>
    </section>
  )
}
