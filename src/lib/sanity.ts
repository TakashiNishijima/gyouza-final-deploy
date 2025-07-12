import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe'
})

// 型を修正したfetchメソッド
export const fetchSanity = async (query: string, params?: any) => {
  try {
    if (params) {
      return await (client as any).fetch(query, params)
    } else {
      return await (client as any).fetch(query)
    }
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// GROQ queries
export const queries = {
  // 全ブログ記事を取得
  allPosts: `
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      author,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      categories[]->{
        _id,
        title,
        slug
      },
      publishedAt
    }
  `,
  
  // 特定のスラッグで記事を取得
  postBySlug: `
    *[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      excerpt,
      author,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      body,
      categories[]->{
        _id,
        title,
        slug
      },
      publishedAt
    }
  `,
  
  // 最新記事を指定数取得
  latestPosts: `
    *[_type == "blog"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      author,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      categories[]->{
        _id,
        title,
        slug
      },
      publishedAt
    }
  `,
  
  // プロフィール情報を取得
  profile: `
    *[_type == "profile"][0]{
      _id,
      name,
      bio,
      avatar{
        asset->{
          _id,
          url
        },
        alt
      },
      email,
      website,
      socialLinks
    }
  `
}