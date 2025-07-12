import {definePlugin} from 'sanity'

export const previewPlugin = definePlugin({
  name: 'preview-plugin',
  document: {
    views: [
      {
        component: () => {
          return (
            <div style={{padding: '20px', textAlign: 'center'}}>
              <h2>プレビュー機能</h2>
              <p>この機能は現在開発中です。</p>
              <a 
                href="http://localhost:8081" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#0070f3',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  marginTop: '10px'
                }}
              >
                メインサイトを開く
              </a>
            </div>
          )
        },
        title: 'Preview',
        name: 'preview'
      }
    ]
  }
})