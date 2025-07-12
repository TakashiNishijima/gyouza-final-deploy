const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
  // 認証なしでパブリックな操作のみ
})

async function createSampleData() {
  try {
    // カテゴリを作成
    const musicCategory = await client.create({
      _type: 'category',
      title: '音楽',
      slug: {
        current: 'music',
        _type: 'slug'
      },
      description: '音楽に関する記事',
      color: 'blue'
    })

    const techCategory = await client.create({
      _type: 'category',
      title: 'テクノロジー',
      slug: {
        current: 'tech',
        _type: 'slug'
      },
      description: 'テクノロジーに関する記事',
      color: 'green'
    })

    // サンプルブログ記事を作成
    const post1 = await client.create({
      _type: 'blog',
      title: 'プレビューテスト記事1',
      slug: {
        current: 'preview-test-1',
        _type: 'slug'
      },
      author: 'gyouza',
      excerpt: 'これはプレビュー機能をテストするための記事です。',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'これはプレビュー機能をテストするための記事です。Sanity Studioから直接プレビューできるはずです。'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'プレビュー機能について'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'この機能により、記事を公開する前に実際の表示を確認できます。'
            }
          ]
        }
      ],
      categories: [
        {
          _type: 'reference',
          _ref: musicCategory._id
        }
      ],
      publishedAt: new Date().toISOString()
    })

    const post2 = await client.create({
      _type: 'blog',
      title: 'プレビューテスト記事2',
      slug: {
        current: 'preview-test-2',
        _type: 'slug'
      },
      author: 'gyouza',
      excerpt: '2つ目のテスト記事です。',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '2つ目のテスト記事です。複数の記事でプレビューが動作することを確認します。'
            }
          ]
        }
      ],
      categories: [
        {
          _type: 'reference',
          _ref: techCategory._id
        }
      ],
      publishedAt: new Date().toISOString()
    })

    // プロフィールを作成
    const profile = await client.create({
      _type: 'profile',
      name: 'gyouza',
      bio: 'ブログ作成者のプロフィールです。',
      email: 'gyouza@example.com',
      website: 'https://gyouza-blog.example.com',
      socialLinks: [
        {
          platform: 'twitter',
          url: 'https://twitter.com/gyouza'
        }
      ]
    })

    console.log('サンプルデータが作成されました:')
    console.log('- カテゴリ:', musicCategory._id, techCategory._id)
    console.log('- ブログ記事:', post1._id, post2._id)
    console.log('- プロフィール:', profile._id)

  } catch (error) {
    console.error('エラー:', error)
  }
}

createSampleData()