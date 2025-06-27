
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface HeroProps {
  onSearch: (filters: any) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const [searchLocation, setSearchLocation] = useState("");

  const handleQuickSearch = () => {
    onSearch({
      location: searchLocation,
      minPrice: 0,
      maxPrice: 10000,
      propertyType: "all",
      bedrooms: "any"
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
              Rental Home
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed animate-fade-in delay-300">
            Discover amazing rental properties with advanced search filters and connect directly with trusted landlords
          </p>
          
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in delay-500">
            <div className="flex flex-col sm:flex-row gap-4 p-3 bg-white/15 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 h-6 w-6" />
                <Input
                  placeholder="Enter location (city, neighborhood, address)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-12 py-4 bg-white/25 border-white/30 text-white placeholder:text-white/70 focus:bg-white/35 rounded-2xl text-lg font-medium"
                />
              </div>
              <Button 
                onClick={handleQuickSearch}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
              >
                <Search className="mr-3 h-6 w-6" />
                Search Properties
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in delay-700">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-3">12K+</div>
              <div className="text-blue-100 text-lg font-medium">Properties Listed</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-3">800+</div>
              <div className="text-blue-100 text-lg font-medium">Verified Landlords</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-3">24/7</div>
              <div className="text-blue-100 text-lg font-medium">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
