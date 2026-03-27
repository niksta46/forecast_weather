import { Wind, Droplets, Thermometer, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react'
import { Card } from '../../components/common'
import { Loading } from '../../components/common'
import { ErrorMessage } from '../../components/common'

const weatherCodeMap = {
  0: { icon: Sun, label: 'Clear sky' },
  1: { icon: Sun, label: 'Mainly clear' },
  2: { icon: Cloud, label: 'Partly cloudy' },
  3: { icon: Cloud, label: 'Overcast' },
  45: { icon: CloudFog, label: 'Fog' },
  48: { icon: CloudFog, label: 'Depositing rime fog' },
  51: { icon: CloudRain, label: 'Light drizzle' },
  53: { icon: CloudRain, label: 'Moderate drizzle' },
  55: { icon: CloudRain, label: 'Dense drizzle' },
  61: { icon: CloudRain, label: 'Slight rain' },
  63: { icon: CloudRain, label: 'Moderate rain' },
  65: { icon: CloudRain, label: 'Heavy rain' },
  71: { icon: CloudSnow, label: 'Slight snow' },
  73: { icon: CloudSnow, label: 'Moderate snow' },
  75: { icon: CloudSnow, label: 'Heavy snow' },
  80: { icon: CloudRain, label: 'Slight rain showers' },
  81: { icon: CloudRain, label: 'Moderate rain showers' },
  82: { icon: CloudRain, label: 'Violent rain showers' },
  95: { icon: CloudLightning, label: 'Thunderstorm' },
  96: { icon: CloudLightning, label: 'Thunderstorm with slight hail' },
  99: { icon: CloudLightning, label: 'Thunderstorm with heavy hail' },
}

function WeatherIcon({ code, className }) {
  const WeatherComponent = weatherCodeMap[Number(code)]?.icon || Cloud
  const label = weatherCodeMap[Number(code)]?.label || 'Unknown'
  return <WeatherComponent className={className} aria-label={label} />
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
        <WeatherIcon code={current.weather_code} className="w-20 h-20 text-gray-600 mb-4" />
        
        <p className="text-5xl font-bold text-gray-800 mb-2">
          {Math.round(current.temperature_2m)}°
        </p>
        
        <p className="text-lg text-gray-600 mb-6">
          {weatherCodeMap[current.weather_code]?.label || 'Unknown'}
        </p>

        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="flex items-center gap-3">
            <Thermometer className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Feels like</p>
              <p className="font-medium">{Math.round(current.apparent_temperature)}°</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-medium">{current.relative_humidity_2m}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Wind className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="font-medium">{current.wind_speed_10m} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-gray-400" />
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
