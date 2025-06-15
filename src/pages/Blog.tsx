import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  Settings
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author_id?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [incomingWebhookUrl, setIncomingWebhookUrl] = useState("");
  const [currentPost, setCurrentPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    published: false
  });

  // Check authentication and fetch posts
  useEffect(() => {
    const checkAuthAndFetchPosts = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      await fetchPosts();
    };

    checkAuthAndFetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        });
        return;
      }

      setPosts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (published: boolean = false) => {
    if (!currentPost.title || !currentPost.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const postData = {
        title: currentPost.title,
        content: currentPost.content,
        excerpt: currentPost.excerpt || currentPost.content.substring(0, 150) + "...",
        published,
        author_id: session?.user?.id
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save blog post",
          variant: "destructive",
        });
        return;
      }

      setPosts(prev => [data, ...prev]);
      setCurrentPost({ title: "", content: "", excerpt: "", published: false });
      setShowEditor(false);
      
      toast({
        title: "Success",
        description: `Blog post ${published ? "published" : "saved as draft"} successfully`,
      });

      // Trigger webhook if configured and post is published
      if (webhookUrl && published) {
        triggerWebhook(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
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
          published: post.published,
          created_at: post.created_at,
          wordCount: post.content.split(' ').length,
          readingTime: Math.ceil(post.content.split(' ').length / 200),
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
        description: "Make.com automation workflow has been notified",
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

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        });
        return;
      }

      setPosts(posts.filter(post => post.id !== id));
      toast({
        title: "Post Deleted",
        description: "Blog post has been removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const generateWebhookUrl = () => {
    const baseUrl = window.location.origin;
    return `https://vqkzyzlyrkxatgdqjczz.supabase.co/functions/v1/blog-webhook`;
  };

  const testWebhook = async () => {
    const webhookUrl = generateWebhookUrl();
    const testPayload = {
      title: "Test Blog Post from Automation",
      content: "This is a test blog post created via webhook to verify the incoming webhook functionality is working correctly.",
      excerpt: "This is a test blog post created via webhook",
      published: false
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testPayload),
      });

      if (response.ok) {
        toast({
          title: "Test Successful",
          description: "Webhook test completed successfully! Check for the new test post.",
        });
        await fetchPosts(); // Refresh the posts to show the new test post
      } else {
        toast({
          title: "Test Failed",
          description: "Webhook test failed. Please check the logs.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Test Error",
        description: "Failed to test webhook. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                    onClick={testWebhook}
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Test Incoming Webhook
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
                      onClick={() => handleSavePost(false)}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      onClick={() => handleSavePost(true)}
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
                          post.published 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author_id ? "Admin" : "System"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString()}
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