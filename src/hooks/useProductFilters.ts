import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export interface Product {
  brand: string;
  title: string;
  images: string[];
  tags: string[];
  description?: string;
  offerId?: string;
  category?: "Golf" | "Hotels" | "Dining" | "Lifestyle" | "Entertainment" | "Shopping" | "Travel";
  city?: string;
  majorCity?: string;
  isNew?: boolean;
}

export const useProductFilters = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  );
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "All Cities");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "Popular");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedCity !== "All Cities") params.set("city", selectedCity);
    if (sortBy !== "Popular") params.set("sort", sortBy);
    
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedCategories, selectedCity, sortBy, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter((product) => {
        const searchableText = [
          product.brand,
          product.title,
          product.description || "",
          product.category || "",
          product.city || "",
          ...(product.tags || [])
        ].join(" ").toLowerCase();
        
        return searchableText.includes(query);
      });
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      filtered = filtered.filter((product) => 
        selectedCategories.includes(product.category || "")
      );
    }

    // City filter
    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((product) => product.city === selectedCity);
    }

    // Sort
    switch (sortBy) {
      case "Newest":
        // Reverse order for newest
        filtered = [...filtered].reverse();
        break;
      case "Highest Savings":
        // Sort by discount amount (extract from title)
        filtered = filtered.sort((a, b) => {
          const getDiscount = (title: string) => {
            const match = title.match(/(\d+)%/);
            return match ? parseInt(match[1]) : 0;
          };
          return getDiscount(b.title) - getDiscount(a.title);
        });
        break;
      case "A-Z":
        filtered = filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "Popular":
      default:
        // Keep default order
        break;
    }

    return filtered;
  }, [products, debouncedSearch, selectedCategories, selectedCity, sortBy]);

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedCategories([]);
    setSelectedCity("All Cities");
    setSortBy("Popular");
  };

  const hasActiveFilters = 
    debouncedSearch.trim() !== "" ||
    selectedCategories.length > 0 ||
    selectedCity !== "All Cities" ||
    sortBy !== "Popular";

  const highlightText = (text: string) => {
    if (!debouncedSearch.trim()) return text;
    
    const regex = new RegExp(`(${debouncedSearch})`, "gi");
    return text.replace(regex, "<mark class='bg-[#e67e3c] text-white'>$1</mark>");
  };

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    isSearching,
    selectedCategories,
    toggleCategory,
    selectedCity,
    setSelectedCity,
    sortBy,
    setSortBy,
    filteredProducts,
    clearFilters,
    hasActiveFilters,
    highlightText
  };
};

