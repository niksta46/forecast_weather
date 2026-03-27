const WEATHER_API_BASE_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1'
const GEOCODING_API_BASE_URL = import.meta.env.VITE_GEOCODING_API_URL || 'https://geocoding-api.open-meteo.com/v1'

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, options)

    if (!response.ok) {
      const error = new Error(`API Error: ${response.status} ${response.statusText}`)
      error.status = response.status
      throw error
    }

    return response.json()
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

}

export const weatherApi = new ApiClient(WEATHER_API_BASE_URL)
export const geocodingApi = new ApiClient(GEOCODING_API_BASE_URL)
