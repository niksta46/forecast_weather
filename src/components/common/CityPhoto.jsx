import { useState, useEffect } from 'react';

export function CityPhoto({ cityName, className = '' }) {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!cityName) {
      setLoading(false);
      return;
    }

    // Reset state when city changes
    setLoading(true);
    setError(false);
    
    // Import the service dynamically to avoid SSR issues
    import('../../features/photoService.js').then(({ fetchCityPhoto }) => {
      fetchCityPhoto(cityName)
        .then(photoData => {
          setPhoto(photoData);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching photo:', err);
          setError(true);
          setLoading(false);
        });
    }).catch(err => {
      console.error('Error importing photo service:', err);
      setError(true);
      setLoading(false);
    });
  }, [cityName]);

  if (loading) {
    return (
      <div className={`bg-gray-200 border-2 border-dashed rounded-xl w-full h-56 md:h-64 lg:h-80 flex items-center justify-center ${className}`}>
        <div className="animate-pulse text-gray-500">Loading city photo...</div>
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className={`bg-gray-100 rounded-xl w-full h-56 md:h-64 lg:h-80 flex items-center justify-center ${className}`}>
        <div className="text-gray-500 text-center p-2">
          <div className="mb-2">No photo available</div>
          <div className="text-sm">Showing default view</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden w-full ${className}`}>
      <img 
        src={photo.url} 
        alt={photo.alt}
        className="w-full h-56 md:h-64 lg:h-80 object-cover"
        onError={(e) => {
          // Handle image load errors by showing fallback
          e.target.src = 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
          e.target.alt = 'Sky with sun and clouds';
        }}
      />
    </div>
  );
}