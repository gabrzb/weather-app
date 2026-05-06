import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type BadgeVariant = 'default' | 'secondary' | 'outline'

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-[var(--primary)] text-[var(--primary-foreground)]',
  secondary: 'border-transparent bg-[var(--muted)] text-[var(--foreground)]',
  outline: 'border-[var(--border)] bg-transparent text-[var(--foreground)]',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium', variants[variant], className)}
      {...props}
    />
  )
}
