import type { LocationResult } from '../models/weather'

export function locationLabel(location: LocationResult) {
  return [location.admin1, location.country].filter(Boolean).join(', ')
}
