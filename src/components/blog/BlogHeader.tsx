
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye } from "lucide-react";

interface BlogHeaderProps {
  showPublishedOnly: boolean;
  setShowPublishedOnly: (show: boolean) => void;
  onNewPost: () => void;
}

export function BlogHeader({ showPublishedOnly, setShowPublishedOnly, onNewPost }: BlogHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Blog Management</h1>
        <p className="text-muted-foreground">Create and manage your blog content with automation support</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant={showPublishedOnly ? "default" : "outline"}
          onClick={() => setShowPublishedOnly(!showPublishedOnly)}
          className={showPublishedOnly ? "bg-green-600 hover:bg-green-700 text-white" : ""}
        >
          <Eye className="w-4 h-4 mr-2" />
          {showPublishedOnly ? "Show All Posts" : "Published Only"}
        </Button>
        <Button 
          onClick={onNewPost}
          className="bg-[#FFD700] hover:bg-[#FFE44D] text-black"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>
    </div>
  );
}
