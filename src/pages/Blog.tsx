
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { PlusCircle, Eye } from "lucide-react";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { WebhookConfiguration } from "@/components/blog/WebhookConfiguration";
import { PostEditor } from "@/components/blog/PostEditor";
import { PostCard } from "@/components/blog/PostCard";

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
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);
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

  const testWebhook = async () => {
    const webhookUrl = `https://vqkzyzlyrkxatgdqjczz.supabase.co/functions/v1/blog-webhook`;
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
        await fetchPosts();
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

  const filteredPosts = posts.filter(post => showPublishedOnly ? post.published : true);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <BlogHeader 
            showPublishedOnly={showPublishedOnly}
            setShowPublishedOnly={setShowPublishedOnly}
            onNewPost={() => setShowEditor(!showEditor)}
          />

          <WebhookConfiguration
            webhookUrl={webhookUrl}
            setWebhookUrl={setWebhookUrl}
            incomingWebhookUrl={incomingWebhookUrl}
            setIncomingWebhookUrl={setIncomingWebhookUrl}
            onTestWebhook={testWebhook}
          />

          {showEditor && (
            <PostEditor
              currentPost={currentPost}
              setCurrentPost={setCurrentPost}
              onSave={handleSavePost}
              onCancel={() => setShowEditor(false)}
            />
          )}

          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={deletePost} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <PlusCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {showPublishedOnly ? "No published posts yet" : "No blog posts yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {showPublishedOnly 
                    ? "Publish a post to see it here" 
                    : "Create your first blog post to get started"
                  }
                </p>
                <Button 
                  onClick={() => setShowEditor(true)}
                  className="bg-[#FFD700] hover:bg-[#FFE44D] text-black"
                >
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}

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
