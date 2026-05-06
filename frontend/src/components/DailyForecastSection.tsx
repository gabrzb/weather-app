import type { DayForecast } from '../models/weather'
import { cn } from '../lib/utils'
import { DailyForecastCard } from './DailyForecastCard'
import { SvgRepoIcon } from './SvgRepoIcon'

type DailyForecastSectionProps = {
  className?: string
  days: DayForecast[]
}

export function DailyForecastSection({ className, days }: DailyForecastSectionProps) {
  return (
    <section className={cn('mt-0', className)}>
      <div className="mb-3 flex items-center gap-2">
        <SvgRepoIcon className="h-5 w-5" name="calendar" />
        <h2 className="text-base font-semibold text-[var(--foreground)]">Próximos dias</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-7">
        {days.length > 0
          ? days.map((day) => <DailyForecastCard day={day} key={day.date} />)
          : Array.from({ length: 7 }, (_, index) => (
              <article className="min-h-36 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4" key={index}>
                <div className="h-4 w-20 rounded-md bg-[var(--muted)]" />
                <div className="mt-5 h-8 w-16 rounded-md bg-[var(--muted)]" />
                <div className="mt-6 h-3 w-full rounded-md bg-[var(--muted)]" />
              </article>
            ))}
      </div>
    </section>
  )
}
