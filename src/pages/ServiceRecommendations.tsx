import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, Zap, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const formatRecommendations = (text: string) => {
  if (!text) return "";
  
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/###\s*(.*)/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-primary">$1</h3>')
    .replace(/##\s*(.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3 text-primary">$1</h2>')
    .replace(/#\s*(.*)/g, '<h1 class="text-2xl font-bold mt-8 mb-4 text-primary">$1</h1>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br/>')
    .replace(/^(.*)/, '<p class="mb-3">$1</p>');
};

const ServiceRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    businessSize: "",
    currentChallenges: "",
    goals: "",
    budgetRange: "",
    timeline: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('service-recommendations', {
        body: formData
      });

      if (error) throw error;

      setRecommendations(data.recommendations);
      setShowRecommendations(true);
      toast.success("Recommendations generated successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showRecommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <SEO
          title="Your AI-Powered Service Recommendations - Julisha Solutions"
          description="Personalized AI and brand management service recommendations tailored to your business needs"
          url="/service-recommendations"
        />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Analysis Complete
              </Badge>
              <h1 className="text-4xl font-bold mb-4">Your Personalized Recommendations</h1>
              <p className="text-muted-foreground text-lg">
                Based on your business profile and current market trends
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Strategic Business Recommendations
                </CardTitle>
                <CardDescription>
                  Tailored insights for {formData.company || formData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: formatRecommendations(recommendations) 
                  }}
                />
              </CardContent>
            </Card>

            {/* Ad Space */}
            <Card className="mb-8 border-dashed border-2 border-primary/20 bg-primary/5">
              <CardContent className="py-8 text-center">
                <Badge variant="outline" className="mb-2">Sponsored</Badge>
                <h3 className="text-lg font-semibold mb-2">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground mb-4">
                  Get started with Julisha Solutions' AI-powered services today
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Schedule Free Consultation
                </Button>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowRecommendations(false)}
                className="mr-4"
              >
                Generate New Recommendations
              </Button>
              <Button onClick={() => window.location.href = '/contact'}>
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <SEO
        title="AI Service Recommendations - Julisha Solutions"
        description="Get personalized AI and brand management service recommendations based on your business needs and current market trends"
        url="/service-recommendations"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Business Consultant
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Discover Your Perfect AI Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our intelligent assistant analyzes your business needs and current market trends to recommend 
              the most effective AI and brand management services for your growth.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms analyze your business profile against current market data
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Market Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time analysis of industry trends and emerging technologies
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Strategic Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Customized implementation roadmaps and budget optimization
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tell Us About Your Business</CardTitle>
              <CardDescription>
                The more details you provide, the more accurate and valuable our recommendations will be
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="businessSize">Business Size</Label>
                    <Select onValueChange={(value) => handleInputChange('businessSize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                        <SelectItem value="small">Small (11-50 employees)</SelectItem>
                        <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                        <SelectItem value="large">Large (200+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentChallenges">Current Business Challenges</Label>
                  <Textarea
                    id="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                    placeholder="Describe your main business challenges..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="goals">Business Goals & Objectives</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="What are your primary business goals for the next 12 months?"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budgetRange">Budget Range</Label>
                    <Select onValueChange={(value) => handleInputChange('budgetRange', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under $10,000</SelectItem>
                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="over-100k">Over $100,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline">Implementation Timeline</Label>
                    <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                        <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any additional details about your business, current tools, or specific requirements..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Your Business...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Get My AI Recommendations
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Ad Space */}
          <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
            <CardContent className="py-8 text-center">
              <Badge variant="outline" className="mb-2">Partnership Opportunity</Badge>
              <h3 className="text-lg font-semibold mb-2">Join Our Partner Network</h3>
              <p className="text-muted-foreground mb-4">
                Become a certified Julisha Solutions partner and grow your business with AI
              </p>
              <Button variant="outline">Learn More</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceRecommendations;