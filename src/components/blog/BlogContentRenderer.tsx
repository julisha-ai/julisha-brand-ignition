
import { Card } from "@/components/ui/card";

interface BlogContentRendererProps {
  content: string;
  showAds?: boolean;
}

export function BlogContentRenderer({ content, showAds = true }: BlogContentRendererProps) {
  const renderContent = (text: string) => {
    let processed = text;
    
    // Convert headings
    processed = processed.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h3>');
    processed = processed.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h2>');
    processed = processed.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 text-foreground">$1</h1>');
    
    // Convert bold, italic, underline
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    processed = processed.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    processed = processed.replace(/__(.*?)__/g, '<u class="underline">$1</u>');
    
    // Convert inline code
    processed = processed.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Convert quotes
    processed = processed.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>');
    
    // Convert links
    processed = processed.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert images
    processed = processed.replace(/\[IMAGE:([^\]]+)\]/g, '<img src="$1" alt="Blog image" class="w-full max-w-2xl mx-auto rounded-lg shadow-lg my-6" loading="lazy" />');
    
    // Convert bullet lists
    processed = processed.replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>');
    
    // Convert numbered lists
    processed = processed.replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>');
    
    // Convert line breaks to paragraphs
    const paragraphs = processed.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      // Skip if it's already formatted (contains HTML tags)
      if (paragraph.includes('<')) {
        return paragraph;
      }
      
      // Regular paragraph
      return `<p class="mb-4 leading-relaxed text-foreground">${paragraph.replace(/\n/g, '<br />')}</p>`;
    }).join('');
  };

  const splitContentForAds = (content: string) => {
    const paragraphs = content.split('</p>').filter(p => p.trim());
    const sections = [];
    const midPoint = Math.floor(paragraphs.length / 2);
    
    // First section (before mid-point)
    sections.push(paragraphs.slice(0, midPoint).join('</p>') + '</p>');
    
    // Second section (after mid-point)
    if (paragraphs.length > midPoint) {
      sections.push(paragraphs.slice(midPoint).join('</p>') + '</p>');
    }
    
    return sections;
  };

  const AdPlaceholder = ({ position }: { position: string }) => (
    <Card className="my-8 p-6 bg-gradient-to-r from-muted/30 to-muted/50 border-dashed">
      <div className="text-center text-muted-foreground">
        <div className="text-sm font-medium mb-1">Advertisement</div>
        <div className="text-xs opacity-75">{position} Ad Placement</div>
        <div className="mt-3 p-4 bg-background/50 rounded border-2 border-dashed border-muted-foreground/20">
          <div className="text-xs">Google Ads will appear here</div>
          <div className="text-xs mt-1 opacity-60">Responsive Ad Unit</div>
        </div>
      </div>
    </Card>
  );

  const processedContent = renderContent(content);

  if (!showAds) {
    return (
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  }

  const contentSections = splitContentForAds(processedContent);

  return (
    <div className="prose prose-lg max-w-none">
      {/* Top Ad - after introduction */}
      <div dangerouslySetInnerHTML={{ __html: contentSections[0] }} />
      
      {contentSections.length > 1 && (
        <>
          <AdPlaceholder position="Mid-Article" />
          <div dangerouslySetInnerHTML={{ __html: contentSections[1] }} />
        </>
      )}
      
      {/* Bottom Ad - before conclusion */}
      <AdPlaceholder position="End-of-Article" />
    </div>
  );
};
