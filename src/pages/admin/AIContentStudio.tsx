import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sparkles, Settings, Save, Eye, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DOMPurify from "dompurify";

interface AIContentResponse {
  content: string;
  seoTitles: string[];
  metaDescription: string;
  excerpt: string;
  suggestedTags: string[];
}

interface AISettings {
  persona: string;
  tone: string;
  style: string;
  instructions: string;
  knowledgeBase: string;
}

export default function AIContentStudio() {
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState<AIContentResponse | null>(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [finalContent, setFinalContent] = useState("");
  const [finalExcerpt, setFinalExcerpt] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [aiSettings, setAISettings] = useState<AISettings>({
    persona: "industry expert",
    tone: "professional",
    style: "informative",
    instructions: "",
    knowledgeBase: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
    };

    checkAuth();
  }, [navigate]);

  const generateContent = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate content about.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: {
          topic,
          ...aiSettings,
          includeSeO: true
        }
      });

      if (error) {
        throw error;
      }

      setGeneratedContent(data);
      setSelectedTitle(data.seoTitles[0] || topic);
      setFinalContent(data.content);
      setFinalExcerpt(data.excerpt);
      setSelectedTags(data.suggestedTags || []);

      toast({
        title: "Content Generated!",
        description: "AI has successfully generated your article content.",
      });
    } catch (error: any) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveArticle = async (published: boolean = false) => {
    if (!selectedTitle || !finalContent) {
      toast({
        title: "Missing Content",
        description: "Please generate content and select a title before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { error } = await supabase.from('blog_posts').insert({
        title: selectedTitle,
        content: finalContent,
        excerpt: finalExcerpt,
        published,
        author_id: session?.user?.id,
        author_name: 'Julisha Solutions'
      });

      if (error) {
        throw error;
      }

      toast({
        title: published ? "Article Published!" : "Article Saved!",
        description: published 
          ? "Your article has been published successfully." 
          : "Your article has been saved as a draft.",
      });

      // Reset form
      setTopic("");
      setGeneratedContent(null);
      setSelectedTitle("");
      setFinalContent("");
      setFinalExcerpt("");
      setSelectedTags([]);

    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/admin/blog")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog Management
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              AI Content Studio
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
        </div>

        {showSettings && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>AI Content Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="persona">AI Persona</Label>
                  <Select value={aiSettings.persona} onValueChange={(value) => 
                    setAISettings(prev => ({ ...prev, persona: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industry expert">Industry Expert</SelectItem>
                      <SelectItem value="business consultant">Business Consultant</SelectItem>
                      <SelectItem value="technology specialist">Technology Specialist</SelectItem>
                      <SelectItem value="digital transformation advisor">Digital Transformation Advisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tone">Writing Tone</Label>
                  <Select value={aiSettings.tone} onValueChange={(value) => 
                    setAISettings(prev => ({ ...prev, tone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="style">Writing Style</Label>
                  <Select value={aiSettings.style} onValueChange={(value) => 
                    setAISettings(prev => ({ ...prev, style: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="analytical">Analytical</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="instructions">Custom Instructions</Label>
                <Textarea
                  placeholder="Add any specific instructions for the AI (e.g., include case studies, focus on specific industries, etc.)"
                  value={aiSettings.instructions}
                  onChange={(e) => setAISettings(prev => ({ ...prev, instructions: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="knowledgeBase">Additional Knowledge Base</Label>
                <Textarea
                  placeholder="Add any additional brand information, recent updates, or specific offerings to include..."
                  value={aiSettings.knowledgeBase}
                  onChange={(e) => setAISettings(prev => ({ ...prev, knowledgeBase: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Generation */}
          <Card>
            <CardHeader>
              <CardTitle>Generate New Article</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic">Article Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Digital Transformation Best Practices, Cloud Migration Strategies..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !loading) {
                      generateContent();
                    }
                  }}
                />
              </div>
              
              <Button 
                onClick={generateContent} 
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Article
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* SEO Optimization */}
          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle>SEO Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Choose Article Title</Label>
                  <div className="space-y-2 mt-2">
                    {generatedContent.seoTitles.map((title, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`title-${index}`}
                          name="title"
                          checked={selectedTitle === title}
                          onChange={() => setSelectedTitle(title)}
                          className="h-4 w-4 text-primary"
                        />
                        <label 
                          htmlFor={`title-${index}`} 
                          className="text-sm cursor-pointer flex-1"
                        >
                          {title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Meta Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {generatedContent.metaDescription}
                  </p>
                </div>

                <div>
                  <Label>Suggested Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {generatedContent.suggestedTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Generated Content Preview and Editing */}
        {generatedContent && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-4">
                  <div>
                    <Label htmlFor="excerpt">Article Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={finalExcerpt}
                      onChange={(e) => setFinalExcerpt(e.target.value)}
                      rows={3}
                      placeholder="Brief summary of the article..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Article Content (Markdown)</Label>
                    <Textarea
                      id="content"
                      value={finalContent}
                      onChange={(e) => setFinalContent(e.target.value)}
                      rows={20}
                      className="font-mono text-sm"
                      placeholder="Article content in Markdown format..."
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-4">
                  <div className="prose max-w-none">
                    <h1 className="text-3xl font-bold mb-4">{DOMPurify.sanitize(selectedTitle, { ALLOWED_TAGS: [] })}</h1>
                    <p className="text-lg text-muted-foreground mb-6">{DOMPurify.sanitize(finalExcerpt, { ALLOWED_TAGS: [] })}</p>
                    <Separator className="mb-6" />
                    <div 
                      className="markdown-content"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize(finalContent.replace(/\n/g, '<br>'), {
                          ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'blockquote', 'code'],
                          ALLOWED_ATTR: ['href', 'class', 'target', 'rel']
                        })
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4 mt-6">
                <Button 
                  onClick={() => saveArticle(false)}
                  disabled={saving}
                  variant="outline"
                >
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save as Draft
                </Button>
                
                <Button 
                  onClick={() => saveArticle(true)}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  Publish Article
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}