const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;
const buildDir = path.join(__dirname, 'build');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // デバッグログ
  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);
  
  // デフォルトでindex.htmlを提供
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  const filePath = path.join(buildDir, pathname);
  const ext = path.extname(pathname);
  
  // ファイルが存在するかチェック
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // ファイルが見つからない場合は、SPAのためindex.htmlを返す
      const indexPath = path.join(buildDir, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 
          'Content-Type': 'text/html',
          'X-Frame-Options': 'SAMEORIGIN',
          'Content-Security-Policy': "frame-ancestors 'self' localhost:3333"
        });
        res.end(data);
      });
    } else {
      // ファイルが存在する場合は、そのファイルを返す
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Internal Server Error');
          return;
        }
        
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        const headers = { 'Content-Type': contentType };
        
        // HTMLファイルの場合はiframe許可ヘッダーを追加
        if (ext === '.html') {
          headers['X-Frame-Options'] = 'SAMEORIGIN';
          headers['Content-Security-Policy'] = "frame-ancestors 'self' localhost:3333";
        }
        
        res.writeHead(200, headers);
        res.end(data);
      });
    }
  });
});

server.listen(port, () => {
  console.log(`SPA server running at http://localhost:${port}`);
});