import { useQuery } from '@tanstack/react-query'
import { weatherApi } from '../client'
import { queryKeys } from '../queryKeys'

export function useCurrentWeather(latitude, longitude) {
  return useQuery({
    queryKey: queryKeys.weather.current(latitude, longitude),
    queryFn: () => weatherApi.get(`/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto`),
    enabled: !!latitude && !!longitude,
  })
}
