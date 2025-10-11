import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CityFilterProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  category: string;
}

export const CityFilter = ({ selectedCity, onCityChange, category }: CityFilterProps) => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    loadCitiesForCategory();
  }, [category]);

  const loadCitiesForCategory = async () => {
    try {
      const { data, error } = await supabase
        .from("offers")
        .select("city, state")
        .eq("category", category)
        .order("city");

      if (error) throw error;

      // Get unique cities
      const uniqueCities = Array.from(
        new Set(data.map(offer => `${offer.city}, ${offer.state}`))
      ).sort();

      setCities(uniqueCities);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="All Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Cities">All Cities</SelectItem>
          {cities.map(city => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedCity !== "All Cities" && (
        <button
          onClick={() => onCityChange("All Cities")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
};
