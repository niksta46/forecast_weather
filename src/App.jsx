import { useState } from 'react'
import { LocationSearch } from './features/location-search'
import { CurrentWeather } from './features/current-weather'
import { Forecast } from './features/forecast'
import { useCurrentWeather, useForecast } from './api/endpoints'
import { Card } from './components/common'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useCurrentWeather(
    selectedLocation?.latitude,
    selectedLocation?.longitude
  )

  const { data: forecastData, isLoading: forecastLoading, error: forecastError } = useForecast(
    selectedLocation?.latitude,
    selectedLocation?.longitude
  )

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Weather Forecast</h1>

      <div className="max-w-md space-y-4">
        <Card>
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </Card>

        {selectedLocation && (
          <p className="text-gray-600">
            Showing weather for: <strong>{selectedLocation.name}</strong>, {selectedLocation.country}
          </p>
        )}

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
    </div>
  )
}

export default App
