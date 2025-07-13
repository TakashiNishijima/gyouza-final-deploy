const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  token: 'skBZJpPFZs1JQV1TJGfqKEFOCOKdDGEQGGi9hW1QHm5CAgFBG1hcZkXYJ7CZQNbrcxP0X0CJFnEY6HLy9RrCRl8SfCOpn9uR7QcqOzPIgqJ0aEUvBuEOUGNyHrX5VlOXxNqL2vgXkHEQCeOy2gOGG9tKgqnr1cG4g4QhCggFBGSE',
  useCdn: false
});

async function updateVibecodingLink() {
  try {
    // バイブコーディングを始めてみませんか？の記事を取得
    const query = `*[_type == "post" && title match "*バイブコーディングを始めてみませんか*"][0]`;
    const post = await client.fetch(query);
    
    if (!post) {
      console.log('記事が見つかりません');
      return;
    }
    
    console.log('現在の記事:', post.title);
    
    // bodyの内容を更新（vibecoding.salonリンクの表記を修正）
    const updatedBody = post.body.map(block => {
      if (block._type === 'block') {
        const updatedChildren = block.children.map(child => {
          if (child.text && child.text.includes('https://vibecoding.salon/')) {
            return {
              ...child,
              text: child.text.replace('https://vibecoding.salon/', 'バイブコーディングサロン https://vibecoding.salon/')
            };
          }
          return child;
        });
        
        return {
          ...block,
          children: updatedChildren
        };
      }
      return block;
    });
    
    // 記事を更新
    const result = await client
      .patch(post._id)
      .set({ body: updatedBody })
      .commit();
    
    console.log('記事が正常に更新されました:', result.title);
    console.log('バイブコーディングサロンのリンク表記を修正しました');
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

updateVibecodingLink();