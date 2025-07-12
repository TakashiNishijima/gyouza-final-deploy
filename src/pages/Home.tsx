import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchSanity, queries } from '../lib/sanity'
import { BlogPost, Profile } from '../types/blog'
import BlogCard from '../components/BlogCard'
import SEO from '../components/SEO'

const Home: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [postsData, profileData] = await Promise.all([
          fetchSanity(queries.latestPosts, { limit: 3 }),
          fetchSanity(queries.profile)
        ])
        
        setLatestPosts(postsData)
        setProfile(profileData)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <SEO
        title="gyouza - YouTuber & ブログ"
        description={profile?.bio || 'YouTubeで音楽配信やライブ配信を行うgyouzaのブログ。配信の裏話や日常のことを書いています。'}
        url="/"
        type="website"
      />
      <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-700/20 to-pink-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/15 via-transparent to-pink-900/15"></div>
        
        {/* Optimized floating elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-gradient-to-r from-pink-400/25 to-purple-600/25 rounded-full animate-float blur-md" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400/35 to-pink-600/35 rounded-full animate-float blur-sm" style={{animationDelay: '4s'}}></div>
        
        {/* Subtle sparkle effects */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute animate-pulse" style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}>
            <div className="w-1 h-1 bg-white rounded-full opacity-40"></div>
          </div>
        ))}
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-white animate-slideInUp">
              <span className="gradient-holographic bg-clip-text text-transparent text-neon hover:scale-105 transition-transform duration-300" data-text={profile?.displayName || 'gyouza'}>
                {profile?.displayName || 'gyouza'}
              </span>
            </h1>
            
            <div className="relative mb-12">
              <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed text-white/90 animate-slideInUp font-light">
                {profile?.bio || 'YouTubeで音楽配信やライブ配信を行っています。ブログでは配信の裏話や日常のことを書いています。'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-slideInUp">
              <Link
                to="/blog"
                className="btn-secondary hover-lift neon-glow transform hover:scale-105 transition-all duration-300 text-base px-8 py-3"
              >
                <span className="mr-2">📖</span>
                ブログを読む
              </Link>
              <a
                href="https://youtube.com/@celticdreamscape-i2k"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hover-lift neon-pink transform hover:scale-105 transition-all duration-300 text-base px-8 py-3"
              >
                <span className="mr-2">🎵</span>
                YouTubeを見る
              </a>
            </div>
            
            {/* Balanced floating music notes */}
            <div className="absolute top-16 left-16 text-3xl text-purple-400 opacity-30 animate-float hover:opacity-50 transition-opacity">♪</div>
            <div className="absolute top-24 right-20 text-4xl text-pink-400 opacity-25 animate-float hover:opacity-50 transition-opacity" style={{animationDelay: '1s'}}>♫</div>
            <div className="absolute bottom-20 left-1/3 text-3xl text-blue-400 opacity-35 animate-float hover:opacity-50 transition-opacity" style={{animationDelay: '3s'}}>♪</div>
          </div>
        </div>
      </section>

      {/* Enhanced Latest Posts Section */}
      <section className="py-20 sm:py-24 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-blue-900/5"></div>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="gradient-holographic bg-clip-text text-transparent text-neon">
                最新のブログ記事
              </span>
            </h2>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              音楽配信の裏話や日常のことを書いています
            </p>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-300 mx-auto"></div>
              <p className="mt-4 text-white/80">記事を読み込み中...</p>
            </div>
          ) : latestPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                {latestPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/blog"
                  className="btn-primary hover-lift"
                >
                  すべての記事を見る
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-white/80 text-lg mb-4">
                まだ記事がありません
              </div>
              <p className="text-white/60">
                近日中に記事を投稿予定です
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold text-white mb-8">
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  こんにちは！gyouzaです。YouTubeで音楽配信やライブ配信を行っています。
                </p>
                <p>
                  様々な音楽を演奏しながら、リスナーの皆さんと楽しい時間を共有したいと思っています。
                  配信では皆さんとのコミュニケーションを大切にしています。
                </p>
                <p>
                  このブログでは、配信では話しきれない裏話や日常のことを書いています。
                  ぜひゆっくりと読んでいってください。
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="btn-secondary hover-lift"
                >
                  詳しく見る →
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slideInUp">
              <div className="glass p-8 rounded-3xl hover-lift">
                <h3 className="font-bold text-white mb-3 text-lg">YouTube</h3>
                <p className="text-white/70 text-sm mb-4">
                  音楽配信とライブ配信
                </p>
                <a
                  href="https://youtube.com/@celticdreamscape-i2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 text-sm hover:text-blue-200 font-medium"
                >
                  チャンネルを見る
                </a>
              </div>
              
              <div className="glass p-8 rounded-3xl hover-lift">
                <h3 className="font-bold text-white mb-3 text-lg">ブログ</h3>
                <p className="text-white/70 text-sm mb-4">
                  配信の裏話や日常のこと
                </p>
                <Link
                  to="/blog"
                  className="text-blue-300 text-sm hover:text-blue-200 font-medium"
                >
                  記事を読む
                </Link>
              </div>
              
              <div className="glass p-8 rounded-3xl hover-lift">
                <h3 className="font-bold text-white mb-3 text-lg">note</h3>
                <p className="text-white/70 text-sm mb-4">
                  より詳しい記事
                </p>
                <a
                  href="https://note.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 text-sm hover:text-blue-200 font-medium"
                >
                  noteを見る
                </a>
              </div>
              
              <div className="glass p-8 rounded-3xl hover-lift">
                <h3 className="font-bold text-white mb-3 text-lg">お問い合わせ</h3>
                <p className="text-white/70 text-sm mb-4">
                  各種SNSから
                </p>
                <span className="text-white/60 text-sm">
                  お気軽にどうぞ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default Home