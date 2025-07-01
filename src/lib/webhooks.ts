
// Webhook handling service for blog posts
export interface WebhookBlogPost {
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  status?: "draft" | "published";
  tags?: string[];
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  formattedContent?: string; // New field for pre-formatted content
}

export interface ProcessedBlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  tags?: string[];
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
}

// Validate and process incoming webhook data
export const validateWebhookData = (data: any): { isValid: boolean; errors: string[]; processedData?: ProcessedBlogPost } => {
  const errors: string[] = [];
  
  // Check if data is an object
  if (!data || typeof data !== 'object') {
    errors.push('Invalid data format: expected JSON object');
    return { isValid: false, errors };
  }

  // Validate required fields
  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    errors.push('Title is required and must be a non-empty string');
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim() === '') {
    errors.push('Content is required and must be a non-empty string');
  }

  // Validate optional fields
  if (data.status && !['draft', 'published'].includes(data.status)) {
    errors.push('Status must be either "draft" or "published"');
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array of strings');
  }

  if (data.publishedAt && typeof data.publishedAt === 'string') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.publishedAt)) {
      errors.push('PublishedAt must be in YYYY-MM-DD format');
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Process and normalize the data
  // Use formattedContent if provided, otherwise use regular content
  const content = data.formattedContent || data.content;
  
  const processedData: ProcessedBlogPost = {
    id: Date.now().toString(),
    title: data.title.trim(),
    content: content.trim(),
    excerpt: data.excerpt?.trim() || content.substring(0, 150).trim() + "...",
    author: data.author?.trim() || "Automation",
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    status: data.status || "published",
    tags: Array.isArray(data.tags) ? data.tags.filter(tag => typeof tag === 'string' && tag.trim()) : [],
    category: data.category?.trim() || "General",
    seoTitle: data.seoTitle?.trim(),
    seoDescription: data.seoDescription?.trim(),
    featuredImage: data.featuredImage?.trim()
  };

  return { isValid: true, errors: [], processedData };
};

// Generate unique webhook URLs
export const generateWebhookUrl = (): string => {
  const baseUrl = window.location.origin;
  const webhookId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `${baseUrl}/api/webhooks/blog/${webhookId}`;
};

// Webhook URL validation
export const isValidWebhookUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.startsWith('/api/webhooks/blog/') && urlObj.pathname.length > '/api/webhooks/blog/'.length;
  } catch {
    return false;
  }
};

// Extract webhook ID from URL
export const extractWebhookId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    if (pathParts.length >= 4 && pathParts[1] === 'api' && pathParts[2] === 'webhooks' && pathParts[3] === 'blog') {
      return pathParts[4] || null;
    }
    return null;
  } catch {
    return null;
  }
};

// Create a test webhook payload with formatting examples
export const createTestPayload = (): WebhookBlogPost => ({
  title: "Test Post from Make.com Automation",
  content: `# Welcome to Automated Content Creation

This is a **test blog post** created via *Make.com automation*. It demonstrates how external systems can automatically post content to your blog with rich formatting.

## Key Features

- **Bold text** for emphasis
- *Italic text* for subtle highlights  
- __Underlined text__ for important points
- \`Code snippets\` for technical content

### Formatting Examples

> This is a blockquote that stands out from regular content.

Here's a numbered list:
1. First automated feature
2. Second automated feature  
3. Third automated feature

And a bullet list:
- Easy integration
- Rich text support
- Image embedding
- SEO optimization

[IMAGE:https://images.unsplash.com/photo-1488590528505-98d2b5aba04b]

**Make.com Integration Benefits:**
The integration allows you to automatically create formatted blog posts from various data sources while maintaining consistent styling and professional presentation.`,
  excerpt: "A test post demonstrating automated blog posting capabilities with rich text formatting",
  author: "Make.com Bot",
  tags: ["automation", "test", "make.com", "webhook", "formatting"],
  category: "Technology",
  status: "published"
});
