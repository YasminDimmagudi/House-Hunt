import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Home, MessageSquare, CheckCircle, XCircle, Eye } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "renter" | "owner";
  status: "active" | "pending" | "suspended";
  joinDate: string;
  propertiesCount?: number;
}

interface PropertyListing {
  _id: string;
  title: string;
  ownerName: string;
  address: string;
  price: number;
  status: "active" | "pending" | "rejected";
  reportCount: number;
}

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [userRes, propertyRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/admin/properties", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUsers(userRes.data);
      setProperties(propertyRes.data);
    } catch (err) {
      console.error("❌ Failed to fetch admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchData();
    }
  }, [user]);

  const handleUserAction = async (userId: string, action: "approve" | "suspend" | "activate") => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/admin/users/${userId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh data
    } catch (err) {
      console.error("❌ Failed user action:", err);
    }
  };

  const handlePropertyAction = async (propertyId: string, action: "approve" | "reject") => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/admin/properties/${propertyId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh data
    } catch (err) {
      console.error("❌ Failed property action:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "suspended":
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const totalUsers = users.length;
  const pendingOwners = users.filter(u => u.role === "owner" && u.status === "pending").length;
  const totalProperties = properties.length;
  const pendingProperties = properties.filter(p => p.status === "pending").length;

  if (loading || isLoading) return <p className="p-4">Loading admin dashboard...</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage users, properties, and platform governance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><div className="text-2xl font-bold text-blue-600">{totalUsers}</div><div className="text-sm text-slate-600">Total Users</div></div><Users className="h-8 w-8 text-blue-500" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><div className="text-2xl font-bold text-yellow-600">{pendingOwners}</div><div className="text-sm text-slate-600">Pending Owners</div></div><CheckCircle className="h-8 w-8 text-yellow-500" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><div className="text-2xl font-bold text-green-600">{totalProperties}</div><div className="text-sm text-slate-600">Total Properties</div></div><Home className="h-8 w-8 text-green-500" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><div className="text-2xl font-bold text-purple-600">{pendingProperties}</div><div className="text-sm text-slate-600">Pending Reviews</div></div><MessageSquare className="h-8 w-8 text-purple-500" /></div></CardContent></Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="properties">Property Reviews</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{user.name}</h3>
                          <Badge variant="secondary">{user.role}</Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <div>Email: {user.email}</div>
                          <div>Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
                          {user.propertiesCount && <div>Properties: {user.propertiesCount}</div>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {user.status === "pending" && (
                          <>
                            <Button onClick={() => handleUserAction(user._id, "approve")} size="sm" className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                            <Button onClick={() => handleUserAction(user._id, "suspend")} size="sm" variant="outline" className="text-red-600 hover:text-red-700"><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                          </>
                        )}
                        {user.status === "active" && (
                          <Button onClick={() => handleUserAction(user._id, "suspend")} size="sm" variant="outline" className="text-red-600 hover:text-red-700">Suspend</Button>
                        )}
                        {user.status === "suspended" && (
                          <Button onClick={() => handleUserAction(user._id, "activate")} size="sm" className="bg-green-600 hover:bg-green-700">Reactivate</Button>
                        )}
                        <Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-1" />View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties">
            <Card>
              <CardHeader><CardTitle>Property Reviews</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map(property => (
                    <div key={property._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{property.title}</h3>
                          <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                          {property.reportCount > 0 && (
                            <Badge variant="destructive">{property.reportCount} reports</Badge>
                          )}
                        </div>
                        <div className="text-sm text-slate-600">
                          <div>Owner: {property.ownerName}</div>
                          <div>Address: {property.address}</div>
                          <div>Price: ${property.price.toLocaleString()}/month</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {property.status === "pending" && (
                          <>
                            <Button onClick={() => handlePropertyAction(property._id, "approve")} size="sm" className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                            <Button onClick={() => handlePropertyAction(property._id, "reject")} size="sm" variant="outline" className="text-red-600 hover:text-red-700"><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                          </>
                        )}
                        <Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-1" />View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader><CardTitle>Reports & Issues</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">No reports or issues to review at this time.</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
