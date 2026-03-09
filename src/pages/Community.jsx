import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react'
import { useCommunity } from '../context/CommunityContext'

export default function Community() {
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState('')
  const { posts, addPost, addReply } = useCommunity()

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, [])

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    addPost({
      author: 'You',
      avatar: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
      content: newPost,
      destination: 'Kenya',
    })
    setNewPost('')
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary/10 to-accent/10 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-2">Community</h1>
          <p className="text-gray-600 text-lg">Connect with fellow travelers and share your experiences</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Create Post Form */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handlePostSubmit} className="p-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your travel experience or find travel buddies..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              rows="4"
            />
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Post
              </button>
              <div className="flex-1" />
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-48 skeleton" />
            ))
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-600">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow card-enter">
                {/* Post Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      <p className="text-xs text-gray-500">
                        {Math.floor((Date.now() - post.date) / 3600000)} hours ago
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-800 mb-3">{post.content}</p>

                  {/* Destination Badge */}
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full">
                    📍 {post.destination}
                  </span>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 flex items-center gap-8 bg-gray-50">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors group">
                    <Heart size={18} className="group-hover:fill-accent" />
                    <span className="text-sm">Like</span>
                  </button>
                  <button
                    onClick={() => addReply(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span className="text-sm">{post.replies} Replies</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                    <Share2 size={18} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Travel Pooling CTA */}
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-black text-primary mb-4">Want to Travel Together?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Use M-Changa group travel pooling to split costs with friends and make your adventure more affordable.
          </p>
          <button className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-semibold transition-all">
            Create Travel Pool
          </button>
        </div>
      </section>
    </div>
  )
}
