const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe'
});

async function findDraftPost() {
  try {
    console.log('🔍 ドラフト記事を検索中...\n');
    
    // 全ドキュメント（ドラフト含む）を検索
    const allDocs = await client.fetch('*[]{_type, _id, title, _createdAt, _updatedAt}');
    console.log(`全ドキュメント数（ドラフト含む）: ${allDocs.length}`);
    
    if (allDocs.length > 0) {
      console.log('\n📄 見つかったドキュメント:');
      allDocs.forEach((doc, index) => {
        console.log(`  ${index + 1}. [${doc._type}] ${doc.title || doc._id}`);
        console.log(`     - ID: ${doc._id}`);
        console.log(`     - 作成日: ${doc._createdAt}`);
        console.log(`     - 更新日: ${doc._updatedAt}`);
        console.log('');
      });
    }
    
    // 特定のタイトルで検索
    const targetTitle = 'バイブコーディングを始めてみませんか';
    console.log(`\n🎯 "${targetTitle}" を検索中...`);
    
    const targetPosts = await client.fetch(
      '*[_type == "blog" && title match $title]{_id, title, slug, publishedAt, _createdAt, _updatedAt}',
      { title: `*${targetTitle}*` }
    );
    
    if (targetPosts.length > 0) {
      console.log('\n✅ 該当する記事が見つかりました:');
      targetPosts.forEach((post, index) => {
        console.log(`  ${index + 1}. ${post.title}`);
        console.log(`     - Document ID: ${post._id}`);
        console.log(`     - スラッグ: ${post.slug?.current || '未設定'}`);
        console.log(`     - 公開日: ${post.publishedAt || '未公開（ドラフト）'}`);
        console.log(`     - 作成日: ${post._createdAt}`);
        console.log(`     - 更新日: ${post._updatedAt}`);
        console.log('');
      });
    } else {
      console.log(`❌ "${targetTitle}" が見つかりませんでした`);
    }
    
    // 全ブログ記事を確認（ドラフト含む）
    console.log('\n📝 全ブログ記事（ドラフト含む）:');
    const allBlogPosts = await client.fetch('*[_type == "blog"]{_id, title, slug, publishedAt, _createdAt}');
    console.log(`ブログ記事数: ${allBlogPosts.length}`);
    
    if (allBlogPosts.length > 0) {
      allBlogPosts.forEach((post, index) => {
        const status = post.publishedAt ? '公開済み' : 'ドラフト';
        console.log(`  ${index + 1}. [${status}] ${post.title}`);
        console.log(`     - ID: ${post._id}`);
        console.log(`     - スラッグ: ${post.slug?.current || '未設定'}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

findDraftPost();