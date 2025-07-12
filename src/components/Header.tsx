import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Enhanced Particle Background */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`
          }}></div>
        ))}
      </div>
      
      <header className="glass-enhanced sticky top-0 z-50 border-b border-white/10 shadow-glow">
        <nav className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-all duration-500">
                <span className="gradient-holographic bg-clip-text text-transparent text-neon hover:scale-105 transition-transform duration-300" data-text="gyouza">
                  gyouza
                </span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="nav-link text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:neon-glow relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">🏠</span>
                    ホーム
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
                <Link
                  to="/blog"
                  className="nav-link text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:neon-glow relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">📝</span>
                    ブログ
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
                <a
                  href="https://youtube.com/@celticdreamscape-i2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:neon-glow relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">🎵</span>
                    YouTube
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
                <Link
                  to="/about"
                  className="nav-link text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:neon-glow relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">👤</span>
                    About
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </div>
            </div>
            
            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/90 hover:text-white focus:outline-none p-3 rounded-lg hover:bg-white/10 transition-all duration-300 hover:neon-glow hover:scale-110"
              >
                <svg className={`h-6 w-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="px-4 pt-4 pb-4 space-y-2 glass rounded-xl mt-4 border border-white/10">
              <Link
                to="/"
                className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:neon-glow"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">🏠</span>
                ホーム
              </Link>
              <Link
                to="/blog"
                className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:neon-glow"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">📝</span>
                ブログ
              </Link>
              <a
                href="https://youtube.com/@celticdreamscape-i2k"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:neon-glow"
              >
                <span className="mr-3">🎵</span>
                YouTube
              </a>
              <Link
                to="/about"
                className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:neon-glow"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">👤</span>
                About
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header