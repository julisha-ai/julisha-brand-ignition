
import { Card } from "@/components/ui/card";
import { Zap, MessageSquare, Globe, Lightbulb, Code } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Smart Agents",
    description: "AI-powered solutions that streamline your business operations"
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    description: "Intelligent chatbots and virtual assistants for enhanced customer engagement"
  },
  {
    icon: Globe,
    title: "Brand Management",
    description: "Comprehensive brand strategy and digital presence optimization"
  },
  {
    icon: Lightbulb,
    title: "AI Consulting",
    description: "Expert guidance on implementing AI solutions for your business"
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web solutions built with cutting-edge technology"
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <service.icon className="w-12 h-12 mb-4 text-[#FFD700]" />
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
