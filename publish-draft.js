const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe'
});

async function publishDraft() {
  const draftId = 'drafts.679b12c8-a501-4db3-a6b6-322fcf505b80';
  const publishedId = '679b12c8-a501-4db3-a6b6-322fcf505b80'; // Remove the 'drafts.' prefix
  
  try {
    console.log('📝 ドラフト記事を公開中...\n');
    
    // First, get the draft document
    console.log('1. ドラフト記事を取得中...');
    const draftDoc = await client.getDocument(draftId);
    
    if (!draftDoc) {
      console.log('❌ ドラフト記事が見つかりませんでした');
      return;
    }
    
    console.log(`✅ ドラフト記事が見つかりました: "${draftDoc.title}"`);
    console.log(`   - ドラフトID: ${draftDoc._id}`);
    console.log(`   - 公開予定ID: ${publishedId}`);
    
    // Create a transaction to publish the document
    console.log('\n2. 記事を公開中...');
    
    const transaction = client.transaction();
    
    // Create the published version (remove _id and _rev, set new ID)
    const publishedDoc = {
      ...draftDoc,
      _id: publishedId,
      _type: draftDoc._type
    };
    
    // Remove internal fields that shouldn't be copied
    delete publishedDoc._rev;
    delete publishedDoc._createdAt;
    delete publishedDoc._updatedAt;
    
    // Create or replace the published document
    transaction.createOrReplace(publishedDoc);
    
    // Delete the draft
    transaction.delete(draftId);
    
    // Commit the transaction
    const result = await transaction.commit();
    
    console.log('✅ 記事が正常に公開されました!');
    console.log('📄 公開された記事:');
    console.log(`   - タイトル: ${publishedDoc.title}`);
    console.log(`   - ID: ${publishedId}`);
    console.log(`   - スラッグ: ${publishedDoc.slug?.current}`);
    console.log(`   - 公開日: ${publishedDoc.publishedAt}`);
    
    console.log('\n🎉 公開完了! 記事はライブになりました。');
    
    // Verify the published document exists
    console.log('\n3. 公開記事を確認中...');
    const verifyDoc = await client.getDocument(publishedId);
    if (verifyDoc) {
      console.log('✅ 公開記事の確認完了');
    } else {
      console.log('⚠️ 公開記事の確認に失敗しました');
    }
    
  } catch (error) {
    console.error('❌ 公開エラー:', error.message);
    if (error.details) {
      console.error('詳細:', error.details);
    }
  }
}

publishDraft();