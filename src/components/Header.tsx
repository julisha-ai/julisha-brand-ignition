
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

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header role="banner" className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/8879aed8-bd16-443b-9953-a535627f1ff3.png"
              alt="Julisha Solutions"
              className="h-12 md:h-14"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-[#FFD700] transition-colors text-sm lg:text-base"
              >
                {item.name}
              </Link>
            ))}

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-[#FFD700] transition-colors text-sm lg:text-base bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Our Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-black border border-gray-800 z-50 mt-2">
                    <ul className="grid w-[400px] gap-3 p-4">
                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            to={`/services/${service.slug}`}
                            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md"
                          >
                            <service.icon className="w-6 h-6 text-[#FFD700]" />
                            <span>{service.title}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to="/services"
                          className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md mt-2 border-t border-gray-700 pt-4"
                        >
                          <span>View All Services</span>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <Button
            asChild
            size="lg"
            className="bg-[#FFD700] hover:bg-[#FFE44D] text-black border-2 border-[#FFD700] hidden md:inline-flex"
          >
            <Link to="/contact">Request Demo</Link>
          </Button>

          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="border-white text-white hover:bg-white/20"
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:text-[#FFD700]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
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
