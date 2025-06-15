
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import NotFound from "../NotFound";
import SEO from "@/components/SEO";

const ServicePage = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <NotFound />;
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.longDescription || service.description,
    "provider": {
      "@type": "Organization",
      "name": "Julisha Solutions"
    },
    "offers": service.pricing ? {
      "@type": "Offer",
      "price": service.pricing.starting,
      "priceCurrency": "USD",
      "description": service.pricing.description
    } : undefined
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${service.title} | Julisha Solutions`}
        description={service.longDescription || service.description}
        keywords={`${service.title}, AI solutions, ${service.features.slice(0,3).join(', ')}`}
        url={`/services/${service.slug}`}
        structuredData={serviceSchema}
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 text-white pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black/30 inline-flex rounded-full p-4 mb-6">
              <service.icon className="w-12 h-12 text-[#FFD700]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">{service.longDescription || service.description}</p>
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
          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start">
                  <div className="bg-[#FFD700]/10 rounded-full p-2 mr-4 mt-1">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                  </div>
                  <span className="text-gray-700 flex-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          {service.benefits && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Business Benefits</h2>
              <div className="bg-gradient-to-r from-[#FFD700]/5 to-[#FFD700]/10 p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-[#FFD700] rounded-full p-1 mr-4 mt-2">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pricing */}
          {service.pricing && (
            <div className="mb-16">
              <div className="bg-black text-white p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Investment</h2>
                <div className="text-4xl font-bold text-[#FFD700] mb-2">{service.pricing.starting}</div>
                <p className="text-gray-300 mb-6">{service.pricing.description}</p>
                <Button asChild size="lg" className="bg-[#FFD700] hover:bg-[#FFE44D] text-black border-2 border-[#FFD700]">
                  <Link to="/contact">Get Custom Quote</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Case Study */}
          {service.caseStudy && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Case Study</h2>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">{service.caseStudy.title}</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-bold text-red-600 mb-3">Challenge</h4>
                    <p className="text-gray-700">{service.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-600 mb-3">Solution</h4>
                    <p className="text-gray-700">{service.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-600 mb-3">Results</h4>
                    <ul className="space-y-2">
                      {service.caseStudy.results.map((result, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonial */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <blockquote className="text-xl text-gray-600 italic mb-6 text-center">
                "{service.testimonial.quote}"
              </blockquote>
              <div className="text-center">
                <div className="font-bold text-gray-900">{service.testimonial.author}</div>
                <div className="text-gray-500">{service.testimonial.role || ''}</div>
                <div className="text-[#FFD700] font-medium">{service.testimonial.company}</div>
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
