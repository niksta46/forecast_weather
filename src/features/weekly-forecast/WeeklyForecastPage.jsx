import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForecast } from '../../api/endpoints'
import { Card, Loading, ErrorMessage, Button } from '../../components/common'
import { Droplets, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react'
import { useMemo } from 'react'

const weatherCodeMap = {
  0: { icon: Sun, label: 'Clear' },
  1: { icon: Sun, label: 'Mainly clear' },
  2: { icon: Cloud, label: 'Partly cloudy' },
  3: { icon: Cloud, label: 'Overcast' },
  45: { icon: CloudFog, label: 'Fog' },
  48: { icon: CloudFog, label: 'Fog' },
  51: { icon: CloudRain, label: 'Drizzle' },
  53: { icon: CloudRain, label: 'Drizzle' },
  55: { icon: CloudRain, label: 'Drizzle' },
  61: { icon: CloudRain, label: 'Rain' },
  63: { icon: CloudRain, label: 'Rain' },
  65: { icon: CloudRain, label: 'Rain' },
  71: { icon: CloudSnow, label: 'Snow' },
  73: { icon: CloudSnow, label: 'Snow' },
  75: { icon: CloudSnow, label: 'Snow' },
  80: { icon: CloudRain, label: 'Showers' },
  81: { icon: CloudRain, label: 'Showers' },
  82: { icon: CloudRain, label: 'Showers' },
  95: { icon: CloudLightning, label: 'Thunderstorm' },
  96: { icon: CloudLightning, label: 'Thunderstorm' },
  99: { icon: CloudLightning, label: 'Thunderstorm' },
}

function WeatherIcon({ code, className }) {
  const WeatherComponent = weatherCodeMap[code]?.icon || Cloud
  return <WeatherComponent className={className} />
}

export function WeeklyForecastPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const latitude = searchParams.get('lat')
  const longitude = searchParams.get('lon')
  const locationName = searchParams.get('name') || 'Selected Location'

  const { data: forecastData, isLoading, error } = useForecast(latitude, longitude)

  const dailyData = useMemo(() => {
    if (!forecastData?.daily?.time) return []
    return forecastData.daily.time.map((date, index) => ({
      date: new Date(date),
      weatherCode: forecastData.daily.weather_code[index],
      tempMax: forecastData.daily.temperature_2m_max[index],
      tempMin: forecastData.daily.temperature_2m_min[index],
      precipSum: forecastData.daily.precipitation_sum[index],
      precipProb: forecastData.daily.precipitation_probability_max[index],
      uvIndex: forecastData.daily.uv_index_max[index],
      sunrise: forecastData.daily.sunrise[index],
      sunset: forecastData.daily.sunset[index],
    }))
  }, [forecastData])

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
        <ErrorMessage message="Failed to load weekly forecast." />
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Weekly Forecast</h1>
        <p className="text-gray-500">{locationName}</p>
      </div>

      <div className="grid gap-4">
        {dailyData.map((day, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16">
                  <p className="font-semibold text-gray-800">
                    {index === 0 ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <WeatherIcon code={day.weatherCode} className="w-8 h-8 text-gray-500" />
                <span className="text-sm text-gray-600 w-24">
                  {weatherCodeMap[day.weatherCode]?.label || 'Unknown'}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{day.precipProb}%</span>
                </div>
                
                <div className="flex items-center gap-2 w-32">
                  <span className="font-semibold">{Math.round(day.tempMax)}°</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500"
                      style={{ 
                        width: `${((day.tempMax - day.tempMin) / 30) * 100}%`,
                        marginLeft: `${((day.tempMin + 10) / 50) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-gray-500">{Math.round(day.tempMin)}°</span>
                </div>
              </div>
            </div>

            {day.precipSum > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
                Precipitation: {day.precipSum} mm
                {day.uvIndex > 0 && ` • UV Index: ${day.uvIndex}`}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}