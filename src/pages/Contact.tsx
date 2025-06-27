
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Have questions or need assistance? We're here to help! Reach out to us through any of the following channels and our team will get back to you as soon as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <a href="tel:+15551234567" className="text-slate-300 hover:text-blue-400">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:info@househunt.com" className="text-slate-300 hover:text-blue-400">
                    info@househunt.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <a 
                    href="https://maps.google.com/?q=123+Main+Street,+City,+State+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-blue-400"
                  >
                    123 Main Street, City, State 12345
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
