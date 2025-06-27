import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Edit, Trash2, Eye, MapPin, Calendar, Bed, Bath, Square
} from "lucide-react";
import AddPropertyModal from "../components/AddPropertyModal";
import { Property } from "../types/Property";

interface Inquiry {
  _id: string;
  propertyId?: string;
  propertyTitle: string;
  propertyAddress?: string;
  renterName?: string;
  renterEmail?: string;
  renterPhone?: string;
  landlordName?: string;
  moveInDate: string;
  message?: string;
  status: "pending" | "viewed" | "approved" | "rejected";
  sentDate: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<"owner" | "renter">("renter");
  const [properties, setProperties] = useState<Property[]>([]);
  const [ownerInquiries, setOwnerInquiries] = useState<Inquiry[]>([]);
  const [userInquiries, setUserInquiries] = useState<Inquiry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setRole(user.role === "owner" ? "owner" : "renter");
    fetchData();
  }, [user]);

  const fetchData = async () => {
  setIsLoading(true);
  const token = localStorage.getItem("token");

  try {
    if (role === "owner") {
      const [propRes, inqRes] = await Promise.all([
        axios.get("/api/owner/properties", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/api/owner/inquiries", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setProperties(Array.isArray(propRes.data) ? propRes.data : []);
      setOwnerInquiries(Array.isArray(inqRes.data) ? inqRes.data : []);
    } else {
      const inqRes = await axios.get("/api/renter/inquiries", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserInquiries(Array.isArray(inqRes.data) ? inqRes.data : []);
    }
  } catch (err) {
    console.error("Failed loading dashboard:", err);
  } finally {
    setIsLoading(false);
  }
};


  const handleInquiryStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/api/owner/inquiries/${id}/${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error("Inquiry update failed:", err);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "viewed": return "bg-blue-100 text-blue-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading || isLoading) {
    return <div className="p-6">Loading dashboard…</div>;
  }

  if (role === "owner") {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2" /> Add Property
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
          <Card><CardContent><h2 className="text-xl">{properties.length}</h2><p>Total Properties</p></CardContent></Card>
          <Card><CardContent><h2 className="text-xl">{ownerInquiries.filter(i => i.status === "pending").length}</h2><p>Pending Inquiries</p></CardContent></Card>
          <Card><CardContent><h2 className="text-xl">{ownerInquiries.filter(i => i.status === "approved").length}</h2><p>Approved Inquiries</p></CardContent></Card>
          <Card><CardContent><h2 className="text-xl">${properties.reduce((sum, p) => sum + p.price, 0).toLocaleString()}</h2><p>Total Monthly Rent</p></CardContent></Card>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="grid md:grid-cols-3 gap-6">
              {properties.map(p =>
                <Card key={p.id}>
                  <CardHeader><CardTitle>{p.title}</CardTitle></CardHeader>
                  <CardContent>
                    <p><MapPin className="inline" /> {p.address}</p>
                    <div className="flex space-x-4 my-2">
                      <span><Bed className="inline" /> {p.bedrooms}</span>
                      <span><Bath className="inline" /> {p.bathrooms}</span>
                      <span><Square className="inline" /> {p.sqft}</span>
                    </div>
                    <p className="font-bold">${p.price}/mo</p>
                    <div className="flex space-x-2 mt-4">
                      <Button><Eye className="mr-1" />View</Button>
                      <Button variant="outline"><Edit className="mr-1" />Edit</Button>
                      <Button variant="outline"><Trash2 /></Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="space-y-4">
              {ownerInquiries.length === 0 && <p>No inquiries yet.</p>}
              {ownerInquiries.map(i =>
                <Card key={i._id}>
                  <CardContent>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{i.propertyTitle}</p>
                        <p>From: {i.renterName}</p>
                      </div>
                      <Badge className={getStatusColor(i.status)}>{i.status}</Badge>
                    </div>
                    <p className="my-2"><Calendar className="inline" /> Move-in: {new Date(i.moveInDate).toLocaleDateString()}</p>
                    <p className="mb-2">{i.message}</p>
                    {i.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button onClick={() => handleInquiryStatus(i._id, "approved")}>Approve</Button>
                        <Button variant="outline" onClick={() => handleInquiryStatus(i._id, "rejected")}>Reject</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <AddPropertyModal isOpen={showAddModal} onClose={() => { setShowAddModal(false); fetchData(); }} />
      </div>
    );
  }

  // renter view
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card><CardContent><h2>{userInquiries.length}</h2><p>Total Inquiries</p></CardContent></Card>
        <Card><CardContent><h2>{userInquiries.filter(i => i.status === "pending").length}</h2><p>Pending</p></CardContent></Card>
      </div>

      <Tabs defaultValue="inquiries" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="inquiries">
          <div className="space-y-4">
            {userInquiries.length === 0 && <p>No inquiries made yet.</p>}
            {userInquiries.map(i =>
              <Card key={i._id}>
                <CardContent>
                  <div className="flex justify-between">
                    <p className="font-semibold">{i.propertyTitle}</p>
                    <Badge className={getStatusColor(i.status)}>{i.status}</Badge>
                  </div>
                  <p><MapPin className="inline" /> {i.propertyAddress}</p>
                  <p><Calendar className="inline" /> Sent {new Date(i.sentDate).toLocaleDateString()}</p>
                  <p><Calendar className="inline" /> Move-in {new Date(i.moveInDate).toLocaleDateString()}</p>
                  {i.status === "approved" && (
                    <Button onClick={() => window.location.href = `mailto:${i.landlordName}`}>
                      Contact Landlord
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
