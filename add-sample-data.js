const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN || 'skpdmdZOWUKuhITxMWlVPsy5gglA80czS1Vs4lzsJhxKylZbiKFNU1o9pZ4a60phWmBOobbqxojA8g6tZ2VroZTr92crQg7kHx9BgVGx9qB4BmKlgQyCXToGgaVjBGt1pR7h9JQ7ZhF05eC2Dyqx6aZskfAHsxJPZGahqRNpDXAAgAJKuFmZ' // 書き込み用トークンが必要
});

// サンプルブログ記事を作成
async function addSampleData() {
  console.log('サンプルデータを追加中...');
  
  try {
    // プロフィールデータ
    const profile = await client.create({
      _type: 'profile',
      name: 'gyouza',
      displayName: 'gyouza',
      bio: 'YouTubeで音楽配信やライブ配信を行っています。ブログでは配信の裏話や日常のことを書いています。',
      isActive: true,
      socialLinks: [
        {
          platform: 'YouTube',
          url: 'https://youtube.com/@celticdreamscape-i2k'
        }
      ]
    });
    console.log('✅ プロフィール作成:', profile._id);

    // サンプルブログ記事
    const blogPost1 = await client.create({
      _type: 'blog',
      title: '音楽配信について',
      slug: {
        current: 'about-music-streaming'
      },
      excerpt: 'YouTubeでの音楽配信の楽しさや、リスナーの皆さんとのコミュニケーションについて書いています。',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'YouTubeでの音楽配信は本当に楽しいです。リスナーの皆さんとリアルタイムでコミュニケーションを取りながら、一緒に音楽を楽しめるのが魅力的です。'
            }
          ]
        }
      ],
      tags: ['音楽', '配信', 'YouTube'],
      publishedAt: new Date().toISOString(),
      isPublished: true
    });
    console.log('✅ ブログ記事1作成:', blogPost1._id);

    const blogPost2 = await client.create({
      _type: 'blog',
      title: '配信の裏話',
      slug: {
        current: 'behind-the-scenes'
      },
      excerpt: '音楽配信の準備から終了まで、普段は見えない配信の裏側について詳しく紹介します。',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '配信の準備は意外と時間がかかります。機材のセットアップから音質の調整まで、様々な準備が必要です。'
            }
          ]
        }
      ],
      tags: ['配信', '裏話', '機材'],
      publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1日前
      isPublished: true
    });
    console.log('✅ ブログ記事2作成:', blogPost2._id);

    console.log('\n🎉 サンプルデータの追加が完了しました！');
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
    if (error.message.includes('token')) {
      console.log('\n💡 書き込み用トークンが必要です:');
      console.log('1. https://sanity.io/manage にアクセス');
      console.log('2. プロジェクト zxcqyvgo を選択');
      console.log('3. API → Tokens → Add API token');
      console.log('4. Editor権限でトークンを作成');
      console.log('5. このファイルのYOUR_WRITE_TOKEN_HEREを置き換え');
    }
  }
}

addSampleData();