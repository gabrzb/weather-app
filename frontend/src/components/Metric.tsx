import { SvgRepoIcon, type SvgRepoIconName } from './SvgRepoIcon'

type MetricProps = {
  icon: SvgRepoIconName
  label: string
  value: string
}

export function Metric({ icon, label, value }: MetricProps) {
  return (
    <div className="flex min-h-20 items-start gap-3 border-t border-[var(--border)] px-5 py-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[var(--border)] bg-[var(--muted)]">
        <SvgRepoIcon className="h-5 w-5" name={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
        <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">{value}</p>
      </div>
    </div>
  )
}
