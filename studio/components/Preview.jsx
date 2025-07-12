import React, { useState } from 'react'

const Preview = ({document}) => {
  const {displayed} = document
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  // デバッグ情報をコンソールに出力
  console.log('Preview component - document:', document)
  console.log('Preview component - displayed:', displayed)
  
  if (!displayed || !displayed.slug?.current) {
    return (
      <div style={{padding: '20px', textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div>
          <h3 style={{margin: '0 0 10px 0', color: '#666'}}>プレビューできません</h3>
          <p style={{margin: '0 0 10px 0', color: '#999'}}>記事のスラッグを設定してください</p>
          <details style={{marginTop: '20px', textAlign: 'left'}}>
            <summary style={{cursor: 'pointer', color: '#666'}}>デバッグ情報</summary>
            <pre style={{background: '#f5f5f5', padding: '10px', margin: '10px 0', fontSize: '12px', overflow: 'auto'}}>
              {JSON.stringify({
                hasDocument: !!document,
                hasDisplayed: !!displayed,
                displayedKeys: displayed ? Object.keys(displayed) : [],
                slug: displayed?.slug,
                title: displayed?.title
              }, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    )
  }

  const previewUrl = `http://localhost:8081/blog/${displayed.slug.current}?preview=true`
  
  // デバッグ: URLをコンソールに出力
  console.log('Preview URL:', previewUrl)
  
  const handleLoad = () => {
    console.log('iframe loaded successfully')
    setLoading(false)
    setError(false)
  }
  
  const handleError = () => {
    console.log('iframe failed to load')
    setLoading(false)
    setError(true)
  }
  
  return (
    <div style={{height: '100vh', width: '100%', position: 'relative'}}>
      {/* ヘッダー */}
      <div style={{
        padding: '10px', 
        background: '#f1f3f4', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        position: 'relative'
      }}>
        <span style={{fontSize: '14px', color: '#666'}}>
          プレビュー: {displayed.title || 'タイトル未設定'}
        </span>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          {loading && (
            <span style={{fontSize: '12px', color: '#666'}}>読み込み中...</span>
          )}
          {error && (
            <span style={{fontSize: '12px', color: '#e74c3c'}}>エラーが発生しました</span>
          )}
          <button
            onClick={() => {
              setLoading(true)
              setError(false)
              // iframeを再読み込み
              const iframe = document.querySelector('#preview-iframe')
              if (iframe) {
                iframe.src = iframe.src
              }
            }}
            style={{
              padding: '5px 10px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            再読み込み
          </button>
          <a 
            href={previewUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '5px 10px',
              background: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            新しいタブで開く
          </a>
        </div>
      </div>
      
      {/* iframe */}
      <iframe
        id="preview-iframe"
        src={previewUrl}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
          display: error ? 'none' : 'block'
        }}
        title="Preview"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
      
      {/* エラー表示 */}
      {error && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8f9fa'
        }}>
          <div style={{textAlign: 'center'}}>
            <h3 style={{margin: '0 0 10px 0', color: '#e74c3c'}}>プレビューの読み込みに失敗しました</h3>
            <p style={{margin: '0 0 20px 0', color: '#666'}}>
              サーバーが起動していることを確認してください<br/>
              <code style={{background: '#f0f0f0', padding: '2px 4px', borderRadius: '2px'}}>
                npm run serve
              </code>
            </p>
            <a 
              href={previewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                background: '#0070f3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              新しいタブで開く
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Preview