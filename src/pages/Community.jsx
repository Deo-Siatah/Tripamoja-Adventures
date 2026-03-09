import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Plus, Image as ImageIcon, Star, MapPin, Users, CheckCircle, X } from 'lucide-react'
import { useCommunity } from '../context/CommunityContext'
import PoolingDetail from './PoolingDetail' // Ensure the path is correct

export default function Community() {
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState('')
  const [activeTab, setActiveTab] = useState('feed') 
  const [showPoolingDetail, setShowPoolingDetail] = useState(false) // Logic for the button
  const { posts, addPost, addReply } = useCommunity()

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    addPost({
      author: 'John Doe',
      role: 'Traveler',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      content: newPost,
      destination: 'Amboseli',
      likes: 0,
      replies: 0,
      rating: 5,
      operatorTag: 'Savage Wilderness'
    })
    setNewPost('')
  }

  const trendingTopics = ['#HellsGateCycling', '#ScoutFinds', '#LamuCulturalFest', '#BudgetKenya']

  return (
    <div className="bg-[#F8F5F2] min-h-screen">
      {/* POOLING DETAIL OVERLAY */}
      {showPoolingDetail && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowPoolingDetail(false)} 
          />
          <div className="relative w-full max-w-4xl bg-[#F8F5F2] h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-500">
            <button 
              onClick={() => setShowPoolingDetail(false)}
              className="absolute top-6 left-6 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-[#355E3B]" />
            </button>
            <PoolingDetail />
          </div>
        </div>
      )}

      {/* Dynamic Community Header */}
      <section className="bg-white border-b border-gray-100 pt-12 pb-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#355E3B] mb-2">Social Discovery</h1>
              <p className="text-gray-500">Real stories, real ratings, and real travel buddies.</p>
            </div>
            <div className="flex gap-2">
              {['feed', 'scouts', 'pooling'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab ? 'bg-[#355E3B] text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {trendingTopics.map(tag => (
              <span key={tag} className="text-[11px] font-bold text-[#8B5E3C] bg-[#8B5E3C]/5 px-3 py-1 rounded-full cursor-pointer hover:bg-[#8B5E3C]/10 whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Feed & Input */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Post Creator */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <form onSubmit={handlePostSubmit} className="p-6">
              <div className="flex gap-4 mb-4">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="w-10 h-10 rounded-full object-cover" alt="User" />
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Where did you go? How was the logistics operator?"
                  className="w-full p-2 text-gray-700 placeholder-gray-400 border-none focus:ring-0 resize-none text-lg"
                  rows="3"
                />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex gap-4">
                  <button type="button" className="text-gray-400 hover:text-[#355E3B] flex items-center gap-1">
                    <ImageIcon size={18} /> <span className="text-xs font-bold">Photo</span>
                  </button>
                  <button type="button" className="text-gray-400 hover:text-[#355E3B] flex items-center gap-1">
                    <MapPin size={18} /> <span className="text-xs font-bold">Tag Site</span>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newPost.trim()}
                  className="px-8 py-2 bg-[#E76F51] text-white rounded-full font-bold hover:bg-[#d4644a] transition-all disabled:opacity-50"
                >
                  Post Story
                </button>
              </div>
            </form>
          </div>

          {/* Interaction Feed */}
          <div className="space-y-6">
            {loading ? (
               [...Array(2)].map((_, i) => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-[2rem]" />)
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:border-[#355E3B]/20 transition-all">
                  <div className="p-8">
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={post.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                          {post.role === 'Scout' && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white">
                              <CheckCircle size={10} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#355E3B]">{post.author}</h4>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${post.role === 'Scout' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                              {post.role}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Just now • {post.destination}</p>
                        </div>
                      </div>
                      
                      {/* Operator Rating Integration */}
                      {post.operatorTag && (
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-orange-400 mb-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < post.rating ? "currentColor" : "none"} />)}
                          </div>
                          <span className="text-[9px] font-bold text-gray-400">Via {post.operatorTag}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {post.content}
                    </p>

                    {/* Social Stats */}
                    <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-[#E76F51] transition-colors">
                        <Heart size={18} />
                        <span className="text-xs font-bold">{post.likes || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-[#355E3B] transition-colors">
                        <MessageCircle size={18} />
                        <span className="text-xs font-bold">{post.replies} Replies</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-[#355E3B] transition-colors ml-auto">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Community Insights */}
        <div className="space-y-6">
          {/* Smart Pooling CTA Card */}
          <div className="bg-[#355E3B] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <Users className="mb-4 text-[#E76F51]" size={32} />
              <h3 className="text-xl font-bold mb-2">Split the Cost</h3>
              <p className="text-white/70 text-sm mb-6">We found 4 travelers heading to the Mara migration next week. Join the pool and save up to 40%.</p>
              <button 
                onClick={() => setShowPoolingDetail(true)}
                className="w-full py-3 bg-[#E76F51] rounded-xl font-bold text-sm hover:scale-105 transition-transform"
              >
                Browse Active Pools
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
          </div>

          {/* Top Rated Operators (Community Verified) */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100">
            <h3 className="text-sm font-black text-[#355E3B] uppercase tracking-widest mb-6">Community Favorites</h3>
            <div className="space-y-4">
              {[
                { name: 'Savage Wilderness', score: 4.9, trips: 124 },
                { name: 'Rift Valley Trails', score: 4.8, trips: 89 },
                { name: 'Summit Savvy', score: 4.7, trips: 210 }
              ].map((op, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <span className="block text-sm font-bold text-[#355E3B]">{op.name}</span>
                    <span className="text-[10px] text-gray-400">{op.trips} verified bookings</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#E76F51]">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold">{op.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}