import { SvgRepoIcon, type SvgRepoIconName } from './SvgRepoIcon'

type MetricProps = {
  icon: SvgRepoIconName
  label: string
  value: string
}

export function Metric({ icon, label, value }: MetricProps) {
  return (
    <div className="flex min-h-24 items-start gap-3 border-t border-[var(--border)] py-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--icon-bg)] text-[var(--accent-strong)]">
        <SvgRepoIcon className="h-6 w-6" name={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-xl font-semibold text-[var(--text)]">{value}</p>
      </div>
    </div>
  )
}
