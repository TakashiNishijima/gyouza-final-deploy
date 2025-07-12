const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false, // CDNを使わず最新データを取得
  apiVersion: '2023-05-03',
  token: 'sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe'
});

async function visionTest() {
  console.log('🔍 Vision ツール代替テスト\n');
  
  try {
    // 作成したIDで直接確認
    console.log('1. 作成した記事を直接取得:');
    const specificDoc = await client.getDocument('6kYdI6NPYQgJj5vrmACq67');
    if (specificDoc) {
      console.log('✅ 記事が見つかりました:');
      console.log(`   タイトル: ${specificDoc.title}`);
      console.log(`   タイプ: ${specificDoc._type}`);
      console.log(`   ID: ${specificDoc._id}`);
    } else {
      console.log('❌ 記事が見つかりません');
    }
  } catch (error) {
    console.log(`❌ 直接取得エラー: ${error.message}`);
  }
  
  try {
    // 全ドキュメント確認
    console.log('\n2. 全ドキュメント取得:');
    const allDocs = await client.fetch('*[]');
    console.log(`全ドキュメント数: ${allDocs.length}`);
    
    if (allDocs.length > 0) {
      allDocs.forEach((doc, i) => {
        console.log(`${i + 1}. ${doc._type} - ${doc.title || doc._id}`);
      });
    }
  } catch (error) {
    console.log(`❌ 全ドキュメント取得エラー: ${error.message}`);
  }
  
  try {
    // ブログ記事のみ取得
    console.log('\n3. ブログ記事のみ取得:');
    const blogPosts = await client.fetch('*[_type == "blog"]');
    console.log(`ブログ記事数: ${blogPosts.length}`);
    
    if (blogPosts.length > 0) {
      blogPosts.forEach((post, i) => {
        console.log(`${i + 1}. ${post.title} (${post._id})`);
      });
    }
  } catch (error) {
    console.log(`❌ ブログ記事取得エラー: ${error.message}`);
  }
  
  try {
    // 最近作成されたドキュメント
    console.log('\n4. 最近作成されたドキュメント:');
    const recentDocs = await client.fetch('*[_createdAt > "2025-07-12T00:00:00Z"] | order(_createdAt desc)');
    console.log(`最近のドキュメント数: ${recentDocs.length}`);
    
    if (recentDocs.length > 0) {
      recentDocs.forEach((doc, i) => {
        console.log(`${i + 1}. ${doc._type} - ${doc.title || doc._id} (${doc._createdAt})`);
      });
    }
  } catch (error) {
    console.log(`❌ 最近のドキュメント取得エラー: ${error.message}`);
  }
}

visionTest();