import { SvgRepoIcon } from './SvgRepoIcon'
import { Alert, AlertDescription } from './ui/alert'

type ErrorBannerProps = {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) {
    return null
  }

  return (
    <Alert>
      <SvgRepoIcon className="mt-0.5 h-5 w-5 shrink-0" name="alert" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
