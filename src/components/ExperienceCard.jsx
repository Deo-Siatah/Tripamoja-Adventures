import { MapPin, Users, Zap, Gift, Heart, Star } from 'lucide-react'

export default function ExperienceCard({ experience }) {
  const {
    image,
    title,
    location,
    operator,
    promo,
    rating,
    isImpact,
    isChallenge
  } = experience

  return (
    <div className="group relative cursor-pointer">
      {/* Main Image Container */}
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 ease-out">
        
        {/* The Image with subtle zoom on hover */}
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlays: Top (for badges) and Bottom (for text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80" />

        {/* Top Badges: Logic for Promos/Impact */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {promo ? (
            <div className="bg-[#E76F51] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
              <Zap size={14} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-wider">{promo}</span>
            </div>
          ) : isImpact ? (
            <div className="bg-[#355E3B] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Heart size={14} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-wider">Impact Mission</span>
            </div>
          ) : <div />}

          {/* Rating Badge */}
          <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/30">
            <Star size={10} className="text-yellow-400 fill-current" />
            <span className="text-white text-[10px] font-bold">{rating}</span>
          </div>
        </div>

        {/* Content Section (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          
          {/* Challenge/Badge Indicator */}
          <div className="flex items-center gap-1.5 text-[#E76F51] mb-2">
            <Gift size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.1em]">
              {isChallenge ? 'Unlock Achievement' : 'Verified Experience'}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
            {title}
          </h3>

          {/* Footer Info */}
          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin size={14} className="text-[#E76F51]" />
              <span className="text-xs font-medium">{location}</span>
            </div>
            
            <div className="text-right">
              <span className="text-[9px] text-white/50 block uppercase font-bold tracking-tighter">Hosted By</span>
              <span className="text-white text-xs font-bold hover:text-[#E76F51] transition-colors">
                {operator}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Action Button (Hidden until hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
          <button className="bg-white text-[#355E3B] px-6 py-2.5 rounded-full font-bold text-sm transform scale-90 group-hover:scale-100 transition-transform">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}