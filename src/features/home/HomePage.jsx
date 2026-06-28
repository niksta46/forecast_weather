import { useOutletContext } from 'react-router-dom'
import { CurrentWeather } from '../current-weather'
import { Forecast } from '../forecast'
import { CityPhoto } from '../../components/common/CityPhoto'
import { useCurrentWeather, useForecast } from '../../api/endpoints'

const DEFAULT_LOCATION = {
  lat: 43.89791,
  lon: 12.75108,
  name: 'Tavullia',
}

export function HomePage() {
  const context = useOutletContext()
  const lat = context?.lat || DEFAULT_LOCATION.lat
  const lon = context?.lon || DEFAULT_LOCATION.lon
  const name = context?.name || DEFAULT_LOCATION.name

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useCurrentWeather(lat, lon)

  const { data: forecastData, isLoading: forecastLoading, error: forecastError } = useForecast(lat, lon)

  const isDefault = !context?.lat || !context?.lon

  return (
    <div className="space-y-6">
      {/* Full-width city photo at the top */}
      <div className="w-full">
        <CityPhoto cityName={name} className="h-56 md:h-64 lg:h-80 object-cover" />
      </div>

      {/* Two-column layout for current weather and 7-day forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          <CurrentWeather
            data={weatherData}
            isLoading={weatherLoading}
            error={weatherError}
          />
        </div>
        <div className="h-full">
          {forecastData?.daily && (
            <div className="h-full">
              <Forecast
                data={{ daily: forecastData.daily }}
                isLoading={forecastLoading}
                error={forecastError}
              />
            </div>
          )}
        </div>
      </div>

      {/* Hourly forecast chart below */}
      <div className="w-full">
        {forecastData?.hourly && (
          <Forecast
            data={{ hourly: forecastData.hourly }}
            isLoading={forecastLoading}
            error={forecastError}
          />
        )}
      </div>
    </div>
  )
}