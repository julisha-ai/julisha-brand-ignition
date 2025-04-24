
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/services";

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="block hover:scale-105 transition-transform">
              <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                <service.icon className="w-12 h-12 mb-4 text-[#FFD700]" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
