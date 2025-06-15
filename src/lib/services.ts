
import { Zap, MessageSquare, Globe, Lightbulb, Code } from "lucide-react";

export const services = [
  {
    icon: Zap,
    title: "Smart Agents",
    slug: "smart-agents",
    description: "AI-powered solutions that streamline your business operations",
    longDescription: "Transform your business with intelligent automation that works around the clock. Our Smart Agents leverage cutting-edge AI to handle complex tasks, analyze data in real-time, and provide personalized customer experiences that scale with your growth.",
    features: [
      "24/7 automated customer support with natural language understanding",
      "Intelligent task automation reducing manual work by up to 80%",
      "Real-time data analysis and predictive insights",
      "Scalable AI solutions that grow with your business",
      "Custom-trained models tailored to your industry specifics",
      "Seamless integration with existing business systems",
      "Advanced analytics dashboard for performance monitoring",
      "Multi-language support for global operations"
    ],
    benefits: [
      "Reduce operational costs by 60% while improving service quality",
      "Handle 10x more customer inquiries without additional staff",
      "24/7 availability ensures no customer query goes unanswered",
      "Consistent, accurate responses eliminate human error",
      "Free up your team to focus on strategic, high-value tasks"
    ],
    testimonial: {
      quote: "The Smart Agents have revolutionized our customer service operations, handling 70% of inquiries automatically while maintaining a 95% customer satisfaction rate. Our response time dropped from hours to seconds.",
      author: "Sarah Chen",
      company: "TechForward Inc",
      role: "VP of Customer Operations"
    },
    caseStudy: {
      title: "E-commerce Giant Scales Support 300% Without Adding Staff",
      challenge: "A rapidly growing online retailer was drowning in customer inquiries, with wait times reaching 2+ hours during peak seasons.",
      solution: "Implemented our Smart Agents system with custom training on product catalog, return policies, and order management.",
      results: [
        "300% increase in inquiry volume handled",
        "95% reduction in average response time",
        "40% improvement in customer satisfaction scores",
        "60% cost savings on support operations"
      ]
    },
    pricing: {
      starting: "$299/month",
      description: "Custom pricing based on volume and features"
    }
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    slug: "conversational-ai",
    description: "Intelligent chatbots and virtual assistants for enhanced customer engagement",
    longDescription: "Create meaningful conversations that convert. Our Conversational AI solutions understand context, emotion, and intent to deliver personalized experiences that feel genuinely human while operating at machine scale.",
    features: [
      "Advanced natural language processing with sentiment analysis",
      "Multi-language support for 50+ languages",
      "Context-aware responses that remember conversation history",
      "Seamless human handoff with conversation context transfer",
      "Custom personality development aligned with your brand",
      "Voice and text conversation capabilities",
      "Real-time learning from customer interactions",
      "Integration with CRM and support systems"
    ],
    benefits: [
      "Increase customer engagement rates by 65%",
      "Reduce support ticket volume by 50%",
      "Provide instant responses 24/7 across all time zones",
      "Maintain consistent brand voice across all interactions",
      "Scale customer conversations without hiring more staff"
    ],
    testimonial: {
      quote: "Our customer satisfaction scores increased by 40% after implementing Julisha's conversational AI solution. The AI doesn't just answer questions—it truly understands our customers and guides them to solutions.",
      author: "Michael Roberts",
      company: "Global Retail Solutions",
      role: "Customer Experience Director"
    },
    caseStudy: {
      title: "SaaS Company Reduces Churn 35% with Proactive AI Conversations",
      challenge: "A software company struggled with high customer churn due to poor onboarding and delayed support responses.",
      solution: "Deployed conversational AI for proactive onboarding, feature guidance, and instant support across web and mobile platforms.",
      results: [
        "35% reduction in customer churn rate",
        "80% faster time-to-value for new users",
        "90% of queries resolved without human intervention",
        "25% increase in feature adoption"
      ]
    },
    pricing: {
      starting: "$199/month",
      description: "Scales with conversation volume and features"
    }
  },
  {
    icon: Globe,
    title: "Brand Management",
    slug: "brand-management",
    description: "Comprehensive brand strategy and digital presence optimization",
    longDescription: "Build a brand that resonates, converts, and endures. Our comprehensive brand management services combine strategic thinking with tactical execution to create consistent, compelling brand experiences across every touchpoint.",
    features: [
      "Complete brand identity development and guidelines",
      "Strategic social media management and content creation",
      "Data-driven content strategy and editorial calendars",
      "Real-time brand monitoring and reputation management",
      "Crisis management and rapid response protocols",
      "Competitor analysis and market positioning",
      "Brand performance analytics and reporting",
      "Cross-platform consistency management"
    ],
    benefits: [
      "Increase brand recognition by 70% within 6 months",
      "Boost customer loyalty and repeat purchase rates",
      "Establish consistent brand voice across all channels",
      "Build trust through professional, cohesive branding",
      "Differentiate from competitors in crowded markets"
    ],
    testimonial: {
      quote: "Julisha helped us establish a consistent brand voice across all channels, leading to increased market recognition and a 50% boost in customer engagement. Our brand finally feels cohesive and professional.",
      author: "Emily Watson",
      company: "Innovation Labs",
      role: "Marketing Director"
    },
    caseStudy: {
      title: "Startup Achieves 300% Growth Through Strategic Brand Positioning",
      challenge: "A B2B startup struggled with brand confusion and low market recognition despite having a superior product.",
      solution: "Complete brand overhaul including positioning, visual identity, messaging framework, and multi-channel rollout strategy.",
      results: [
        "300% increase in qualified leads within 12 months",
        "85% improvement in brand recognition metrics",
        "200% growth in social media engagement",
        "Successfully raised Series A funding"
      ]
    },
    pricing: {
      starting: "$499/month",
      description: "Comprehensive packages tailored to your brand goals"
    }
  },
  {
    icon: Lightbulb,
    title: "AI Consulting",
    slug: "ai-consulting",
    description: "Expert guidance on implementing AI solutions for your business",
    longDescription: "Navigate the AI landscape with confidence. Our experienced consultants help you identify opportunities, avoid pitfalls, and implement AI solutions that deliver measurable business value from day one.",
    features: [
      "Comprehensive AI readiness assessment and gap analysis",
      "Strategic implementation roadmap with clear milestones",
      "Detailed ROI analysis and business case development",
      "Technical architecture planning and vendor selection",
      "Executive and team training programs",
      "Change management and adoption strategies",
      "Ongoing optimization and performance monitoring",
      "Regulatory compliance and ethical AI guidelines"
    ],
    benefits: [
      "Reduce AI implementation risks by 80%",
      "Accelerate time-to-value by 6+ months",
      "Ensure alignment between AI strategy and business goals",
      "Build internal AI expertise and capabilities",
      "Achieve measurable ROI within the first year"
    ],
    testimonial: {
      quote: "The consulting team provided invaluable insights that helped us navigate our AI transformation journey. Their strategic approach saved us months of trial and error and delivered ROI ahead of schedule.",
      author: "David Park",
      company: "Future Systems",
      role: "Chief Technology Officer"
    },
    caseStudy: {
      title: "Manufacturing Company Achieves $2M Annual Savings Through AI Optimization",
      challenge: "A traditional manufacturer wanted to modernize operations but lacked AI expertise and struggled with where to start.",
      solution: "6-month consulting engagement covering AI strategy, pilot project implementation, and team training across operations.",
      results: [
        "$2M annual cost savings through predictive maintenance",
        "40% reduction in equipment downtime",
        "25% improvement in production efficiency",
        "Successfully trained 50+ employees on AI tools"
      ]
    },
    pricing: {
      starting: "$5,000/project",
      description: "Custom engagements from strategy to implementation"
    }
  },
  {
    icon: Code,
    title: "Web Development",
    slug: "web-development",
    description: "Custom web solutions built with cutting-edge technology",
    longDescription: "Create digital experiences that convert and scale. Our development team builds high-performance, secure web applications using modern technologies that grow with your business and delight your users.",
    features: [
      "Responsive, mobile-first design and development",
      "Performance optimization for lightning-fast load times",
      "SEO-friendly architecture and technical optimization",
      "Enterprise-grade security and compliance",
      "Scalable cloud infrastructure and deployment",
      "Progressive web app (PWA) capabilities",
      "API development and third-party integrations",
      "Ongoing maintenance and support services"
    ],
    benefits: [
      "Increase conversion rates by up to 40%",
      "Improve search engine rankings and organic traffic",
      "Reduce bounce rates with optimized user experience",
      "Scale seamlessly with growing traffic and data",
      "Ensure maximum uptime with reliable infrastructure"
    ],
    testimonial: {
      quote: "Our new website has significantly improved our conversion rates and user engagement metrics. The team delivered a solution that not only looks amazing but performs exceptionally across all devices.",
      author: "Lisa Martinez",
      company: "Digital Growth Co",
      role: "Head of Digital Marketing"
    },
    caseStudy: {
      title: "E-commerce Platform Rebuild Drives 150% Revenue Growth",
      challenge: "An online retailer's outdated website was slow, difficult to navigate, and losing customers to competitors.",
      solution: "Complete platform rebuild with modern e-commerce framework, optimized checkout flow, and mobile-first design.",
      results: [
        "150% increase in online revenue within 6 months",
        "75% improvement in page load speeds",
        "60% reduction in cart abandonment rate",
        "200% increase in mobile conversions"
      ]
    },
    pricing: {
      starting: "$2,500/project",
      description: "Custom development based on scope and complexity"
    }
  },
];
