// Sanity REST APIを直接使用してAboutページを作成
const https = require('https');

const aboutData = {
  mutations: [
    {
      create: {
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
      }
    }
  ]
};

const postData = JSON.stringify(aboutData);

const options = {
  hostname: 'zxcqyvgo.api.sanity.io',
  port: 443,
  path: '/v2023-05-03/data/mutate/production',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Authorization': 'Bearer skBZJpPFZs1JQV1TJGfqKEFOCOKdDGEQGGi9hW1QHm5CAgFBG1hcZkXYJ7CZQNbrcxP0X0CJFnEY6HLy9RrCRl8SfCOpn9uR7QcqOzPIgqJ0aEUvBuEOUGNyHrX5VlOXxNqL2vgXkHEQCeOy2gOGG9tKgqnr1cG4g4QhCggFBGSE'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response:', data);
    
    if (res.statusCode === 200) {
      console.log('✅ About page created successfully!');
    } else {
      console.log('❌ Failed to create about page');
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(postData);
req.end();