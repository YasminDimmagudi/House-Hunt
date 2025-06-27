
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, User, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    role: "renter" as "renter" | "owner"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Updated",
      description: "Your account settings have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Settings className="h-8 w-8 text-blue-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Account Settings
            </h1>
          </div>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Update your personal details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="role" className="text-slate-300">Account Type</Label>
                    <Select value={formData.role} onValueChange={(value: "renter" | "owner") => handleInputChange("role", value)}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="renter">Renter</SelectItem>
                        <SelectItem value="owner">Property Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300 flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-300 flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-slate-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
              <CardDescription className="text-slate-400">
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
