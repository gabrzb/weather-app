import type { HealthStatus } from '../models/status'
import { SvgRepoIcon } from './SvgRepoIcon'

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
    <button
      className="fixed bottom-5 left-5 z-50 grid h-12 w-12 place-items-center rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:bg-[var(--control-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]"
      onClick={onCheckHealth}
      title={healthLabel(health)}
      type="button"
    >
      {health === 'online' ? (
        <SvgRepoIcon className="h-6 w-6" name="wifi" />
      ) : health === 'offline' ? (
        <SvgRepoIcon className="h-6 w-6 opacity-50 grayscale" name="wifiOff" />
      ) : (
        <SvgRepoIcon className="h-5 w-5 animate-spin" name="loader" />
      )}
      <span className="sr-only">{healthLabel(health)}</span>
    </button>
  )
}
