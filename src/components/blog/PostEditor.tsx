
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PostEditorProps {
  currentPost: {
    title: string;
    content: string;
    excerpt: string;
    published: boolean;
  };
  setCurrentPost: (post: any) => void;
  onSave: (published: boolean) => void;
  onCancel: () => void;
}

export function PostEditor({ currentPost, setCurrentPost, onSave, onCancel }: PostEditorProps) {
  return (
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
              onClick={() => onSave(false)}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => onSave(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Publish Now
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
