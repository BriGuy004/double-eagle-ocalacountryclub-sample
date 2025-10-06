import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface FilterPanelProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  resultsCount: number;
  availableCategories?: string[];
}

const defaultCategories = ["All", "Golf", "Hotels", "Dining", "Lifestyle"];
const cities = ["All Cities", "Rochester", "Dallas", "Minneapolis", "Edina", "Wayzata"];
const sortOptions = ["Popular", "Newest", "Highest Savings", "A-Z"];

export const FilterPanel = ({
  selectedCategories,
  onToggleCategory,
  selectedCity,
  onCityChange,
  sortBy,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
  resultsCount,
  availableCategories = defaultCategories
}: FilterPanelProps) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          {availableCategories.map((category) => {
            const isSelected = 
              category === "All" 
                ? selectedCategories.length === 0
                : selectedCategories.includes(category);
            
            return (
              <button
                key={category}
                onClick={() => onToggleCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-[#e67e3c] text-white shadow-md"
                    : "bg-[#374151] text-white hover:bg-[#4b5563]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* City Dropdown */}
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-[160px] bg-[#374151] text-white border-none">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a2332] border-white/10">
            {cities.map((city) => (
              <SelectItem 
                key={city} 
                value={city}
                className="text-white hover:bg-[#374151] focus:bg-[#e67e3c] focus:text-white"
              >
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px] bg-[#374151] text-white border-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a2332] border-white/10">
            {sortOptions.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="text-white hover:bg-[#374151] focus:bg-[#e67e3c] focus:text-white"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="ghost"
            className="text-[#94a3b8] hover:text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-[#94a3b8] text-sm">
        Showing {resultsCount} offer{resultsCount !== 1 ? "s" : ""}
        {selectedCity !== "All Cities" && ` in ${selectedCity}`}
      </div>
    </div>
  );
};
