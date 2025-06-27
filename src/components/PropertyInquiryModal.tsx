
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Property } from "../types/Property";
import { useToast } from "@/hooks/use-toast";

interface PropertyInquiryModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyInquiryModal = ({ property, isOpen, onClose }: PropertyInquiryModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock inquiry submission
    toast({
      title: "Inquiry Sent!",
      description: `Your inquiry for ${property.title} has been sent to ${property.landlord.name}`,
    });
    
    onClose();
    setFormData({ name: "", email: "", phone: "", moveInDate: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Inquiry for {property.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
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
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
              <Input
                id="moveInDate"
                type="date"
                value={formData.moveInDate}
                onChange={(e) => handleInputChange("moveInDate", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell the landlord about yourself, any questions, etc."
              rows={4}
            />
          </div>
          
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Send Inquiry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyInquiryModal;
