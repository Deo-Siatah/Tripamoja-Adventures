import { Star, Truck, Users } from 'lucide-react'

export default function OperatorCard({ operator, onSelect }) {
  const { name, rating, image, vehicle, capacity, price, featured } = operator

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all card-enter ${featured ? 'ring-2 ring-accent' : ''}`}>
      {/* Header */}
      <div className="relative h-40">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {featured && (
          <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-primary mb-1">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
        </div>

        {/* Vehicle Info */}
        <div className="bg-secondary/5 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 text-gray-700 mb-1">
            <Truck size={16} className="text-secondary" />
            <span className="text-sm font-semibold">{vehicle}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={16} className="text-secondary" />
            <span className="text-sm">Up to {capacity} passengers</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="text-2xl font-bold text-accent">KES {price}</span>
            <p className="text-gray-500 text-xs">per trip</p>
          </div>
          <button
            onClick={() => onSelect?.(operator)}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-semibold transition-colors text-sm"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  )
}
