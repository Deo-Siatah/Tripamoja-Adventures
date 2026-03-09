import { useState } from 'react'
import { CheckCircle2, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import OperatorCard from '../components/OperatorCard'
import { useBooking } from '../context/BookingContext'

export default function Booking() {
  const navigate = useNavigate()
  const { addBooking } = useBooking()
  const [step, setStep] = useState(1)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [travelDate, setTravelDate] = useState('')
  const [travelers, setTravelers] = useState(1)

  const destinations = [
    {
      id: 1,
      name: 'Maasai Mara Safari',
      image: 'https://images.pexels.com/photos/1590301/pexels-photo-1590301.jpeg',
      price: 35000,
    },
    {
      id: 2,
      name: 'Diani Beach',
      image: 'https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg',
      price: 15000,
    },
    {
      id: 3,
      name: 'Mount Kenya Trek',
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      price: 28000,
    },
  ]

  const operators = [
    {
      name: 'Safari Experts Ltd',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1590301/pexels-photo-1590301.jpeg',
      vehicle: 'Land Cruiser V8',
      capacity: 7,
      price: 35000,
      featured: true,
    },
    {
      name: 'Adventurers Kenya',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      vehicle: 'Toyota Hiace',
      capacity: 12,
      price: 30000,
      featured: false,
    },
    {
      name: 'Coastal Tours',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg',
      vehicle: 'Coaster Bus',
      capacity: 50,
      price: 25000,
      featured: false,
    },
  ]

  const handleCompleteBooking = () => {
    if (selectedDestination && selectedOperator && travelDate && travelers) {
      const booking = addBooking({
        destination: destinations.find(d => d.id === selectedDestination)?.name,
        operator: selectedOperator.name,
        date: travelDate,
        travelers,
        totalPrice: selectedOperator.price * travelers,
        status: 'pending',
      })
      navigate(`/itinerary/${booking.id}`)
    }
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Book Your Trip</h1>
          <p>Create your perfect Kenyan adventure in 4 easy steps</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                    step >= s
                      ? 'bg-secondary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s ? <CheckCircle2 size={24} /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-1 w-12 md:w-24 transition-all ${
                      step > s ? 'bg-secondary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs md:text-sm font-semibold">
            <span>Destination</span>
            <span>Operator</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step 1: Select Destination */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-black text-primary mb-6">Select Destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    setSelectedDestination(dest.id)
                    setStep(2)
                  }}
                  className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg card-enter ${
                    selectedDestination === dest.id ? 'ring-4 ring-secondary' : ''
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-primary">{dest.name}</h3>
                    <p className="text-accent font-bold">KES {dest.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Operator */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-black text-primary mb-6">Choose Operator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {operators.map((op, i) => (
                <OperatorCard
                  key={i}
                  operator={op}
                  onSelect={() => {
                    setSelectedOperator(op)
                    setStep(3)
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        )}

        {/* Step 3: Travel Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-black text-primary mb-6">Travel Details</h2>
            <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Number of Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n} Person{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!travelDate || !travelers}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-semibold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-black text-primary mb-6">Confirm Booking</h2>
            <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mb-8 card-enter">
              <div className="space-y-4 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination</span>
                  <span className="font-semibold">{destinations.find(d => d.id === selectedDestination)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Operator</span>
                  <span className="font-semibold">{selectedOperator?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travel Date</span>
                  <span className="font-semibold">{new Date(travelDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travelers</span>
                  <span className="font-semibold">{travelers} Person{travelers > 1 ? 's' : ''}</span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-lg font-bold">Total Price</span>
                <span className="text-3xl font-black text-accent">
                  KES {(selectedOperator?.price * travelers).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleCompleteBooking}
                className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-bold inline-flex items-center justify-center gap-2"
              >
                <Clock size={18} />
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
