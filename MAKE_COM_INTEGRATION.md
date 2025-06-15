# Make.com Integration Guide for Julisha Solutions Blog

## Overview
This guide explains how to integrate your Julisha Solutions blog with Make.com for automated blog posting workflows.

## Webhook Data Structure

When a blog post is published, the following JSON payload is sent to your Make.com webhook:

```json
{
  "event": "blog_post_published",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "site": {
    "name": "Julisha Solutions",
    "url": "https://your-domain.com"
  },
  "post": {
    "id": "1705315800000",
    "title": "Your Blog Post Title",
    "content": "Full blog post content...",
    "excerpt": "Brief excerpt of the post...",
    "author": "Author Name",
    "publishedAt": "2024-01-15",
    "status": "published",
    "tags": ["AI", "Technology", "Innovation"],
    "category": "General",
    "seo": {
      "title": "SEO optimized title",
      "description": "SEO meta description"
    },
    "featuredImage": "https://example.com/image.jpg",
    "wordCount": 850,
    "readingTime": 5,
    "url": "https://your-domain.com/blog/post/1705315800000"
  },
  "automation": {
    "source": "julisha-blog-cms",
    "version": "1.0"
  }
}
```

## Make.com Setup Instructions

### Step 1: Create a New Scenario
1. Log into your Make.com account
2. Create a new scenario
3. Add a "Webhook" trigger as the first module
4. Copy the webhook URL provided by Make.com

### Step 2: Configure the Webhook in Julisha Blog
1. Navigate to your Blog Management page
2. In the "Automation Webhook" section, paste your Make.com webhook URL
3. Click "Save" to store the configuration

### Step 3: Set Up Automation Actions
Configure the following modules in Make.com based on your needs:

#### Social Media Posting
- **Twitter/X Module**: Post title + excerpt + link
- **LinkedIn Module**: Share professional content
- **Facebook Module**: Post to business page

#### Email Marketing
- **Mailchimp Module**: Send newsletter to subscribers
- **SendGrid Module**: Send automated email notifications

#### Content Distribution
- **WordPress Module**: Cross-post to other WordPress sites
- **Medium Module**: Publish to Medium publication
- **Ghost Module**: Sync with Ghost CMS

#### Analytics & Notifications
- **Google Analytics Module**: Track blog post events
- **Slack Module**: Notify team of new posts
- **Discord Module**: Announce in community channels

## Example Make.com Scenarios

### Scenario 1: Social Media Automation
```
Webhook → Router → [Twitter, LinkedIn, Facebook]
```

### Scenario 2: Email Marketing
```
Webhook → Filter (published posts) → Mailchimp (Add to Campaign)
```

### Scenario 3: Multi-Platform Publishing
```
Webhook → Router → [Medium, WordPress, Ghost]
```

## Data Mapping in Make.com

Use these mappings to access webhook data in your Make.com modules:

- **Post Title**: `post.title`
- **Post Content**: `post.content`
- **Post Excerpt**: `post.excerpt`
- **Author**: `post.author`
- **Published Date**: `post.publishedAt`
- **Post URL**: `post.url`
- **Word Count**: `post.wordCount`
- **Reading Time**: `post.readingTime`
- **Tags**: `post.tags` (array)
- **Category**: `post.category`
- **SEO Title**: `post.seo.title`
- **SEO Description**: `post.seo.description`

## Testing Your Integration

1. Set up your webhook URL in the blog CMS
2. Create a test blog post
3. Set status to "Published"
4. Save the post
5. Check Make.com execution history to verify the webhook was received
6. Verify that your automation actions executed correctly

## Troubleshooting

### Common Issues:
- **Webhook not triggering**: Verify the URL is correct and the scenario is active
- **Missing data**: Check that the post status is set to "published"
- **CORS errors**: These are normal due to browser security - check Make.com execution history instead

### Debug Tips:
- Use Make.com's execution history to see received data
- Test with simple scenarios first (like Slack notifications)
- Check browser console for webhook trigger confirmations

## Advanced Features

### Conditional Logic
Use Make.com filters to create conditional workflows:
- Only trigger for specific authors
- Filter by post categories or tags
- Set minimum word count requirements

### Content Transformation
Transform content before distribution:
- Shorten content for Twitter
- Add tracking parameters to URLs
- Convert HTML to plain text for certain platforms

### Scheduling
Use Make.com's scheduling features:
- Delay posting to optimal times
- Spread social media posts across multiple platforms
- Queue content for review before publishing

## Support
For technical support with the integration, check the browser console for webhook logs or contact support with your Make.com execution history.