import type { DayForecast } from '../models/weather'
import { formatDate, formatMeasure, formatPercent, formatTemp } from '../utils/formatters'
import { weatherDescription } from '../utils/weatherDescription'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Card } from './ui/card'

type DailyForecastCardProps = {
  day: DayForecast
}

export function DailyForecastCard({ day }: DailyForecastCardProps) {
  const mood = weatherDescription(day.code)

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">{formatDate(day.date)}</p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">{mood.label}</p>
        </div>
        <SvgRepoIcon className="h-7 w-7 shrink-0" name={mood.icon} />
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <p className="text-2xl font-semibold text-[var(--foreground)]">{formatTemp(day.max)}</p>
        <p className="text-sm text-[var(--muted-foreground)]">{formatTemp(day.min)}</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-3 text-xs text-[var(--muted-foreground)]">
        <span>{formatPercent(day.probability)} chuva</span>
        <span>{formatMeasure(day.wind, 'km/h')}</span>
      </div>
    </Card>
  )
}
