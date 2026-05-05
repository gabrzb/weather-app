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
    <main className="weather-scene min-h-screen text-[var(--text)]" data-theme={theme.activeTheme}>
      <div className="relative z-10 mx-auto min-h-screen max-w-[1680px] px-4 py-5 pb-24 sm:px-6 lg:px-8 2xl:px-10">
        <section className="rounded-[28px] border border-[var(--shell-border)] bg-[var(--shell-bg)] p-4 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-5 lg:p-6">
          <WeatherSearchForm
            city={dashboard.city}
            isLoading={dashboard.isLoading}
            isLocating={dashboard.isLocating}
            onCityChange={dashboard.setCity}
            onSearchCity={dashboard.searchCity}
            onUsePosition={dashboard.useCurrentPosition}
          />

          <ErrorBanner message={dashboard.error} />

          <div className="grid gap-5 xl:grid-cols-[minmax(340px,0.64fr)_minmax(0,1.36fr)] 2xl:grid-cols-[minmax(420px,0.62fr)_minmax(0,1.38fr)]">
            <CurrentWeatherPanel weather={dashboard.weather} />

            <aside className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <AirQualityCard airQuality={dashboard.weather?.air_quality ?? null} summary={dashboard.aqi} />
                <WindCard weather={dashboard.weather} />
              </div>
              <HourlyRainSection className="" hours={dashboard.hourly} />
            </aside>
          </div>

          <DailyForecastSection days={dashboard.daily} />
        </section>
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
