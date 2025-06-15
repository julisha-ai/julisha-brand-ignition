
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";

const Index = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Julisha Solutions",
    "description": "Unifying AI innovation with strategic brand management for seamless digital presence",
    "url": "https://julisha.com",
    "logo": "https://julisha.com/lovable-uploads/8879aed8-bd16-443b-9953-a535627f1ff3.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-JULISHA",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61560274963428",
      "https://www.instagram.com/julisha.ai/",
      "https://x.com/JulishaSol",
      "https://www.linkedin.com/in/julisha-solutions/",
      "https://www.youtube.com/@JulishaAi"
    ],
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "serviceArea": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI & Brand Management Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Smart Agents",
          "description": "AI-powered solutions that streamline your business operations"
        },
        {
          "@type": "Service", 
          "name": "Conversational AI",
          "description": "Intelligent chatbots and virtual assistants for enhanced customer engagement"
        },
        {
          "@type": "Service",
          "name": "Brand Management", 
          "description": "Comprehensive brand strategy and digital presence optimization"
        },
        {
          "@type": "Service",
          "name": "AI Consulting",
          "description": "Expert guidance on implementing AI solutions for your business"
        },
        {
          "@type": "Service",
          "name": "Web Development",
          "description": "Custom web solutions built with cutting-edge technology"
        }
      ]
    }
  };

  return (
    <main className="min-h-screen">
      <SEO
        title="Julisha Solutions - AI Innovation & Brand Management"
        description="Transform your business with our AI-powered Smart Agents, Conversational AI, and comprehensive brand management services. Get 24/7 automation, intelligent customer engagement, and strategic brand optimization."
        keywords="AI solutions, Smart Agents, Conversational AI, Brand Management, Web Development, AI Consulting, Business Automation, Digital Marketing, Customer Service AI"
        url="/"
        structuredData={organizationSchema}
      />
      <HeroSection />
      <ServicesGrid />
      <CTASection />
    </main>
  );
};

export default Index;
