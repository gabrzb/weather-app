import type { ThemeName } from '../hooks/useTheme'
import { SvgRepoIcon } from './SvgRepoIcon'

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
        <button
          className="grid h-11 w-11 place-items-center rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:bg-[var(--control-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]"
          onClick={onResetAutoTheme}
          title="Voltar para tema automático"
          type="button"
        >
          <SvgRepoIcon className="h-5 w-5" name="loader" />
          <span className="sr-only">Voltar para tema automático</span>
        </button>
      ) : null}

      <button
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-sm font-semibold text-[var(--text)] shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:bg-[var(--control-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]"
        onClick={onToggleTheme}
        type="button"
      >
        {isDay ? (
          <SvgRepoIcon className="h-5 w-5" name="sun" />
        ) : (
          <SvgRepoIcon className="h-5 w-5" name="moon" />
        )}
        {isDay ? 'Dia' : 'Noite'}
      </button>
    </div>
  )
}
