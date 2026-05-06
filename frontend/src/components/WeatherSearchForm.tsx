import type { FormEvent } from 'react'
import { SvgRepoIcon } from './SvgRepoIcon'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'

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
    <Card className="p-3">
      <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleSubmit}>
        <label className="relative block">
          <span className="sr-only">Cidade</span>
          <SvgRepoIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" name="search" />
          <Input
            className="pl-10"
            onChange={(event) => onCityChange(event.target.value)}
            placeholder="Buscar cidade"
            type="search"
            value={city}
          />
        </label>

        <div className="grid grid-cols-2 gap-3 md:flex">
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <SvgRepoIcon className="h-4 w-4 animate-spin" name="loader" />
            ) : (
              <SvgRepoIcon className="h-4 w-4" name="search" />
            )}
            Buscar
          </Button>

          <Button disabled={isLocating || isLoading} onClick={onUsePosition} type="button" variant="outline">
            {isLocating ? (
              <SvgRepoIcon className="h-4 w-4 animate-spin" name="loader" />
            ) : (
              <SvgRepoIcon className="h-4 w-4" name="navigation" />
            )}
            Local
          </Button>
        </div>
      </form>
    </Card>
  )
}
