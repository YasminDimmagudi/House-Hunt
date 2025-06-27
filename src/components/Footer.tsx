
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl">HouseHunt</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your trusted partner in finding the perfect rental property. We connect renters with quality homes and reliable landlords.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-400 cursor-pointer transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-400 cursor-pointer transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-400 cursor-pointer transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-400 cursor-pointer transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-200">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/services/tenant-screening" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Tenant Screening
                </Link>
              </li>
              <li>
                <Link to="/services/maintenance" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Maintenance Services
                </Link>
              </li>
              <li>
                <Link to="/services/legal-support" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Legal Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-200">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <a 
                  href="https://maps.google.com/?q=123+Main+Street,+City,+State+12345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  123 Main Street, City, State 12345
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <a 
                  href="tel:+15551234567"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <a 
                  href="mailto:info@househunt.com"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  info@househunt.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              © 2024 HouseHunt. All rights reserved. rev
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
