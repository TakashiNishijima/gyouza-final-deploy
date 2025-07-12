import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

const SEO: React.FC<SEOProps> = ({
  title = 'gyouza - ブログ',
  description = 'YouTubeで配信やゲーム実況を行うgyouzaのブログ。配信の裏話や日常のことを書いています。',
  image = '/og-image.jpg',
  url = 'https://gyouza-blog.netlify.app',
  type = 'website',
  publishedTime,
  modifiedTime,
  tags
}) => {
  const fullTitle = title.includes('gyouza') ? title : `${title} | gyouza`
  const fullUrl = url.startsWith('http') ? url : `https://gyouza-blog.netlify.app${url}`
  const fullImage = image.startsWith('http') ? image : `https://gyouza-blog.netlify.app${image}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={fullImage} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="gyouza Blog" />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags && tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          <meta property="article:author" content="gyouza" />
        </>
      )}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebSite',
          "name": fullTitle,
          "description": description,
          "url": fullUrl,
          "image": fullImage,
          ...(type === 'article' && {
            "author": {
              "@type": "Person",
              "name": "gyouza",
              "url": "https://gyouza-blog.netlify.app/about"
            },
            "publisher": {
              "@type": "Person",
              "name": "gyouza",
              "url": "https://gyouza-blog.netlify.app"
            },
            ...(publishedTime && { "datePublished": publishedTime }),
            ...(modifiedTime && { "dateModified": modifiedTime }),
            ...(tags && { "keywords": tags.join(", ") })
          })
        })}
      </script>
    </Helmet>
  )
}

export default SEO