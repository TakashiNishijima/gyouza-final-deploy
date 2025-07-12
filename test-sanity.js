const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

// Test Sanity connection
async function testSanity() {
  console.log('Testing Sanity connection...');
  
  try {
    // Test blog posts
    const posts = await client.fetch('*[_type == "blog" && isPublished == true] | order(publishedAt desc) [0...3] { _id, title, slug, excerpt, publishedAt }');
    console.log('\n✅ Blog posts found:', posts.length);
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug?.current})`);
    });
    
    // Test profile
    const profile = await client.fetch('*[_type == "profile" && isActive == true][0]{ _id, name, displayName, bio }');
    console.log('\n✅ Profile found:', profile ? profile.displayName || profile.name : 'No profile');
    
    // Test YouTube content
    const youtube = await client.fetch('*[_type == "youtube"] | order(_createdAt desc) [0...3] { _id, title, videoId }');
    console.log('\n✅ YouTube content found:', youtube.length);
    
    // Test note content
    const notes = await client.fetch('*[_type == "note"] | order(_createdAt desc) [0...3] { _id, title, slug }');
    console.log('\n✅ Note content found:', notes.length);
    
    console.log('\n🎉 Sanity integration is working correctly!');
    
  } catch (error) {
    console.error('❌ Sanity connection failed:', error.message);
  }
}

testSanity();