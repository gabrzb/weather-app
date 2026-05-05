import type { DayForecast } from '../models/weather'
import { DailyForecastCard } from './DailyForecastCard'
import { SvgRepoIcon } from './SvgRepoIcon'

type DailyForecastSectionProps = {
  className?: string
  days: DayForecast[]
}

export function DailyForecastSection({ className = 'mt-4', days }: DailyForecastSectionProps) {
  return (
    <section
      className={`${className} rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl`}
    >
      <div className="mb-4 flex items-center gap-2 border-b border-[var(--border)] pb-3">
        <SvgRepoIcon className="h-6 w-6" name="calendar" />
        <h2 className="text-sm font-semibold uppercase text-[var(--muted)]">Próximos dias</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-7">
        {days.length > 0
          ? days.map((day) => <DailyForecastCard day={day} key={day.date} />)
          : Array.from({ length: 7 }, (_, index) => (
              <article className="min-h-36 rounded-lg border border-[var(--border)] bg-[var(--control-bg)] p-4" key={index}>
                <div className="h-4 w-20 rounded-lg bg-[var(--icon-bg)]" />
                <div className="mt-5 h-8 w-16 rounded-lg bg-[var(--icon-bg)]" />
                <div className="mt-6 h-3 w-full rounded-lg bg-[var(--icon-bg)]" />
              </article>
            ))}
      </div>
    </section>
  )
}
