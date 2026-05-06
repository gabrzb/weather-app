import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type DivProps = HTMLAttributes<HTMLDivElement>

export function Alert({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        'relative flex items-start gap-3 rounded-lg border border-[var(--destructive-border)] bg-[var(--destructive-soft)] p-4 text-sm text-[var(--foreground)]',
        className,
      )}
      role="alert"
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }: DivProps) {
  return <div className={cn('leading-6', className)} {...props} />
}
