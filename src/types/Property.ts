export interface Property {
  _id: string; // ✅ Use this if you're working with MongoDB-style documents
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: "apartment" | "house" | "studio" | "condo";
  images: string[];
  description: string;
  amenities: string[];
  landlord: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  bedrooms: string;
}
