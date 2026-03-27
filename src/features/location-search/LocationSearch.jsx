import { useState, useRef, useEffect } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useLocationSearch } from '../../api/endpoints'
import { Input, Loading } from '../../components/common'

export function LocationSearch({ onLocationSelect }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const { data: results, isLoading } = useLocationSearch(query)

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
    if (results?.results) {
      setIsOpen(true)
    }
  }, [results])

  const handleSelect = (location) => {
    onLocationSelect({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
    })
    setQuery(location.name)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-10"
        />
        {isLoading && (
          <Loading className="absolute right-3 top-1/2 -translate-y-1/2 !p-0 !h-5 !w-5" />
        )}
      </div>

      {isOpen && results?.results?.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
        </ul>
      )}
    </div>
  )
}
