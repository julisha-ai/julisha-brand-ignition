// Webhook utility functions for Make.com integration

export interface WebhookPayload {
  event: string;
  timestamp: string;
  site: {
    name: string;
    url: string;
  };
  post: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    status: string;
    tags: string[];
    category: string;
    seo: {
      title: string;
      description: string;
    };
    featuredImage: string | null;
    wordCount: number;
    readingTime: number;
    url: string;
  };
  automation: {
    source: string;
    version: string;
  };
}

export const createWebhookPayload = (post: any): WebhookPayload => {
  return {
    event: "blog_post_published",
    timestamp: new Date().toISOString(),
    site: {
      name: "Julisha Solutions",
      url: window.location.origin,
    },
    post: {
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.publishedAt,
      status: post.status,
      tags: post.tags || [],
      category: post.category || "General",
      seo: {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
      },
      featuredImage: post.featuredImage || null,
      wordCount: post.content.split(' ').length,
      readingTime: Math.ceil(post.content.split(' ').length / 200),
      url: `${window.location.origin}/blog/post/${post.id}`,
    },
    automation: {
      source: "julisha-blog-cms",
      version: "1.0",
    }
  };
};

export const triggerMakeWebhook = async (webhookUrl: string, payload: WebhookPayload): Promise<boolean> => {
  try {
    console.log("Triggering Make.com webhook:", webhookUrl, payload);
    
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error("Webhook error:", error);
    return false;
  }
};

// Test webhook function for validation
export const testWebhook = async (webhookUrl: string): Promise<boolean> => {
  const testPayload = {
    event: "test_connection",
    timestamp: new Date().toISOString(),
    site: {
      name: "Julisha Solutions",
      url: window.location.origin,
    },
    test: true,
    message: "This is a test webhook from Julisha Solutions Blog CMS"
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(testPayload),
    });

    return true;
  } catch (error) {
    console.error("Test webhook error:", error);
    return false;
  }
};