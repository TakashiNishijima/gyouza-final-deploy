export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  author: string
  mainImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  body?: Array<{
    _type: string
    children?: Array<{
      _type: string
      text: string
      marks?: string[]
    }>
    style?: string
    listItem?: string
  }>
  categories?: Category[]
  publishedAt: string
}

export interface Profile {
  _id: string
  name: string
  displayName?: string
  bio?: string
  avatar?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  socialLinks?: Array<{
    platform: string
    url: string
    displayName?: string
  }>
  website?: string
  email?: string
}