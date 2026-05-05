import { useCallback, useEffect, useMemo, useState } from 'react'
import type { HealthStatus, LoadStatus } from '../models/status'
import type { WeatherData, WeatherParams } from '../models/weather'
import { fetchHealth, fetchWeather } from '../services/weatherApi'
import { aqiSummary } from '../utils/airQuality'
import { DEFAULT_CITY } from '../utils/constants'
import { errorMessage } from '../utils/errors'
import { pickHourlyForecast } from '../utils/forecast'

export function useWeatherDashboard() {
  const [city, setCity] = useState(DEFAULT_CITY)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [health, setHealth] = useState<HealthStatus>('checking')
  const [locateStatus, setLocateStatus] = useState<LoadStatus>('idle')
  const [error, setError] = useState('')

  const loadWeather = useCallback(async (params: WeatherParams) => {
    setStatus('loading')
    setError('')

    try {
      const data = await fetchWeather(params)
      setWeather(data)
      setStatus('success')
    } catch (caught) {
      setStatus('error')
      setError(errorMessage(caught))
    }
  }, [])

  const checkHealth = useCallback(async () => {
    setHealth('checking')

    try {
      setHealth((await fetchHealth()) ? 'online' : 'offline')
    } catch {
      setHealth('offline')
    }
  }, [])

  const searchCity = useCallback(
    (nextCity: string) => {
      const trimmedCity = nextCity.trim()

      if (!trimmedCity) {
        setError('Informe uma cidade para buscar.')
        return
      }

      void loadWeather({ city: trimmedCity })
    },
    [loadWeather],
  )

  const useCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Este navegador não liberou localização.')
      return
    }

    setLocateStatus('loading')
    setError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        void loadWeather({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: 'Minha localização',
        }).finally(() => setLocateStatus('idle'))
      },
      () => {
        setLocateStatus('error')
        setError('Não foi possível acessar sua localização.')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }, [loadWeather])

  useEffect(() => {
    let isMounted = true

    async function initialize() {
      const [healthResult, weatherResult] = await Promise.allSettled([
        fetchHealth(),
        fetchWeather({ city: DEFAULT_CITY }),
      ])

      if (!isMounted) {
        return
      }

      setHealth(healthResult.status === 'fulfilled' && healthResult.value ? 'online' : 'offline')

      if (weatherResult.status === 'fulfilled') {
        setWeather(weatherResult.value)
        setStatus('success')
        return
      }

      setStatus('error')
      setError(errorMessage(weatherResult.reason))
    }

    void initialize()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    aqi: useMemo(() => aqiSummary(weather?.air_quality ?? null), [weather]),
    checkHealth,
    city,
    daily: weather?.daily.slice(0, 7) ?? [],
    error,
    health,
    hourly: useMemo(() => pickHourlyForecast(weather?.hourly ?? []), [weather]),
    isLoading: status === 'loading',
    isLocating: locateStatus === 'loading',
    searchCity,
    setCity,
    useCurrentPosition,
    weather,
  }
}
