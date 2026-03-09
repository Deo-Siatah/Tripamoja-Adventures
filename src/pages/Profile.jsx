import { useState } from 'react'
import { LogOut, Edit2, Bookmark, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const [editing, setEditing] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">My Profile</h1>
          <p>Manage your account and travel preferences</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 card-enter">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-3xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-primary">Karibu Traveler</h2>
              <p className="text-gray-600">Member since January 2024</p>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="px-6 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary/5 font-semibold transition-all inline-flex items-center gap-2"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Email</label>
              <p className="text-gray-900">traveler@tripamoja.com</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Phone</label>
              <p className="text-gray-900">+254 700 000 000</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Location</label>
              <p className="text-gray-900">Nairobi, Kenya</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Verified</label>
              <p className="text-green-600 font-semibold">✓ Verified Identity</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 card-enter">
            <div className="text-3xl mb-3">🔖</div>
            <h3 className="font-bold text-primary mb-2">Saved Trips</h3>
            <p className="text-2xl font-black text-accent">8</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 card-enter">
            <div className="text-3xl mb-3">✈️</div>
            <h3 className="font-bold text-primary mb-2">Completed Trips</h3>
            <p className="text-2xl font-black text-accent">3</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 card-enter">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-bold text-primary mb-2">Reviews Left</h3>
            <p className="text-2xl font-black text-accent">12</p>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 card-enter">
          <h3 className="text-xl font-black text-primary mb-6">Travel Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Preferred trip length</span>
              <span className="font-semibold text-gray-900">3-5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Budget range</span>
              <span className="font-semibold text-gray-900">50,000 - 150,000 KES</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Interests</span>
              <span className="font-semibold text-gray-900">Wildlife, Adventure, Cultural</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Travel mode</span>
              <span className="font-semibold text-gray-900">Group tours</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all inline-flex items-center justify-center gap-2">
            <Settings size={18} />
            Settings & Security
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-semibold transition-all inline-flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}
