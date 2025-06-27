import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth"; // uses AuthContext internally

interface AuthModalProps {
  type: "login" | "register" | null;
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ type, isOpen, onClose }: AuthModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "renter" as "renter" | "owner",
  });

  const { toast } = useToast();
  const { login } = useAuth(); // ← import login function from context

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (type === "register") {
        const res = await axios.post("http://localhost:5000/api/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        toast({
          title: "Registration Successful",
          description: res.data.message || "Account created successfully.",
        });
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);

        // ✅ Call the login method to update global auth context
        await login(); // fetches user and updates context

        toast({
          title: "Login Successful",
          description: `Welcome, ${res.data.user.name}`,
        });
      }

      // Close modal and reset form
      onClose();
      setFormData({ email: "", password: "", name: "", role: "renter" });

    } catch (error: any) {
      console.error("❌ Auth error:", error.response?.data || error.message);
      toast({
        title: "Authentication Failed",
        description:
          error.response?.data?.message || "Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "login" ? "Login to HouseHunt" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
          </div>

          {type === "register" && (
            <div>
              <Label htmlFor="role">I am a</Label>
              <Select
                value={formData.role}
                onValueChange={(value: "renter" | "owner") =>
                  handleInputChange("role", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renter">
                    Renter (Looking for properties)
                  </SelectItem>
                  <SelectItem value="owner">
                    Owner (Have properties to rent)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button type="submit" className="w-full">
            {type === "login" ? "Login" : "Create Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
