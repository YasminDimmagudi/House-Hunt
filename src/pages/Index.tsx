import { useState } from "react";
import Hero from "../components/Hero";
import SearchFilters from "../components/SearchFilters";
import PropertyGrid from "../components/PropertyGrid";
import { Property } from "../types/Property";

// ✅ Updated Mock Property Data with real MongoDB-style _id
const mockProperties: Property[] = [
  {
    _id: "665adb8e13ffbfa0b1cc9842",
    title: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "apartment",
    images: ["https://images.unsplash.com/photo-1504615755583-2916b52192a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8dWslMjBob3VzZXx8MHx8fHwxNjI5MjAwNzgx&ixlib=rb-1.2.1&q=80&w=1080"],
    description:
      "Beautiful modern apartment in the heart of downtown with city views and premium amenities.",
    amenities: ["Gym", "Pool", "Parking", "Pet Friendly"],
    landlord: {
      name: "John Smith",
      phone: "+1-555-0123",
      email: "john@example.com",
    },
  },
  {
    _id: "665ae1c48fd7eacc3c9d127b",
    title: "Cozy Family House",
    address: "456 Oak Ave, Suburbs",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    type: "house",
    images: ["https://th.bing.com/th/id/R.fc03164f8d502aeea36a25ee79ef08bc?rik=h5ar4At2KNkKhw&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1582268611958-ebfd161ef9cf%3fixlib%3drb-1.2.1%26q%3d80%26fm%3djpg%26crop%3dentropy%26cs%3dtinysrgb%26w%3d1080%26fit%3dmax&ehk=vJwIgGMOFGBwxdsp3SK3ZAsQv2Ox2Cy7EukgdyE3RD4%3d&risl=&pid=ImgRaw&r=0"],
    description:
      "Spacious family home with large backyard and quiet neighborhood location.",
    amenities: ["Garage", "Backyard", "Fireplace", "Washer/Dryer"],
    landlord: {
      name: "Sarah Johnson",
      phone: "+1-555-0124",
      email: "sarah@example.com",
    },
  },
  {
    _id: "665ae2308fd7eacc3c9d127f",
    title: "Studio Loft",
    address: "789 Art District, Creative Quarter",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    type: "studio",
    images: ["https://th.bing.com/th/id/OIP.7xp7AJb3RTCvkUEAT828rAHaE8?r=0&w=2121&h=1414&rs=1&pid=ImgDetMain"],
    description:
      "Trendy studio loft in the artistic heart of the city with high ceilings and exposed brick.",
    amenities: [
      "High Ceilings",
      "Exposed Brick",
      "Natural Light",
      "Close to Transit",
    ],
    landlord: {
      name: "Mike Davis",
      phone: "+1-555-0125",
      email: "mike@example.com",
    },
  },
  {
    _id: "665ae2848fd7eacc3c9d1281",
    title: "Luxury Penthouse",
    address: "101 Sky Tower, Uptown",
    price: 5500,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2500,
    type: "apartment",
    images: ["https://th.bing.com/th/id/OIP.tlr14wUKVqV1G0bLsEdEYAHaEJ?r=0&rs=1&pid=ImgDetMain"],
    description:
      "Stunning penthouse with panoramic city views and luxury finishes throughout.",
    amenities: ["City Views", "Balcony", "Concierge", "Gym", "Pool"],
    landlord: {
      name: "Lisa Chen",
      phone: "+1-555-0126",
      email: "lisa@example.com",
    },
  },
  {
    _id: "665ae5468fd7eacc3c9d1293",
    title: "Industrial Loft",
    address: "77 Warehouse Way, Arts District",
    price: 2600,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 950,
    type: "studio",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    description:
      "Converted warehouse loft with exposed beams, concrete floors, and open layout.",
    amenities: ["Exposed Beams", "Concrete Floors", "Open Layout", "Pet Friendly"],
    landlord: {
      name: "Tina Nguyen",
      phone: "+1-555-0135",
      email: "tina@example.com",
    },
  },
    {
    _id: "665ae2308fd7eacc3c9d127f",
    title: "Studio Loft",
    address: "789 Art District, Creative Quarter",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    type: "studio",
    images: ["https://ssl.cdn-redfin.com/photo/168/mbphoto/613/genMid.711613_4_5.jpg"],
    description:
      "Trendy studio loft in the artistic heart of the city with high ceilings and exposed brick.",
    amenities: ["High Ceilings", "Exposed Brick", "Natural Light", "Close to Transit"],
    landlord: {
      name: "Mike Davis",
      phone: "+1-555-0125",
      email: "mike@example.com",
    },
  },
  {
    _id: "665ae2848fd7eacc3c9d1281",
    title: "Luxury Penthouse",
    address: "101 Sky Tower, Uptown",
    price: 5500,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2500,
    type: "apartment",
    images: ["https://st.hzcdn.com/simgs/pictures/patios/hawaiian-eclectic-trigg-smith-architects-img~e8d1ac8309887ad7_9-4425-1-aad6cee.jpg"],
    description:
      "Stunning penthouse with panoramic city views and luxury finishes throughout.",
    amenities: ["City Views", "Balcony", "Concierge", "Gym", "Pool"],
    landlord: {
      name: "Lisa Chen",
      phone: "+1-555-0126",
      email: "lisa@example.com",
    },
  },
  {
    _id: "665ae2e18fd7eacc3c9d1283",
    title: "Urban Micro Apartment",
    address: "22 Compact Lane, Midtown",
    price: 1400,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 450,
    type: "studio",
    images: ["https://th.bing.com/th/id/OIP.dW2B19241Pd3LkDYAFIExAHaHa?r=0&w=480&h=480&rs=1&pid=ImgDetMain"],
    description:
      "Efficient micro apartment perfect for city living with smart storage and minimalist design.",
    amenities: ["Smart Storage", "Elevator", "Security", "Pet Friendly"],
    landlord: {
      name: "Nina Patel",
      phone: "+1-555-0127",
      email: "nina@example.com",
    },
  },
  {
    _id: "665ae32c8fd7eacc3c9d1285",
    title: "Suburban Duplex",
    address: "88 Maple Dr, Suburbs",
    price: 2800,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: "house",
    images: ["https://th.bing.com/th/id/OIP.2naVIlzh8t0qSQy7iVplaQHaFj?r=0&w=1024&h=768&rs=1&pid=ImgDetMain"],
    description:
      "Comfortable duplex with private entrance and shared backyard in a family-friendly neighborhood.",
    amenities: ["Backyard", "Garage", "Washer/Dryer", "Pet Friendly"],
    landlord: {
      name: "Carlos Rivera",
      phone: "+1-555-0128",
      email: "carlos@example.com",
    },
  },
  {
    _id: "665ae37a8fd7eacc3c9d1287",
    title: "Eco-Friendly Bungalow",
    address: "12 Greenway Blvd, Eco Park",
    price: 3100,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    type: "house",
    images: ["https://th.bing.com/th/id/OIP._PzrpUInuExYa-L1Tw45kAAAAA?r=0&w=427&h=285&rs=1&pid=ImgDetMain"],
    description:
      "Sustainable bungalow with solar panels, rainwater harvesting, and a lush garden.",
    amenities: ["Solar Panels", "Garden", "Compost System", "EV Charging"],
    landlord: {
      name: "Priya Mehta",
      phone: "+1-555-0129",
      email: "priya@example.com",
    },
  },
  {
    _id: "665ae3c08fd7eacc3c9d1289",
    title: "Historic Brownstone",
    address: "34 Heritage Row, Old Town",
    price: 3900,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    type: "house",
    images: ["https://cdn2.hawaii.house/images_properties/42-aekai-pl-lahaina_398966_0.jpg?id=202305250038"],
    description:
      "Charming brownstone with original woodwork, fireplaces, and a rooftop terrace.",
    amenities: ["Fireplace", "Rooftop", "Historic Charm", "Library Nook"],
    landlord: {
      name: "George Thompson",
      phone: "+1-555-0130",
      email: "george@example.com",
    },
  },
  {
    _id: "665ae40e8fd7eacc3c9d128b",
    title: "Beachside Villa",
    address: "7 Ocean View Rd, Seaside",
    price: 6200,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3000,
    type: "house",
    images: ["https://images.unsplash.com/photo-1570544820236-d542f7512ce4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHw%3D&w=1000&q=80"],
    description:
      "Luxurious villa steps from the beach with infinity pool and private cabana.",
    amenities: ["Beach Access", "Infinity Pool", "Cabana", "Outdoor Kitchen"],
    landlord: {
      name: "Isabella Rossi",
      phone: "+1-555-0131",
      email: "isabella@example.com",
    },
  },
  {
    _id: "665ae45c8fd7eacc3c9d128d",
    title: "Mountain Cabin",
    address: "99 Pine Trail, Highlands",
    price: 2700,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1300,
    type: "house",
    images: ["https://i.pinimg.com/736x/65/0b/5c/650b5c879336e63b11aa0cb5ae9cced1.jpg"],
    description:
      "Rustic cabin retreat with wood-burning stove and panoramic mountain views.",
    amenities: ["Mountain Views", "Wood Stove", "Deck", "Hiking Trails"],
    landlord: {
      name: "Liam O'Connor",
      phone: "+1-555-0132",
      email: "liam@example.com",
    },
  },
  {
    _id: "665ae4aa8fd7eacc3c9d128f",
    title: "City Center Condo",
    address: "55 Metro Plaza, Downtown",
    price: 3300,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    type: "apartment",
    images: ["https://th.bing.com/th/id/OIP.jyHgy0SgdQIXGo-cMnQJPAHaFB?r=0&w=909&h=616&rs=1&pid=ImgDetMain"],
    description:
      "Modern condo with skyline views, smart home features, and 24/7 concierge.",
    amenities: ["Smart Home", "Concierge", "Gym", "Skyline Views"],
    landlord: {
      name: "Emily Zhang",
      phone: "+1-555-0133",
      email: "emily@example.com",
    },
  },
  {
    _id: "665ae4f88fd7eacc3c9d1291",
    title: "Countryside Farmhouse",
    address: "3 Meadow Lane, Countryside",
    price: 2900,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    type: "house",
    images: ["https://cdn.homedit.com/wp-content/uploads/2016/07/White-house-pool-800x533.jpg"],
    description:
      "Peaceful farmhouse with wraparound porch, barn, and acres of open land.",
    amenities: ["Barn", "Porch", "Fire Pit", "Fruit Trees"],
    landlord: {
      name: "Henry Walker",
      phone: "+1-555-0134",
      email: "henry@example.com",
    },
  },
  {
  _id: "665ae5e28fd7eacc3c9d1297",
  title: "Modern Rooftop Duplex",
  address: "88 Skyline Terrace, Urban Heights",
  price: 4300,
  bedrooms: 2,
  bathrooms: 2.5,
  sqft: 1800,
  type: "apartment",
  images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"],
  description:
    "Contemporary duplex with a private rooftop deck, large windows, and sleek interiors in a lively neighborhood.",
  amenities: ["Rooftop Deck", "Walk-in Closet", "Smart Home", "Underground Parking"],
  landlord: {
    name: "Alex Morgan",
    phone: "+1-555-0136",
    email: "alex@example.com",
  },
}

];

// ✅ Search Filters Interface
interface SearchFilterOptions {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  bedrooms: string;
}

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [searchFilters, setSearchFilters] = useState<SearchFilterOptions>({
    location: "",
    minPrice: 0,
    maxPrice: 10000,
    propertyType: "all",
    bedrooms: "any",
  });

  const handleSearch = (filters: SearchFilterOptions) => {
    setSearchFilters(filters);

    const result = mockProperties.filter((property) => {
      const matchesLocation =
        !filters.location ||
        property.address.toLowerCase().includes(filters.location.toLowerCase());

      const matchesPrice =
        property.price >= filters.minPrice && property.price <= filters.maxPrice;

      const matchesType =
        filters.propertyType === "all" || property.type === filters.propertyType;

      const matchesBedrooms =
        filters.bedrooms === "any" || property.bedrooms >= parseInt(filters.bedrooms);

      return matchesLocation && matchesPrice && matchesType && matchesBedrooms;
    });

    setFilteredProperties(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Hero onSearch={handleSearch} />
      <div id="properties-section" className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <SearchFilters onFiltersChange={handleSearch} />
        </div>
        <PropertyGrid properties={filteredProperties} />
      </div>
    </div>
  );
};

export default Index;
