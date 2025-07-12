import React, { useState, useEffect } from 'react'
import { fetchSanity, queries } from '../lib/sanity'
import { BlogPost } from '../types/blog'
import BlogCard from '../components/BlogCard'
import SEO from '../components/SEO'

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await fetchSanity(queries.allPosts)
        setPosts(data)
      } catch (err) {
        setError('ブログ記事の取得に失敗しました')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-300 mx-auto"></div>
            <p className="mt-4 text-white/80">記事を読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-400 text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              再読み込み
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="ブログ記事一覧"
        description="gyouzaのブログ記事一覧。音楽配信の裏話や日常のことを書いています。"
        url="/blog"
        type="website"
      />
      <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              ブログ記事
            </span>
          </h1>
          <p className="text-xl text-white/80">
            音楽配信の裏話や日常のことを書いています
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-white/80 text-lg">
              まだ記事がありません
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default BlogList