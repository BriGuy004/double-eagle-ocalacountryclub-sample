import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";

interface FilterDrawerProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  availableCategories?: string[];
}

const defaultCategories = ["All", "Golf", "Hotels", "Dining", "Lifestyle"];
const cities = ["All Cities", "Rochester", "Dallas", "Minneapolis", "Edina", "Wayzata"];
const sortOptions = ["Popular", "Newest", "Highest Savings", "A-Z"];

export const FilterDrawer = ({
  selectedCategories,
  onToggleCategory,
  selectedCity,
  onCityChange,
  sortBy,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
  availableCategories = defaultCategories
}: FilterDrawerProps) => {
  const activeFilterCount = 
    (selectedCategories.length > 0 ? 1 : 0) +
    (selectedCity !== "All Cities" ? 1 : 0) +
    (sortBy !== "Popular" ? 1 : 0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-[#374151] text-white border-none hover:bg-[#4b5563]"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-[#e67e3c] rounded-full text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#1a2332] border-white/10">
        <DrawerHeader>
          <DrawerTitle className="text-white text-xl">Filter Options</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 pb-4 space-y-6">
          {/* Categories */}
          <div>
            <label className="text-white font-medium mb-3 block">Category</label>
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
                        : "bg-[#374151] text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="text-white font-medium mb-3 block">City</label>
            <Select value={selectedCity} onValueChange={onCityChange}>
              <SelectTrigger className="w-full bg-[#374151] text-white border-none">
                <SelectValue />
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
          </div>

          {/* Sort */}
          <div>
            <label className="text-white font-medium mb-3 block">Sort By</label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-full bg-[#374151] text-white border-none">
                <SelectValue />
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
          </div>
        </div>

        <DrawerFooter className="flex flex-row gap-2">
          {hasActiveFilters && (
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="flex-1 bg-transparent text-white border-white/20 hover:bg-white/10"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
          <DrawerClose asChild>
            <Button className="flex-1 bg-[#e67e3c] hover:bg-[#d56d2f] text-white">
              Apply Filters
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
