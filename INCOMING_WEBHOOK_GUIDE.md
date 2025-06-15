# Incoming Webhook Guide for Blog Automation

## Overview
This guide explains how to set up Make.com or n8n to automatically POST blog content to your Julisha Solutions blog system.

## Getting Your Incoming Webhook URL

1. Go to your Blog Management page (`/blog`)
2. In the "Incoming Webhook" section, click "Generate & Copy URL"
3. The URL will be automatically copied to your clipboard
4. Example format: `https://yourdomain.com/api/webhooks/blog/abc123xyz`

## Setting Up Make.com to POST Blog Content

### Step 1: Create a Make.com Scenario
1. Create a new scenario in Make.com
2. Add your trigger (e.g., RSS feed, Google Sheets, Airtable, etc.)
3. Add an HTTP module set to "Make a request"

### Step 2: Configure the HTTP Request
- **URL**: Your generated incoming webhook URL
- **Method**: POST
- **Headers**: 
  ```json
  {
    "Content-Type": "application/json"
  }
  ```

### Step 3: Configure the Request Body
Send a JSON payload with the following structure:

```json
{
  "title": "Your Blog Post Title",
  "content": "Full blog post content here...",
  "excerpt": "Brief summary of the post",
  "author": "Author Name",
  "publishedAt": "2024-01-15",
  "status": "published",
  "tags": ["AI", "Technology"],
  "category": "General",
  "seoTitle": "SEO optimized title",
  "seoDescription": "SEO meta description",
  "featuredImage": "https://example.com/image.jpg"
}
```

## Setting Up n8n to POST Blog Content

### Step 1: Create a Workflow
1. Create a new workflow in n8n
2. Add your trigger node (RSS, Webhook, Schedule, etc.)
3. Add an HTTP Request node

### Step 2: Configure HTTP Request Node
- **Request Method**: POST
- **URL**: Your generated incoming webhook URL
- **Body Content Type**: JSON
- **Specify Body**: Using Fields Below

### Step 3: Map Your Data
Map your trigger data to the blog post fields:

```javascript
{
  "title": "{{ $json.title }}",
  "content": "{{ $json.description }}",
  "excerpt": "{{ $json.summary }}",
  "author": "{{ $json.author || 'Automation' }}",
  "publishedAt": "{{ $json.pubDate }}",
  "status": "published",
  "tags": {{ $json.categories }},
  "category": "{{ $json.category || 'General' }}"
}
```

## Field Descriptions

| Field | Required | Description | Default |
|-------|----------|-------------|---------|
| `title` | No | Blog post title | "Untitled Post" |
| `content` | No | Full blog content (HTML/Markdown supported) | "" |
| `excerpt` | No | Short summary | Auto-generated from content |
| `author` | No | Author name | "Automation" |
| `publishedAt` | No | Publication date (YYYY-MM-DD) | Current date |
| `status` | No | "published" or "draft" | "published" |
| `tags` | No | Array of tag strings | [] |
| `category` | No | Category name | "General" |
| `seoTitle` | No | SEO optimized title | Uses main title |
| `seoDescription` | No | Meta description | Uses excerpt |
| `featuredImage` | No | Image URL | null |

## Example Use Cases

### 1. RSS Feed to Blog
- Trigger: RSS feed updates
- Action: Convert RSS items to blog posts
- Use case: Auto-import content from other sources

### 2. Airtable to Blog
- Trigger: New Airtable record
- Action: Create blog post from record data
- Use case: Content team writes in Airtable, auto-publishes to blog

### 3. AI Generated Content
- Trigger: Schedule (daily/weekly)
- Process: Generate content with AI (GPT, Claude, etc.)
- Action: Post generated content to blog
- Use case: Automated content creation

### 4. Social Media to Blog
- Trigger: New LinkedIn article, Twitter thread, etc.
- Process: Format content for blog
- Action: Cross-post to your blog
- Use case: Multi-platform content distribution

## Testing Your Integration

### Test Payload
Use this sample payload to test your webhook:

```json
{
  "title": "Test Post from Make.com",
  "content": "This is a test blog post created via automation. It demonstrates how Make.com can automatically post content to your blog system.",
  "excerpt": "A test post to verify webhook integration",
  "author": "Make.com Bot",
  "status": "published",
  "tags": ["test", "automation"],
  "category": "Testing"
}
```

### Verification Steps
1. Send the test payload to your webhook URL
2. Check your blog management page for the new post
3. Verify all fields are populated correctly
4. Check the public blog to see the published post

## Error Handling

### Common Issues
- **Invalid URL**: Ensure you copied the complete webhook URL
- **Missing Content-Type**: Always include `Content-Type: application/json` header
- **Malformed JSON**: Validate your JSON payload before sending

### Success Response
When successful, you'll see a toast notification in the blog management interface showing the new post was received.

## Security Notes

- Webhook URLs contain a unique identifier for security
- Generate new URLs periodically for enhanced security
- The system automatically handles duplicate content detection
- All incoming posts are logged for audit purposes

## Advanced Features

### Content Processing
- HTML content is automatically sanitized
- Markdown is converted to HTML
- Images are automatically optimized
- Links are validated and processed

### Duplicate Detection
The system checks for duplicate content based on:
- Title similarity
- Content hash
- Publication date proximity

### Content Validation
- Validates required fields
- Sanitizes HTML content
- Checks image URLs
- Validates date formats