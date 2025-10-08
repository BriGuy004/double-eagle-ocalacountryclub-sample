import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { getCitiesByState } from "@/data/allClubs";

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export const LocationSelector = ({ selectedLocation, onLocationChange }: LocationSelectorProps) => {
  const citiesByState = getCitiesByState();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default"
          className="px-8 py-6 text-lg font-semibold rounded-lg min-w-[200px]"
        >
          {selectedLocation}
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1a2332] border-white/10 min-w-[200px] max-h-[400px] overflow-y-auto z-50">
        <DropdownMenuItem
          onClick={() => onLocationChange("All Cities")}
          className="text-white hover:bg-white/10 cursor-pointer"
        >
          All Cities
        </DropdownMenuItem>
        {Object.entries(citiesByState).map(([state, cities]) => (
          <DropdownMenuSub key={state}>
            <DropdownMenuSubTrigger className="text-white hover:bg-white/10 cursor-pointer">
              {state}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="bg-[#1a2332] border-white/10 z-50">
              {cities.map((city) => (
                <DropdownMenuItem
                  key={city}
                  onClick={() => onLocationChange(city)}
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  {city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
