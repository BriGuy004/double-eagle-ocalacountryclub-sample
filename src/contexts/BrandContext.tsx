import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Brand {
  id: string;
  club_id: string;
  name: string;
  logo_url: string;
  hero_image_url: string;
  offer_card_url?: string;
  primary_color: string;
  primary_glow_color: string;
  accent_color: string;
  is_active: boolean;
  category?: string;
  state?: string;
  city?: string;
  full_address?: string;
  website?: string;
  redemption_info?: string;
  description?: string;
}

interface BrandContextType {
  currentBrand: Brand | null;
  allBrands: Brand[];
  setActiveBrand: (clubId: string) => Promise<void>;
  getBrandById: (clubId: string) => Brand | null;
  isLoading: boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('offers' as any)
        .select('*')
        .order('name');

      if (fetchError) {
        console.error('Error fetching brands:', fetchError);
        setError(fetchError.message);
        // Use fallback data on error
        useFallbackData();
        return;
      }

      if (!data || data.length === 0) {
        console.warn('No brands found in database, using fallback');
        useFallbackData();
        return;
      }

      setAllBrands(data as any || []);
      
      // Set active brand
      const activeBrand = (data as any)?.find((b: any) => b.is_active) || (data as any)?.[0];
      if (activeBrand) {
        setCurrentBrand(activeBrand);
        applyBrandStyles(activeBrand);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Exception fetching brands:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      useFallbackData();
    }
  };

  // Fallback to default Ocala brand if fetch fails
  const useFallbackData = () => {
    const fallbackBrand: Brand = {
      id: 'fallback-ocala',
      club_id: 'ocala',
      name: 'The Country Club of Ocala',
      logo_url: '/lovable-uploads/ocala-logo.png',
      hero_image_url: '/lovable-uploads/ocala-golf-course.png',
      primary_color: '38 70% 15%',
      primary_glow_color: '38 70% 25%',
      accent_color: '45 85% 50%',
      is_active: true,
      category: 'Golf'
    };
    
    setAllBrands([fallbackBrand]);
    setCurrentBrand(fallbackBrand);
    applyBrandStyles(fallbackBrand);
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
      .from('offers' as any)
      .update({ is_active: false })
      .neq('club_id', '');

    // Activate selected brand
    const { error } = await supabase
      .from('offers' as any)
      .update({ is_active: true })
      .eq('club_id', clubId);

    if (error) {
      console.error('Error setting active brand:', error);
      return;
    }

    // Fetch updated brands
    await fetchBrands();
  };

  // Get brand by club_id
  const getBrandById = (clubId: string) => {
    return allBrands.find(b => b.club_id === clubId) || null;
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
          table: 'offers'
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
    <BrandContext.Provider value={{ currentBrand, allBrands, setActiveBrand, getBrandById, isLoading }}>
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
