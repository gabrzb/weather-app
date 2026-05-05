import type { AirQuality } from '../models/weather'
import { compactFormatter } from './formatters'

export type AqiSummary = {
  label: string
  value: string
  bar: string
  detail: string
}

export function aqiSummary(airQuality: AirQuality | null): AqiSummary {
  const value = airQuality?.european_aqi ?? airQuality?.us_aqi ?? null

  if (value === null) {
    return {
      label: 'Indisponível',
      value: '--',
      bar: 'w-0 bg-zinc-300',
      detail: 'Sem leitura recente',
    }
  }

  if (value <= 50) {
    return {
      label: 'Boa',
      value: compactFormatter.format(value),
      bar: 'w-1/4 bg-emerald-500',
      detail: 'Ar confortável',
    }
  }

  if (value <= 100) {
    return {
      label: 'Moderada',
      value: compactFormatter.format(value),
      bar: 'w-1/2 bg-amber-500',
      detail: 'Atenção leve',
    }
  }

  if (value <= 150) {
    return {
      label: 'Sensível',
      value: compactFormatter.format(value),
      bar: 'w-3/4 bg-orange-500',
      detail: 'Reduza exposição prolongada',
    }
  }

  return {
    label: 'Ruim',
    value: compactFormatter.format(value),
    bar: 'w-full bg-rose-500',
    detail: 'Evite esforço ao ar livre',
  }
}
