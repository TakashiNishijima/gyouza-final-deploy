const { createClient } = require('@sanity/client');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Sanity クライアント設定
const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN || 'sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe'
});

// 静的ファイル配信とAPI処理を統合したサーバー
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // CORS ヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // API エンドポイント処理
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');
    
    try {
      if (pathname === '/api/blog-posts') {
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
        const slug = decodeURIComponent(encodedSlug);
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
        
      } else if (pathname === '/api/about') {
        // Aboutページのデータ取得
        const about = await client.fetch('*[_type == "about"][0]{_id, title, content}');
        
        if (about) {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            about: about
          }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({
            success: false,
            error: 'About page not found'
          }));
        }
        
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
      }
      
    } catch (error) {
      console.error('API Error:', error);
      res.writeHead(500);
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
    
  } else {
    // 静的ファイル配信
    let filePath;
    
    if (pathname === '/' || pathname === '/index.html') {
      filePath = path.join(__dirname, 'build', 'index.production.html');
    } else if (pathname.startsWith('/blog') || pathname.startsWith('/about')) {
      // SPA routing - すべてindex.htmlにフォールバック
      filePath = path.join(__dirname, 'build', 'index.production.html');
    } else {
      // その他の静的ファイル
      filePath = path.join(__dirname, 'build', pathname);
    }
    
    // ファイルが存在しない場合はindex.htmlにフォールバック
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(__dirname, 'build', 'index.production.html');
    }
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.error('File read error:', err);
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      
      // Content-Typeを設定
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      
      switch (ext) {
        case '.js': contentType = 'application/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': case '.jpeg': contentType = 'image/jpeg'; break;
        case '.ico': contentType = 'image/x-icon'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
      }
      
      res.setHeader('Content-Type', contentType);
      res.writeHead(200);
      res.end(content);
    });
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 Gyouza Official Site running at http://localhost:${port}`);
  console.log(`📁 Serving static files from: ./build/`);
  console.log(`🔌 API endpoints available at: /api/*`);
  console.log(`🎯 Environment: ${process.env.NODE_ENV || 'development'}`);
});