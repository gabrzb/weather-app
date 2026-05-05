import { SvgRepoIcon } from './SvgRepoIcon'

type ErrorBannerProps = {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) {
    return null
  }

  return (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-rose-400/35 bg-rose-500/15 p-4 text-sm text-[var(--text)] shadow-lg shadow-rose-950/10 backdrop-blur-xl">
      <SvgRepoIcon className="mt-0.5 h-5 w-5 shrink-0" name="alert" />
      <p>{message}</p>
    </div>
  )
}
