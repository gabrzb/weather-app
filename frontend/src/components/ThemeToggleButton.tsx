import type { ThemeName } from '../hooks/useTheme'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Button } from './ui/button'

type ThemeToggleButtonProps = {
  isManual: boolean
  onResetAutoTheme: () => void
  onToggleTheme: () => void
  theme: ThemeName
}

export function ThemeToggleButton({
  isManual,
  onResetAutoTheme,
  onToggleTheme,
  theme,
}: ThemeToggleButtonProps) {
  const isDay = theme === 'day'

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {isManual ? (
        <Button onClick={onResetAutoTheme} size="icon" title="Voltar para tema automático" type="button" variant="outline">
          <SvgRepoIcon className="h-4 w-4" name="loader" />
          <span className="sr-only">Voltar para tema automático</span>
        </Button>
      ) : null}

      <Button onClick={onToggleTheme} type="button" variant="secondary">
        {isDay ? (
          <SvgRepoIcon className="h-4 w-4" name="sun" />
        ) : (
          <SvgRepoIcon className="h-4 w-4" name="moon" />
        )}
        {isDay ? 'Dia' : 'Noite'}
      </Button>
    </div>
  )
}
