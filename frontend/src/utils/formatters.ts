export const numberFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 1,
})

export const compactFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 0,
})

export function formatTemp(value: number) {
  return `${compactFormatter.format(Math.round(value))}\u00b0C`
}

export function formatMeasure(value: number, unit: string) {
  return `${numberFormatter.format(value)} ${unit}`
}

export function formatOptionalMeasure(value: number | null | undefined, unit: string) {
  return value == null ? '--' : formatMeasure(value, unit)
}

export function formatPercent(value: number) {
  return `${compactFormatter.format(value)}%`
}

export function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  }).format(date)
}

export function formatCurrentTime(value: string) {
  const [date, time] = value.split('T')
  const hour = time?.slice(0, 5)

  if (!date || !hour) {
    return value
  }

  return `${formatDate(date)} as ${hour}`
}
