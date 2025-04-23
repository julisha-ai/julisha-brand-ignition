
import { useParams } from 'react-router-dom';
import { services } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-xl text-gray-600 mb-4">The requested service does not exist.</p>
          <Link to="/services" className="text-blue-500 hover:text-blue-700 underline">
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{service.name}</h1>
        
        <Button asChild size="lg" className="mb-8 bg-[#FFD700] hover:bg-[#FFE44D] text-black">
          <Link to="/contact">Request Demo</Link>
        </Button>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 text-lg">{service.description}</p>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features & Benefits</h2>
          <ul className="list-disc pl-6 space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <p className="text-gray-700 mb-4">
            Join innovative businesses that trust Julisha Solutions to enhance their digital presence 
            and streamline operations through cutting-edge AI solutions.
          </p>
        </Card>

        <Button asChild size="lg" className="bg-[#FFD700] hover:bg-[#FFE44D] text-black">
          <Link to="/contact">Request Demo</Link>
        </Button>
      </div>
    </main>
  );
}
