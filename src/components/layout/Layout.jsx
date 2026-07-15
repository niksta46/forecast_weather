import { Outlet, Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { Cloud, MapPin } from 'lucide-react'
import { LocationSearch } from '../../features/location-search'
import { Card } from '../../components/common'

export function Layout() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const name = searchParams.get('name')

  const handleLocationSelect = (location) => {
    setSearchParams({
      lat: location.latitude,
      lon: location.longitude,
      name: location.name,
    })
  }

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Get location name using reverse geocoding
        fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            const locationData = {
              name: data.results[0]?.name || 'Unknown Location',
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              country: data.results[0]?.country || '',
            }
            handleLocationSelect(locationData)
            // Navigate to home page if not already there
            if (location.pathname !== '/') {
              navigate('/')
            }
          })
          .catch((error) => {
            console.error('Error getting location name:', error)
            // Fallback: use coordinates as name
            const locationData = {
              name: `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              country: '',
            }
            handleLocationSelect(locationData)
            if (location.pathname !== '/') {
              navigate('/')
            }
          })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('User denied the request for Geolocation.')
            break
          case error.POSITION_UNAVAILABLE:
            console.error('Location information is unavailable.')
            break
          case error.TIMEOUT:
            console.error('The request to get user location timed out.')
            break
          default:
            console.error('An unknown error occurred.')
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000, // 10 minutes
      }
    )
  }

  const defaultLat = lat || '43.89791'
  const defaultLon = lon || '12.75108'
  const defaultName = name || 'Tavullia'

  const navLinks = [
    { path: `/?lat=${defaultLat}&lon=${defaultLon}&name=${encodeURIComponent(defaultName)}`, label: 'Home' },
    { path: `/hourly?lat=${defaultLat}&lon=${defaultLon}&name=${encodeURIComponent(defaultName)}`, label: 'Hourly' },
    { path: `/weekly?lat=${defaultLat}&lon=${defaultLon}&name=${encodeURIComponent(defaultName)}`, label: 'Weekly' },
  ]

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="grid grid-cols-[1fr,3fr,1fr] items-center gap-4">
            <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 text-gray-800 hover:text-primary-600 transition-colors">
              <Cloud className="w-5 h-5 text-primary-500" />
              <span className="text-lg font-bold">Weather App</span>
            </a>

           <div className="w-full">
             <Card className="p-1">
               <LocationSearch onLocationSelect={handleLocationSelect} />
               <div className="mt-1 flex items-center justify-between">
                 <p className="text-xs text-gray-600">
                   Showing weather for: <strong>{lat && lon && name ? name : 'Tavullia'}</strong>
                 </p>
                 <button
                   type="button"
                   onClick={handleCurrentLocation}
                   className="text-xs text-gray-600 hover:text-gray-800 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 px-2 py-1"
                 >
                   <MapPin className="w-3 h-3" />
                   Use Current Location
                 </button>
               </div>
             </Card>
           </div>

            <div className="flex justify-end gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    location.pathname === link.path.split('?')[0]
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-4">
        <Outlet context={{ lat, lon, name }} />
      </main>
    </div>
  )
}