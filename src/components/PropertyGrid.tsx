
import PropertyCard from "./PropertyCard";
import { Property } from "../types/Property";

interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid = ({ properties }: PropertyGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-24 bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700 shadow-lg">
        <div className="text-8xl mb-6">🏠</div>
        <h3 className="text-3xl font-bold text-slate-200 mb-3">No properties found</h3>
        <p className="text-lg text-slate-400">Try adjusting your search filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
          Available Properties
        </h2>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold text-lg shadow-lg">
          {properties.length} {properties.length === 1 ? 'Property' : 'Properties'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
