export const queryKeys = {
  weather: {
    all: ['weather'],
    current: (latitude, longitude) => ['weather', 'current', latitude, longitude],
    forecast: (latitude, longitude) => ['weather', 'forecast', latitude, longitude],
  },
  geocoding: {
    all: ['geocoding'],
    search: (query) => ['geocoding', 'search', query],
  },
}
