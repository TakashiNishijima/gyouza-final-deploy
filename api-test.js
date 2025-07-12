const { createClient } = require('@sanity/client');
const http = require('http');
const url = require('url');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe'
});

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // CORS ヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  try {
    if (pathname === '/api/test-connection') {
      // 基本接続テスト
      const result = await client.fetch('*[0..0]');
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        message: 'Sanity connection successful',
        result: result
      }));
      
    } else if (pathname === '/api/blog-posts') {
      // ブログ記事取得
      const posts = await client.fetch('*[_type == "blog"]{_id, title, slug, author, publishedAt, excerpt}');
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        count: posts.length,
        posts: posts
      }));
      
    } else if (pathname.startsWith('/api/blog/')) {
      // 個別記事取得
      const encodedSlug = pathname.split('/api/blog/')[1];
      const slug = decodeURIComponent(encodedSlug); // URLデコード
      console.log(`Looking for post with slug: "${slug}"`);
      const post = await client.fetch('*[_type == "blog" && slug.current == $slug][0]{_id, title, slug, author, publishedAt, excerpt, body}', { slug });
      
      if (post) {
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          post: post
        }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({
          success: false,
          error: 'Post not found'
        }));
      }
      
    } else if (pathname === '/api/all-documents') {
      // 全ドキュメント取得
      const docs = await client.fetch('*[]{_type, _id, title}[0..20]');
      const typeCount = {};
      docs.forEach(doc => {
        typeCount[doc._type] = (typeCount[doc._type] || 0) + 1;
      });
      
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        totalCount: docs.length,
        typeBreakdown: typeCount,
        documents: docs
      }));
      
    } else if (pathname === '/api/create-test-post') {
      // テスト記事作成（デモ用）
      const testPost = {
        _type: 'blog',
        title: 'APIテスト記事',
        slug: {
          current: 'api-test-kiji',
          _type: 'slug'
        },
        author: 'gyouza',
        excerpt: 'これはAPIから作成されたテスト記事です。',
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'これはAPIから作成されたテスト記事です。Sanityとの接続が正常に動作していることを確認できます。'
              }
            ]
          }
        ],
        publishedAt: new Date().toISOString()
      };
      
      // 注意: 実際の作成にはトークンが必要
      res.writeHead(200);
      res.end(JSON.stringify({
        success: false,
        message: 'Test post creation requires authentication token',
        sampleData: testPost
      }));
      
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
    
  } catch (error) {
    console.error('API Error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({
      success: false,
      error: error.message
    }));
  }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Sanity API テストサーバーが http://localhost:${port} で起動しました`);
  console.log('利用可能なエンドポイント:');
  console.log('  GET /api/test-connection - 基本接続テスト');
  console.log('  GET /api/blog-posts - ブログ記事取得');
  console.log('  GET /api/all-documents - 全ドキュメント取得');
});