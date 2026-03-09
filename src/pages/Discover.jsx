import { useState, useEffect } from 'react'
import { Filter, Heart, Trophy, ArrowRight } from 'lucide-react'
import ExperienceCard from '../components/ExperienceCard'

export default function Discover() {
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const categories = [
    { value: 'all', label: 'All Experiences' },
    { value: 'impact', label: 'Impact Missions' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'cultural', label: 'Culture' },
  ]

  const highlightMissions = [
    {
      id: 'm1',
      type: 'impact',
      title: 'Longonot Hike for Education',
      description: 'Join a group hike to Mt. Longonot. 20% of proceeds go to the Longonot Community School Fund.',
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      impactGoal: 'Ksh 50,000 / 200,000 raised',
      operator: 'Summit Savvy Ltd',
      color: 'bg-[#355E3B]'
    },
    {
      id: 'c1',
      type: 'challenge',
      title: 'The "Crazy Hiker" Badge',
      description: 'Hike 3 mountains (Longonot, Suswa, Elephant Hill) this year to unlock a 1-year priority booking badge.',
      image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
      reward: 'Badge + 10% Lifetime Discount',
      operator: 'Peak Explorers',
      color: 'bg-[#E76F51]'
    }
  ]

  const allExperiences = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1440404/pexels-photo-1440404.jpeg',
      title: 'Hell’s Gate Valentine’s Special',
      location: 'Naivasha',
      category: 'adventure',
      promo: 'Free Bike Rental',
      operator: 'Rift Valley Trails',
      rating: 4.9,
      isChallenge: true
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3370311/pexels-photo-3370311.jpeg',
      title: 'Rhino Tracking & Conservation',
      location: 'Ol Pejeta',
      category: 'wildlife',
      isImpact: true,
      operator: 'Eco-Kenya Safaris',
      rating: 4.8
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/14144369/pexels-photo-14144369.jpeg',
      title: 'Traditional Lamu Dhow Race',
      location: 'Lamu Island',
      category: 'cultural',
      promo: 'Swahili Lunch Inc.',
      operator: 'Lamu Marine Guides',
      rating: 4.7,
      isChallenge: true
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/2555319/pexels-photo-2555319.jpeg',
      title: 'White Water Rafting Tana',
      location: 'Sagana',
      category: 'adventure',
      promo: 'Group 15% Off',
      operator: 'Savage Wilderness',
      rating: 4.9
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1666498/pexels-photo-1666498.jpeg',
      title: 'Samburu Beading Workshop',
      location: 'Samburu',
      category: 'cultural',
      isImpact: true,
      operator: 'Umoja Women’s Group',
      rating: 5.0
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg',
      title: 'Mara Migration Photography',
      location: 'Maasai Mara',
      category: 'wildlife',
      promo: 'Pro Lens Hire',
      operator: 'Wild Lens Kenya',
      rating: 4.9,
      isChallenge: true
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg',
      title: 'Ngong Hills Forest Run',
      location: 'Karen/Ngong',
      category: 'adventure',
      isChallenge: true,
      operator: 'Nairobi Running Club',
      rating: 4.6
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/2893685/pexels-photo-2893685.jpeg',
      title: 'Wasini Dolphin Discovery',
      location: 'Shimoni',
      category: 'wildlife',
      isImpact: true,
      operator: 'Blue Marine Trust',
      rating: 4.8
    }
  ]

  const filteredExperiences = activeCategory === 'all'
    ? allExperiences
    : allExperiences.filter(exp => exp.category === activeCategory || (activeCategory === 'impact' && exp.isImpact))

  return (
    <div className="bg-[#F8F5F2] min-h-screen pb-20">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[#8B5E3C] font-bold tracking-widest uppercase text-xs mb-2 block">Discovery Engine</span>
          <h1 className="text-5xl font-normal text-[#355E3B] mb-4" style={{ fontFamily: "'Playball', cursive" }}>
            Missions & Adventures
          </h1>
          <p className="text-gray-500 max-w-xl text-lg">
            Support local schools, earn the "Crazy Hiker" badge, or find Valentine's bonuses from vetted operators.
          </p>
        </div>
      </section>

      {/* Featured Missions */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {highlightMissions.map((mission) => (
            <div key={mission.id} className="relative group overflow-hidden rounded-[2.5rem] bg-white shadow-xl flex flex-col md:flex-row border border-gray-100">
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img src={mission.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase mb-4 ${mission.color}`}>
                    {mission.type === 'impact' ? <Heart size={12} /> : <Trophy size={12} />}
                    {mission.type}
                  </div>
                  <h3 className="text-2xl font-bold text-[#355E3B] mb-2">{mission.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{mission.description}</p>
                  
                  {mission.impactGoal && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-bold text-[#8B5E3C] mb-1">
                        <span>Impact Goal</span>
                        <span>25% Complete</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#355E3B] w-1/4"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs">
                    <span className="text-gray-400 block uppercase font-bold tracking-tighter">Hosted by</span>
                    <span className="text-[#355E3B] font-bold">{mission.operator}</span>
                  </div>
                  <button className="p-3 bg-[#F8F5F2] rounded-full text-[#355E3B] group-hover:bg-[#355E3B] group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.value
                    ? 'bg-[#355E3B] text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600">
            <Filter size={16} /> Filter Results
          </button>
        </div>
      </section>

      {/* Experience Grid using the ExperienceCard Component */}
      <section className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse rounded-[2rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}