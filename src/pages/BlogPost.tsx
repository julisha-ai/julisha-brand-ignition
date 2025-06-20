import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Heart, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Linkedin 
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  published: boolean | null;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          navigate('/blog');
          return;
        }
        toast({
          title: "Error",
          description: "Failed to fetch blog post",
          variant: "destructive",
        });
        return;
      }

      setPost(data);
      setLikes(Math.floor(Math.random() * 50) + 10); // Simulated likes
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

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    toast({
      title: liked ? "Like removed" : "Post liked!",
      description: liked ? "You unliked this post" : "Thanks for your feedback",
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "Check out this blog post";
    
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Blog post link copied to clipboard",
        });
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Blog Post */}
          <article>
            <Card>
              <CardContent className="p-8">
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {post.title}
                  </h1>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author_name || "Julisha Solutions"}
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
                    <p className="text-lg text-muted-foreground italic mb-6 p-4 bg-muted rounded-lg">
                      {post.excerpt}
                    </p>
                  )}
                </header>

                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </div>
                </div>

                {/* Engagement Section */}
                <footer className="border-t pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Button
                        variant={liked ? "default" : "outline"}
                        onClick={handleLike}
                        className={liked ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                        {likes} {likes === 1 ? "Like" : "Likes"}
                      </Button>
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground mr-2">Share:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("facebook")}
                      >
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("twitter")}
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("linkedin")}
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("copy")}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Comments</h3>
                    <div className="text-center text-muted-foreground py-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Comments feature coming soon!</p>
                      <p className="text-sm">We're working on enabling discussions for our blog posts.</p>
                    </div>
                  </div>
                </footer>
              </CardContent>
            </Card>
          </article>

          {/* Related Posts */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-[#FFD700]/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Want to Learn More?
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore our other insights on AI innovation and digital transformation
              </p>
              <Button asChild variant="outline">
                <Link to="/blog">
                  View All Posts
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}