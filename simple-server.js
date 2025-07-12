const express = require('express');
const path = require('path');
const app = express();
const PORT = 8888;

// Build フォルダから静的ファイルを提供
app.use(express.static(path.join(__dirname, 'build')));

// 全てのルートでindex.htmlを返す（SPAのため）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`You can now view gyouza-blog in the browser.`);
  console.log(`  Local:            http://localhost:${PORT}`);
});