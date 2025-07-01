
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Webhook, Settings, PlusCircle, Eye } from "lucide-react";

interface WebhookConfigurationProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  incomingWebhookUrl: string;
  setIncomingWebhookUrl: (url: string) => void;
  onTestWebhook: () => void;
}

export function WebhookConfiguration({
  webhookUrl,
  setWebhookUrl,
  incomingWebhookUrl,
  setIncomingWebhookUrl,
  onTestWebhook
}: WebhookConfigurationProps) {
  const { toast } = useToast();

  const generateWebhookUrl = () => {
    const baseUrl = window.location.origin;
    return `https://vqkzyzlyrkxatgdqjczz.supabase.co/functions/v1/blog-webhook`;
  };

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2">
      {/* Outgoing Webhook */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Webhook className="w-5 h-5" />
            Outgoing Webhook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Input
              placeholder="Enter your webhook URL (e.g., https://hook.make.com/...)"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <Button 
              variant="outline"
              size="sm"
              onClick={() => {
                if (webhookUrl) {
                  toast({
                    title: "Webhook Saved",
                    description: "Automation will be triggered for published posts",
                  });
                }
              }}
              className="w-full"
            >
              <Settings className="w-4 h-4 mr-2" />
              Save Outgoing URL
            </Button>
            <p className="text-xs text-muted-foreground">
              Triggers when you publish posts manually
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Incoming Webhook */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Webhook className="w-5 h-5 rotate-180" />
            Incoming Webhook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded border text-sm font-mono break-all">
              {incomingWebhookUrl || "Click generate to create URL"}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const url = generateWebhookUrl();
                setIncomingWebhookUrl(url);
                navigator.clipboard.writeText(url);
                toast({
                  title: "Webhook URL Generated",
                  description: "URL copied to clipboard! Use this in Make.com/n8n to POST blog posts here.",
                });
              }}
              className="w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Generate & Copy URL
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onTestWebhook}
              className="w-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              Test Incoming Webhook
            </Button>
            <p className="text-xs text-muted-foreground">
              Use this URL in Make.com/n8n to automatically post blogs here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
