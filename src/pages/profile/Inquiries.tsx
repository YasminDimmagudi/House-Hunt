
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, MapPin, Clock } from "lucide-react";

const Inquiries = () => {
  // Mock data for user inquiries
  const inquiries = [
    {
      id: 1,
      propertyTitle: "Modern Downtown Apartment",
      propertyAddress: "123 Main St, Downtown",
      message: "Hi, I'm interested in scheduling a viewing for this property. Are you available this weekend?",
      status: "pending",
      sentDate: "2024-01-15",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      propertyTitle: "Cozy Suburban House",
      propertyAddress: "456 Oak Ave, Suburbs",
      message: "I'd like to know more about the lease terms and if pets are allowed.",
      status: "responded",
      sentDate: "2024-01-12",
      lastUpdated: "2024-01-13"
    },
    {
      id: 3,
      propertyTitle: "Luxury Waterfront Condo",
      propertyAddress: "789 Harbor Dr, Waterfront",
      message: "Is this property still available? I'm looking to move in next month.",
      status: "closed",
      sentDate: "2024-01-08",
      lastUpdated: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      case "responded":
        return "text-green-400 bg-green-400/10";
      case "closed":
        return "text-slate-400 bg-slate-400/10";
      default:
        return "text-slate-400 bg-slate-400/10";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Response";
      case "responded":
        return "Responded";
      case "closed":
        return "Closed";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <MessageSquare className="h-8 w-8 text-blue-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Your Inquiries
            </h1>
          </div>
          
          {inquiries.length > 0 ? (
            <div className="space-y-6">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl mb-2">
                          {inquiry.propertyTitle}
                        </CardTitle>
                        <CardDescription className="text-slate-300 flex items-center mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {inquiry.propertyAddress}
                        </CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inquiry.status)}`}>
                        {getStatusText(inquiry.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                      <p className="text-slate-300 leading-relaxed">
                        {inquiry.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Sent: {new Date(inquiry.sentDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Updated: {new Date(inquiry.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          View Property
                        </Button>
                        {inquiry.status === "pending" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Follow Up
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MessageSquare className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                No inquiries yet
              </h3>
              <p className="text-slate-400 mb-6">
                When you contact property owners, your inquiries will appear here.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Browse Properties
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
