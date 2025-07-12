import React, { useState, useEffect } from 'react'
import { fetchSanity, queries, urlFor } from '../lib/sanity'
import { Profile } from '../types/blog'
import SEO from '../components/SEO'

const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await fetchSanity(queries.profile)
        setProfile(data)
      } catch (err) {
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">プロフィールを読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="About - gyouza"
        description="gyouzaのプロフィールページ。YouTubeでの音楽配信活動や日常について紹介しています。"
        url="/about"
        type="website"
      />
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600">
            gyouzaについて
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Section */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {profile?.avatar && (
                <div className="flex-shrink-0">
                  <img
                    src={urlFor(profile.avatar).width(200).height(200).url()}
                    alt={profile.avatar.alt || profile.name}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {profile?.displayName || profile?.name || 'gyouza'}
                </h2>
                
                {profile?.bio && (
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {profile?.socialLinks && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {profile.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <span className="font-medium">
                          {link.displayName || link.platform}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="border-t border-gray-200">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    YouTube音楽配信について
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      YouTubeでは主に音楽配信とライブ配信を行っています。
                    </p>
                    <p>
                      様々なジャンルの音楽を演奏しながら、リスナーの皆さんとのコミュニケーションを大切にしています。
                    </p>
                    <p>
                      配信では楽しい雰囲気を心がけており、初見の方でも気軽に参加できる環境作りを目指しています。
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    ブログについて
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      このブログでは、配信では話しきれない詳しい話や日常のことを書いています。
                    </p>
                    <p>
                      音楽についてのレビューや演奏のコツ、配信の裏話なども記事にしています。
                    </p>
                    <p>
                      読者の皆さんとの交流も大切にしているので、コメントなどお気軽にどうぞ。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                お問い合わせ
              </h3>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-gray-600 mb-6">
                  ご質問やお仕事のご依頼、コラボレーションのお誘いなどがございましたら、
                  以下の方法でお気軽にお声かけください。
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">YouTube</h4>
                    <p className="text-sm text-gray-600">
                      コメント欄や<br />
                      ライブチャットで
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Twitter</h4>
                    <p className="text-sm text-gray-600">
                      DMまたは<br />
                      リプライで
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">note</h4>
                    <p className="text-sm text-gray-600">
                      コメント欄で<br />
                      お気軽に
                    </p>
                  </div>
                </div>

                {profile?.email && (
                  <div className="mt-6">
                    <p className="text-gray-600 mb-2">
                      お仕事のご依頼はこちらから：
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {profile.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default About