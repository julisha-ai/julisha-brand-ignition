import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  published: boolean | null;
  created_at: string;
  updated_at: string;
}

const BlogPublic = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  const fetchPublishedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
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

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditExcerpt(post.excerpt || "");
  };

  const handleSave = async () => {
    if (!editingPost) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: editTitle,
          content: editContent,
          excerpt: editExcerpt,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingPost.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update post",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Post updated successfully",
      });

      setEditingPost(null);
      fetchPublishedPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setEditTitle("");
    setEditContent("");
    setEditExcerpt("");
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Julisha Solutions <span className="text-[#FFD700]">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights on AI innovation, brand strategy, and digital transformation
            </p>
          </div>

          {/* Back to Admin */}
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link to="/admin/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Link>
            </Button>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-border pb-8 last:border-b-0">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    {editingPost?.id === post.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full text-2xl md:text-3xl font-bold bg-transparent border-b border-border focus:border-[#FFD700] outline-none"
                          placeholder="Post title..."
                        />
                        
                        <input
                          type="text"
                          value={editExcerpt}
                          onChange={(e) => setEditExcerpt(e.target.value)}
                          className="w-full text-sm bg-transparent border-b border-border focus:border-[#FFD700] outline-none"
                          placeholder="Post excerpt..."
                        />
                        
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full h-48 text-lg bg-transparent border border-border rounded focus:border-[#FFD700] outline-none p-4 resize-none"
                          placeholder="Post content..."
                        />
                        
                        <div className="flex gap-4">
                          <Button onClick={handleSave} className="bg-[#FFD700] hover:bg-[#FFE44D] text-black">
                            Save Changes
                          </Button>
                          <Button onClick={handleCancel} variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-2xl md:text-3xl font-bold text-foreground hover:text-[#FFD700] transition-colors">
                            {post.title}
                          </h2>
                          <Button
                            onClick={() => handleEdit(post)}
                            variant="outline"
                            size="sm"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Author
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {post.excerpt && (
                          <p className="text-lg text-muted-foreground mb-4 italic">
                            {post.excerpt}
                          </p>
                        )}

                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>

                        <div className="flex gap-4">
                          <Button variant="outline" asChild>
                            <Link to="/contact">
                              Contact Us
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <Card className="text-center py-16">
              <CardContent>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  No Published Posts Yet
                </h3>
                <p className="text-muted-foreground mb-8">
                  There are no published blog posts to display at the moment.
                </p>
                <Button asChild className="bg-[#FFD700] hover:bg-[#FFE44D] text-black">
                  <Link to="/admin/blog">
                    Go to Admin
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Newsletter Signup */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-[#FFD700]/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-6">
                Get the latest insights on AI and brand innovation delivered to your inbox.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-black"
              >
                <Link to="/contact">
                  Subscribe to Newsletter
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPublic;