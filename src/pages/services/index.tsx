
import { services } from '@/data/services';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <Link 
              to={`/services/${service.slug}`}
              className="text-[#000] hover:text-[#FFD700] font-semibold transition-colors"
            >
              Learn More →
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
