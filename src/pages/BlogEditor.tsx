import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye, Trash2, Upload } from "lucide-react";

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  author_name: string;
}

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  
  const [post, setPost] = useState<BlogPost>({
    title: "",
    content: "",
    excerpt: "",
    published: false,
    author_name: "Julisha Solutions"
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      
      if (id) {
        await fetchPost();
      }
    };

    checkAuth();
  }, [id, navigate]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch blog post",
          variant: "destructive",
        });
        navigate("/admin/blog");
        return;
      }

      setPost({
        id: data.id,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || "",
        published: data.published || false,
        author_name: (data as any).author_name || "Julisha Solutions"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!post.title || !post.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const postData = {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || post.content.substring(0, 150) + "...",
        published: publish,
        author_id: session?.user?.id,
        author_name: post.author_name
      };

      let result;
      if (id) {
        // Update existing post
        result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id)
          .select()
          .single();
      } else {
        // Create new post
        result = await supabase
          .from('blog_posts')
          .insert([postData])
          .select()
          .single();
      }

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to save blog post",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Blog post ${publish ? "published" : "saved as draft"} successfully`,
      });

      if (!id) {
        navigate(`/admin/blog/edit/${result.data.id}`);
      } else {
        setPost(prev => ({ ...prev, published: publish }));
      }
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

  const handleDelete = async () => {
    if (!id) return;
    
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
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

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      
      navigate("/admin/blog");
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

  const handleImageUpload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Image upload functionality will be available in the next update",
    });
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/admin/blog")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog Management
              </Button>
              <h1 className="text-3xl font-bold">
                {id ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
            </div>
            
            {id && post.published && (
              <Button
                variant="outline"
                onClick={() => navigate(`/blog/${id}`)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Live
              </Button>
            )}
          </div>

          {/* Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Author */}
              <div>
                <label className="text-sm font-medium mb-2 block">Author</label>
                <Input
                  placeholder="Author name (optional)"
                  value={post.author_name}
                  onChange={(e) => setPost({...post, author_name: e.target.value})}
                />
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium mb-2 block">Title *</label>
                <Input
                  placeholder="Enter blog post title..."
                  value={post.title}
                  onChange={(e) => setPost({...post, title: e.target.value})}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-sm font-medium mb-2 block">Excerpt</label>
                <Textarea
                  placeholder="Brief description of the post (optional - will auto-generate if empty)"
                  value={post.excerpt}
                  onChange={(e) => setPost({...post, excerpt: e.target.value})}
                  rows={3}
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Content *</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Add Media
                  </Button>
                </div>
                <Textarea
                  placeholder="Write your blog content here..."
                  value={post.content}
                  onChange={(e) => setPost({...post, content: e.target.value})}
                  rows={20}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Tip: Use line breaks to separate paragraphs. Media upload feature coming soon!
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSave(false)}
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button
                    onClick={() => handleSave(true)}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {post.published ? "Update & Keep Published" : "Publish Now"}
                  </Button>
                </div>

                {id && (
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Post
                  </Button>
                )}
              </div>

              {post.published && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    ✅ This post is currently <strong>published</strong> and visible to readers.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}