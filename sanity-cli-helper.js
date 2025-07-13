const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zxcqyvgo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe'
});

// Helper functions for common Sanity operations
class SanityCLIHelper {
  
  // List all documents with optional type filter
  async listDocuments(type = null) {
    try {
      const query = type ? `*[_type == "${type}"]` : '*[]';
      const docs = await client.fetch(`${query}{_id, _type, title, _createdAt, _updatedAt, publishedAt}`);
      
      console.log(`📄 Documents found: ${docs.length}`);
      docs.forEach((doc, index) => {
        const isDraft = doc._id.startsWith('drafts.');
        const status = isDraft ? '[DRAFT]' : '[PUBLISHED]';
        console.log(`  ${index + 1}. ${status} [${doc._type}] ${doc.title || doc._id}`);
        console.log(`     - ID: ${doc._id}`);
        if (doc.publishedAt) {
          console.log(`     - Published: ${doc.publishedAt}`);
        }
        console.log('');
      });
      
      return docs;
    } catch (error) {
      console.error('❌ Error listing documents:', error.message);
    }
  }
  
  // Find documents by title
  async findByTitle(title) {
    try {
      const docs = await client.fetch(
        '*[title match $title]{_id, _type, title, slug, publishedAt, _createdAt}',
        { title: `*${title}*` }
      );
      
      console.log(`🔍 Found ${docs.length} document(s) matching "${title}"`);
      docs.forEach((doc, index) => {
        const isDraft = doc._id.startsWith('drafts.');
        const status = isDraft ? '[DRAFT]' : '[PUBLISHED]';
        console.log(`  ${index + 1}. ${status} ${doc.title}`);
        console.log(`     - ID: ${doc._id}`);
        console.log(`     - Slug: ${doc.slug?.current || 'Not set'}`);
        console.log(`     - Published: ${doc.publishedAt || 'Not published'}`);
        console.log('');
      });
      
      return docs;
    } catch (error) {
      console.error('❌ Error finding documents:', error.message);
    }
  }
  
  // Publish a draft document
  async publishDraft(draftId) {
    try {
      if (!draftId.startsWith('drafts.')) {
        console.log('❌ Document is not a draft');
        return false;
      }
      
      const publishedId = draftId.replace('drafts.', '');
      
      console.log(`📝 Publishing draft: ${draftId}`);
      
      // Get the draft document
      const draftDoc = await client.getDocument(draftId);
      if (!draftDoc) {
        console.log('❌ Draft document not found');
        return false;
      }
      
      // Create published version
      const publishedDoc = {
        ...draftDoc,
        _id: publishedId,
        _type: draftDoc._type
      };
      
      // Remove internal fields
      delete publishedDoc._rev;
      delete publishedDoc._createdAt;
      delete publishedDoc._updatedAt;
      
      // Execute transaction
      const transaction = client.transaction();
      transaction.createOrReplace(publishedDoc);
      transaction.delete(draftId);
      
      await transaction.commit();
      
      console.log(`✅ Successfully published: ${publishedDoc.title}`);
      console.log(`   - New ID: ${publishedId}`);
      
      return true;
    } catch (error) {
      console.error('❌ Error publishing draft:', error.message);
      return false;
    }
  }
  
  // Unpublish a document (convert to draft)
  async unpublishDocument(documentId) {
    try {
      if (documentId.startsWith('drafts.')) {
        console.log('❌ Document is already a draft');
        return false;
      }
      
      const draftId = `drafts.${documentId}`;
      
      console.log(`📝 Converting to draft: ${documentId}`);
      
      // Get the published document
      const publishedDoc = await client.getDocument(documentId);
      if (!publishedDoc) {
        console.log('❌ Published document not found');
        return false;
      }
      
      // Create draft version
      const draftDoc = {
        ...publishedDoc,
        _id: draftId,
        _type: publishedDoc._type
      };
      
      // Remove internal fields
      delete draftDoc._rev;
      delete draftDoc._createdAt;
      delete draftDoc._updatedAt;
      
      // Execute transaction
      const transaction = client.transaction();
      transaction.createOrReplace(draftDoc);
      transaction.delete(documentId);
      
      await transaction.commit();
      
      console.log(`✅ Successfully converted to draft: ${draftDoc.title}`);
      console.log(`   - New ID: ${draftId}`);
      
      return true;
    } catch (error) {
      console.error('❌ Error converting to draft:', error.message);
      return false;
    }
  }
  
  // Delete a document
  async deleteDocument(documentId) {
    try {
      console.log(`🗑️ Deleting document: ${documentId}`);
      
      // Get document info before deletion
      const doc = await client.getDocument(documentId);
      if (!doc) {
        console.log('❌ Document not found');
        return false;
      }
      
      await client.delete(documentId);
      
      console.log(`✅ Successfully deleted: ${doc.title || documentId}`);
      return true;
    } catch (error) {
      console.error('❌ Error deleting document:', error.message);
      return false;
    }
  }
  
  // Get document details
  async getDocumentDetails(documentId) {
    try {
      const doc = await client.getDocument(documentId);
      if (!doc) {
        console.log('❌ Document not found');
        return null;
      }
      
      console.log(`📄 Document Details:`);
      console.log(`   - ID: ${doc._id}`);
      console.log(`   - Type: ${doc._type}`);
      console.log(`   - Title: ${doc.title || 'No title'}`);
      console.log(`   - Created: ${doc._createdAt}`);
      console.log(`   - Updated: ${doc._updatedAt}`);
      if (doc.publishedAt) {
        console.log(`   - Published: ${doc.publishedAt}`);
      }
      if (doc.slug) {
        console.log(`   - Slug: ${doc.slug.current}`);
      }
      
      return doc;
    } catch (error) {
      console.error('❌ Error getting document:', error.message);
      return null;
    }
  }
}

// CLI interface
const helper = new SanityCLIHelper();

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  switch (command) {
    case 'list':
      const type = args[1];
      await helper.listDocuments(type);
      break;
      
    case 'find':
      const title = args.slice(1).join(' ');
      if (!title) {
        console.log('❌ Please provide a title to search for');
        console.log('Usage: node sanity-cli-helper.js find "title"');
        return;
      }
      await helper.findByTitle(title);
      break;
      
    case 'publish':
      const draftId = args[1];
      if (!draftId) {
        console.log('❌ Please provide a draft ID');
        console.log('Usage: node sanity-cli-helper.js publish drafts.document-id');
        return;
      }
      await helper.publishDraft(draftId);
      break;
      
    case 'unpublish':
      const docId = args[1];
      if (!docId) {
        console.log('❌ Please provide a document ID');
        console.log('Usage: node sanity-cli-helper.js unpublish document-id');
        return;
      }
      await helper.unpublishDocument(docId);
      break;
      
    case 'delete':
      const deleteId = args[1];
      if (!deleteId) {
        console.log('❌ Please provide a document ID');
        console.log('Usage: node sanity-cli-helper.js delete document-id');
        return;
      }
      await helper.deleteDocument(deleteId);
      break;
      
    case 'details':
      const detailId = args[1];
      if (!detailId) {
        console.log('❌ Please provide a document ID');
        console.log('Usage: node sanity-cli-helper.js details document-id');
        return;
      }
      await helper.getDocumentDetails(detailId);
      break;
      
    default:
      console.log('🔧 Sanity CLI Helper');
      console.log('\nAvailable commands:');
      console.log('  list [type]           - List all documents (optionally filter by type)');
      console.log('  find "title"          - Find documents by title');
      console.log('  publish draft-id      - Publish a draft document');
      console.log('  unpublish doc-id      - Convert published document to draft');
      console.log('  delete doc-id         - Delete a document');
      console.log('  details doc-id        - Get document details');
      console.log('\nExamples:');
      console.log('  node sanity-cli-helper.js list blog');
      console.log('  node sanity-cli-helper.js find "バイブコーディング"');
      console.log('  node sanity-cli-helper.js publish drafts.679b12c8-a501-4db3-a6b6-322fcf505b80');
      console.log('\nProject: zxcqyvgo');
      console.log('Dataset: production');
  }
}

main().catch(console.error);