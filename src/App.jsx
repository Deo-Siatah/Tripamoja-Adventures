import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import ChatDrawer from './components/ChatDrawer'
import PageLoader from './components/PageLoader'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { CommunityProvider } from './context/CommunityContext'

// Pages
import Home from './pages/Home'
import Discover from './pages/Discover'
import HiddenGems from './pages/HiddenGems'
import Community from './pages/Community'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import Itinerary from './pages/Itinerary'
import EscrowQR from './pages/EscrowQR'
import Dashboard from './pages/Dashboard'
import PayPage from './pages/PayPage'   // ← ADDED

function AppContent() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral">
      <PageLoader />
      <Navbar />

      <main className="flex-1">
        <Routes>

          {/* Main Pages */}
          <Route path="/" element={<Home onOpenChat={() => setChatOpen(true)} />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/hidden-gems" element={<HiddenGems />} />
          <Route path="/community" element={<Community />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Booking Flow */}
          <Route path="/itinerary/:id" element={<Itinerary />} />
          <Route path="/pay/:id" element={<PayPage />} />   {/* ← PAYMENT PAGE */}
          <Route path="/escrow-qr/:id" element={<EscrowQR />} />

        </Routes>
      </main>

      {/* Chat Assistant */}
      <ChatDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Floating AI Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
          title="Open AI Assistant"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
            10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8
            s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 
            1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 
            9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 
            1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 
            7.67 11 8.5 11zm3.5 6.5c2.33 0 
            4.31-1.46 5.11-3.5H6.89c.8 
            2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <CommunityProvider>
            <AppContent />
          </CommunityProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}