import { useState, useRef, useEffect } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useLocationSearch } from '../../api/endpoints'
import { Input, Loading } from '../../components/common'
import { getRecentSearches, addRecentSearch, clearRecentSearches } from '../../utils/recent-searches'

export function LocationSearch({ onLocationSelect }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [justSelected, setJustSelected] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const wrapperRef = useRef(null)

  const { data: results, isLoading } = useLocationSearch(query)

  useEffect(() => {
    // Load recent searches when component mounts
    setRecentSearches(getRecentSearches())
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (results?.results && !justSelected) {
      setIsOpen(true)
    }
  }, [results, justSelected])

  const handleSelect = (location) => {
    setJustSelected(true)
    setIsOpen(false)
    setQuery(location.name)
    // Add to recent searches
    addRecentSearch({
      name: location.name,
      lat: location.latitude,
      lon: location.longitude,
    })
    onLocationSelect({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
    })
  }

  const handleRecentSelect = (search) => {
    setJustSelected(true)
    setIsOpen(false)
    setQuery(search.name)
    onLocationSelect({
      name: search.name,
      latitude: search.lat,
      longitude: search.lon,
      country: '',
    })
  }

  const handleClearRecent = () => {
    clearRecentSearches()
    setRecentSearches([])
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setJustSelected(false)
    if (e.target.value === '') {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => !justSelected && query.length >= 2 && setIsOpen(true)}
          className="pl-10"
        />
        {isLoading && (
          <Loading className="absolute right-3 top-1/2 -translate-y-1/2 !p-0 !h-5 !w-5" />
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* Recent searches */}
          {recentSearches.length > 0 && !query && (
            <li className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
              Recent searches
              <button
                type="button"
                onClick={handleClearRecent}
                className="float-right text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            </li>
          )}
          {recentSearches.length > 0 && !query && (
            <>
              {recentSearches.map((search) => (
                <li key={search.name + search.lat + search.lon}>
                  <button
                    type="button"
                    onClick={() => handleRecentSelect(search)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                  >
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{search.name}</p>
                    </div>
                  </button>
                </li>
              ))}
            </>
          )}
          
          {/* Search results */}
          {results?.results?.length > 0 && (
            <>
              {recentSearches.length > 0 && !query && (
                <li className="border-t border-gray-100">
                  <div className="px-4 py-2 text-xs font-medium text-gray-500">
                    Search results
                  </div>
                </li>
              )}
              {results.results.map((location) => (
                <li key={location.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(location)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                  >
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{location.name}</p>
                      <p className="text-sm text-gray-500">
                        {location.admin1 && `${location.admin1}, `}{location.country}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  )
}
