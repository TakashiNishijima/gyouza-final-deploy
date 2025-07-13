const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  token: 'skBZJpPFZs1JQV1TJGfqKEFOCOKdDGEQGGi9hW1QHm5CAgFBG1hcZkXYJ7CZQNbrcxP0X0CJFnEY6HLy9RrCRl8SfCOpn9uR7QcqOzPIgqJ0aEUvBuEOUGNyHrX5VlOXxNqL2vgXkHEQCeOy2gOGG9tKgqnr1cG4g4QhCggFBGSE',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function removeVibecodingCard() {
  try {
    // バイブコーディングを始めてみませんか？の記事を取得
    const query = `*[_type == "post" && title match "*バイブコーディングを始めてみませんか*"][0]`;
    const post = await client.fetch(query);
    
    if (!post) {
      console.log('記事が見つかりません');
      return;
    }
    
    console.log('現在の記事:', post.title);
    console.log('bodyブロック数:', post.body?.length || 0);
    
    // vibecoding.salonを含むブロックを削除
    const updatedBody = post.body.filter(block => {
      if (block._type === 'block' && block.children) {
        // テキストブロック内にvibecoding.salonが含まれているかチェック
        const hasVibecodingLink = block.children.some(child => 
          child.text && child.text.includes('vibecoding.salon')
        );
        
        // markDefsにvibecoding.salonのリンクがあるかチェック
        const hasVibecodingMarkDef = block.markDefs && block.markDefs.some(markDef => 
          markDef.href && markDef.href.includes('vibecoding.salon')
        );
        
        if (hasVibecodingLink || hasVibecodingMarkDef) {
          console.log('削除するブロック:', block);
          return false; // このブロックを削除
        }
      }
      return true; // このブロックを保持
    });
    
    console.log('更新後のbodyブロック数:', updatedBody.length);
    
    // 記事を更新
    const result = await client
      .patch(post._id)
      .set({ body: updatedBody })
      .commit();
    
    console.log('記事が正常に更新されました:', result.title);
    console.log('バイブコーディングサロンのカードを削除しました');
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

removeVibecodingCard();