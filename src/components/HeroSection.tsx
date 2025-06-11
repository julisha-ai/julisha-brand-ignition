
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] bg-black text-white flex items-center">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="https://res.cloudinary.com/dx6zxdlts/video/upload/v1714847232/bg_wtolgr.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <img 
            src="https://res.cloudinary.com/dx6zxdlts/image/upload/v1749648708/julisha-solutions-logo-2_syjxlj.png"
            alt="Julisha Solutions"
            className="h-20 mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-[#FFD700] animate-fade-in">Simplify AI.</span>{" "}
            <span className="animate-fade-in">Amplify Your Brand.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Unifying AI innovation with strategic brand management for seamless digital presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-[#FFD700] hover:bg-[#FFE44D] text-black text-lg px-8 border-2 border-[#FFD700]"
            >
              <Link to="/contact">Request Demo</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 bg-transparent"
            >
              <Link to="/services">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
