import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions = [
  "Popular",
  "Trending", 
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Brand A-Z"
];

interface SortFilterProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

export const SortFilter = ({ selectedSort, onSortChange }: SortFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onSortChange(option)}
            className="text-foreground hover:bg-accent cursor-pointer"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};