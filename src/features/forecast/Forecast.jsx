import { useMemo } from 'react'
import { Card, Loading, ErrorMessage } from '../../components/common'
import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Droplets } from 'lucide-react'

const weatherCodeMap = {
  0: { icon: Sun, nightIcon: Moon, label: 'Clear' },
  1: { icon: Sun, nightIcon: Moon, label: 'Mainly clear' },
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
  95: { icon: CloudLightning, label: 'Thunder' },
  96: { icon: CloudLightning, label: 'Thunder' },
  99: { icon: CloudLightning, label: 'Thunder' },
}

function WeatherIcon({ code, isDay = true, className }) {
  const mapping = weatherCodeMap[code]
  const WeatherComponent = mapping?.nightIcon && !isDay ? mapping.nightIcon : (mapping?.icon || Cloud)
  return <WeatherComponent className={className} />
}

function DailyForecast({ daily }) {
  const days = useMemo(() => {
    if (!daily?.time) return []
    return daily.time.map((date, index) => ({
      date: new Date(date),
      weatherCode: daily.weather_code[index],
      tempMax: daily.temperature_2m_max[index],
      tempMin: daily.temperature_2m_min[index],
      precipitation: daily.precipitation_sum[index],
      precipProb: daily.precipitation_probability_max[index],
      uvIndex: daily.uv_index_max[index],
    }))
  }, [daily])

  if (days.length === 0) return null

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {days.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="w-20">
              <p className="font-medium text-gray-800">
                {index === 0 ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-sm text-gray-500">
                {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <WeatherIcon code={day.weatherCode} className="w-6 h-6 text-gray-500" />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-gray-600">{day.precipProb}%</span>
            </div>

            <div className="w-24 text-right">
              <span className="font-medium">{Math.round(day.tempMax)}°</span>
              <span className="text-gray-400 ml-2">{Math.round(day.tempMin)}°</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function HourlyForecast({ hourly }) {
  const hours = useMemo(() => {
    if (!hourly?.time) return []
    const now = new Date()
    return hourly.time
      .map((time, index) => ({
        time: new Date(time),
        temp: hourly.temperature_2m[index],
        weatherCode: hourly.weather_code?.[index] || hourly.weather_code,
        precipProb: hourly.precipitation_probability[index],
        isDay: hourly.is_day?.[index] ?? true,
      }))
      .filter(h => h.time >= now)
      .slice(0, 24)
  }, [hourly])

  if (hours.length === 0) return null

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hours.map((hour, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center gap-1 min-w-[60px]">
            <p className="text-sm text-gray-500">
              {hour.time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
            </p>
            <WeatherIcon code={hour.weatherCode} isDay={hour.isDay} className="w-8 h-8 text-gray-500" />
            <p className="font-medium">{Math.round(hour.temp)}°</p>
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-gray-500">{hour.precipProb}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function Forecast({ data, isLoading, error }) {
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
        <ErrorMessage message="Failed to load forecast data." />
      </Card>
    )
  }

  if (!data?.hourly && !data?.daily) {
    return null
  }

  return (
    <div className="space-y-4">
      {data.hourly && <HourlyForecast hourly={data.hourly} />}
      {data.daily && <DailyForecast daily={data.daily} />}
    </div>
  )
}
