import { useState, useEffect } from 'react'
import { MapPin, Zap, Radar, Navigation, Bell, User, ShieldCheck, Globe } from 'lucide-react'

export default function HiddenGems() {
  const [loading, setLoading] = useState(true)
  const [activeNotification, setActiveNotification] = useState(null)
  const [isScanning, setIsScanning] = useState(true)

  // Simulation: User is traveling. At 3 seconds, they enter the 'Ndere Island' Geofence.
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      setIsScanning(false)
    }, 1000)

    const geofenceTimer = setTimeout(() => {
      // Trigger the System Notification
      setActiveNotification({
        id: 3,
        title: "Hidden Gem Nearby!",
        message: "You just entered the Ndere Island geofence. Kendi M. has shared a secret trail here!",
        icon: <Zap className="text-white" size={18} />
      })
      
      // Auto-dismiss after 6 seconds
      setTimeout(() => setActiveNotification(null), 6000)
    }, 4000)

    return () => clearTimeout(geofenceTimer)
  }, [])

  const hiddenGems = [
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1440404/pexels-photo-1440404.jpeg',
      title: 'Ndere Island Sanctuary',
      scout: { name: 'Kendi M.', handle: '@kendi_explores', avatar: 'KM' },
      description: 'Known as the "Hanging Island". Most tourists miss the path to the higher ridge for the sunset view.',
      distance: '1.2 km away', // Very close - triggers geofence
      isNearby: true,
      tag: 'Nature'
    },
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1618519/pexels-photo-1618519.jpeg',
      title: 'Chalbi Desert Oasis',
      scout: { name: 'Ahmed L.', handle: '@desert_fox', avatar: 'AL' },
      description: 'A stunning salt lake. Our scouts recommend visiting at 6:00 AM for the mirror reflection effect.',
      distance: '450 km away',
      isNearby: false,
      tag: 'Adventure'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1529188/pexels-photo-1529188.jpeg',
      title: 'Gede Ruins Secret Path',
      scout: { name: 'Fatma S.', handle: '@coast_heritage', avatar: 'FS' },
      description: 'There is a hollow Baobab tree 50m behind the main mosque ruin that fits 4 people inside.',
      distance: '512 km away',
      isNearby: false,
      tag: 'History'
    }
  ]

  return (
    <div className="bg-[#F8F5F2] min-h-screen pb-20">
      
      {/* REAL-TIME PUSH NOTIFICATION SIMULATION */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md transition-all duration-500 transform ${activeNotification ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#1A1A1A] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
          <div className="bg-[#E76F51] p-2 rounded-xl animate-pulse">
            <Bell size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold">{activeNotification?.title}</h4>
            <p className="text-[11px] text-gray-400">{activeNotification?.message}</p>
          </div>
          <button onClick={() => setActiveNotification(null)} className="text-gray-500 hover:text-white">
            <Zap size={16} />
          </button>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#355E3B]/10 text-[#355E3B] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Globe size={12} /> International Discovery Mode
              </span>
            </div>
            <h1 className="text-5xl font-bold text-[#355E3B] mb-4">Hidden Gems</h1>
            <p className="text-gray-500 text-lg">
              Explore Kenya’s best-kept secrets shared by local scouts. All gems are bookable globally; geofencing triggers exclusive live tips when you arrive.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#F8F5F2] p-4 rounded-2xl border border-gray-200">
            <div className={`p-2 rounded-full ${isScanning ? 'bg-orange-100 text-[#E76F51] animate-spin' : 'bg-green-100 text-green-600'}`}>
              <Radar size={20} />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase">Live Radar</span>
              <span className="text-sm font-bold text-[#355E3B]">{isScanning ? 'Scanning GPS...' : 'Active: Naivasha Area'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hiddenGems.map((gem) => (
            <div key={gem.id} className="group relative">
              
              {/* Geofence Active Indicator */}
              {gem.isNearby && (
                <div className="absolute -top-3 -right-3 z-10 bg-[#E76F51] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-lg animate-bounce">
                  You are here
                </div>
              )}

              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                <div className="h-64 relative">
                  <img src={gem.image} className="w-full h-full object-cover" alt={gem.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Trust Layers for International Users */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <ShieldCheck size={12} className="text-[#355E3B]" />
                      <span className="text-[9px] font-bold text-[#355E3B]">Scout Verified</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white text-[10px] font-bold">
                      {gem.scout.avatar}
                    </div>
                    <span className="text-xs font-bold text-gray-500">{gem.scout.handle}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#355E3B] mb-2">{gem.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {gem.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-[#E76F51]">
                      <Navigation size={14} />
                      <span className="text-xs font-bold">{gem.distance}</span>
                    </div>
                    <button className="text-[#355E3B] text-xs font-black uppercase tracking-widest hover:underline">
                      View Itinerary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}