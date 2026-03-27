import { useQuery } from '@tanstack/react-query'
import { geocodingApi } from '../client'
import { queryKeys } from '../queryKeys'

export function useLocationSearch(query) {
  return useQuery({
    queryKey: queryKeys.geocoding.search(query),
    queryFn: () => geocodingApi.get(`/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`),
    enabled: query.length >= 2,
  })
}
