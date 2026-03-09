import { useState } from 'react'
import { CheckCircle2, Clock, Globe, Shield, Car, UserCheck, Languages, Info, ChevronRight, Award } from 'lucide-react'
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
  
  // New Personalization States
  const [preferences, setPreferences] = useState({
    language: 'English',
    dietary: 'None',
    pickupLocation: '',
    specialRequests: ''
  })

  const destinations = [
    { id: 1, name: 'Maasai Mara Safari', image: 'https://images.pexels.com/photos/1590301/pexels-photo-1590301.jpeg', price: 35000 },
    { id: 2, name: 'Diani Beach', image: 'https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg', price: 15000 },
    { id: 3, name: 'Mount Kenya Trek', image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg', price: 28000 },
  ]

  const operators = [
    {
      name: 'Safari Experts Ltd',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1590301/pexels-photo-1590301.jpeg',
      vehicle: 'Land Cruiser V8 Luxury',
      capacity: 7,
      price: 35000,
      featured: true,
      languages: ['English', 'German', 'Swahili'],
      facilitation: ['Window seat guaranteed', 'Binoculars provided', 'Unlimited water', 'Professional Photographer guide'],
      security: 'KATO Bonded'
    },
    {
      name: 'Adventurers Kenya',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      vehicle: 'Customized Safari Van',
      capacity: 8,
      price: 30000,
      featured: false,
      languages: ['English', 'French', 'Swahili'],
      facilitation: ['Charging ports available', 'Pop-up roof', 'First Aid Kit'],
      security: 'Licensed Guide'
    }
  ]

  const handleCompleteBooking = () => {
    if (selectedDestination && selectedOperator && travelDate && travelers) {
      const booking = addBooking({
        destination: destinations.find(d => d.id === selectedDestination)?.name,
        operator: selectedOperator.name,
        date: travelDate,
        travelers,
        preferences, // Pass personalized preferences
        totalPrice: selectedOperator.price * travelers,
        status: 'pending',
      })
      navigate(`/itinerary/${booking.id}`)
    }
  }

  return (
    <div className="bg-[#F8F5F2] min-h-screen">
      {/* Header */}
      <section className="bg-[#355E3B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
             <Shield className="text-[#E76F51]" size={24} />
             <span className="text-xs font-bold uppercase tracking-widest">Tripamoja Verified Booking</span>
          </div>
          <h1 className="text-5xl font-black mb-2 italic">Tailor Your Adventure</h1>
          <p className="text-white/70 max-w-xl">Compare vetted operators and personalize your experience with language support and professional facilitation.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Progress Tracker */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2 flex-1 relative">
                <div className={`w-12 h-12 rounded-full font-bold flex items-center justify-center z-10 transition-all duration-500 ${
                    step >= s ? 'bg-[#E76F51] text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s ? <CheckCircle2 size={24} /> : s}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s ? 'text-[#355E3B]' : 'text-gray-300'}`}>
                    {['Destination', 'Compare', 'Personalize', 'Confirm'][s-1]}
                </span>
                {s < 4 && <div className={`absolute top-6 left-1/2 w-full h-[2px] -z-0 ${step > s ? 'bg-[#E76F51]' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Destination Selection (Simplified) */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-[#355E3B] mb-8">Where are we going?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((dest) => (
                <div key={dest.id} onClick={() => { setSelectedDestination(dest.id); setStep(2); }}
                  className="group bg-white rounded-[2rem] overflow-hidden cursor-pointer hover:shadow-2xl transition-all border border-gray-100">
                  <div className="relative h-64">
                    <img src={dest.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#E76F51]">From KES {dest.price}</p>
                        <h3 className="text-2xl font-bold">{dest.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Compare Operators & Facilitation */}
        {step === 2 && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black text-[#355E3B]">Compare Packages</h2>
                    <p className="text-gray-500 text-sm">We've found {operators.length} operators for {destinations.find(d=>d.id===selectedDestination).name}</p>
                </div>
                <button onClick={()=>setStep(1)} className="text-xs font-bold text-gray-400 hover:text-[#355E3B]">Change Destination</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {operators.map((op, i) => (
                <div key={i} className={`bg-white rounded-[2rem] p-8 border-2 transition-all flex flex-col lg:flex-row gap-8 items-center ${selectedOperator?.name === op.name ? 'border-[#355E3B]' : 'border-transparent shadow-sm hover:border-gray-200'}`}>
                  <img src={op.image} className="w-full lg:w-48 h-48 rounded-2xl object-cover" alt="" />
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-[#355E3B]">{op.name}</h3>
                        {op.featured && <span className="bg-[#355E3B]/10 text-[#355E3B] px-3 py-1 rounded-full text-[9px] font-black uppercase">Top Rated</span>}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Car size={16} className="text-[#E76F51]" /> <span>{op.vehicle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Languages size={16} className="text-[#E76F51]" /> <span>{op.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Award size={16} className="text-[#E76F51]" /> <span>{op.security}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {op.facilitation.map((f, idx) => (
                            <span key={idx} className="bg-gray-50 text-gray-400 text-[10px] px-2 py-1 rounded font-bold uppercase">{f}</span>
                        ))}
                    </div>
                  </div>

                  <div className="text-right min-w-[150px]">
                    <p className="text-3xl font-black text-[#355E3B]">KES {op.price.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-4">Per Person</p>
                    <button onClick={() => { setSelectedOperator(op); setStep(3); }} className="w-full py-3 bg-[#E76F51] text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform">Select This Package</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Personalization & Details */}
        {step === 3 && (
          <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-[#355E3B] mb-8 text-center">Personalize Your Facilitation</h2>
            
            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 bg-gray-50/50 border-r">
                    <div className="space-y-8">
                        <div>
                            <label className="text-xs font-black uppercase text-gray-400 mb-4 block">Language Preference</label>
                            <div className="grid grid-cols-2 gap-3">
                                {selectedOperator.languages.map(lang => (
                                    <button 
                                        key={lang} 
                                        onClick={() => setPreferences({...preferences, language: lang})}
                                        className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${preferences.language === lang ? 'bg-[#355E3B] text-white border-[#355E3B]' : 'bg-white border-gray-100 text-gray-400'}`}>
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-xs font-black uppercase text-gray-400 mb-4 block">Pick-up Location</label>
                            <input 
                                type="text"
                                placeholder="Hotel name or Airport"
                                className="w-full p-4 rounded-xl bg-white border-2 border-gray-100 focus:border-[#355E3B] outline-none font-bold text-sm"
                                onChange={(e) => setPreferences({...preferences, pickupLocation: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-10 space-y-8">
                    <div>
                        <label className="text-xs font-black uppercase text-gray-400 mb-4 block">Travel Logistics</label>
                        <div className="space-y-4">
                            <input type="date" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#355E3B] outline-none font-bold" onChange={(e)=>setTravelDate(e.target.value)} />
                            <select className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#355E3B] outline-none font-bold" onChange={(e)=>setTravelers(Number(e.target.value))}>
                                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Traveler{n>1?'s':''}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <button onClick={() => setStep(4)} disabled={!travelDate} className="w-full py-4 bg-[#E76F51] text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50">Review Final Package</button>
                    <button onClick={()=>setStep(2)} className="w-full text-xs font-bold text-gray-400">Back to Comparison</button>
                </div>
            </div>
          </div>
        )}

        {/* Step 4: Final Confirmation */}
        {step === 4 && (
          <div className="animate-in slide-in-from-bottom-8 duration-500 max-w-2xl mx-auto pb-20">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-[#355E3B] p-10 text-white relative">
                    <UserCheck className="absolute top-10 right-10 text-white/20" size={80} />
                    <p className="text-xs font-black uppercase tracking-widest text-[#E76F51] mb-2">Final Summary</p>
                    <h2 className="text-3xl font-bold">{selectedOperator.name}</h2>
                    <p className="text-white/60 text-sm mt-1">{destinations.find(d=>d.id===selectedDestination).name}</p>
                </div>

                <div className="p-10 space-y-6">
                    <div className="flex justify-between items-center py-4 border-b border-gray-50">
                        <span className="text-gray-400 font-bold text-xs uppercase">Vehicle & Facilitation</span>
                        <span className="text-[#355E3B] font-bold text-sm">{selectedOperator.vehicle}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-50">
                        <span className="text-gray-400 font-bold text-xs uppercase">Personalized Guide</span>
                        <span className="text-[#355E3B] font-bold text-sm">{preferences.language} Speaking</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-50">
                        <span className="text-gray-400 font-bold text-xs uppercase">Date</span>
                        <span className="text-[#355E3B] font-bold text-sm">{new Date(travelDate).toLocaleDateString()}</span>
                    </div>

                    <div className="pt-6">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <p className="text-[10px] text-gray-400 font-black uppercase">Total Investment</p>
                                <p className="text-4xl font-black text-[#E76F51]">KES {(selectedOperator.price * travelers).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 font-bold uppercase italic">Includes tax & park fees</p>
                            </div>
                        </div>

                        <button onClick={handleCompleteBooking} className="w-full py-5 bg-[#355E3B] text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#2d4d32] transition-colors">
                            <Clock size={24} /> Confirm & Secure with Escrow
                        </button>
                    </div>
                </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}