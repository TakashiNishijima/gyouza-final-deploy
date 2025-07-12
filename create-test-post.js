const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_AUTH_TOKEN || '', // 書き込みにはトークンが必要
});

async function createTestPost() {
  const testPost = {
    _type: 'blog',
    title: 'テスト記事 - CLI作成',
    slug: {
      current: 'test-kiji-cli-sakusei',
      _type: 'slug'
    },
    author: 'gyouza',
    publishedAt: new Date().toISOString(),
    excerpt: 'Sanity CLIを使用して作成したテスト記事です。データ確認用の記事です。',
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [
          {
            _type: 'span',
            text: 'CLI作成のテスト記事'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'この記事はSanity CLIを使用して作成されました。'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '確認事項'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• データが正常に保存されているか\n• APIで取得できるか\n• ブログページで表示されるか'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'CLI経由でのテスト完了です！'
          }
        ]
      }
    ]
  };

  try {
    console.log('テスト記事を作成中...');
    const result = await client.create(testPost);
    console.log('✅ 記事作成成功!');
    console.log('記事ID:', result._id);
    console.log('タイトル:', result.title);
    console.log('スラッグ:', result.slug.current);
    console.log('公開日:', result.publishedAt);
    
    return result;
  } catch (error) {
    console.error('❌ 記事作成エラー:', error.message);
    
    if (error.message.includes('token')) {
      console.log('\n📝 解決方法:');
      console.log('1. https://sanity.io/manage にアクセス');
      console.log('2. プロジェクト zxcqyvgo を選択');
      console.log('3. API → Tokens → Add API token');
      console.log('4. Editor権限でトークンを作成');
      console.log('5. 作成したトークンを環境変数に設定:');
      console.log('   export SANITY_AUTH_TOKEN="your_token_here"');
      console.log('6. 再度スクリプトを実行');
    }
    
    throw error;
  }
}

// メイン実行
createTestPost()
  .then(() => {
    console.log('\n🎉 完了! Sanity Studioで確認してください');
    process.exit(0);
  })
  .catch((error) => {
    console.error('実行失敗:', error.message);
    process.exit(1);
  });