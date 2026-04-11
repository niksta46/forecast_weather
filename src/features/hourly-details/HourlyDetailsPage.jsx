import { useSearchParams } from 'react-router-dom'
import { useCurrentWeather, useForecast } from '../../api/endpoints'
import { Card, Loading, ErrorMessage, Button } from '../../components/common'
import { Droplets, Wind, Thermometer } from 'lucide-react'
import { useMemo } from 'react'

const weatherCodeMap = {
  0: { label: 'Clear' },
  1: { label: 'Mainly clear' },
  2: { label: 'Partly cloudy' },
  3: { label: 'Overcast' },
  45: { label: 'Fog' },
  48: { label: 'Fog' },
  51: { label: 'Drizzle' },
  53: { label: 'Drizzle' },
  55: { label: 'Drizzle' },
  61: { label: 'Rain' },
  63: { label: 'Rain' },
  65: { label: 'Rain' },
  71: { label: 'Snow' },
  73: { label: 'Snow' },
  75: { label: 'Snow' },
  80: { label: 'Showers' },
  81: { label: 'Showers' },
  82: { label: 'Showers' },
  95: { label: 'Thunderstorm' },
  96: { label: 'Thunderstorm' },
  99: { label: 'Thunderstorm' },
}

export function HourlyDetailsPage() {
  const [searchParams] = useSearchParams()
  
  const latitude = searchParams.get('lat')
  const longitude = searchParams.get('lon')
  const locationName = searchParams.get('name') || 'Selected Location'

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useCurrentWeather(
    latitude,
    longitude
  )

  const { data: forecastData, isLoading: forecastLoading, error: forecastError } = useForecast(
    latitude,
    longitude
  )

  const hourlyData = useMemo(() => {
    if (!forecastData?.hourly?.time) return []
    return forecastData.hourly.time.slice(0, 48).map((time, index) => ({
      time: new Date(time),
      temp: forecastData.hourly.temperature_2m[index],
      feelsLike: forecastData.hourly.apparent_temperature[index],
      humidity: forecastData.hourly.relative_humidity_2m[index],
      windSpeed: forecastData.hourly.wind_speed_10m[index],
      precipProb: forecastData.hourly.precipitation_probability[index],
      weatherCode: forecastData.hourly.weather_code[index],
    }))
  }, [forecastData])

  const isLoading = weatherLoading || forecastLoading
  const error = weatherError || forecastError

  if (!latitude || !longitude) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No location selected.</p>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <Loading />
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <ErrorMessage message="Failed to load hourly details." />
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Hourly Details</h1>
        <p className="text-gray-500">{locationName}</p>
      </div>

      {weatherData && (
        <Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-sm text-gray-500">Feels Like</p>
                <p className="font-semibold">{Math.round(weatherData.current?.apparent_temperature)}°</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-semibold">{weatherData.current?.relative_humidity_2m}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Wind</p>
                <p className="font-semibold">{Math.round(weatherData.current?.wind_speed_10m)} km/h</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-semibold">{weatherCodeMap[weatherData.current?.weather_code]?.label || 'Unknown'}</p>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">48-Hour Forecast</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Temp</th>
                <th className="pb-3 font-medium">Feels</th>
                <th className="pb-3 font-medium">Humidity</th>
                <th className="pb-3 font-medium">Wind</th>
                <th className="pb-3 font-medium">Precip</th>
              </tr>
            </thead>
            <tbody>
              {hourlyData.map((hour, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-sm">
                    {hour.time.toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric', hour12: true })}
                  </td>
                  <td className="py-3 font-medium">{Math.round(hour.temp)}°</td>
                  <td className="py-3 text-gray-500">{Math.round(hour.feelsLike)}°</td>
                  <td className="py-3 text-gray-500">{hour.humidity}%</td>
                  <td className="py-3 text-gray-500">{Math.round(hour.windSpeed)} km/h</td>
                  <td className="py-3">
                    <span className={`text-sm ${hour.precipProb > 30 ? 'text-blue-500' : 'text-gray-500'}`}>
                      {hour.precipProb}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}