
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger
} from "./ui/navigation-menu";
import { services } from "@/lib/services";
import { Shield } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "BrandWise", href: "/service-recommendations", isSpecial: true },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const GOVERNANCE_URL = "https://governance.julishasolutions.com";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header role="banner" className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dx6zxdlts/image/upload/v1749648708/julisha-solutions-logo-2_syjxlj.png"
              alt="Julisha Solutions"
              className="h-12 md:h-14"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors text-sm lg:text-base ${
                  item.isSpecial 
                    ? "text-[#FFD700] hover:text-[#FFE44D] font-medium flex items-center gap-1" 
                    : "text-white hover:text-[#FFD700]"
                }`}
              >
                {item.isSpecial && <span>⚡</span>}
                {item.name}
              </Link>
            ))}

            <a
              href={GOVERNANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700] hover:text-[#FFE44D] font-medium flex items-center gap-1.5 text-sm lg:text-base transition-colors"
            >
              <Shield className="w-4 h-4" />
              Governance
            </a>

            <NavigationMenu className="relative z-50">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-[#FFD700] transition-colors text-sm lg:text-base bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#FFD700]">
                    Our Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-black !border !border-gray-700 !shadow-xl min-w-[400px] !z-50 !absolute">
                    <ul className="grid w-[400px] gap-1 p-4 text-white">
                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            to={`/services/${service.slug}`}
                            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-md transition-colors text-white hover:text-[#FFD700] group"
                          >
                            <service.icon className="w-5 h-5 text-[#FFD700] group-hover:scale-110 transition-transform" />
                            <div className="flex flex-col">
                              <span className="font-medium">{service.title}</span>
                              <span className="text-xs text-gray-400 group-hover:text-gray-300">{service.description}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                      <li className="border-t border-gray-700 pt-2 mt-2">
                        <Link
                          to="/services"
                          className="flex items-center justify-center gap-2 p-3 hover:bg-gray-800 rounded-md transition-colors text-[#FFD700] hover:text-[#FFE44D] font-medium"
                        >
                          <span>View All Services →</span>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] hover:bg-[#FFE44D] text-black border-2 border-[#FFD700]"
            >
              <Link to="/contact">Request Demo</Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors ${
                    item.isSpecial 
                      ? "text-[#FFD700] hover:text-[#FFE44D] font-medium flex items-center gap-1" 
                      : "text-white hover:text-[#FFD700]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.isSpecial && <span>⚡</span>}
                  {item.name}
                </Link>
              ))}
              
              <a
                href={GOVERNANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD700] hover:text-[#FFE44D] font-medium flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="w-4 h-4" />
                Governance Ladder
              </a>
              
              <div className="py-2">
                <div className="font-medium mb-2">Our Services</div>
                <ul className="pl-4 space-y-2">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <service.icon className="w-4 h-4 text-[#FFD700]" />
                        <span>{service.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                size="default"
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-black border-2 border-[#FFD700] w-full"
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Request Demo
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
