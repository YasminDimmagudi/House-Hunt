
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, MapPin, Bed, Bath, Square } from "lucide-react";
import { Property } from "../types/Property";
import AddPropertyModal from "../components/AddPropertyModal";

const mockOwnerProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "apartment",
    images: ["/placeholder.svg"],
    description: "Beautiful modern apartment in the heart of downtown",
    amenities: ["Gym", "Pool", "Parking"],
    landlord: {
      name: "John Smith",
      phone: "+1-555-0123",
      email: "john@example.com"
    }
  }
];

interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  moveInDate: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  sentDate: string;
}

const mockInquiries: Inquiry[] = [
  {
    id: "1",
    propertyId: "1",
    propertyTitle: "Modern Downtown Apartment",
    renterName: "Alice Johnson",
    renterEmail: "alice@example.com",
    renterPhone: "+1-555-0456",
    moveInDate: "2024-02-01",
    message: "I'm very interested in this property. I work remotely and am looking for a quiet place.",
    status: "pending",
    sentDate: "2024-01-15"
  }
];

const OwnerDashboard = () => {
  const [properties] = useState<Property[]>(mockOwnerProperties);
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleInquiryResponse = (inquiryId: string, status: "approved" | "rejected") => {
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === inquiryId ? { ...inquiry, status } : inquiry
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Owner Dashboard</h1>
            <p className="text-slate-600">Manage your properties and inquiries</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{properties.length}</div>
              <div className="text-sm text-slate-600">Total Properties</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {inquiries.filter(i => i.status === "pending").length}
              </div>
              <div className="text-sm text-slate-600">Pending Inquiries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {inquiries.filter(i => i.status === "approved").length}
              </div>
              <div className="text-sm text-slate-600">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-600">
                ${properties.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Total Monthly Rent</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries ({inquiries.filter(i => i.status === "pending").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-100 text-blue-700">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                    <div className="flex items-center text-slate-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.address}</span>
                    </div>

                    <div className="flex justify-between mb-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.sqft}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="font-bold text-green-600 text-lg">
                        ${property.price.toLocaleString()}/mo
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-slate-500">No inquiries yet.</div>
                  </CardContent>
                </Card>
              ) : (
                inquiries.map((inquiry) => (
                  <Card key={inquiry.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{inquiry.propertyTitle}</h3>
                          <div className="text-slate-600">From: {inquiry.renterName}</div>
                        </div>
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="font-medium">Contact Information:</div>
                          <div>Email: {inquiry.renterEmail}</div>
                          <div>Phone: {inquiry.renterPhone}</div>
                        </div>
                        <div>
                          <div className="font-medium">Move-in Date:</div>
                          <div>{new Date(inquiry.moveInDate).toLocaleDateString()}</div>
                          <div className="font-medium mt-2">Inquiry Date:</div>
                          <div>{new Date(inquiry.sentDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      {inquiry.message && (
                        <div className="mb-4">
                          <div className="font-medium text-sm mb-1">Message:</div>
                          <div className="bg-slate-50 p-3 rounded text-sm">{inquiry.message}</div>
                        </div>
                      )}

                      {inquiry.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleInquiryResponse(inquiry.id, "approved")}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleInquiryResponse(inquiry.id, "rejected")}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact Renter
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AddPropertyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default OwnerDashboard;
