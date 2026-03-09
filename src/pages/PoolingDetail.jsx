import { useState } from 'react'
import { Users, Shield, TrendingDown, CheckCircle2, MessageSquare, Info, Wallet, ArrowRight, Clock, AlertCircle, X } from 'lucide-react'

export default function PoolingDetail({ poolId = "POOL-204" }) {
  // 1. FUNCTIONAL STATE MANAGEMENT
  const [hasJoined, setHasJoined] = useState(false)
  const [loading, setLoading] = useState(false)
  const [slotsFilled, setSlotsFilled] = useState(4) // Start with 4 people
  const totalSlots = 6

  // 2. DATA MODEL
  const poolData = {
    id: poolId,
    title: "Maasai Mara Migration Safari",
    operator: "Savage Wilderness",
    basePrice: 1200,
    compatibilityScore: 94,
    members: [
      { name: "Sarah W.", origin: "UK", style: "Photography", avatar: "SW" },
      { name: "Marc K.", origin: "Germany", style: "Wildlife", avatar: "MK" },
      { name: "Elena R.", origin: "Italy", style: "Culture", avatar: "ER" },
      { name: "You (Pending)", origin: "Global", style: "Adventure", avatar: "U" }
    ]
  }

  // 3. DYNAMIC PRICING LOGIC
  const calculatePrice = (people) => {
    if (people >= 6) return 700  // Max discount
    if (people >= 4) return 850  // Current discount
    return 1100                  // Minimum discount
  }

  const currentPeopleCount = hasJoined ? slotsFilled + 1 : slotsFilled
  const currentPrice = calculatePrice(currentPeopleCount)
  const savings = poolData.basePrice - currentPrice

  // 4. ACTION HANDLER
  const handleJoinPool = () => {
    setLoading(true)
    // Simulate API Call to Tripamoja Escrow / M-Pesa
    setTimeout(() => {
      setHasJoined(true)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-[#F8F5F2] min-h-screen py-12 px-4 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Pool Stats & Compatibility */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="bg-[#E76F51]/10 text-[#E76F51] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Active Pool</span>
                <h1 className="text-3xl font-bold text-[#355E3B] mt-2">{poolData.title}</h1>
                <p className="text-gray-500 text-sm italic">Organized by {poolData.operator}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-[#E76F51]">${currentPrice}</div>
                <div className="text-[10px] text-gray-400 line-through">Was ${poolData.basePrice}</div>
              </div>
            </div>

            {/* Real-time Occupancy Tracker */}
            <div className="bg-[#F8F5F2] rounded-2xl p-6 mb-8 border border-dashed border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#355E3B]" />
                  <span className="font-bold text-[#355E3B] text-sm uppercase tracking-tighter">Pool Occupancy</span>
                </div>
                <span className="text-[#355E3B] font-black">{currentPeopleCount} / {totalSlots} Slots</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                    className="bg-[#E76F51] h-full transition-all duration-1000" 
                    style={{ width: `${(currentPeopleCount / totalSlots) * 100}%` }} 
                />
              </div>
              
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-[#355E3B]" />
                  <span className="font-bold text-[#355E3B] text-xs">AI Compatibility: {poolData.compatibilityScore}%</span>
                </div>
                <p className="text-[11px] text-gray-500">Matched via <strong>Travel Style Clustering</strong></p>
              </div>
            </div>

            {/* Traveler Profiles */}
            <h3 className="font-bold text-[#355E3B] mb-4 flex items-center gap-2">
              <Users size={18} /> Your Potential Travel Buddies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {poolData.members.map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#8B5E3C] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {m.avatar}
                  </div>
                  <span className="block text-xs font-bold text-[#355E3B]">{m.name}</span>
                  <span className="text-[10px] text-gray-400">{m.style}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Verification */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100">
            <h3 className="font-bold text-[#355E3B] mb-6">Verified Logistics</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-2 rounded-lg text-green-600"><CheckCircle2 size={20}/></div>
                <div>
                  <p className="text-sm font-bold text-[#355E3B]">Vehicle Optimization</p>
                  <p className="text-xs text-gray-500 leading-relaxed">This pool fills a 6-seater Land Cruiser perfectly, reducing transport cost by 40%.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Info size={20}/></div>
                <div>
                  <p className="text-sm font-bold text-[#355E3B]">Escrow Protection</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Funds are held in Tripamoja Escrow. 100% Refundable if the pool doesn't reach 4 members.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Booking & Payment */}
        <div className="space-y-6">
          <div className="bg-[#355E3B] rounded-[2.5rem] p-8 text-white shadow-xl sticky top-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <TrendingDown className="text-[#E76F51]" />
                    <span className="text-xs font-black uppercase tracking-widest text-[#E76F51]">Smart Savings</span>
                </div>
                <div className="flex items-center gap-1 text-orange-300">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold">04:59</span>
                </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Individual Booking</span>
                <span>${poolData.basePrice}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-green-400">
                <span>Pooling Discount</span>
                <span>-${savings}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-2xl">
                <span>Total Due</span>
                <span>${currentPrice}</span>
              </div>
            </div>

            {hasJoined ? (
              <div className="bg-white/10 p-4 rounded-2xl mb-4 border border-white/10 text-center">
                <CheckCircle2 className="text-green-400 mx-auto mb-2" size={24} />
                <p className="text-sm font-bold">Slot Secured!</p>
                <p className="text-[10px] text-white/50 mt-1">Receipt sent to your email.</p>
              </div>
            ) : (
              <button 
                onClick={handleJoinPool}
                disabled={loading}
                className="w-full py-4 bg-[#E76F51] rounded-2xl font-black text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
              >
                {loading ? "Processing..." : <><Wallet size={18} /> Join Pool & Pay</>}
              </button>
            )}
            
            <p className="text-[10px] text-white/40 text-center uppercase font-bold mb-8">
              Secure Payment via Tripamoja Gateway
            </p>

            <div className="pt-8 border-t border-white/10">
              <p className="text-xs text-white/60 mb-4 font-medium italic">Have your own group? Use M-Changa for private savings.</p>
              <button className="w-full py-3 border border-white/20 rounded-xl text-xs font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                Switch to M-Changa Group <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Group Chat Preview */}
          <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#355E3B]" />
                    <h4 className="font-bold text-sm text-[#355E3B]">Pool Chat</h4>
                </div>
                {!hasJoined && <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-400 uppercase font-bold">Locked</span>}
             </div>
             <div className={`space-y-3 ${!hasJoined ? 'blur-[2px] pointer-events-none select-none' : ''}`}>
                <div className="bg-gray-50 p-2 rounded-lg"><p className="text-[10px] text-gray-500"><strong>Marc:</strong> Is everyone bringing long lenses?</p></div>
                <div className="bg-gray-50 p-2 rounded-lg"><p className="text-[10px] text-gray-500"><strong>Sarah:</strong> Yes! Can't wait for the sunset drive.</p></div>
             </div>
             {!hasJoined && <p className="text-[10px] text-center text-gray-400 mt-2 italic">Join the pool to chat with members</p>}
          </div>
        </div>
      </div>
    </div>
  )
}