import type { FormEvent } from 'react'
import { SvgRepoIcon } from './SvgRepoIcon'

type WeatherSearchFormProps = {
  city: string
  isLoading: boolean
  isLocating: boolean
  onCityChange: (city: string) => void
  onSearchCity: (city: string) => void
  onUsePosition: () => void
}

export function WeatherSearchForm({
  city,
  isLoading,
  isLocating,
  onCityChange,
  onSearchCity,
  onUsePosition,
}: WeatherSearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearchCity(city)
  }

  return (
    <section className="mb-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
        <label className="flex min-h-12 flex-1 items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--control-bg)] px-4 text-[var(--muted)] focus-within:border-[var(--accent-strong)] focus-within:ring-2 focus-within:ring-sky-300/20">
          <SvgRepoIcon className="h-5 w-5 shrink-0" name="search" />
          <span className="sr-only">Cidade</span>
          <input
            className="h-11 min-w-0 flex-1 bg-transparent text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)]"
            onChange={(event) => onCityChange(event.target.value)}
            placeholder="Buscar cidade"
            type="search"
            value={city}
          />
        </label>

        <div className="grid grid-cols-2 gap-3 md:flex">
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-text)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)] focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-55"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <SvgRepoIcon className="h-4 w-4 animate-spin" name="loader" />
            ) : (
              <SvgRepoIcon className="h-4 w-4" name="search" />
            )}
            Buscar
          </button>

          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--control-bg)] px-4 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--control-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)] focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLocating || isLoading}
            onClick={onUsePosition}
            type="button"
          >
            {isLocating ? (
              <SvgRepoIcon className="h-4 w-4 animate-spin" name="loader" />
            ) : (
              <SvgRepoIcon className="h-4 w-4" name="navigation" />
            )}
            Local
          </button>
        </div>
      </form>
    </section>
  )
}
