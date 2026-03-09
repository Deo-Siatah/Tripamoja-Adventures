import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Users, MapPin, ArrowUpRight, Camera,Globe } from 'lucide-react'
import SearchBar from '../components/SearchBar'

export default function Home({ onOpenChat }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  // Experience-based data with Pexels URLs
  const experiences = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg',
      title: 'The Great Migration',
      tag: 'Wildlife',
      scout: 'Moraa W.',
      attendees: 14
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
      title: 'Diani Blue Waters',
      tag: 'Coastal',
      scout: 'Ali H.',
      attendees: 28
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1666498/pexels-photo-1666498.jpeg',
      title: 'Traditional Manyatta Life',
      tag: 'Culture',
      scout: 'Leshore S.',
      attendees: 6
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/6318162/pexels-photo-6318162.jpeg',
      title: 'Mount Kenya Sunsets',
      tag: 'Adventure',
      scout: 'Karanja J.',
      attendees: 19
    },
  ]

  return (
    <div className="bg-[#F8F5F2] min-h-screen font-inter">
      
      {/* Hero Section - High Visual Impact */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg" 
          alt="Kenyan Landscape"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Darker overlay for text readability */}
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <span className="text-[#E76F51] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            The World's Gateway to Kenya
          </span>
          <h1 className="text-6xl md:text-8xl text-white mb-6 drop-shadow-lg" style={{ fontFamily: "'Playball', cursive" }}>
            Experience your destination
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Skip the generic tours. Connect with local scouts, join community pools, and explore the hidden heart of Kenya.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onOpenChat}
              className="px-10 py-4 bg-[#E76F51] text-white rounded-full font-bold text-lg hover:bg-[#E76F51]/90 flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-1"
            >
              <Sparkles size={20} /> Plan with AI Assistant
            </button>
            <Link
              to="/discover"
              className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Discover Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Search - Clean & Modern */}
      <div className="max-w-6xl mx-auto -mt-16 relative z-30 px-4">
        <div className="bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-100">
           <SearchBar />
        </div>
      </div>

      {/* Experience Grid - The "Instagram" Style Discovery */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-[#355E3B] mb-4">Live Community Moments</h2>
            <p className="text-gray-500 text-lg">Real experiences discovered by our scouts and shared by our community. No stock itineraries here.</p>
          </div>
          <button className="flex items-center gap-2 text-[#8B5E3C] font-bold hover:gap-3 transition-all group">
            Explore All Hidden Gems <ArrowUpRight size={20} className="text-[#E76F51]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="group cursor-pointer">
              <div className="relative h-[450px] w-full overflow-hidden rounded-[2.5rem] mb-4 shadow-lg transition-all duration-500 group-hover:rounded-[1.5rem] group-hover:shadow-2xl">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="bg-[#E76F51] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
                    {exp.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{exp.title}</h3>
                  <div className="flex items-center justify-between mt-4 border-t border-white/20 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 border border-white flex items-center justify-center overflow-hidden">
                         <Camera size={14} className="text-gray-600" />
                      </div>
                      <span className="text-white/80 text-xs font-medium italic">By {exp.scout}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90 text-xs font-bold bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                      <Users size={12} /> {exp.attendees} Joined
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="bg-[#355E3B] py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
           <Globe size={400} className="text-white translate-x-1/2 -translate-y-1/4" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Stop booking trips. <br/>Start creating stories.
          </h2>
          <p className="text-[#F8F5F2]/80 text-xl mb-12 font-light">
            Our AI-driven pooling system matches you with compatible travelers to split costs while keeping the experience authentic.
          </p>
          <button className="px-12 py-5 bg-[#F8F5F2] text-[#355E3B] rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl">
            Join the Tripamoja Community
          </button>
        </div>
      </section>

    </div>
  )
}