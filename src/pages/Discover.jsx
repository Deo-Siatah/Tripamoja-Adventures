import { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import DestinationCard from '../components/DestinationCard'

export default function Discover() {
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, [])

  const categories = [
    { value: 'all', label: 'All Destinations' },
    { value: 'wildlife', label: 'Wildlife Tourism' },
    { value: 'beach', label: 'Beach Tourism' },
    { value: 'cultural', label: 'Cultural Tourism' },
    { value: 'adventure', label: 'Adventure Tourism' },
  ]

  const allDestinations = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1590301/pexels-photo-1590301.jpeg',
      title: 'Maasai Mara Safari',
      location: 'Maasai Mara',
      description: 'Experience the great migration and witness the Big Five in their natural habitat.',
      category: 'wildlife',
      price: 35000,
      rating: 4.8,
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg',
      title: 'Diani Beach Getaway',
      location: 'Diani',
      description: 'Relax on pristine sandy beaches and enjoy water sports along the beautiful coast.',
      category: 'beach',
      price: 15000,
      rating: 4.6,
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      title: 'Mount Kenya Trek',
      location: 'Mount Kenya',
      description: 'Challenge yourself with an exhilarating climb to one of Africa\'s highest peaks.',
      category: 'adventure',
      price: 28000,
      rating: 4.9,
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1440404/pexels-photo-1440404.jpeg',
      title: 'Lake Nakuru Wildlife',
      location: 'Lake Nakuru',
      description: 'Discover flamingos, rhinos, and stunning landscapes in this protected sanctuary.',
      category: 'wildlife',
      price: 22000,
      rating: 4.7,
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
      title: 'Lamu Island Experience',
      location: 'Lamu',
      description: 'Explore the historic island with its stunning architecture and pristine beaches.',
      category: 'cultural',
      price: 18000,
      rating: 4.5,
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1529188/pexels-photo-1529188.jpeg',
      title: 'Nairobi City Tour',
      location: 'Nairobi',
      description: 'Discover the vibrant capital with museums, markets, and modern attractions.',
      category: 'cultural',
      price: 8000,
      rating: 4.4,
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1659960/pexels-photo-1659960.jpeg',
      title: 'Kilimanjaro View Trek',
      location: 'Amboseli',
      description: 'Witness the majestic Kilimanjaro from across the border with elephant herds.',
      category: 'wildlife',
      price: 25000,
      rating: 4.8,
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/1618519/pexels-photo-1618519.jpeg',
      title: 'Rift Valley Adventure',
      location: 'Rift Valley',
      description: 'Explore the dramatic landscape with lakes, geysers, and unique ecosystems.',
      category: 'adventure',
      price: 20000,
      rating: 4.6,
    },
  ]

  const filteredDestinations = activeCategory === 'all'
    ? allDestinations
    : allDestinations.filter(d => d.category === activeCategory)

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-2">Discover Kenya</h1>
          <p className="text-gray-600 text-lg">Explore our curated collection of tourism experiences</p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          <Filter size={20} className="text-gray-700 flex-shrink-0" />
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-all ${
                  activeCategory === cat.value
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 skeleton" />
            ))}
          </div>
        ) : (
          <>
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No destinations found in this category.</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
