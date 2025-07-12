import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="relative glass-enhanced mt-16">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-blue-900/10 to-transparent"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-8 right-8 w-20 h-20 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="animate-slideInLeft">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="gradient-holographic bg-clip-text text-transparent text-neon">
                gyouza
              </span>
            </h3>
            <p className="text-white/80 leading-relaxed text-base mb-6">
              YouTubeで音楽配信やライブ配信を行っています。
              ブログでは配信の裏話や日常のことを書いています。
            </p>
            <div className="flex space-x-3">
              <div className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="text-lg">🎵</span>
              </div>
              <div className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="text-lg">📝</span>
              </div>
              <div className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300 cursor-pointer hover:scale-105">
                <span className="text-lg">🎮</span>
              </div>
            </div>
          </div>
          
          <div className="animate-slideInUp">
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="text-neon">Links</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://youtube.com/@celticdreamscape-i2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-300 flex items-center group p-2 glass rounded-lg hover:neon-glow hover:scale-102"
                >
                  <span className="mr-3 text-lg">📺</span>
                  <span className="flex-1 text-sm">YouTube</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://note.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-300 flex items-center group p-2 glass rounded-lg hover:neon-glow hover:scale-102"
                >
                  <span className="mr-3 text-lg">📝</span>
                  <span className="flex-1 text-sm">note</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-300 flex items-center group p-2 glass rounded-lg hover:neon-glow hover:scale-102"
                >
                  <span className="mr-3 text-lg">🐦</span>
                  <span className="flex-1 text-sm">Twitter</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="animate-slideInRight">
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="text-neon">Contact</span>
            </h3>
            <div className="glass p-4 rounded-xl hover:neon-glow transition-all duration-300">
              <p className="text-white/80 leading-relaxed text-sm mb-3">
                お問い合わせはYouTubeのコメント欄や
                各種SNSのDMからお気軽にどうぞ。
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/60 text-xs">オンライン</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-center md:text-left mb-3 md:mb-0 text-sm">
              &copy; 2024 gyouza. All rights reserved.
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-white/40 text-xs">Made with</span>
              <div className="flex space-x-1">
                <span className="text-red-400 animate-pulse text-sm">❤️</span>
                <span className="text-blue-400 text-sm">⚛️</span>
                <span className="text-green-400 text-sm">🎵</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer