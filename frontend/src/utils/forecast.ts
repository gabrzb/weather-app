import type { HourForecast } from '../models/weather'

export function pickHourlyForecast(hours: HourForecast[]) {
  const firstDate = hours[0]?.date
  const dayWindow = hours.filter((hour) => {
    const parsedHour = Number(hour.hour.slice(0, 2))
    return hour.date === firstDate && parsedHour >= 6 && parsedHour <= 21
  })

  return (dayWindow.length >= 8 ? dayWindow : hours.slice(0, 16)).slice(0, 16)
}
