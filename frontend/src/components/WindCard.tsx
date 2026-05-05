import type { WeatherData } from '../models/weather'
import { formatMeasure } from '../utils/formatters'
import { SvgRepoIcon } from './SvgRepoIcon'

type WindCardProps = {
  weather: WeatherData | null
}

export function WindCard({ weather }: WindCardProps) {
  const currentWind = weather ? formatMeasure(weather.current.wind_speed_10m, 'km/h') : '--'
  const peakWind = weather?.daily[0] ? formatMeasure(weather.daily[0].wind, 'km/h') : '--'

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">Vento</p>
          <h2 className="mt-1 text-2xl font-semibold text-[var(--text)]">{currentWind}</h2>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-lg border border-[var(--border)] bg-[var(--icon-bg)] text-[var(--accent-strong)]">
          <SvgRepoIcon className="h-8 w-8" name="wind" />
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-5">
        <div className="min-w-0 space-y-4">
          <div className="border-b border-[var(--border)] pb-3">
            <p className="text-sm text-[var(--muted)]">Agora</p>
            <p className="text-lg font-semibold text-[var(--text)]">{currentWind}</p>
          </div>
          <div>
            <p className="text-sm text-[var(--muted)]">Pico no dia</p>
            <p className="text-lg font-semibold text-[var(--text)]">{peakWind}</p>
          </div>
        </div>

        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--icon-bg)]">
          <SvgRepoIcon className="h-14 w-14" name="compass" />
        </div>
      </div>
    </section>
  )
}
