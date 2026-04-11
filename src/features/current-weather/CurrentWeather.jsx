import { Wind, Droplets, Thermometer, Sun } from 'lucide-react'
import * as Wi from 'react-icons/wi'
import { Card } from '../../components/common'
import { Loading } from '../../components/common'
import { ErrorMessage } from '../../components/common'

const weatherCodeMap = {
  0: { icon: Wi.WiDaySunny, label: 'Clear sky', color: 'text-blue-500' },
  1: { icon: Wi.WiDaySunny, label: 'Mainly clear', color: 'text-blue-500' },
  2: { icon: Wi.WiDayCloudy, label: 'Partly cloudy', color: 'text-blue-500' },
  3: { icon: Wi.WiCloudy, label: 'Overcast', color: 'text-blue-500' },
  45: { icon: Wi.WiFog, label: 'Fog', color: 'text-blue-500' },
  48: { icon: Wi.WiFog, label: 'Depositing rime fog', color: 'text-blue-500' },
  51: { icon: Wi.WiCloudyGusts, label: 'Light drizzle', color: 'text-blue-500' },
  53: { icon: Wi.WiCloudyGusts, label: 'Moderate drizzle', color: 'text-blue-500' },
  55: { icon: Wi.WiSleet, label: 'Dense drizzle', color: 'text-blue-500' },
  61: { icon: Wi.WiRain, label: 'Slight rain', color: 'text-blue-500' },
  63: { icon: Wi.WiRain, label: 'Moderate rain', color: 'text-blue-500' },
  65: { icon: Wi.WiRainMix, label: 'Heavy rain', color: 'text-blue-500' },
  71: { icon: Wi.WiSnow, label: 'Slight snow', color: 'text-blue-500' },
  73: { icon: Wi.WiSnow, label: 'Moderate snow', color: 'text-blue-500' },
  75: { icon: Wi.WiSnow, label: 'Heavy snow', color: 'text-blue-500' },
  80: { icon: Wi.WiShowers, label: 'Slight rain showers', color: 'text-blue-500' },
  81: { icon: Wi.WiShowers, label: 'Moderate rain showers', color: 'text-blue-500' },
  82: { icon: Wi.WiStormShowers, label: 'Violent rain showers', color: 'text-blue-500' },
  95: { icon: Wi.WiThunderstorm, label: 'Thunderstorm', color: 'text-blue-500' },
  96: { icon: Wi.WiThunderstorm, label: 'Thunderstorm with slight hail', color: 'text-blue-500' },
  99: { icon: Wi.WiStormShowers, label: 'Thunderstorm with heavy hail', color: 'text-blue-500' },
}

function WeatherIcon({ code, className = '' }) {
  const mapping = weatherCodeMap[Number(code)]
  const WeatherComponent = mapping?.icon || Wi.WiCloudy
  const label = mapping?.label || 'Unknown'
  const colorClass = mapping?.color || 'text-gray-400'
  return <WeatherComponent className={`${colorClass} ${className}`} aria-label={label} />
}

export function CurrentWeather({ data, isLoading, error }) {
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
        <ErrorMessage message="Failed to load weather data. Please try again." />
      </Card>
    )
  }

  if (!data?.current) {
    return (
      <Card>
        <p className="text-gray-500 text-center py-8">Search for a city to see weather</p>
      </Card>
    )
  }

  const { current } = data

  return (
    <Card>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Now</h2>
        <WeatherIcon code={current.weather_code} className="w-20 h-20 mb-4" />
        
        <p className="text-5xl font-bold text-gray-800 mb-2">
          {Math.round(current.temperature_2m)}°
        </p>
        
        <p className="text-lg text-gray-600 mb-6">
          {weatherCodeMap[current.weather_code]?.label || 'Unknown'}
        </p>

        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="flex items-center gap-3">
            <Thermometer className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Feels like</p>
              <p className="font-medium">{Math.round(current.apparent_temperature)}°</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-medium">{current.relative_humidity_2m}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Wind className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="font-medium">{current.wind_speed_10m} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">UV Index</p>
              <p className="font-medium">{current.uv_index ?? '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
