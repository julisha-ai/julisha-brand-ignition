import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Lightbulb, Target, Shield, Zap, Users, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
            style={{
              backgroundImage: 'url(https://res.cloudinary.com/dx6zxdlts/image/upload/v1749649191/laptop-with-glowing-screen-table-dark-top-view-copy-space_qatkvc.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block p-3 bg-primary-foreground/10 rounded-2xl mb-6">
              <Lightbulb className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              About <span className="text-[#FFD700]">Julisha</span> Solutions
            </h1>
            <p className="text-xl md:text-3xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
              Empowering Your Vision with Intelligent Solutions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-20">
            
            {/* Introduction */}
            <Card className="bg-background/80 backdrop-blur-sm border-2 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed text-center max-w-5xl mx-auto">
                  In a world brimming with data and digital noise, Julisha Solutions emerges as your trusted partner, dedicated to illuminating the path forward for your business. We are a passionate team of innovators, strategists, and creative thinkers who believe in the transformative power of technology when guided by a human touch. Our mission is to demystify the complexities of Artificial Intelligence and Brand Management, providing you with the tools and expertise to build a powerful and unified presence, both online and off.
                </p>
              </CardContent>
            </Card>

            {/* Our Genesis */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-block p-4 bg-[#FFD700]/10 rounded-full mb-6">
                  <Zap className="w-10 h-10 text-[#FFD700]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Our Genesis: The Spark of an Idea
                </h2>
              </div>
              <Card className="bg-gradient-to-br from-muted/30 to-muted/10 border-0 shadow-lg">
                <CardContent className="p-8 md:p-10">
                  <p className="text-lg text-muted-foreground leading-relaxed text-center">
                    Julisha Solutions was born from a shared vision: to make cutting-edge AI technology accessible and to provide strategic brand guidance that fosters genuine connection. We saw a gap where businesses struggled to navigate the digital landscape and harness the full potential of their brand's narrative. We set out to be the spark—the <span className="text-[#FFD700] font-semibold">"Julisha" in Swahili means "to illuminate" or "to inform"</span>—that ignites growth and clarity for our clients. Our journey is one of continuous learning and adaptation, ensuring we are always at the forefront of innovation to keep your business ahead of the curve.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Our Approach */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Our Approach: The Convergence of AI and Brand Strategy
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  At Julisha Solutions, we don't see AI and brand management as separate entities; they are two sides of the same coin, working in synergy to create a seamless and impactful experience for your audience.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="inline-block p-3 bg-primary/10 rounded-xl mb-4">
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Intelligent Technology, Simplified
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      We believe that the most powerful technology is that which is easy to understand and implement. Our AI-driven services are designed to streamline your operations, unlock valuable insights from your data, and provide intelligent solutions that adapt to your unique needs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="inline-block p-3 bg-[#FFD700]/10 rounded-xl mb-4">
                        <Users className="w-8 h-8 text-[#FFD700]" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Authentic Brand Building
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      A strong brand is built on a foundation of authenticity and consistent messaging. We work closely with you to develop a brand identity that resonates with your target audience and is consistently reflected across all touchpoints, from your website to your social media presence.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Why Partner */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Why Partner with Julisha Solutions?
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  Choosing Julisha Solutions means choosing a partner committed to your success. We are more than just a service provider; we are an extension of your team, dedicated to understanding your challenges and crafting tailored solutions that deliver tangible results.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-primary">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-3 bg-primary/10 rounded-full">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Holistic Expertise
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our team brings together a unique blend of skills in artificial intelligence, data science, brand strategy, content creation, and web development.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-[#FFD700]">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-3 bg-[#FFD700]/10 rounded-full">
                        <Target className="w-6 h-6 text-[#FFD700]" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Tailored for You
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We recognize that every business is unique. We take the time to conduct an in-depth analysis of your specific characteristics and goals.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-primary">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-3 bg-primary/10 rounded-full">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Security & Trust
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We prioritize the security and privacy of your information with robust security measures to protect your data and customers' trust.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-[#FFD700]">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-3 bg-[#FFD700]/10 rounded-full">
                        <TrendingUp className="w-6 h-6 text-[#FFD700]" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Future-Focused
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We constantly explore new technologies to ensure our clients are well-equipped for the future, staying ahead of trends.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-primary/5 to-[#FFD700]/5 border-2 border-dashed border-primary/20">
              <CardContent className="text-center py-16 px-8">
                <div className="mb-8">
                  <div className="inline-block p-4 bg-gradient-to-br from-primary/10 to-[#FFD700]/10 rounded-full mb-6">
                    <Lightbulb className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Let's Build the Future, <span className="text-[#FFD700]">Together.</span>
                  </h2>
                  <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                    We are excited by the endless possibilities that lie at the intersection of technology and creativity. Let us help you unlock the full potential of your brand and embark on a journey of innovation and growth.
                  </p>
                </div>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-[#FFD700] hover:bg-[#FFE44D] text-black text-xl px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to="/contact">Contact Us Today</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
