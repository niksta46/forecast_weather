// Maximum number of recent searches to store
const MAX_RECENT_SEARCHES = 5

// LocalStorage key for recent searches
const RECENT_SEARCHES_KEY = 'weather_app_recent_searches'

/**
 * Gets recent searches from localStorage
 * @returns {Array} Array of recent search objects
 */
export function getRecentSearches() {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading recent searches from localStorage:', error)
    return []
  }
}

/**
 * Adds a search to the recent searches list
 * @param {Object} search - Search object with name, lat, lon
 */
export function addRecentSearch(search) {
  try {
    const recentSearches = getRecentSearches()
    
    // Remove if already exists (to update position)
    const existingIndex = recentSearches.findIndex(
      (item) => item.name === search.name && item.lat === search.lat && item.lon === search.lon
    )
    
    if (existingIndex !== -1) {
      recentSearches.splice(existingIndex, 1)
    }
    
    // Add to beginning
    recentSearches.unshift(search)
    
    // Trim to max length
    if (recentSearches.length > MAX_RECENT_SEARCHES) {
      recentSearches.length = MAX_RECENT_SEARCHES
    }
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches))
  } catch (error) {
    console.error('Error adding recent search to localStorage:', error)
  }
}

/**
 * Clears all recent searches
 */
export function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch (error) {
    console.error('Error clearing recent searches from localStorage:', error)
  }
}