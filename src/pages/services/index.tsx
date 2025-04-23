
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Zap, MessageSquare, Globe, Lightbulb, Code } from "lucide-react";
import { services } from "@/lib/services";

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link key={service.slug} to={`/services/${service.slug}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <service.icon className="w-12 h-12 mb-4 text-[#FFD700]" />
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
