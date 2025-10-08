import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Brand {
  id: string;
  club_id: string;
  name: string;
  logo_url: string;
  hero_image_url: string;
  primary_color: string;
  primary_glow_color: string;
  accent_color: string;
  is_active: boolean;
}

interface BrandContextType {
  currentBrand: Brand | null;
  allBrands: Brand[];
  setActiveBrand: (clubId: string) => Promise<void>;
  isLoading: boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all brands
  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching brands:', error);
      return;
    }

    setAllBrands(data || []);
    
    // Set active brand
    const activeBrand = data?.find(b => b.is_active) || data?.[0];
    if (activeBrand) {
      setCurrentBrand(activeBrand);
      applyBrandStyles(activeBrand);
    }
    
    setIsLoading(false);
  };

  // Apply brand colors to CSS variables
  const applyBrandStyles = (brand: Brand) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', brand.primary_color);
    root.style.setProperty('--primary-glow', brand.primary_glow_color);
    root.style.setProperty('--accent', brand.accent_color);
  };

  // Set active brand
  const setActiveBrand = async (clubId: string) => {
    // Deactivate all brands
    await supabase
      .from('brands')
      .update({ is_active: false })
      .neq('club_id', '');

    // Activate selected brand
    const { error } = await supabase
      .from('brands')
      .update({ is_active: true })
      .eq('club_id', clubId);

    if (error) {
      console.error('Error setting active brand:', error);
      return;
    }

    // Fetch updated brands
    await fetchBrands();
  };

  useEffect(() => {
    fetchBrands();

    // Subscribe to brand changes
    const channel = supabase
      .channel('brand-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'brands'
        },
        () => {
          fetchBrands();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <BrandContext.Provider value={{ currentBrand, allBrands, setActiveBrand, isLoading }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
