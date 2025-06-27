import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "../types/Property";
import { MapPin, Bed, Bath, Square, Phone, Mail } from "lucide-react";

import PropertyInquiryModal from "./PropertyInquiryModal";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const { toast } = useToast();

  const handleContact = (type: "phone" | "email") => {
    if (type === "phone") {
      window.open(`tel:${property.landlord.phone}`);
    } else {
      window.open(
        `mailto:${property.landlord.email}?subject=Inquiry about ${property.title}`
      );
    }

    toast({
      title: "Contact initiated",
      description: `Opening ${type} to contact ${property.landlord.name}`,
    });
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case "apartment":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "house":
        return "bg-green-100 text-green-700 border-green-200";
      case "studio":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "condo":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm rounded-3xl">
        <div className="relative">
          <Link to={`/property/${property._id}`}>
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4">
            <Badge
              className={`${getPropertyTypeColor(property.type)} font-semibold shadow-lg border-2`}
            >
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
          </div>

          <div className="absolute bottom-4 right-4">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-2xl font-bold text-xl shadow-lg">
              ${property.price.toLocaleString()}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <Link to={`/property/${property._id}`}>
            <h3 className="font-bold text-xl mb-3 text-slate-800 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-600">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center text-slate-600 mb-4">
            <MapPin className="h-5 w-5 mr-2 text-blue-500" />
            <span className="text-sm line-clamp-1">{property.address}</span>
          </div>

          <div className="flex justify-between mb-5 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
            <div className="flex items-center">
              <Bed className="h-5 w-5 mr-2 text-slate-500" />
              <span className="font-medium">{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-2 text-slate-500" />
              <span className="font-medium">{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <Square className="h-5 w-5 mr-2 text-slate-500" />
              <span className="font-medium">{property.sqft} sqft</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm mb-5 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1"
              >
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1"
              >
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>

          <div className="border-t border-slate-100 pt-5">
            <div className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl">
              <strong className="text-slate-800">Landlord:</strong>{" "}
              {property.landlord.name}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowInquiryModal(true)}
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Send Inquiry
              </Button>
              <Button
                onClick={() => handleContact("phone")}
                size="sm"
                variant="outline"
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl p-3 transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => handleContact("email")}
                size="sm"
                variant="outline"
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl p-3 transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PropertyInquiryModal
        property={property}
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
      />
    </>
  );
};

export default PropertyCard;
