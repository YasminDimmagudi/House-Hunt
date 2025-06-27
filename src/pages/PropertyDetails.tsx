import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft, MapPin, Bed, Bath, Square, Phone, Mail, Heart
} from "lucide-react";
import { Property } from "../types/Property";
import PropertyInquiryModal from "../components/PropertyInquiryModal";
import { useToast } from "@/hooks/use-toast";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        toast({
          title: "Failed to load property",
          description: "Try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);

    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: property?.title,
    });
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case "apartment": return "bg-blue-100 text-blue-700 border-blue-200";
      case "house": return "bg-green-100 text-green-700 border-green-200";
      case "studio": return "bg-purple-100 text-purple-700 border-purple-200";
      case "condo": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading property details...</div>;
  }

  if (!property) {
    return <div className="p-10 text-center text-red-500">Property not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2">
            <div className="relative">
              {property.images?.length > 0 ? (
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                  No Image Available
                </div>
              )}

              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-slate-600"}`}
                />
              </button>
            </div>

            {property.images?.length > 1 && (
              <div className="flex gap-2 mt-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className={`${getPropertyTypeColor(property.type)} mb-2`}>
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </Badge>
                    <h1 className="text-2xl font-bold text-slate-800">{property.title}</h1>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    ${property.price.toLocaleString()}/mo
                  </div>
                </div>

                <div className="flex items-center text-slate-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{property.address}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Bed className="h-5 w-5 mx-auto mb-1 text-slate-400" />
                    <div className="text-sm font-medium">{property.bedrooms} Bed</div>
                  </div>
                  <div className="text-center">
                    <Bath className="h-5 w-5 mx-auto mb-1 text-slate-400" />
                    <div className="text-sm font-medium">{property.bathrooms} Bath</div>
                  </div>
                  <div className="text-center">
                    <Square className="h-5 w-5 mx-auto mb-1 text-slate-400" />
                    <div className="text-sm font-medium">{property.sqft} sqft</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowInquiryModal(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Send Inquiry
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => window.open(`tel:${property.landlord.phone}`)} variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button onClick={() => window.open(`mailto:${property.landlord.email}`)} variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-2">Landlord</h3>
                  <p className="text-slate-600">{property.landlord.name}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description & Amenities */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities?.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="justify-start">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PropertyInquiryModal
        property={property}
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
      />
    </div>
  );
};

export default PropertyDetails;
