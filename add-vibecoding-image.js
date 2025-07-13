const { createClient } = require('@sanity/client');
const fs = require('fs');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  token: 'skBZJpPFZs1JQV1TJGfqKEFOCOKdDGEQGGi9hW1QHm5CAgFBG1hcZkXYJ7CZQNbrcxP0X0CJFnEY6HLy9RrCRl8SfCOpn9uR7QcqOzPIgqJ0aEUvBuEOUGNyHrX5VlOXxNqL2vgXkHEQCeOy2gOGG9tKgqnr1cG4g4QhCggFBGSE',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function addVibecodingImage() {
  try {
    // 画像ファイルをアップロード
    const imagePath = '/Users/takashinishijima/Desktop/スクリーンショット 2025-07-13 14.39.02.png';
    const imageBuffer = fs.readFileSync(imagePath);
    
    console.log('画像をアップロード中...');
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: 'vibecoding-salon-screenshot.png'
    });
    
    console.log('画像アップロード完了:', imageAsset._id);
    
    // バイブコーディングを始めてみませんか？の記事を取得
    const query = `*[_type == "post" && title match "*バイブコーディングを始めてみませんか*"][0]`;
    const post = await client.fetch(query);
    
    if (!post) {
      console.log('記事が見つかりません');
      return;
    }
    
    console.log('記事を更新中:', post.title);
    
    // リンク付き画像ブロックを作成
    const imageWithLinkBlock = {
      _type: 'image',
      _key: 'vibecoding-salon-image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id
      },
      alt: 'VibeCoding Salon',
      caption: 'VibeCoding Salon - プログラミング学習コミュニティ',
      // カスタムフィールドとしてリンクを追加
      link: 'https://vibecoding.salon'
    };
    
    // bodyの最後に画像ブロックを追加
    const updatedBody = [...(post.body || []), imageWithLinkBlock];
    
    // 記事を更新
    const result = await client
      .patch(post._id)
      .set({ body: updatedBody })
      .commit();
    
    console.log('記事が正常に更新されました:', result.title);
    console.log('VibeCoding Salonの画像とリンクを追加しました');
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

addVibecodingImage();