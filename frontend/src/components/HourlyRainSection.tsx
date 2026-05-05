import type { HourForecast } from '../models/weather'
import { numberFormatter } from '../utils/formatters'
import { SvgRepoIcon } from './SvgRepoIcon'

type HourlyRainSectionProps = {
  className?: string
  hours: HourForecast[]
}

function rainAmount(hour: HourForecast) {
  return hour.precipitation || hour.rain + hour.showers
}

function chartLimit(values: number[]) {
  const maxValue = Math.max(0, ...values)
  return Math.max(2.5, Math.ceil(maxValue * 2) / 2)
}

function axisLabel(value: number) {
  return `${numberFormatter.format(value)} mm`
}

function hourLabel(hour: string) {
  return `${hour.slice(0, 2)}h`
}

export function HourlyRainSection({ className = 'mt-4', hours }: HourlyRainSectionProps) {
  const values = hours.map(rainAmount)
  const maxScale = chartLimit(values)
  const ticks = Array.from({ length: 6 }, (_, index) => maxScale - (maxScale / 5) * index)

  return (
    <section
      className={`${className} rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl`}
    >
      <div className="mb-4 flex items-center gap-2">
        <SvgRepoIcon className="h-5 w-5" name="rain" />
        <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Precipitação hoje (mm)</h2>
      </div>

      {hours.length > 0 ? (
        <div className="rounded-lg bg-[var(--chart-bg)] p-4 text-[var(--chart-muted)]">
          <div className="grid grid-cols-[3.4rem_minmax(0,1fr)] gap-2">
            <div className="flex h-48 flex-col justify-between text-right text-xs leading-none text-[var(--chart-muted)]">
              {ticks.map((tick) => (
                <span key={tick}>{axisLabel(tick)}</span>
              ))}
            </div>

            <div className="overflow-x-auto pb-1">
              <div className="min-w-[46rem]">
                <div className="relative h-48 border-b border-[var(--chart-grid)]">
                  {ticks.map((tick, index) => (
                    <div
                      className="absolute left-0 right-0 border-t border-[var(--chart-grid)]"
                      key={tick}
                      style={{ top: `${(index / (ticks.length - 1)) * 100}%` }}
                    />
                  ))}

                  <div
                    className="relative z-10 grid h-full items-end gap-3"
                    style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}
                  >
                    {hours.map((hour) => {
                      const amount = rainAmount(hour)
                      const height = amount > 0 ? `${Math.max(3, (amount / maxScale) * 100)}%` : '0px'

                      return (
                        <div className="flex h-full items-end justify-center" key={hour.time}>
                          <div
                            className="w-7 rounded-t-md border bg-[image:var(--bar-bg)] shadow-sm"
                            style={{ borderColor: 'var(--bar-border)', height }}
                            title={`${hour.hour}: ${axisLabel(amount)}`}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div
                  className="mt-3 grid gap-3 text-center text-xs font-medium text-[var(--chart-muted)]"
                  style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}
                >
                  {hours.map((hour) => (
                    <span key={hour.time}>{hourLabel(hour.hour)}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--control-bg)] p-4 text-sm text-[var(--muted)]">
          A previsão por hora aparece assim que a API responder.
        </div>
      )}
    </section>
  )
}
