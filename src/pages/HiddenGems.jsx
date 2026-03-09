import { useState, useEffect } from 'react'
import { MapPin, Zap } from 'lucide-react'
import HiddenGemCard from '../components/HiddenGemCard'

export default function HiddenGems() {
  const [loading, setLoading] = useState(true)
  const [nearbyGems, setNearbyGems] = useState([])
  const [userLocation] = useState({ lat: -1.2865, lng: 36.8172 }) // Nairobi

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      // Simulate geofencing detection
      setNearbyGems([1, 3])
    }, 600)
  }, [])

  const hiddenGems = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1618519/pexels-photo-1618519.jpeg',
      title: 'Chalbi Desert',
      description: 'A stunning salt lake surrounded by unique desert landscape and wildlife.',
      distance: 8,
      difficulty: 'Moderate',
      location: { lat: -2.2, lng: 37.8 },
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      title: 'Lake Turkana',
      description: 'The world\'s largest permanent desert lake with fossil sites and local communities.',
      distance: 45,
      difficulty: 'Hard',
      location: { lat: 3.5, lng: 36.2 },
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1440404/pexels-photo-1440404.jpeg',
      title: 'Ndere Island',
      description: 'A pristine island sanctuary with rare birds and untouched beaches.',
      distance: 5,
      difficulty: 'Easy',
      location: { lat: -1.3, lng: 36.0 },
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
      title: 'Marafa Hell\'s Kitchen',
      description: 'Dramatic sandstone cliffs and ancient ruins hidden in the Lamu district.',
      distance: 65,
      difficulty: 'Moderate',
      location: { lat: -2.3, lng: 41.2 },
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1529188/pexels-photo-1529188.jpeg',
      title: 'Gede Ruins',
      description: 'Ancient Swahili ruins surrounded by lush forest and cultural heritage.',
      distance: 35,
      difficulty: 'Easy',
      location: { lat: -3.3, lng: 40.0 },
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1659960/pexels-photo-1659960.jpeg',
      title: 'Saiwa Swamp National Park',
      description: 'Home to sitatunga antelopes and over 370 bird species in a pristine swamp.',
      distance: 55,
      difficulty: 'Easy',
      location: { lat: 1.5, lng: 35.1 },
    },
  ]

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-r from-accent/10 to-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-2">Hidden Gems</h1>
          <p className="text-gray-600 text-lg">Discover lesser-known treasures across Kenya</p>
        </div>
      </section>

      {/* Geofencing Alert */}
      {nearbyGems.length > 0 && (
        <section className="bg-gradient-to-r from-yellow-50 to-yellow-50 border-l-4 border-yellow-400 p-4 md:p-6 mx-4 md:mx-0 my-6 rounded-lg md:rounded-none">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <Zap size={24} className="text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900">You are near a hidden gem!</h3>
              <p className="text-sm text-yellow-700">Unlock local stories and activities nearby.</p>
            </div>
          </div>
        </section>
      )}

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">🗺️</div>
            <h3 className="font-bold text-primary mb-2">Smart Geofencing</h3>
            <p className="text-gray-600 text-sm">Our system detects when you're near a hidden gem and notifies you with exclusive local insights.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="font-bold text-primary mb-2">Community Stories</h3>
            <p className="text-gray-600 text-sm">Each location features authentic stories from local communities who know these places best.</p>
          </div>
        </div>
      </section>

      {/* Hidden Gems Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hiddenGems.map((gem) => (
              <HiddenGemCard
                key={gem.id}
                gem={gem}
                nearby={nearbyGems.includes(gem.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
