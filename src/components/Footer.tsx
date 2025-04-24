
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/lib/services";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  }
];

const socialLinks = [
  { Icon: Facebook, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img
              src="/lovable-uploads/8879aed8-bd16-443b-9953-a535627f1ff3.png"
              alt="Julisha Solutions"
              className="h-12 mb-4"
            />
            <p className="text-gray-400 text-sm">
              Unifying AI innovation with strategic brand management for seamless digital presence
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="font-bold text-lg mb-4">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-bold text-lg mb-4">Services</h2>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Newsletter</h2>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700"
              />
              <Button className="bg-[#FFD700] hover:bg-[#FFE44D] text-black">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Julisha Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
