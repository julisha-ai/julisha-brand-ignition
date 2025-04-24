
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/services";

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Services</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-300">
            Discover how our innovative solutions can transform your digital presence and streamline your business operations
          </p>
        </div>
      </div>
      
      {/* Services grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="flex">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 border-t-4 border-[#FFD700] flex flex-col">
                <div className="bg-black/5 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mt-auto flex items-center text-sm font-medium text-[#FFD700]">
                  Learn more 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
