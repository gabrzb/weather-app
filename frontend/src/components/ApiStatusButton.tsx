import type { HealthStatus } from '../models/status'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Button } from './ui/button'

type ApiStatusButtonProps = {
  health: HealthStatus
  onCheckHealth: () => void
}

function healthLabel(health: HealthStatus) {
  if (health === 'online') {
    return 'API online'
  }

  if (health === 'offline') {
    return 'API offline'
  }

  return 'Verificando'
}

export function ApiStatusButton({ health, onCheckHealth }: ApiStatusButtonProps) {
  return (
    <Button
      className="fixed bottom-5 left-5 z-50"
      onClick={onCheckHealth}
      size="icon"
      title={healthLabel(health)}
      type="button"
      variant="outline"
    >
      {health === 'online' ? (
        <SvgRepoIcon className="h-5 w-5" name="wifi" />
      ) : health === 'offline' ? (
        <SvgRepoIcon className="h-5 w-5 opacity-50 grayscale" name="wifiOff" />
      ) : (
        <SvgRepoIcon className="h-4 w-4 animate-spin" name="loader" />
      )}
      <span className="sr-only">{healthLabel(health)}</span>
    </Button>
  )
}
