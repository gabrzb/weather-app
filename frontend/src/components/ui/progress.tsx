import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  indicatorClassName?: string
  value: number
}

export function Progress({ className, indicatorClassName, value, ...props }: ProgressProps) {
  const width = `${Math.max(0, Math.min(100, value))}%`

  return (
    <div className={cn('h-2 overflow-hidden rounded-md bg-[var(--muted)]', className)} {...props}>
      <div className={cn('h-full rounded-md bg-[var(--primary)]', indicatorClassName)} style={{ width }} />
    </div>
  )
}
