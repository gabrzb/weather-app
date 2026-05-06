import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type DivProps = HTMLAttributes<HTMLDivElement>
type HeadingProps = HTMLAttributes<HTMLHeadingElement>
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn('rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn('flex flex-col gap-1.5 p-5', className)} {...props} />
}

export function CardTitle({ className, ...props }: HeadingProps) {
  return <h2 className={cn('text-base font-semibold leading-none text-[var(--foreground)]', className)} {...props} />
}

export function CardDescription({ className, ...props }: ParagraphProps) {
  return <p className={cn('text-sm leading-6 text-[var(--muted-foreground)]', className)} {...props} />
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn('p-5 pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }: DivProps) {
  return <div className={cn('flex items-center p-5 pt-0', className)} {...props} />
}
