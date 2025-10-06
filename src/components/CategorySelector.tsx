import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Home", path: "/" },
  { name: "Lifestyle", path: "/lifestyle" },
  { name: "Hotels", path: "/hotels" },
  { name: "Dining", path: "/dining" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Travel", path: "/travel" },
  { name: "Shopping", path: "/shopping" },
  { name: "Golf", path: "/golf" }
];

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelector = ({ selectedCategory, onCategoryChange }: CategorySelectorProps) => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: { name: string; path: string }) => {
    onCategoryChange(category.name);
    navigate(category.path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-6xl font-light tracking-wider text-foreground hover:text-accent-foreground hover:bg-transparent px-0"
        >
          {selectedCategory}
          <ChevronDown className="ml-4 h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border z-50 min-w-[200px]">
        {categories.map((category) => (
          <DropdownMenuItem
            key={category.name}
            onClick={() => handleCategorySelect(category)}
            className="text-foreground hover:bg-accent cursor-pointer text-lg py-3"
          >
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};