import type { WeatherData } from '../models/weather'
import { formatMeasure } from '../utils/formatters'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type WindCardProps = {
  weather: WeatherData | null
}

export function WindCard({ weather }: WindCardProps) {
  const currentWind = weather ? formatMeasure(weather.current.wind_speed_10m, 'km/h') : '--'
  const peakWind = weather?.daily[0] ? formatMeasure(weather.daily[0].wind, 'km/h') : '--'

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <p className="text-sm text-[var(--muted-foreground)]">Vento</p>
          <CardTitle className="mt-2 text-2xl">{currentWind}</CardTitle>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--border)] bg-[var(--muted)]">
          <SvgRepoIcon className="h-6 w-6" name="wind" />
        </span>
      </CardHeader>

      <CardContent>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="border-t border-[var(--border)] pt-3">
            <dt className="text-[var(--muted-foreground)]">Agora</dt>
            <dd className="mt-1 font-semibold text-[var(--foreground)]">{currentWind}</dd>
          </div>
          <div className="border-t border-[var(--border)] pt-3">
            <dt className="text-[var(--muted-foreground)]">Pico no dia</dt>
            <dd className="mt-1 font-semibold text-[var(--foreground)]">{peakWind}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
