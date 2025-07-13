# Sanity CLI Commands Guide

This guide provides comprehensive instructions for managing Sanity documents using both the official Sanity CLI and custom helper scripts.

## Project Configuration

- **Project ID**: `zxcqyvgo`
- **Dataset**: `production`
- **Studio Directory**: `/Users/takashinishijima/Sites/homepage/gyouza-blog/studio`

## 1. Official Sanity CLI Commands

### Basic Document Operations

#### Query Documents
```bash
# Query all blog posts
npx sanity documents query '*[_type == "blog"]{_id, title, slug, publishedAt}' --pretty

# Find specific document by title
npx sanity documents query '*[_type == "blog" && title match "*バイブコーディング*"]{_id, title, slug}' --pretty

# Get all documents including drafts
npx sanity documents query '*[]{_id, _type, title}' --pretty

# Get only draft documents
npx sanity documents query '*[_id match "drafts.*"]{_id, _type, title}' --pretty
```

#### Get Specific Document
```bash
# Get document by ID
npx sanity documents get 679b12c8-a501-4db3-a6b6-322fcf505b80 --pretty

# Get draft document
npx sanity documents get drafts.679b12c8-a501-4db3-a6b6-322fcf505b80 --pretty
```

#### Delete Document
```bash
# Delete a document by ID
npx sanity documents delete 679b12c8-a501-4db3-a6b6-322fcf505b80

# Delete a draft
npx sanity documents delete drafts.679b12c8-a501-4db3-a6b6-322fcf505b80
```

### Advanced Queries

#### Published vs Draft Documents
```bash
# Get only published documents (no drafts. prefix)
npx sanity documents query '*[!(_id match "drafts.*")]{_id, _type, title}' --pretty

# Get only draft documents
npx sanity documents query '*[_id match "drafts.*"]{_id, _type, title}' --pretty

# Check if specific document exists as both draft and published
npx sanity documents query '*[_id in ["679b12c8-a501-4db3-a6b6-322fcf505b80", "drafts.679b12c8-a501-4db3-a6b6-322fcf505b80"]]{_id, title}' --pretty
```

#### Content-specific Queries
```bash
# Get blog posts with content
npx sanity documents query '*[_type == "blog"]{_id, title, slug, excerpt, publishedAt, body}' --pretty

# Search by content
npx sanity documents query '*[_type == "blog" && body[].children[].text match "*コーディング*"]{_id, title}' --pretty
```

## 2. Custom Helper Scripts

### Available Scripts

#### 1. `/Users/takashinishijima/Sites/homepage/gyouza-blog/sanity-cli-helper.js`
Comprehensive CLI tool for document management.

```bash
# List all documents
node sanity-cli-helper.js list

# List documents by type
node sanity-cli-helper.js list blog

# Find documents by title
node sanity-cli-helper.js find "バイブコーディング"

# Publish a draft document
node sanity-cli-helper.js publish drafts.679b12c8-a501-4db3-a6b6-322fcf505b80

# Convert published document to draft
node sanity-cli-helper.js unpublish 679b12c8-a501-4db3-a6b6-322fcf505b80

# Delete a document
node sanity-cli-helper.js delete document-id

# Get document details
node sanity-cli-helper.js details 679b12c8-a501-4db3-a6b6-322fcf505b80
```

#### 2. `/Users/takashinishijima/Sites/homepage/gyouza-blog/find-draft-post.js`
Specialized script for finding draft posts and the specific target post.

```bash
node find-draft-post.js
```

#### 3. `/Users/takashinishijima/Sites/homepage/gyouza-blog/check-data.js`
General data checking script.

```bash
node check-data.js
```

## 3. Publishing Draft Documents

### The Issue
Sanity documents with `drafts.` prefix are in draft state and not visible to public queries. To publish them, you need to:

1. **Remove the `drafts.` prefix** from the document ID
2. **Move the document** from draft state to published state

### Solution Used for "バイブコーディングを始めてみませんか"

The blog post was successfully published using our custom script:

**Before**: `drafts.679b12c8-a501-4db3-a6b6-322fcf505b80` (Draft)
**After**: `679b12c8-a501-4db3-a6b6-322fcf505b80` (Published)

### Manual Publishing Process

If you need to manually publish a draft using Sanity CLI:

```bash
# 1. Get the draft document
npx sanity documents get drafts.679b12c8-a501-4db3-a6b6-322fcf505b80 > draft.json

# 2. Edit the JSON file to remove 'drafts.' from _id and remove _rev, _createdAt, _updatedAt
# 3. Create the published document
npx sanity documents create published.json

# 4. Delete the draft
npx sanity documents delete drafts.679b12c8-a501-4db3-a6b6-322fcf505b80
```

## 4. Current Status

### Successfully Published Document
- **Title**: バイブコーディングを始めてみませんか
- **Published ID**: `679b12c8-a501-4db3-a6b6-322fcf505b80`
- **Slug**: `vibe coding start`
- **Status**: ✅ Published and live
- **Published Date**: 2025-07-08T12:24:00.000Z

### Verification Commands
```bash
# Verify the document is published
npx sanity documents query '*[_id == "679b12c8-a501-4db3-a6b6-322fcf505b80"]{_id, title, publishedAt}' --pretty

# Check that draft no longer exists
npx sanity documents query '*[_id == "drafts.679b12c8-a501-4db3-a6b6-322fcf505b80"]{_id, title}' --pretty

# List all published blog posts
npx sanity documents query '*[_type == "blog" && !(_id match "drafts.*")]{_id, title, slug}' --pretty
```

## 5. Useful Tips

### Working Directory
Always run Sanity CLI commands from the studio directory or specify the project:
```bash
cd /Users/takashinishijima/Sites/homepage/gyouza-blog/studio
# or
npx sanity documents query --project zxcqyvgo --dataset production 'query'
```

### API Version
The CLI uses API version `v2022-06-01` by default. You can specify a different version:
```bash
npx sanity documents query 'query' --api-version v2023-05-03
```

### Pretty Printing
Always use `--pretty` for readable JSON output:
```bash
npx sanity documents query 'query' --pretty
```

### Authentication
The CLI uses the token configured in `/Users/takashinishijima/Sites/homepage/gyouza-blog/src/lib/sanity.ts`:
- Token: `sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe`

## 6. Common GROQ Queries

```groq
// All blog posts
*[_type == "blog"]

// Published blog posts only
*[_type == "blog" && !(_id match "drafts.*")]

// Draft blog posts only
*[_type == "blog" && _id match "drafts.*"]

// Search by title
*[_type == "blog" && title match "*search term*"]

// Get with related data
*[_type == "blog"]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  categories[]->{title}
}

// Order by date
*[_type == "blog"] | order(publishedAt desc)
```

## Success Summary

✅ **Mission Accomplished**: The blog post "バイブコーディングを始めてみませんか" has been successfully published and is now live with document ID `679b12c8-a501-4db3-a6b6-322fcf505b80`.