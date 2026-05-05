import type { AqiSummary } from '../utils/airQuality'
import type { AirQuality } from '../models/weather'
import { formatOptionalMeasure } from '../utils/formatters'
import { SvgRepoIcon } from './SvgRepoIcon'

type AirQualityCardProps = {
  airQuality: AirQuality | null
  summary: AqiSummary
}

export function AirQualityCard({ airQuality, summary }: AirQualityCardProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">Qualidade do ar</p>
          <h2 className="mt-1 text-2xl font-semibold text-[var(--text)]">{summary.label}</h2>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-lg border border-[var(--border)] bg-[var(--icon-bg)] text-[var(--accent-strong)]">
          <SvgRepoIcon className="h-8 w-8" name="air" />
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-end justify-between gap-3">
          <p className="text-4xl font-semibold text-[var(--text)]">{summary.value}</p>
          <p className="text-sm text-[var(--muted)]">{summary.detail}</p>
        </div>
        <div className="h-3 overflow-hidden rounded-lg bg-[var(--control-bg)]">
          <div className={`h-full rounded-lg ${summary.bar}`} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="border-t border-[var(--border)] pt-3">
          <p className="text-[var(--muted)]">PM2.5</p>
          <p className="font-semibold text-[var(--text)]">{formatOptionalMeasure(airQuality?.pm2_5, 'ug/m3')}</p>
        </div>
        <div className="border-t border-[var(--border)] pt-3">
          <p className="text-[var(--muted)]">Ozônio</p>
          <p className="font-semibold text-[var(--text)]">{formatOptionalMeasure(airQuality?.ozone, 'ug/m3')}</p>
        </div>
      </div>
    </section>
  )
}
