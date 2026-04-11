import { useOutletContext } from 'react-router-dom'
import { CurrentWeather } from '../current-weather'
import { Forecast } from '../forecast'
import { useCurrentWeather, useForecast } from '../../api/endpoints'

export function HomePage() {
  const { lat, lon, name } = useOutletContext()

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useCurrentWeather(lat, lon)

  const { data: forecastData, isLoading: forecastLoading, error: forecastError } = useForecast(lat, lon)

  if (!lat || !lon) {
    return null
  }

  return (
    <div className="space-y-6">
      <CurrentWeather
        data={weatherData}
        isLoading={weatherLoading}
        error={weatherError}
      />

      <Forecast
        data={forecastData}
        isLoading={forecastLoading}
        error={forecastError}
      />
    </div>
  )
}