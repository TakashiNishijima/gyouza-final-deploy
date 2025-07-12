const http = require('http');
const fs = require('fs');
const path = require('path');

// 簡単なSPAサーバー
const server = http.createServer((req, res) => {
  const url = req.url;
  
  // CORS ヘッダー
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${url}`);
  
  // 静的ファイルのパス
  let filePath = path.join(__dirname, 'build', url === '/' ? 'index.html' : url);
  
  // ファイルが存在しない場合はindex.htmlにフォールバック（SPA用）
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'build', 'index.html');
  }
  
  // ファイルを読み込んで送信
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
    }
    
    res.setHeader('Content-Type', contentType);
    res.writeHead(200);
    res.end(content);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`🚀 Simple SPA Server running at http://localhost:${port}`);
  console.log('📁 Serving files from: ./build/');
  console.log('🔄 All routes fallback to index.html for SPA routing');
});