
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image, 
  Code,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function RichTextEditor({ value, onChange, placeholder, rows = 20 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const insertFormatting = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newText = value.substring(0, start) + prefix + textToInsert + suffix + value.substring(end);
    onChange(newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const insertImagePlaceholder = () => {
    insertFormatting("[IMAGE:", "]", "image-url-here");
    toast({
      title: "Image Placeholder Added",
      description: "Replace 'image-url-here' with your actual image URL"
    });
  };

  const formatButtons = [
    { icon: Heading1, action: () => insertFormatting("# ", "", "Heading 1"), label: "H1" },
    { icon: Heading2, action: () => insertFormatting("## ", "", "Heading 2"), label: "H2" },
    { icon: Heading3, action: () => insertFormatting("### ", "", "Heading 3"), label: "H3" },
    { icon: Bold, action: () => insertFormatting("**", "**", "bold text"), label: "Bold" },
    { icon: Italic, action: () => insertFormatting("*", "*", "italic text"), label: "Italic" },
    { icon: Underline, action: () => insertFormatting("__", "__", "underlined text"), label: "Underline" },
    { icon: List, action: () => insertFormatting("- ", "", "List item"), label: "Bullet List" },
    { icon: ListOrdered, action: () => insertFormatting("1. ", "", "Numbered item"), label: "Numbered List" },
    { icon: Quote, action: () => insertFormatting("> ", "", "Quote"), label: "Quote" },
    { icon: Code, action: () => insertFormatting("`", "`", "code"), label: "Inline Code" },
    { icon: Link, action: () => insertFormatting("[", "](url)", "link text"), label: "Link" },
    { icon: Image, action: insertImagePlaceholder, label: "Image" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1 p-2 border rounded-lg bg-muted/50">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      
      <Textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="font-mono resize-none"
      />
      
      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>Formatting Guide:</strong></p>
        <p>• **bold** *italic* __underline__ `code` {`>`} quote</p>
        <p>• # H1, ## H2, ### H3 for headings</p>
        <p>• [link text](url) for links</p>
        <p>• [IMAGE:url] for images</p>
        <p>• - or 1. for lists</p>
      </div>
    </div>
  );
}
