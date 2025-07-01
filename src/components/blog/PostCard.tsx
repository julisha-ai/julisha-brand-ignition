
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, Edit, Trash2 } from "lucide-react";

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

interface PostCardProps {
  post: BlogPost;
  onDelete: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
              onClick={() => onDelete(post.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
