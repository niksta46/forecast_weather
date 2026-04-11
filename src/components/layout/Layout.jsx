import { Outlet, Link, useLocation, useSearchParams } from 'react-router-dom'
import { Cloud } from 'lucide-react'
import { LocationSearch } from '../../features/location-search'
import { Card } from '../../components/common'

export function Layout() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

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

  const navLinks = [
    ...(lat && lon && name
      ? [
          { path: `/?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`, label: 'Home' },
          { path: `/hourly?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`, label: 'Hourly' },
          { path: `/weekly?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`, label: 'Weekly' },
        ]
      : []),
  ]

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 text-gray-800 hover:text-primary-600 transition-colors">
              <Cloud className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-bold">Weather</span>
            </a>

            <nav className="flex gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path.split('?')[0]
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Card>
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </Card>

          {lat && lon && name && (
            <p className="mt-3 text-sm text-gray-600">
              Showing weather for: <strong>{name}</strong>
            </p>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet context={{ lat, lon, name }} />
      </main>
    </div>
  )
}