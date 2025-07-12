import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchSanity, queries, urlFor } from '../lib/sanity'
import { BlogPost as BlogPostType } from '../types/blog'
import PortableText from '../components/PortableText'
import SEO from '../components/SEO'

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('記事のスラッグが見つかりません')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await fetchSanity(queries.postBySlug, { slug })
        
        if (!data) {
          setError('記事が見つかりません')
        } else {
          setPost(data)
        }
      } catch (err) {
        setError('記事の取得に失敗しました')
        console.error('Error fetching post:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">記事を読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">
              {error || '記事が見つかりません'}
            </div>
            <Link
              to="/blog"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ブログ一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || `${post.title} - gyouzaのブログ記事`}
        image={post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined}
        url={`/blog/${post.slug.current}`}
        type="article"
        publishedTime={post.publishedAt}
        tags={post.categories?.map(c => c.title)}
      />
      <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">
                ホーム
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link to="/blog" className="hover:text-gray-700">
                ブログ
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 truncate">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category) => (
              <span
                key={category._id}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {category.title}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center text-gray-500 text-sm">
            <time>{formatDate(post.publishedAt)}</time>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="mb-8">
            <img
              src={urlFor(post.mainImage).width(1200).height(630).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full rounded-lg shadow-lg"
            />
            {post.mainImage.alt && (
              <p className="text-sm text-gray-500 text-center mt-3">
                {post.mainImage.alt}
              </p>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {post.body && <PortableText content={post.body} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ブログ一覧に戻る
          </Link>
        </div>
      </article>
      </div>
    </>
  )
}

export default BlogPost