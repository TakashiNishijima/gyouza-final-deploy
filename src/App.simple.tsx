import React from 'react'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #333', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>gyouza Blog</h1>
        <nav style={{ marginTop: '10px' }}>
          <a href="#" style={{ marginRight: '20px', color: '#666' }}>ホーム</a>
          <a href="#" style={{ marginRight: '20px', color: '#666' }}>ブログ</a>
          <a href="#" style={{ marginRight: '20px', color: '#666' }}>About</a>
        </nav>
      </header>

      <main>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Welcome to gyouza Blog</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            YouTubeで配信やゲーム実況を行うgyouzaのブログです。
            配信の裏話や日常のことを書いています。
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>最新記事</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>記事タイトル 1</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                記事の概要がここに表示されます。Sanity CMSからデータを取得して表示します。
              </p>
              <span style={{ color: '#999', fontSize: '14px' }}>2024年1月1日</span>
            </div>
            
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>記事タイトル 2</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                記事の概要がここに表示されます。Sanity CMSからデータを取得して表示します。
              </p>
              <span style={{ color: '#999', fontSize: '14px' }}>2024年1月2日</span>
            </div>
            
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>記事タイトル 3</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                記事の概要がここに表示されます。Sanity CMSからデータを取得して表示します。
              </p>
              <span style={{ color: '#999', fontSize: '14px' }}>2024年1月3日</span>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>About</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            YouTubeでゲーム実況やライブ配信を行っています。
            視聴者の皆さんとのコミュニケーションを大切にしています。
          </p>
          <div style={{ marginTop: '20px' }}>
            <a 
              href="https://youtube.com/@celticdreamscape-i2k" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block', 
                backgroundColor: '#ff0000', 
                color: 'white', 
                padding: '10px 20px', 
                textDecoration: 'none', 
                borderRadius: '5px',
                marginRight: '10px'
              }}
            >
              YouTubeを見る
            </a>
            <a 
              href="https://note.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block', 
                backgroundColor: '#00c492', 
                color: 'white', 
                padding: '10px 20px', 
                textDecoration: 'none', 
                borderRadius: '5px'
              }}
            >
              noteを見る
            </a>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '2px solid #333', marginTop: '40px', paddingTop: '20px' }}>
        <p style={{ color: '#666', textAlign: 'center' }}>
          &copy; 2024 gyouza. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App