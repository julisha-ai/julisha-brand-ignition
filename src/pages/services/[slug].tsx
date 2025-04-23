
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import NotFound from "../NotFound";

const ServicePage = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Service Header */}
        <div className="mb-12 text-center">
          <service.icon className="w-16 h-16 mx-auto mb-6 text-[#FFD700]" />
          <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{service.description}</p>
          <Button asChild size="lg" className="bg-[#FFD700] hover:bg-[#FFE44D] text-black">
            <Link to="/contact">Request Demo</Link>
          </Button>
        </div>

        {/* Features & Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Features & Benefits</h2>
          <ul className="space-y-4">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-4 text-[#FFD700]">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Proof Section */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
          <blockquote className="text-lg text-gray-600 italic mb-4">
            {service.testimonial.quote}
          </blockquote>
          <div className="font-medium">
            {service.testimonial.author}
            <span className="text-gray-500 ml-2">{service.testimonial.company}</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-[#FFD700] hover:bg-[#FFE44D] text-black">
            <Link to="/contact">Request Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
