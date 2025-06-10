import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Julisha Solutions
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              Empowering Your Vision with Intelligent Solutions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                In a world brimming with data and digital noise, Julisha Solutions emerges as your trusted partner, dedicated to illuminating the path forward for your business. We are a passionate team of innovators, strategists, and creative thinkers who believe in the transformative power of technology when guided by a human touch. Our mission is to demystify the complexities of Artificial Intelligence and Brand Management, providing you with the tools and expertise to build a powerful and unified presence, both online and off.
              </p>
            </div>

            {/* Our Genesis */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Our Genesis: The Spark of an Idea
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Julisha Solutions was born from a shared vision: to make cutting-edge AI technology accessible and to provide strategic brand guidance that fosters genuine connection. We saw a gap where businesses struggled to navigate the digital landscape and harness the full potential of their brand's narrative. We set out to be the spark—the "Julisha" in Swahili means "to illuminate" or "to inform"—that ignites growth and clarity for our clients. Our journey is one of continuous learning and adaptation, ensuring we are always at the forefront of innovation to keep your business ahead of the curve.
              </p>
            </div>

            {/* Our Approach */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Our Approach: The Convergence of AI and Brand Strategy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At Julisha Solutions, we don't see AI and brand management as separate entities; they are two sides of the same coin, working in synergy to create a seamless and impactful experience for your audience.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Intelligent Technology, Simplified
                  </h3>
                  <p className="text-muted-foreground">
                    We believe that the most powerful technology is that which is easy to understand and implement. Our AI-driven services are designed to streamline your operations, unlock valuable insights from your data, and provide intelligent solutions that adapt to your unique needs.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Authentic Brand Building
                  </h3>
                  <p className="text-muted-foreground">
                    A strong brand is built on a foundation of authenticity and consistent messaging. We work closely with you to develop a brand identity that resonates with your target audience and is consistently reflected across all touchpoints, from your website to your social media presence.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Partner */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Why Partner with Julisha Solutions?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Choosing Julisha Solutions means choosing a partner committed to your success. We are more than just a service provider; we are an extension of your team, dedicated to understanding your challenges and crafting tailored solutions that deliver tangible results.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Holistic Expertise
                  </h3>
                  <p className="text-muted-foreground">
                    Our team brings together a unique blend of skills in artificial intelligence, data science, brand strategy, content creation, and web development. This multidisciplinary approach ensures that we consider every facet of your business.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Tailored for You
                  </h3>
                  <p className="text-muted-foreground">
                    We recognize that every business is unique. We take the time to conduct an in-depth analysis of your specific characteristics and goals to develop a customized strategy that aligns with your vision.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Commitment to Security and Trust
                  </h3>
                  <p className="text-muted-foreground">
                    In an age of data sensitivity, we prioritize the security and privacy of your information. Our solutions are built with robust security measures to ensure that both your data and your customers' trust are protected.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Future-Focused
                  </h3>
                  <p className="text-muted-foreground">
                    We are constantly exploring new technologies and methodologies to ensure that our clients are well-equipped for the future. With Julisha Solutions, you can be confident that you are not just keeping up with the trends, but staying ahead of them.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Let's Build the Future, Together.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We are excited by the endless possibilities that lie at the intersection of technology and creativity. Let us help you unlock the full potential of your brand and embark on a journey of innovation and growth.
              </p>
              <Button 
                asChild
                size="lg" 
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-black text-lg px-8"
              >
                <Link to="/contact">Contact Us Today to Start the Conversation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;