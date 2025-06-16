import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterSignupProps {
  source?: string;
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

const NewsletterSignup = ({ 
  source = "footer", 
  className = "",
  placeholder = "Enter your email",
  buttonText = "Subscribe"
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            source: source,
            status: 'active'
          }
        ]);

      if (error) {
        if (error.code === '23505') { // unique constraint violation
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've successfully subscribed to our newsletter",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? "..." : buttonText}
      </Button>
    </form>
  );
};

export default NewsletterSignup;