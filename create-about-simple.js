const { createClient } = require('@sanity/client');

// 読み取り用のクライアント（認証不要）
const readClient = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function checkAndCreateAbout() {
  try {
    // まず既存のAboutページがあるかチェック
    const existingAbout = await readClient.fetch('*[_type == "about"][0]');
    
    if (existingAbout) {
      console.log('About page already exists:');
      console.log('Title:', existingAbout.title);
      console.log('Content blocks:', existingAbout.content?.length || 0);
      return;
    }
    
    console.log('About page not found. You need to create it manually in Sanity Studio.');
    console.log('');
    console.log('Go to: http://localhost:3333');
    console.log('');
    console.log('Create a new "About Page" document with the following content:');
    console.log('');
    console.log('Title: About Gyouza');
    console.log('');
    console.log('Content:');
    console.log('こんにちは！Gyouzaです。');
    console.log('');
    console.log('YouTubeでの音楽配信とバイブコーディングを最近始めました。');
    console.log('このブログでは、日々の出来事や');
    console.log('日常で考えることを書いています。');
    console.log('');
    console.log('よろしくお願いします！');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkAndCreateAbout();