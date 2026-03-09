import { Zap, MapPin } from 'lucide-react'

export default function HiddenGemCard({ gem, nearby }) {
  const { image, title, description, distance, difficulty } = gem

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all card-enter">
      {/* Image with overlay */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {nearby && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
            <div className="flex items-center gap-2 text-white mb-2">
              <Zap size={20} className="text-yellow-400" />
              <span className="font-bold">You are near a hidden gem!</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>

        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4 pb-4 border-b">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={14} className="text-secondary" />
            <span className="text-sm">{distance}km away</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {difficulty} hike
            </span>
          </div>
        </div>

        <button className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-semibold transition-colors">
          Learn More
        </button>
      </div>
    </div>
  )
}
