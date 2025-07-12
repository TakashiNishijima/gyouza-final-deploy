import React, { useState } from 'react'

const TestPreview = ({document}) => {
  const {displayed} = document
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  const testUrl = `http://localhost:8081/test-preview.html`
  
  const handleLoad = () => {
    console.log('Test iframe loaded successfully')
    setLoading(false)
    setError(false)
  }
  
  const handleError = () => {
    console.log('Test iframe failed to load')
    setLoading(false)
    setError(true)
  }
  
  return (
    <div style={{height: '100vh', width: '100%', position: 'relative'}}>
      {/* ヘッダー */}
      <div style={{
        padding: '10px', 
        background: '#e3f2fd', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{fontSize: '14px', color: '#666'}}>
          🧪 テストプレビュー: {displayed?.title || 'テスト'}
        </span>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          {loading && (
            <span style={{fontSize: '12px', color: '#666'}}>読み込み中...</span>
          )}
          {error && (
            <span style={{fontSize: '12px', color: '#e74c3c'}}>エラー</span>
          )}
          <a 
            href={testUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '5px 10px',
              background: '#4caf50',
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
        src={testUrl}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
          display: error ? 'none' : 'block'
        }}
        title="Test Preview"
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
            <h3 style={{color: '#e74c3c'}}>テストプレビューの読み込みに失敗</h3>
            <p>サーバーが起動していることを確認してください</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestPreview