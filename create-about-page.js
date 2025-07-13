const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  token: 'skBZJpPFZs1JQV1TJGfqKEFOCOKdDGEQGGi9hW1QHm5CAgFBG1hcZkXYJ7CZQNbrcxP0X0CJFnEY6HLy9RrCRl8SfCOpn9uR7QcqOzPIgqJ0aEUvBuEOUGNyHrX5VlOXxNqL2vgXkHEQCeOy2gOGG9tKgqnr1cG4g4QhCggFBGSE',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function createAboutPage() {
  try {
    const aboutDoc = {
      _type: 'about',
      title: 'About Gyouza',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'こんにちは！Gyouzaです。\n\nYouTubeでの音楽配信とバイブコーディングを最近始めました。\nこのブログでは、日々の出来事や\n日常で考えることを書いています。\n\nよろしくお願いします！'
            }
          ]
        }
      ]
    };
    
    const result = await client.create(aboutDoc);
    console.log('Aboutページが作成されました:', result);
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

createAboutPage();