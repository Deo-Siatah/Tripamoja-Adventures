import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, Sparkles, Globe } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Discover', path: '/discover' },
    { label: 'Hidden Gems', path: '/hidden-gems' },
    { label: 'Community', path: '/community' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#F8F5F2]/95 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Tagline - Refined Uniformity */}
          <Link to="/" className="flex-shrink-0 flex flex-col group py-2">
            <div 
              className="text-4xl md:text-5xl text-[#355E3B] font-normal leading-none transition-all group-hover:tracking-wide" 
              style={{ fontFamily: "'Playball', cursive" }}
            >
              Tripamoja
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] md:text-xs text-[#8B5E3C] font-bold tracking-[0.2em] uppercase italic opacity-80">
                Experience your destination
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Clean & Balanced */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-base transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#355E3B] font-bold bg-[#355E3B]/5'
                    : 'text-gray-600 hover:text-[#355E3B] hover:bg-gray-100 font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side buttons - Scaled down for "Uniform" look */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
              aria-label="User Profile"
            >
              <User size={20} />
            </button>
            
            {/* AI Assistant - Slimmer Profile */}
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-[#E76F51]/10 hover:bg-[#E76F51]/20 rounded-full transition-all text-[#E76F51] font-bold text-sm border border-[#E76F51]/20"
            >
              <Sparkles size={16} />
              <span>AI Planner</span>
            </button>

            {/* CTA Button - Standardized size */}
            <Link
              to="/booking"
              className="px-5 py-2 bg-[#355E3B] text-[#F8F5F2] text-sm rounded-full hover:bg-[#355E3B]/90 font-bold transition-all shadow-sm hover:shadow-md"
            >
              Plan Experience
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button className="p-2 text-[#E76F51]">
              <Sparkles size={22} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-700"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-1 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-5 py-3 rounded-xl text-lg ${
                    isActive(link.path)
                      ? 'text-[#355E3B] font-bold bg-[#355E3B]/10'
                      : 'text-gray-700 font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 mt-4">
                <Link
                  to="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-3 bg-[#355E3B] text-[#F8F5F2] rounded-full text-center font-bold shadow-md"
                >
                  Plan Experience
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}