import { useQuery } from '@tanstack/react-query'
import { weatherApi } from '../client'
import { queryKeys } from '../queryKeys'

export function useForecast(latitude, longitude) {
  return useQuery({
    queryKey: queryKeys.weather.forecast(latitude, longitude),
    queryFn: () => weatherApi.get(`/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=auto`),
    enabled: !!latitude && !!longitude,
  })
}
