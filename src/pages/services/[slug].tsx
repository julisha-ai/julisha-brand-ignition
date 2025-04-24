
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 text-white pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black/30 inline-flex rounded-full p-4 mb-6">
              <service.icon className="w-12 h-12 text-[#FFD700]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">{service.description}</p>
            <Button asChild size="lg" className="bg-[#FFD700] hover:bg-[#FFE44D] text-black border-2 border-[#FFD700]">
              <Link to="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4 text-sm uppercase tracking-wider text-gray-500">Trusted by leading companies</div>
          <div className="flex justify-center flex-wrap gap-8 items-center opacity-70">
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-28 bg-gray-400 rounded"></div>
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-400 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Features & Benefits */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Features & Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex">
                  <span className="mr-4 text-[#FFD700] text-xl">•</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <blockquote className="text-lg text-gray-600 italic mb-4">
                    "{service.testimonial.quote}"
                  </blockquote>
                  <div className="font-medium">
                    {service.testimonial.author}
                    <span className="text-gray-500 ml-2">{service.testimonial.company}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <span className="text-gray-500">Case Study Image</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-black text-white p-12 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to transform your business?</h2>
            <p className="mb-6 text-gray-300">
              Join the innovative businesses already leveraging our {service.title} solutions.
            </p>
            <Button asChild size="lg" className="bg-[#FFD700] hover:bg-[#FFE44D] text-black border-2 border-[#FFD700]">
              <Link to="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
