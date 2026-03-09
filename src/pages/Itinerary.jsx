import { useParams, Link } from 'react-router-dom'
import { 
  MapPin, Users, Clock, AlertCircle, Phone, Zap, 
  CloudSun, ShieldCheck, Coffee, Camera, Thermometer, 
  Briefcase, MessageSquare, Navigation, Lock, QrCode,
  RefreshCcw, HelpCircle, PhoneCall, Info
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'

export default function Itinerary() {
  const { id } = useParams()
  const { getBooking } = useBooking()
  const booking = getBooking(Number(id))

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2] p-4">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-sm w-full">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-[#355E3B] mb-2">Booking Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">We couldn't locate reference #BK{id}</p>
          <Link to="/booking" className="block w-full py-3 bg-[#E76F51] text-white rounded-xl font-bold">Return to Booking</Link>
        </div>
      </div>
    )
  }

  const tripTimeline = [
    { time: '06:00 AM', activity: 'VIP Pickup', detail: `From ${booking.preferences?.pickupLocation || 'Nairobi'}`, icon: <MapPin size={18}/> },
    { time: '08:30 AM', activity: 'Rift Valley View', detail: 'Photo session & snacks', icon: <Camera size={18}/> },
    { time: '01:00 PM', activity: 'Transit Lunch', detail: 'Local Kenyan Cuisine', icon: <Coffee size={18}/> },
    { time: '05:30 PM', activity: 'Sunset Drive', detail: 'Game viewing begins', icon: <Navigation size={18}/> },
  ]

  return (
    <div className="bg-[#F8F5F2] min-h-screen font-sans">
      {/* 1. SECURE HEADER */}
      <section className="bg-[#355E3B] text-white pt-12 pb-20 md:pt-20 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <Zap size={14} className="text-[#E76F51]" />
                <span className="text-[10px] font-black uppercase tracking-widest">{booking.destination}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black italic leading-tight">Itinerary Control</h1>
              <p className="text-white/60 text-sm font-medium">Booking Reference: <span className="text-white">#TPM-{booking.id}</span></p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex-1 md:flex-none px-6 py-3 bg-[#E76F51] rounded-xl font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
                Offline Access
              </button>
              <button className="p-3 bg-white/10 rounded-xl border border-white/20">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: LOGISTICS & PAYMENT */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Weather & Advisory */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-2xl text-[#E76F51]"><CloudSun size={28} /></div>
                <div>
                  <h3 className="font-bold text-[#355E3B] text-sm md:text-base">Local Weather</h3>
                  <p className="text-xs text-gray-400">26°C • Sunny Intervals</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:border-l md:pl-6 border-gray-100">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Thermometer size={28} /></div>
                <div>
                  <h3 className="font-bold text-[#355E3B] text-sm md:text-base">Gear Advisory</h3>
                  <p className="text-xs text-gray-400">Hat and sunscreen essential</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#355E3B] mb-8 flex items-center gap-2">
                <Clock className="text-[#E76F51]" size={20} /> Trip Logistics
              </h2>
              <div className="space-y-2">
                {tripTimeline.map((item, i) => (
                  <div key={i} className="group relative flex gap-4 md:gap-8 pb-8">
                    {i !== tripTimeline.length - 1 && (
                      <div className="absolute left-[20px] md:left-[23px] top-10 w-[2px] h-full bg-gray-100" />
                    )}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#355E3B] z-10 border border-gray-100 shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-[#E76F51] uppercase">{item.time}</span>
                      <h4 className="font-bold text-[#355E3B] text-sm md:text-base">{item.activity}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ESCROW PAYMENT SECTION */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border-2 border-[#E76F51]/20 overflow-hidden relative">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="text-[#E76F51]" size={20} />
                    <h2 className="text-2xl font-black text-[#355E3B]">Secure Escrow Payment</h2>
                  </div>
                  <p className="text-gray-500 text-sm max-w-md italic">
                    Funds are held in a secure vault and only released after your tour begins.
                  </p>
                </div>
                <div className="bg-[#F8F5F2] p-4 rounded-2xl border border-gray-100 text-center w-full md:w-auto">
                    <p className="text-[10px] font-black uppercase text-gray-400">Total Price</p>
                    <p className="text-2xl font-black text-[#355E3B]">KES {booking.totalPrice?.toLocaleString()}</p>
                </div>
              </div>

              {/* Policy Explanation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="space-y-2">
                    <p className="text-xs font-bold text-[#355E3B] flex items-center gap-2">
                      <ShieldCheck size={14} className="text-green-600"/> 1. Secure Deposit
                    </p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">Pay via M-Pesa or Card. Funds stay with us, not the operator yet.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-bold text-[#355E3B] flex items-center gap-2">
                      <QrCode size={14} className="text-[#E76F51]"/> 2. Start Code
                    </p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">The driver must scan your unique code at pickup to trigger fund release.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-bold text-[#355E3B] flex items-center gap-2">
                      <RefreshCcw size={14} className="text-blue-500"/> 3. Easy Refunds
                    </p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">If the operator doesn't show up, your refund is processed automatically.</p>
                </div>
              </div>

              {/* Pay Now & QR Scan area */}
              <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-[#355E3B]/5 rounded-3xl border border-[#355E3B]/10">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <QrCode size={100} className="text-[#355E3B]" />
                    <p className="text-[8px] text-center font-bold mt-2 text-gray-400 uppercase">Scan to Secure</p>
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h4 className="font-bold text-[#355E3B] text-sm">Seal your booking with Escrow</h4>
                    <Link to={`/pay/${booking.id}`} className="inline-flex items-center gap-2 px-8 py-4 bg-[#E76F51] text-white rounded-2xl font-black shadow-lg hover:scale-105 transition-all text-sm">
                        Pay Now via Escrow <ShieldCheck size={18} />
                    </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DRIVER, PACKING & SUPPORT */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Driver Profile */}
            <div className="bg-[#355E3B] rounded-3xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <img src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg" className="w-14 h-14 rounded-xl object-cover" alt="Guide" />
                <div>
                  <h3 className="font-bold text-sm">Joseph Kipchoge</h3>
                  <p className="text-[10px] text-white/50 uppercase font-black">Pro Facilitator</p>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6 space-y-3">
                <div className="flex justify-between text-[10px]"><span className="text-white/40 uppercase">Vehicle</span><span className="font-bold">KCA 123Z</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-white/40 uppercase">Guide Language</span><span className="font-bold text-[#E76F51]">{booking.preferences?.language || 'English'}</span></div>
              </div>
              <button className="w-full py-3 bg-white text-[#355E3B] rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                <Phone size={14} /> Contact Guide
              </button>
            </div>

            {/* Refund Policy Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#355E3B] mb-4 text-sm flex items-center gap-2 uppercase tracking-tight">
                <RefreshCcw size={16} className="text-[#E76F51]" /> Cancellation Policy
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <p className="text-[11px] text-gray-600 font-medium">100% Refund: Cancel 48hrs before</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <p className="text-[11px] text-gray-600 font-medium">50% Refund: Cancel 24hrs before</p>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50 text-[10px] text-gray-400 italic">
                  <Info size={12} /> Full terms apply
                </div>
              </div>
            </div>

            {/* Packing List */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#355E3B] mb-4 text-sm flex items-center gap-2">
                <Briefcase size={16} className="text-[#355E3B]" /> Safari Pack
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {['Camera Gear', 'Travel Docs', 'Neutral Clothes'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-4 h-4 rounded border border-gray-300 shrink-0" />
                    <span className="text-xs font-medium text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-[#355E3B]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#355E3B]">
                <HelpCircle size={24} />
              </div>
              <h3 className="font-bold text-[#355E3B] text-sm">Support Hub</h3>
              <p className="text-[10px] text-gray-400 mt-1 mb-4">24/7 Logistics & Safety Help</p>
              <button className="w-full py-3 border-2 border-[#355E3B] text-[#355E3B] rounded-xl font-bold text-[10px] flex items-center justify-center gap-2 hover:bg-[#355E3B] hover:text-white transition-all">
                  <PhoneCall size={12} /> Contact Helpline
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}