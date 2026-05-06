import type { AirQuality } from '../models/weather'
import { compactFormatter } from './formatters'

export type AqiSummary = {
  detail: string
  indicatorClassName: string
  label: string
  progress: number
  value: string
}

export function aqiSummary(airQuality: AirQuality | null): AqiSummary {
  const value = airQuality?.european_aqi ?? airQuality?.us_aqi ?? null

  if (value === null) {
    return {
      detail: 'Sem leitura recente',
      indicatorClassName: 'bg-[var(--muted-foreground)]',
      label: 'Indisponível',
      progress: 0,
      value: '--',
    }
  }

  if (value <= 50) {
    return {
      detail: 'Ar confortável',
      indicatorClassName: 'bg-emerald-600',
      label: 'Boa',
      progress: 25,
      value: compactFormatter.format(value),
    }
  }

  if (value <= 100) {
    return {
      detail: 'Atenção leve',
      indicatorClassName: 'bg-amber-600',
      label: 'Moderada',
      progress: 50,
      value: compactFormatter.format(value),
    }
  }

  if (value <= 150) {
    return {
      detail: 'Reduza exposição prolongada',
      indicatorClassName: 'bg-orange-600',
      label: 'Sensível',
      progress: 75,
      value: compactFormatter.format(value),
    }
  }

  return {
    detail: 'Evite esforço ao ar livre',
    indicatorClassName: 'bg-rose-600',
    label: 'Ruim',
    progress: 100,
    value: compactFormatter.format(value),
  }
}
