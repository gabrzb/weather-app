import type { HourForecast } from '../models/weather'
import { cn } from '../lib/utils'
import { numberFormatter } from '../utils/formatters'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

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

export function HourlyRainSection({ className, hours }: HourlyRainSectionProps) {
  const values = hours.map(rainAmount)
  const maxScale = chartLimit(values)
  const ticks = Array.from({ length: 6 }, (_, index) => maxScale - (maxScale / 5) * index)

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <SvgRepoIcon className="h-5 w-5" name="rain" />
        <CardTitle>Precipitação hoje</CardTitle>
      </CardHeader>

      <CardContent>
        {hours.length > 0 ? (
          <div className="rounded-md border border-[var(--border)] bg-[var(--chart-bg)] p-4 text-[var(--chart-muted)]">
            <div className="grid grid-cols-[3.4rem_minmax(0,1fr)] gap-2">
              <div className="flex h-48 flex-col justify-between text-right text-xs leading-none">
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
                              className="w-6 rounded-t-sm border border-[var(--primary)] bg-[var(--primary)]"
                              style={{ height }}
                              title={`${hour.hour}: ${axisLabel(amount)}`}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div
                    className="mt-3 grid gap-3 text-center text-xs font-medium"
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
          <div className="rounded-md border border-[var(--border)] bg-[var(--muted)] p-4 text-sm text-[var(--muted-foreground)]">
            A previsão por hora aparece assim que a API responder.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
