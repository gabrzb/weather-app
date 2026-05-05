import type { WeatherData, WeatherParams } from '../models/weather'

type ApiError = {
  error?: string
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8081').replace(
  /\/$/,
  '',
)

function buildApiUrl(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${API_BASE_URL}${path}`)

  Object.entries(params ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  return url
}

async function readError(response: Response) {
  try {
    const body = (await response.json()) as ApiError
    return body.error || 'Não foi possível buscar esses dados agora.'
  } catch {
    return 'Não foi possível buscar esses dados agora.'
  }
}

export async function fetchWeather(params: WeatherParams) {
  const response = await fetch(
    buildApiUrl(
      '/api/weather',
      params.city !== undefined
        ? { city: params.city }
        : {
            latitude: params.latitude,
            longitude: params.longitude,
            name: params.name,
          },
    ),
  )

  if (!response.ok) {
    throw new Error(await readError(response))
  }

  return (await response.json()) as WeatherData
}

export async function fetchHealth() {
  const response = await fetch(buildApiUrl('/api/health'))
  return response.ok
}
