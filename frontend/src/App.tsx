import { AirQualityCard } from './components/AirQualityCard'
import { ApiStatusButton } from './components/ApiStatusButton'
import { CurrentWeatherPanel } from './components/CurrentWeatherPanel'
import { DailyForecastSection } from './components/DailyForecastSection'
import { ErrorBanner } from './components/ErrorBanner'
import { HourlyRainSection } from './components/HourlyRainSection'
import { ThemeToggleButton } from './components/ThemeToggleButton'
import { WindCard } from './components/WindCard'
import { WeatherSearchForm } from './components/WeatherSearchForm'
import { useTheme } from './hooks/useTheme'
import { useWeatherDashboard } from './hooks/useWeatherDashboard'

function App() {
  const dashboard = useWeatherDashboard()
  const theme = useTheme()

  return (
    <main className="weather-scene text-[var(--foreground)]" data-theme={theme.activeTheme}>
      <div className="mx-auto min-h-screen max-w-[1280px] px-4 py-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <WeatherSearchForm
            city={dashboard.city}
            isLoading={dashboard.isLoading}
            isLocating={dashboard.isLocating}
            onCityChange={dashboard.setCity}
            onSearchCity={dashboard.searchCity}
            onUsePosition={dashboard.useCurrentPosition}
          />

          <ErrorBanner message={dashboard.error} />

          <div className="grid gap-4 xl:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.34fr)]">
            <CurrentWeatherPanel weather={dashboard.weather} />

            <div className="grid content-start gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <AirQualityCard airQuality={dashboard.weather?.air_quality ?? null} summary={dashboard.aqi} />
                <WindCard weather={dashboard.weather} />
              </div>
              <HourlyRainSection className="" hours={dashboard.hourly} />
            </div>
          </div>

          <DailyForecastSection className="" days={dashboard.daily} />
        </div>
      </div>

      <ThemeToggleButton
        isManual={theme.isManual}
        onResetAutoTheme={theme.resetAutoTheme}
        onToggleTheme={theme.toggleTheme}
        theme={theme.activeTheme}
      />
      <ApiStatusButton health={dashboard.health} onCheckHealth={() => void dashboard.checkHealth()} />
    </main>
  )
}

export default App
