
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyModal = ({ isOpen, onClose }: AddPropertyModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    type: "apartment" as "apartment" | "house" | "studio" | "condo",
    description: "",
    amenities: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock property creation
    toast({
      title: "Property Added!",
      description: `${formData.title} has been successfully added to your listings.`,
    });
    
    onClose();
    setFormData({
      title: "",
      address: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      type: "apartment",
      description: "",
      amenities: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Modern Downtown Apartment"
                required
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Full address including city and state"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="price">Monthly Rent ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="2500"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Property Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: "apartment" | "house" | "studio" | "condo") => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                placeholder="2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                step="0.5"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                placeholder="2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                value={formData.sqft}
                onChange={(e) => handleInputChange("sqft", e.target.value)}
                placeholder="1200"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your property, its features, and what makes it special..."
              rows={4}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="amenities">Amenities</Label>
            <Input
              id="amenities"
              value={formData.amenities}
              onChange={(e) => handleInputChange("amenities", e.target.value)}
              placeholder="Gym, Pool, Parking, Pet Friendly (comma separated)"
            />
          </div>
          
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Property
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyModal;
