
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-20 text-white">
      <div 
        className="absolute inset-0 bg-black/70 z-10"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dx6zxdlts/image/upload/v1745498789/julisha-banner_wxnraa.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container mx-auto px-4 text-center relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Digital Presence?
        </h2>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Join innovative businesses leveraging AI to enhance their brand impact
        </p>
        <Button 
          asChild
          size="lg" 
          className="bg-[#FFD700] hover:bg-[#FFE44D] text-black text-lg px-8"
        >
          <Link to="/contact">Request Demo</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
