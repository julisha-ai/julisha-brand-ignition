import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Save, Copy, Download, Star, Zap, Users, TrendingUp, Target, Megaphone, Brain, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const BrandWise = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    customIndustry: "",
    businessSize: "",
    currentChallenges: "",
    goals: "",
    budgetRange: "",
    specificBudget: "",
    timeline: "",
    additionalInfo: ""
  });
  const [recommendations, setRecommendations] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [showProModal, setShowProModal] = useState(false);

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
      toast.success("BrandWise recommendations generated successfully!");
      setShowSaveOptions(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyRecommendations = () => {
    navigator.clipboard.writeText(recommendations);
    toast.success("Recommendations copied to clipboard!");
  };

  const handleDownloadRecommendations = () => {
    const element = document.createElement("a");
    const file = new Blob([recommendations], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "brandwise-recommendations.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Recommendations downloaded!");
  };

  const handleSaveRecommendations = () => {
    setShowProModal(true);
  };

  const formatRecommendations = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Headers (lines starting with #)
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-3 text-primary">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mt-4 mb-2 text-primary">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-medium mt-3 mb-2 text-foreground">{line.substring(4)}</h3>;
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-2">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
            )}
          </p>
        );
      }
      
      // Bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Regular paragraphs
      return <p key={index} className="mb-2 leading-relaxed">{line}</p>;
    });
  };

  const proAgents = [
    {
      name: "Product Market Fit Companion",
      icon: Target,
      description: "Deep dive into market validation, customer discovery, and product positioning strategies",
      specialization: "Market Research & Product Strategy",
      features: ["Market analysis", "Customer interviews", "Product-market fit assessment", "Positioning strategy"]
    },
    {
      name: "Strategy Companion", 
      icon: TrendingUp,
      description: "Comprehensive business strategy, competitive analysis, and sustainable growth planning",
      specialization: "Strategic Planning & Business Development",
      features: ["Strategic planning", "Competitive analysis", "Growth strategies", "Business model optimization"]
    },
    {
      name: "Marketing Companion",
      icon: Megaphone,
      description: "Digital marketing strategies, brand development, and customer acquisition optimization",
      specialization: "Marketing & Brand Development",
      features: ["Digital marketing", "Brand positioning", "Customer acquisition", "Campaign optimization"]
    },
    {
      name: "Team Building Companion",
      icon: Users,
      description: "Organizational design, hiring strategies, and team performance optimization",
      specialization: "Human Resources & Team Development",
      features: ["Organizational design", "Hiring strategies", "Team optimization", "Performance management"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <SEO
        title="BrandWise - AI-Powered Business Intelligence - Julisha Solutions"
        description="Get personalized business recommendations and access specialized AI companions with BrandWise Pro"
        url="/service-recommendations"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">BrandWise</span>
            </div>
            <h1 className="text-4xl font-bold">AI-Powered Business Intelligence</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized business recommendations powered by advanced AI. Discover insights, strategies, and actionable advice tailored to your unique business needs.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Business Intelligence Questionnaire</CardTitle>
              <CardDescription>
                Provide details about your business to unlock personalized BrandWise recommendations and insights.
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
                  <div className="space-y-2">
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
                    {formData.industry === 'other' && (
                      <Input
                        placeholder="Please specify your industry"
                        value={formData.customIndustry}
                        onChange={(e) => handleInputChange('customIndustry', e.target.value)}
                      />
                    )}
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
                  <div className="space-y-2">
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
                    {formData.budgetRange === 'under-10k' && (
                      <Input
                        placeholder="Specify exact budget (e.g., $5,000)"
                        value={formData.specificBudget}
                        onChange={(e) => handleInputChange('specificBudget', e.target.value)}
                      />
                    )}
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

                <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating BrandWise Intelligence...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Get BrandWise Recommendations
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {recommendations && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Your BrandWise Recommendations
                    </CardTitle>
                    <CardDescription>
                      AI-powered insights and strategies tailored specifically for your business.
                    </CardDescription>
                  </div>
                  {showSaveOptions && (
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopyRecommendations}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownloadRecommendations}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" onClick={handleSaveRecommendations} className="bg-gradient-to-r from-primary to-primary/80">
                        <Save className="h-4 w-4 mr-1" />
                        Save & Unlock Pro
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-foreground">
                  {formatRecommendations(recommendations)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pro Features Modal */}
          <Dialog open={showProModal} onOpenChange={setShowProModal}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Zap className="h-6 w-6 text-primary" />
                  Unlock BrandWise Pro
                </DialogTitle>
                <DialogDescription>
                  Save your recommendations and access specialized AI business companions for ongoing consultation.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Pro Benefits */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    What You Get with BrandWise Pro:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        Save and access all your recommendations anytime
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        Access to specialized AI business companions
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        Follow-up consultations at subsidized rates
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        Priority support and expert guidance
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Pro Agents */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Meet Your BrandWise Companions:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {proAgents.map((agent, index) => (
                      <Card key={index} className="border-primary/20 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <agent.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-semibold text-sm">{agent.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{agent.specialization}</p>
                              <p className="text-sm mb-3">{agent.description}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Key Features:</p>
                            <ul className="text-xs space-y-1">
                              {agent.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <ArrowRight className="h-3 w-3 text-primary" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">$29</div>
                    <div className="text-sm text-muted-foreground mb-1">One-time registration fee</div>
                    <div className="text-xs text-muted-foreground">
                      Unlock Pro features + access to specialized companions at subsidized rates
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" 
                    size="lg"
                    onClick={() => window.open('https://payment.intasend.com/pay/46132722-b089-4fdc-a73d-762ebfcb34ab/', '_blank')}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Get BrandWise Pro Access Now
                  </Button>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Secure payment powered by IntaSend. Create your account after payment to access Pro features.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      ⚡ Limited Time: Get 50% off your first specialized consultation session
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default BrandWise;