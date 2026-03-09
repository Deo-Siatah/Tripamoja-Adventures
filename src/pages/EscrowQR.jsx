import { useParams, Link } from 'react-router-dom'
import { Shield, CheckCircle2, Lock } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

export default function EscrowQR() {
  const { id } = useParams()
  const { getBooking, updateBooking } = useBooking()
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

  const handlePaymentComplete = () => {
    updateBooking(Number(id), { status: 'confirmed' })
    // Redirect after payment
    setTimeout(() => {
      window.location.href = `/itinerary/${id}`
    }, 1500)
  }

  const qrData = {
    trip_id: `TRIP${id}`,
    tourist_id: 'TOUR123456',
    operator_id: 'OP789012',
    timestamp: new Date().toISOString(),
    booking_reference: `#BK${id}`,
    amount: booking.totalPrice,
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Secure Payment</h1>
          <p>QR Escrow Verification System</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Info */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 card-enter">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-green-600" size={24} />
            <h3 className="text-lg font-bold text-green-900">Secure Payment Protected</h3>
          </div>
          <p className="text-green-800 text-sm">
            Your funds are held in escrow and only released when the operator scans this QR code and the trip is confirmed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Payment Details */}
          <div className="bg-white rounded-xl shadow-md p-8 card-enter">
            <h2 className="text-2xl font-black text-primary mb-6">Payment Details</h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
                <p className="text-xl font-bold text-secondary">{qrData.booking_reference}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Destination</p>
                <p className="font-semibold">{booking.destination}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Operator</p>
                <p className="font-semibold">{booking.operator}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Travel Date</p>
                <p className="font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Number of Travelers</p>
                <p className="font-semibold">{booking.travelers}</p>
              </div>

              <div className="pt-6 border-t">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="font-semibold">KES {booking.totalPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Service Fee</p>
                  <p className="font-semibold">KES 0</p>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <p className="font-bold">Total</p>
                  <p className="text-3xl font-black text-accent">KES {booking.totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-white rounded-xl shadow-md p-8 card-enter flex flex-col items-center justify-center">
            <h2 className="text-2xl font-black text-primary mb-6 text-center">Dynamic QR Code</h2>

            {/* QR Code Placeholder */}
            <div className="bg-gray-100 p-8 rounded-lg mb-6">
              <div className="w-48 h-48 bg-white border-8 border-secondary flex items-center justify-center">
                {/* Generate a more realistic QR pattern */}
                <div className="relative w-full h-full">
                  {/* This is a simplified QR code representation */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* QR patterns */}
                    <rect x="10" y="10" width="30" height="30" fill="#355E3B" />
                    <rect x="160" y="10" width="30" height="30" fill="#355E3B" />
                    <rect x="10" y="160" width="30" height="30" fill="#355E3B" />
                    
                    {/* Grid pattern */}
                    {Array.from({ length: 10 }).map((_, i) =>
                      Array.from({ length: 10 }).map((_, j) => (
                        Math.random() > 0.5 && (
                          <rect
                            key={`${i}-${j}`}
                            x={50 + i * 10}
                            y={50 + j * 10}
                            width="8"
                            height="8"
                            fill={Math.random() > 0.3 ? '#355E3B' : 'white'}
                          />
                        )
                      ))
                    )}
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 mb-4">
              Scan to verify trip and release funds
            </p>

            {/* QR Data */}
            <div className="w-full bg-gray-50 rounded-lg p-4 text-xs text-gray-700 mb-6 overflow-x-auto">
              <code>{JSON.stringify(qrData, null, 2)}</code>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock size={16} />
              <span>Encrypted & Secure</span>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-8 mb-8 card-enter">
          <h3 className="text-xl font-black text-primary mb-6">How Escrow Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Payment', desc: 'You pay through our secure wallet' },
              { num: '2', title: 'Escrow', desc: 'Funds held securely' },
              { num: '3', title: 'Scan', desc: 'Operator scans QR code' },
              { num: '4', title: 'Release', desc: 'Funds released automatically' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <h4 className="font-bold text-primary mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={`/itinerary/${id}`}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all text-center"
          >
            Back to Itinerary
          </Link>
          <button
            onClick={handlePaymentComplete}
            className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-bold inline-flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 size={20} />
            Confirm & Proceed to Payment
          </button>
        </div>

        {/* Payment Methods Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            💳 Accepted payment methods: M-Pesa, Card, Bank Transfer. Payment will be processed securely through our gateway.
          </p>
        </div>
      </section>
    </div>
  )
}
