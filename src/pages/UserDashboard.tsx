
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Clock, Eye, MessageSquare } from "lucide-react";

interface Inquiry {
  id: string;
  propertyTitle: string;
  propertyAddress: string;
  landlordName: string;
  status: "pending" | "viewed" | "approved" | "rejected";
  sentDate: string;
  moveInDate: string;
}

interface Favorite {
  id: string;
  title: string;
  address: string;
  price: number;
  addedDate: string;
}

const mockInquiries: Inquiry[] = [
  {
    id: "1",
    propertyTitle: "Modern Downtown Apartment",
    propertyAddress: "123 Main St, Downtown",
    landlordName: "John Smith",
    status: "pending",
    sentDate: "2024-01-15",
    moveInDate: "2024-02-01"
  },
  {
    id: "2",
    propertyTitle: "Cozy Family House",
    propertyAddress: "456 Oak Ave, Suburbs",
    landlordName: "Sarah Johnson",
    status: "viewed",
    sentDate: "2024-01-10",
    moveInDate: "2024-02-15"
  }
];

const mockFavorites: Favorite[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: 2500,
    addedDate: "2024-01-15"
  },
  {
    id: "3",
    title: "Studio Loft",
    address: "789 Art District, Creative Quarter",
    price: 1800,
    addedDate: "2024-01-12"
  }
];

const UserDashboard = () => {
  const [inquiries] = useState<Inquiry[]>(mockInquiries);
  const [favorites] = useState<Favorite[]>(mockFavorites);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "viewed": return "bg-blue-100 text-blue-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "viewed": return <Eye className="h-4 w-4" />;
      case "approved": return <MessageSquare className="h-4 w-4" />;
      case "rejected": return <MessageSquare className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">My Dashboard</h1>
          <p className="text-slate-600">Track your property inquiries and manage your favorites</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{inquiries.length}</div>
              <div className="text-sm text-slate-600">Total Inquiries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {inquiries.filter(i => i.status === "pending").length}
              </div>
              <div className="text-sm text-slate-600">Pending Responses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">{favorites.length}</div>
              <div className="text-sm text-slate-600">Saved Properties</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-slate-500">No inquiries yet. Start browsing properties!</div>
                  </CardContent>
                </Card>
              ) : (
                inquiries.map((inquiry) => (
                  <Card key={inquiry.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{inquiry.propertyTitle}</h3>
                          <div className="flex items-center text-slate-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {inquiry.propertyAddress}
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(inquiry.status)} flex items-center gap-1`}>
                          {getStatusIcon(inquiry.status)}
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Sent: {new Date(inquiry.sentDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Move-in: {new Date(inquiry.moveInDate).toLocaleDateString()}
                        </div>
                        <div>
                          Landlord: {inquiry.landlordName}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Property
                        </Button>
                        {inquiry.status === "approved" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Contact Landlord
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.length === 0 ? (
                <Card className="md:col-span-2 lg:col-span-3">
                  <CardContent className="p-8 text-center">
                    <div className="text-slate-500">No favorites yet. Heart some properties to save them here!</div>
                  </CardContent>
                </Card>
              ) : (
                favorites.map((favorite) => (
                  <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <img
                        src="/placeholder.svg"
                        alt={favorite.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold mb-2">{favorite.title}</h3>
                      <div className="flex items-center text-slate-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {favorite.address}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-green-600">
                          ${favorite.price.toLocaleString()}/mo
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
