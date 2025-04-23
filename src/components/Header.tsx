
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Services", href: "/services" },
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
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-[#FFD700] transition-colors text-sm lg:text-base"
              >
                {item.name}
              </Link>
            ))}
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
