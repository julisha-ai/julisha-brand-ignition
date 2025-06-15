import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  Eye,
  Webhook,
  Settings,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { 
  validateWebhookData, 
  generateWebhookUrl, 
  createTestPayload,
  type ProcessedBlogPost 
} from "@/lib/webhooks";

interface BlogPost {
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

const Blog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Welcome to Julisha Solutions Blog",
      content: "This is the beginning of our journey...",
      excerpt: "An introduction to our mission and vision",
      author: "Julisha Team",
      publishedAt: "2024-01-15",
      status: "published"
    }
  ]);
  
  const [showEditor, setShowEditor] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [incomingWebhookUrl, setIncomingWebhookUrl] = useState("");
  const [webhookStatus, setWebhookStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    status: "draft"
  });

  // Handle incoming blog posts from Make.com/n8n with validation
  const handleIncomingPost = (postData: any) => {
    const validation = validateWebhookData(postData);
    
    if (!validation.isValid) {
      console.error("Webhook validation failed:", validation.errors);
      toast({
        title: "Invalid Webhook Data",
        description: `Failed to process blog post: ${validation.errors.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }

    if (!validation.processedData) {
      toast({
        title: "Processing Error",
        description: "Failed to process the webhook data",
        variant: "destructive",
      });
      return false;
    }

    const newPost: BlogPost = validation.processedData;
    setPosts(prev => [newPost, ...prev]);
    
    toast({
      title: "New Post Received",
      description: `Blog post "${newPost.title}" added via automation`,
    });
    
    return true;
  };

  // Set up webhook handling system
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'incoming_blog_post') {
        const success = handleIncomingPost(event.data.post);
        setWebhookStatus(success ? "success" : "error");
        
        // Reset status after 3 seconds
        setTimeout(() => setWebhookStatus("idle"), 3000);
      }
    };

    // Handle simulated webhook requests via fetch interception
    const handleFetch = (event: any) => {
      if (event.request?.url?.includes('/api/webhooks/blog/')) {
        event.respondWith(
          new Promise(async (resolve) => {
            try {
              const requestBody = await event.request.text();
              const postData = JSON.parse(requestBody);
              
              const success = handleIncomingPost(postData);
              
              resolve(new Response(
                JSON.stringify({ 
                  success, 
                  message: success ? "Blog post created successfully" : "Failed to create blog post" 
                }),
                { 
                  status: success ? 200 : 400,
                  headers: { 'Content-Type': 'application/json' }
                }
              ));
            } catch (error) {
              resolve(new Response(
                JSON.stringify({ success: false, message: "Invalid JSON data" }),
                { 
                  status: 400,
                  headers: { 'Content-Type': 'application/json' }
                }
              ));
            }
          })
        );
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Register service worker for webhook handling if not already registered
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/webhook-sw.js').catch(() => {
        // Fallback: create inline service worker
        const swCode = `
          self.addEventListener('fetch', function(event) {
            if (event.request.url.includes('/api/webhooks/blog/') && event.request.method === 'POST') {
              event.respondWith(
                event.request.text().then(body => {
                  // Send message to main thread
                  self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                      try {
                        const postData = JSON.parse(body);
                        client.postMessage({
                          type: 'incoming_blog_post',
                          post: postData
                        });
                      } catch (e) {
                        console.error('Failed to parse webhook data:', e);
                      }
                    });
                  });
                  
                  return new Response(JSON.stringify({success: true}), {
                    status: 200,
                    headers: {'Content-Type': 'application/json'}
                  });
                })
              );
            }
          });
        `;
        
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl);
      });
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleSavePost = (overrideStatus?: "draft" | "published") => {
    if (!currentPost.title || !currentPost.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }

    const finalStatus = overrideStatus || currentPost.status || "draft";

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: currentPost.title || "",
      content: currentPost.content || "",
      excerpt: currentPost.excerpt || currentPost.content?.substring(0, 150) + "..." || "",
      author: currentPost.author || "Anonymous",
      publishedAt: new Date().toISOString().split('T')[0],
      status: finalStatus
    };

    setPosts([newPost, ...posts]);
    setCurrentPost({ title: "", content: "", excerpt: "", author: "", status: "draft" });
    setShowEditor(false);
    
    toast({
      title: "Success",
      description: `Blog post ${finalStatus === "published" ? "published" : "saved as draft"} successfully`,
    });

    // Trigger webhook if configured and post is published
    if (webhookUrl && newPost.status === "published") {
      triggerWebhook(newPost);
    }
  };

  const triggerWebhook = async (post: BlogPost) => {
    try {
      const webhookPayload = {
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
          readingTime: Math.ceil(post.content.split(' ').length / 200), // Average reading speed
          url: `${window.location.origin}/blog/post/${post.id}`,
        },
        automation: {
          source: "julisha-blog-cms",
          version: "1.0",
        }
      };

      console.log("Triggering webhook with payload:", webhookPayload);

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(webhookPayload),
      });

      toast({
        title: "Webhook Triggered Successfully",
        description: "Make.com automation workflow has been notified with optimized data structure",
      });
    } catch (error) {
      console.error("Webhook error:", error);
      toast({
        title: "Webhook Error",
        description: "Failed to trigger automation. Please check your webhook URL.",
        variant: "destructive",
      });
    }
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post Deleted",
      description: "Blog post has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Blog Management</h1>
              <p className="text-muted-foreground">Create and manage your blog content with automation support</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowEditor(!showEditor)}
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-black"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            {/* Outgoing Webhook */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Webhook className="w-5 h-5" />
                  Outgoing Webhook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter your webhook URL (e.g., https://hook.make.com/...)"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (webhookUrl) {
                        toast({
                          title: "Webhook Saved",
                          description: "Automation will be triggered for published posts",
                        });
                      }
                    }}
                    className="w-full"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Save Outgoing URL
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Triggers when you publish posts manually
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Incoming Webhook */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Webhook className="w-5 h-5 rotate-180" />
                  Incoming Webhook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded border text-sm font-mono break-all">
                    {incomingWebhookUrl || "Click generate to create URL"}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const url = generateWebhookUrl();
                      setIncomingWebhookUrl(url);
                      navigator.clipboard.writeText(url);
                      toast({
                        title: "Webhook URL Generated",
                        description: "URL copied to clipboard! Use this in Make.com/n8n to POST blog posts here.",
                      });
                    }}
                    className="w-full"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Generate & Copy URL
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setWebhookStatus("testing");
                      const testPost = createTestPayload();
                      const success = handleIncomingPost(testPost);
                      setWebhookStatus(success ? "success" : "error");
                      
                      // Reset status after 3 seconds
                      setTimeout(() => setWebhookStatus("idle"), 3000);
                    }}
                    className="w-full"
                    disabled={webhookStatus === "testing"}
                  >
                    {webhookStatus === "testing" ? (
                      <>Testing...</>
                    ) : webhookStatus === "success" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                        Test Passed
                      </>
                    ) : webhookStatus === "error" ? (
                      <>
                        <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
                        Test Failed
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Test Incoming Post
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Use this URL in Make.com/n8n to automatically post blogs here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Post Editor */}
          {showEditor && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post Title"
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                />
                <Input
                  placeholder="Author"
                  value={currentPost.author}
                  onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                />
                <Textarea
                  placeholder="Excerpt (optional)"
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  rows={2}
                />
                <Textarea
                  placeholder="Write your blog content here..."
                  value={currentPost.content}
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  rows={8}
                />
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSavePost("draft")}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      onClick={() => handleSavePost("published")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Publish Now
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowEditor(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Blog Posts Grid */}
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === "published" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.publishedAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <PlusCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No blog posts yet</h3>
                <p className="text-muted-foreground mb-4">Create your first blog post to get started</p>
                <Button 
                  onClick={() => setShowEditor(true)}
                  className="bg-[#FFD700] hover:bg-[#FFE44D] text-black"
                >
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Public Blog Link */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-[#FFD700]/5">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Public Blog</h3>
              <p className="text-muted-foreground mb-4">
                View your published blog posts as visitors see them
              </p>
              <Button asChild variant="outline">
                <Link to="/blog/public">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Blog
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;