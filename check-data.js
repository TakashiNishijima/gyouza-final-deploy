const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function checkData() {
  try {
    console.log('📊 Sanityデータベースを確認中...\n');
    
    // 全ドキュメントの確認
    const allDocs = await client.fetch('*[]{_type, _id, title}');
    console.log(`全ドキュメント数: ${allDocs.length}`);
    
    if (allDocs.length > 0) {
      console.log('\n📄 見つかったドキュメント:');
      allDocs.forEach((doc, index) => {
        console.log(`  ${index + 1}. ${doc._type} - ${doc.title || doc._id}`);
      });
    } else {
      console.log('⚠️  ドキュメントが見つかりませんでした');
    }
    
    // ブログ記事の確認
    console.log('\n📝 ブログ記事を確認中...');
    const blogPosts = await client.fetch('*[_type == "blog"]{_id, title, slug, author, publishedAt, excerpt}');
    console.log(`ブログ記事数: ${blogPosts.length}`);
    
    if (blogPosts.length > 0) {
      console.log('\n📚 見つかったブログ記事:');
      blogPosts.forEach((post, index) => {
        console.log(`  ${index + 1}. ${post.title}`);
        console.log(`     - ID: ${post._id}`);
        console.log(`     - スラッグ: ${post.slug?.current || '未設定'}`);
        console.log(`     - 著者: ${post.author || '未設定'}`);
        console.log(`     - 公開日: ${post.publishedAt || '未設定'}`);
        console.log(`     - 抜粋: ${post.excerpt || '未設定'}`);
        console.log('');
      });
    } else {
      console.log('⚠️  ブログ記事が見つかりませんでした');
    }
    
    // ドキュメントタイプ別の集計
    console.log('\n📈 ドキュメントタイプ別集計:');
    const typeCount = {};
    allDocs.forEach(doc => {
      typeCount[doc._type] = (typeCount[doc._type] || 0) + 1;
    });
    
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}件`);
    });
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

checkData();