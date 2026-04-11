import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LocationSearch } from '../location-search'
import { CurrentWeather } from '../current-weather'
import { Forecast } from '../forecast'
import { useCurrentWeather, useForecast } from '../../api/endpoints'
import { Card } from '../../components/common'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedLocation, setSelectedLocation] = useState(null)

  useEffect(() => {
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    const name = searchParams.get('name')

    if (lat && lon && name) {
      setSelectedLocation({ latitude: lat, longitude: lon, name, country: '' })
    }
  }, [])

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
    setSearchParams({
      lat: location.latitude,
      lon: location.longitude,
      name: location.name,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </Card>

      {selectedLocation && (
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing weather for: <strong>{selectedLocation.name}</strong>, {selectedLocation.country}
          </p>
        </div>
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
  )
}