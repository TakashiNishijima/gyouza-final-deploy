import React from 'react'
import { Link } from 'react-router-dom'
import { BlogPost } from '../types/blog'
import { urlFor } from '../lib/sanity'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link to={`/blog/${post.slug.current}`} className="block animate-slideInUp group">
      <article className="card-modern hover-lift shadow-intense group relative overflow-hidden transform transition-all duration-400 hover:scale-102">
        {/* Subtle holographic border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl"></div>
        
        {/* Optimized shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
        
        {post.mainImage ? (
          <div className="aspect-video w-full overflow-hidden rounded-t-3xl relative">
            <img
              src={urlFor(post.mainImage).width(600).height(338).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="aspect-video w-full overflow-hidden rounded-t-3xl relative bg-gradient-to-br from-purple-600/15 to-pink-600/15 flex items-center justify-center">
            <div className="text-4xl text-white/40 group-hover:text-white/60 transition-colors duration-300">🎵</div>
          </div>
        )}
        
        <div className="p-6 relative z-10">
          
          <h2 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-holographic group-hover:bg-clip-text transition-all duration-300 leading-tight">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-white/80 text-sm mb-4 line-clamp-3 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <time className="text-white/60 text-xs font-medium group-hover:text-white/80 transition-colors duration-300">
              {formatDate(post.publishedAt)}
            </time>
            
            <span className="text-purple-400 text-xs font-semibold group-hover:text-pink-400 transition-colors duration-300 flex items-center neon-glow">
              続きを読む 
              <svg className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard