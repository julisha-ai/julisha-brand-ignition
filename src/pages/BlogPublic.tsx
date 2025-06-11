import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// This would typically come from a database or API
const publishedPosts = [
  {
    id: "1",
    title: "Welcome to Julisha Solutions Blog",
    content: "This is the beginning of our journey into the world of AI and brand innovation. At Julisha Solutions, we believe in the power of technology to transform businesses and create meaningful connections with audiences. In this blog, we'll share insights, updates, and thought leadership on artificial intelligence, brand strategy, and digital transformation.",
    excerpt: "An introduction to our mission and vision",
    author: "Julisha Team",
    publishedAt: "2024-01-15",
    status: "published"
  }
];

const BlogPublic = () => {
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
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Link>
            </Button>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {publishedPosts.map((post) => (
              <article key={post.id} className="border-b border-border pb-8 last:border-b-0">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 hover:text-[#FFD700] transition-colors">
                      {post.title}
                    </h2>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex gap-4">
                      <Button 
                        asChild
                        className="bg-[#FFD700] hover:bg-[#FFE44D] text-black"
                      >
                        <Link to={`/blog/post/${post.id}`}>
                          Read More
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact">
                          Contact Us
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          {publishedPosts.length === 0 && (
            <Card className="text-center py-16">
              <CardContent>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Coming Soon
                </h3>
                <p className="text-muted-foreground mb-8">
                  We're working on exciting content to share with you. Check back soon!
                </p>
                <Button asChild className="bg-[#FFD700] hover:bg-[#FFE44D] text-black">
                  <Link to="/contact">
                    Get Notified
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