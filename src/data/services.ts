
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "smart-agents",
    name: "Smart Agents",
    slug: "smart-agents",
    description: "AI-powered solutions that streamline your business operations",
    features: [
      "24/7 automated customer support",
      "Intelligent task automation",
      "Natural language processing",
      "Custom workflow integration",
      "Real-time analytics and reporting"
    ]
  },
  {
    id: "ai-consulting",
    name: "AI Consulting",
    description: "Expert guidance on implementing AI solutions for your business",
    slug: "ai-consulting",
    features: [
      "AI readiness assessment",
      "Implementation strategy",
      "Technology stack optimization",
      "ROI analysis",
      "Staff training and support"
    ]
  },
  {
    id: "conversational-ai",
    name: "Conversational AI",
    slug: "conversational-ai",
    description: "Intelligent chatbots and virtual assistants for enhanced customer engagement",
    features: [
      "Natural language understanding",
      "Multi-channel support",
      "Seamless human handoff",
      "Contextual responses",
      "Custom voice and personality"
    ]
  },
  {
    id: "brand-management",
    name: "Brand Management",
    slug: "brand-management",
    description: "Comprehensive brand strategy and digital presence optimization",
    features: [
      "Brand identity development",
      "Social media management",
      "Content strategy",
      "Online reputation monitoring",
      "Brand analytics"
    ]
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    description: "Custom web solutions built with cutting-edge technology",
    features: [
      "Responsive design",
      "Performance optimization",
      "SEO best practices",
      "Security implementation",
      "Scalable architecture"
    ]
  }
];

