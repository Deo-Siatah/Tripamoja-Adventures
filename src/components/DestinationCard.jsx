import { Star, MapPin } from 'lucide-react'

export default function DestinationCard({ destination }) {
  const { image, title, description, price, rating, location, category } = destination

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow card-enter">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-primary mb-1">{title}</h3>

        <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
          <MapPin size={14} />
          <span>{location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
          <span className="text-gray-500 text-sm">(125 reviews)</span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-secondary">KES {price}</span>
            <p className="text-gray-500 text-sm">per person</p>
          </div>
          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-semibold transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
