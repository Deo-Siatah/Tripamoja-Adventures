import { useParams, Link } from 'react-router-dom'
import { MapPin, Users, Clock, AlertCircle, Phone, Zap } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

export default function Itinerary() {
  const { id } = useParams()
  const { getBooking } = useBooking()
  const booking = getBooking(Number(id))

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking not found</h1>
          <Link to="/booking" className="text-secondary font-semibold">
            Create a new booking
          </Link>
        </div>
      </div>
    )
  }

  const tripDetails = {
    route: 'Nairobi → Maasai Mara',
    distance: '280km',
    time: '5 hours',
    highlights: [
      'Depart from Nairobi at 6:00 AM',
      'Stop at Nairobi National Park (1 hour)',
      'Lunch break in Narok town',
      'Enter Maasai Mara (5:00 PM)',
      'Evening game drive',
    ],
    wildlife: ['Lions', 'Elephants', 'Giraffes', 'Zebras', 'Wildebeest'],
    facts: [
      'Maasai Mara is home to over 95 mammal species',
      'The Great Migration happens annually from July to September',
      'The reserve covers approximately 1,510 km²',
    ],
    culture: [
      'Meet Maasai warriors and learn about their traditions',
      'Visit a traditional Maasai village',
      'Experience authentic Maasai cuisine',
    ],
  }

  const driver = {
    name: 'Joseph Kipchoge',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    experience: '8 years',
    vehicle: 'Toyota Land Cruiser V8 - KCA 123Z',
  }

  const travelers = [
    { name: 'You', status: 'Confirmed' },
    { name: 'Sarah Johnson', status: 'Confirmed' },
    { name: 'Michael Brown', status: 'Confirmed' },
  ]

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Your Itinerary</h1>
          <p>Booking Reference: #BK{booking.id}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Status Alert */}
        {booking.status === 'pending' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg card-enter">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-yellow-600" size={24} />
              <div>
                <h3 className="font-bold text-yellow-900">Payment Pending</h3>
                <p className="text-sm text-yellow-700">Complete your payment to confirm this booking.</p>
              </div>
              <Link
                to={`/escrow-qr/${booking.id}`}
                className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold whitespace-nowrap"
              >
                Pay Now
              </Link>
            </div>
          </div>
        )}

        {/* Trip Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 card-enter">
          <h2 className="text-2xl font-black text-primary mb-6">Trip Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <MapPin className="text-secondary" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-bold">{tripDetails.route}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Zap className="text-accent" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Distance</p>
                <p className="font-bold">{tripDetails.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-bold">{tripDetails.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl shadow-md p-6 card-enter">
          <h3 className="text-xl font-black text-primary mb-4">Trip Highlights</h3>
          <ul className="space-y-3">
            {tripDetails.highlights.map((highlight, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Wildlife & Culture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 card-enter">
            <h3 className="text-xl font-black text-primary mb-4">🦁 Expected Wildlife</h3>
            <div className="flex flex-wrap gap-2">
              {tripDetails.wildlife.map((animal, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                >
                  {animal}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {tripDetails.facts.map((fact, i) => (
                <p key={i} className="text-sm text-gray-700">• {fact}</p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 card-enter">
            <h3 className="text-xl font-black text-primary mb-4">🌍 Cultural Experiences</h3>
            <ul className="space-y-3">
              {tripDetails.culture.map((exp, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-gray-700">{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-xl shadow-md p-6 card-enter">
          <h3 className="text-xl font-black text-primary mb-6">Your Driver</h3>
          <div className="flex items-center gap-6 mb-6 pb-6 border-b">
            <img
              src={driver.image}
              alt={driver.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold text-lg">{driver.name}</h4>
              <p className="text-gray-600 text-sm">{driver.experience} experience</p>
              <p className="text-yellow-500 font-semibold">⭐ {driver.rating}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="font-semibold">{driver.vehicle}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-semibold w-full justify-center">
              <Phone size={18} />
              Contact Driver
            </button>
          </div>
        </div>

        {/* Other Travelers */}
        <div className="bg-white rounded-xl shadow-md p-6 card-enter">
          <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
            <Users size={24} />
            Other Travelers
          </h3>
          <div className="space-y-3">
            {travelers.map((traveler, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">{traveler.name}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  {traveler.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Helpline */}
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-8 text-center card-enter">
          <h3 className="text-2xl font-black text-primary mb-4">Need Help?</h3>
          <p className="text-gray-700 mb-6">Our 24/7 customer support team is here to assist you with any questions.</p>
          <button className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-bold">
            Contact Helpline
          </button>
        </div>
      </section>
    </div>
  )
}
