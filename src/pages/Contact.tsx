import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail, Clock, Send, Zap } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save contact form submission to Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          phone: formData.phone || null,
          service: formData.service || null,
          budget: formData.budget || null,
          message: formData.message,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving contact submission:', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-[#FFD700]/10 rounded-2xl mb-6">
              <Zap className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Let's Build Something <span className="text-[#FFD700]">Amazing</span> Together
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with AI? Get in touch for a free consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-background/80 backdrop-blur-sm border-2 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center mb-2">
                      Request a Free Consultation
                    </CardTitle>
                    <p className="text-muted-foreground text-center">
                      Tell us about your project and we'll get back to you within 24 hours
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@company.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Your Company"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="service">Service of Interest</Label>
                          <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="smart-agents">Smart Agents</SelectItem>
                              <SelectItem value="conversational-ai">Conversational AI</SelectItem>
                              <SelectItem value="brand-management">Brand Management</SelectItem>
                              <SelectItem value="ai-consulting">AI Consulting</SelectItem>
                              <SelectItem value="web-development">Web Development</SelectItem>
                              <SelectItem value="multiple">Multiple Services</SelectItem>
                              <SelectItem value="consultation">General Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Project Budget</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-10k">Under $10,000</SelectItem>
                              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                              <SelectItem value="over-100k">$100,000+</SelectItem>
                              <SelectItem value="discuss">Let's Discuss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us about your project, challenges, and goals..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-black text-lg py-6"
                      >
                        {loading ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Info Card */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#FFD700]">
                      Get in Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#FFD700]/20 rounded-lg">
                        <Mail className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-gray-300">julishasolutions@gmail.com</p>
                        <p className="text-gray-300">support@julishasolutions.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#FFD700]/20 rounded-lg">
                        <Phone className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Call Us</h3>
                        <p className="text-gray-300">+254 (797) 886-393</p>
                        <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#FFD700]/20 rounded-lg">
                        <MapPin className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-gray-300">New York, NY</p>
                        <p className="text-sm text-gray-400">Remote & On-site Services</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#FFD700]/20 rounded-lg">
                        <Clock className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Response Time</h3>
                        <p className="text-gray-300">Within 24 hours</p>
                        <p className="text-sm text-gray-400">Usually much faster</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us */}
                <Card className="bg-gradient-to-br from-[#FFD700]/5 to-primary/5 border-2 border-dashed border-[#FFD700]/20">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Why Choose Julisha Solutions?</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                        Free initial consultation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                        Custom solutions for your business
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                        Proven track record
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                        Ongoing support & maintenance
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* CTA for Blog */}
                <Card className="bg-gradient-to-br from-primary/5 to-background border-2">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Learn More</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Check out our blog for insights on AI and digital transformation
                    </p>
                    <Button variant="outline" asChild>
                      <a href="/blog/public">Read Our Blog</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
