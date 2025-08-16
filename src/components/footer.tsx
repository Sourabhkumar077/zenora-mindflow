import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Security", href: "/security" },
      { name: "API", href: "/api" }
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" }
    ],
    Resources: [
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Guides", href: "/guides" },
      { name: "Research", href: "/research" }
    ],
    Legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
      { name: "HIPAA", href: "/hipaa" }
    ]
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-poppins text-foreground">
                Zenora
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              AI-powered mental health platform designed to support your emotional well-being with personalized therapy tools and insights.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@zenora.com</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                <span>1-800-ZENORA</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Zenora. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">
                Made with <Heart className="w-4 h-4 inline text-red-500" /> for mental wellness
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;