
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const SearchFilters = ({ onFiltersChange }: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 500,
    maxPrice: 5000,
    propertyType: "all",
    bedrooms: "any"
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newFilters = { ...filters, minPrice: values[0], maxPrice: values[1] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      location: "",
      minPrice: 500,
      maxPrice: 5000,
      propertyType: "all",
      bedrooms: "any"
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-700 hover:text-blue-600 font-semibold"
          >
            <Filter className="mr-2 h-5 w-5" />
            Advanced Filters
          </Button>
          {isExpanded && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-slate-500 hover:text-red-500"
            >
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-6 border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <Input
                  placeholder="City, neighborhood..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Type
                </label>
                <Select
                  value={filters.propertyType}
                  onValueChange={(value) => handleFilterChange("propertyType", value)}
                >
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bedrooms
                </label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) => handleFilterChange("bedrooms", value)}
                >
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Price Range: ${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}
              </label>
              <Slider
                min={500}
                max={10000}
                step={100}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={handlePriceRangeChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-500 mt-2">
                <span>$500</span>
                <span>$10,000+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SearchFilters;
