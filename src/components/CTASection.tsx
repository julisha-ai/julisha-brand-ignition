
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Digital Presence?
        </h2>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Join innovative businesses leveraging AI to enhance their brand impact
        </p>
        <Button 
          size="lg" 
          className="bg-[#FFD700] hover:bg-[#FFE44D] text-black text-lg px-8"
        >
          Request Demo
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
