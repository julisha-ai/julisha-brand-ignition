
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { services } from "@/data/services";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
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
          
          <nav className="hidden md:flex items-center space-x-8">
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
                  <NavigationMenuTrigger className="text-white hover:text-[#FFD700] transition-colors text-sm lg:text-base">
                    Our Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {services.map((service) => (
                        <li key={service.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/services/${service.slug}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{service.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <Button
            asChild
            size="lg"
            className="bg-[#FFD700] hover:bg-[#FFE44D] text-black hidden md:inline-flex"
          >
            <Link to="/contact">Request Demo</Link>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-white text-white"
            aria-label="Toggle menu"
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
    </header>
  );
}
