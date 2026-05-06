import type { AirQuality } from '../models/weather'
import type { AqiSummary } from '../utils/airQuality'
import { formatOptionalMeasure } from '../utils/formatters'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'

type AirQualityCardProps = {
  airQuality: AirQuality | null
  summary: AqiSummary
}

export function AirQualityCard({ airQuality, summary }: AirQualityCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <p className="text-sm text-[var(--muted-foreground)]">Qualidade do ar</p>
          <CardTitle className="mt-2 text-2xl">{summary.label}</CardTitle>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--border)] bg-[var(--muted)]">
          <SvgRepoIcon className="h-6 w-6" name="air" />
        </span>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between gap-3">
          <p className="text-3xl font-semibold text-[var(--foreground)]">{summary.value}</p>
          <p className="text-sm text-[var(--muted-foreground)]">{summary.detail}</p>
        </div>

        <Progress className="mt-4" indicatorClassName={summary.indicatorClassName} value={summary.progress} />

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="border-t border-[var(--border)] pt-3">
            <dt className="text-[var(--muted-foreground)]">PM2.5</dt>
            <dd className="mt-1 font-semibold text-[var(--foreground)]">{formatOptionalMeasure(airQuality?.pm2_5, 'ug/m3')}</dd>
          </div>
          <div className="border-t border-[var(--border)] pt-3">
            <dt className="text-[var(--muted-foreground)]">Ozônio</dt>
            <dd className="mt-1 font-semibold text-[var(--foreground)]">{formatOptionalMeasure(airQuality?.ozone, 'ug/m3')}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
