import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/lib/services";
import NewsletterSignup from "./NewsletterSignup";

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
          <div className="md:col-span-1 text-center md:text-left">
            <img
              src="/lovable-uploads/8879aed8-bd16-443b-9953-a535627f1ff3.png"
              alt="Julisha Solutions"
              className="h-12 mb-4 mx-auto md:mx-0"
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
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with our latest AI insights and solutions
            </p>
            <NewsletterSignup 
              source="footer"
              placeholder="Enter your email"
              buttonText="Subscribe"
            />
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61560274963428" },
                { Icon: Instagram, href: "https://www.instagram.com/julisha.ai/" },
                { Icon: Twitter, href: "https://x.com/JulishaSol" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/julisha-solutions/" },
                { Icon: Youtube, href: "https://www.youtube.com/@JulishaAi" }
              ].map(({ Icon, href }) => (
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
