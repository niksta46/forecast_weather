import { useMemo } from 'react'
import { Card, Loading, ErrorMessage } from '../../components/common'
import { Droplets } from 'lucide-react'
import * as Wi from 'react-icons/wi'
import { ComposedChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const weatherCodeMap = {
  0: { icon: Wi.WiDaySunny, nightIcon: Wi.WiNightClear, label: 'Clear', color: 'text-blue-500' },
  1: { icon: Wi.WiDaySunny, nightIcon: Wi.WiNightClear, label: 'Mainly clear', color: 'text-blue-500' },
  2: { icon: Wi.WiDayCloudy, label: 'Partly cloudy', color: 'text-blue-500' },
  3: { icon: Wi.WiCloudy, label: 'Overcast', color: 'text-blue-500' },
  45: { icon: Wi.WiFog, label: 'Fog', color: 'text-blue-500' },
  48: { icon: Wi.WiFog, label: 'Fog', color: 'text-blue-500' },
  51: { icon: Wi.WiCloudyGusts, label: 'Drizzle', color: 'text-blue-500' },
  53: { icon: Wi.WiCloudyGusts, label: 'Drizzle', color: 'text-blue-500' },
  55: { icon: Wi.WiSleet, label: 'Drizzle', color: 'text-blue-500' },
  61: { icon: Wi.WiRain, label: 'Rain', color: 'text-blue-500' },
  63: { icon: Wi.WiRain, label: 'Rain', color: 'text-blue-500' },
  65: { icon: Wi.WiRainMix, label: 'Rain', color: 'text-blue-500' },
  71: { icon: Wi.WiSnow, label: 'Snow', color: 'text-blue-500' },
  73: { icon: Wi.WiSnow, label: 'Snow', color: 'text-blue-500' },
  75: { icon: Wi.WiSnow, label: 'Snow', color: 'text-blue-500' },
  80: { icon: Wi.WiShowers, label: 'Showers', color: 'text-blue-500' },
  81: { icon: Wi.WiShowers, label: 'Showers', color: 'text-blue-500' },
  82: { icon: Wi.WiStormShowers, label: 'Showers', color: 'text-blue-500' },
  95: { icon: Wi.WiThunderstorm, label: 'Thunder', color: 'text-blue-500' },
  96: { icon: Wi.WiThunderstorm, label: 'Thunder', color: 'text-blue-500' },
  99: { icon: Wi.WiStormShowers, label: 'Thunder', color: 'text-blue-500' },
}

function WeatherIcon({ code, isDay = true, className = '' }) {
  const mapping = weatherCodeMap[code]
  const WeatherComponent = mapping?.nightIcon && !isDay ? mapping.nightIcon : (mapping?.icon || Wi.WiCloudy)
  const colorClass = mapping?.color || 'text-gray-400'
  return <WeatherComponent className={`${colorClass} ${className}`} />
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
              <WeatherIcon code={day.weatherCode} className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-blue-500" />
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
    const today6am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0)
    const tomorrow3am = new Date(today6am.getTime() + 21 * 60 * 60 * 1000)
    
    return hourly.time
      .map((time, index) => ({
        time: new Date(time),
        temp: hourly.temperature_2m[index],
        weatherCode: hourly.weather_code?.[index] || hourly.weather_code,
        precipProb: hourly.precipitation_probability[index],
        isDay: hourly.is_day?.[index] ?? true,
      }))
      .filter(h => h.time >= today6am && h.time <= tomorrow3am)
      .slice(0, 24)
  }, [hourly])

  if (hours.length === 0) return null

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: 'white', 
          border: '1px solid #E5E7EB', 
          borderRadius: '8px',
          padding: '8px 12px'
        }}>
          <p style={{ color: '#6B7280', fontSize: '12px' }}>{label}</p>
          <p style={{ color: '#338EFF', fontWeight: '600' }}>{payload[0].value}°</p>
        </div>
      )
    }
    return null
  }

  const chartData = hours.map(h => ({
    time: h.time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    temp: Math.round(h.temp),
    hour: h.time,
  }))

  const minTemp = Math.min(...chartData.map(d => d.temp)) - 2
  const maxTemp = Math.max(...chartData.map(d => d.temp)) + 2

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              interval={2}
            />
            <YAxis 
              domain={[minTemp, maxTemp]}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}°`}
            />
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={true} horizontal={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="none"
              fill="#338EFF" 
              fillOpacity={0.3}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#338EFF" 
              strokeWidth={3}
              dot={{ fill: '#338EFF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
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
