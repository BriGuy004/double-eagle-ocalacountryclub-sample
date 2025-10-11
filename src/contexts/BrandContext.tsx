import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { localBrands } from '@/data/localBrands';
import { toast } from 'sonner';

type OfferRow = Database['public']['Tables']['offers']['Row'];
type OfferInsert = Database['public']['Tables']['offers']['Insert'];
type OfferUpdate = Database['public']['Tables']['offers']['Update'];

interface Brand extends OfferRow {}

interface BrandContextType {
  currentBrand: Brand | null;
  allBrands: Brand[];
  setActiveBrand: (clubId: string) => Promise<void>;
  getBrandById: (clubId: string) => Brand | null;
  isLoading: boolean;
  isSwitchingBrand: boolean;
  isUsingLocalData: boolean;
  syncBrandsToSupabase: () => Promise<void>;
  refreshBrands: () => Promise<void>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

// localStorage helpers
const STORAGE_KEY = 'double-eagle-active-brand';

const saveActiveBrandToStorage = (clubId: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, clubId);
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
};

const getActiveBrandFromStorage = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to read from localStorage:', err);
    return null;
  }
};

// Validate brand data integrity
const validateBrand = (brand: Partial<Brand>): boolean => {
  if (!brand.club_id || !brand.name) {
    console.error('Brand missing required fields:', brand);
    return false;
  }
  
  // Validate HSL format (space-separated: "38 70% 15%")
  const hslRegex = /^\d+\s+\d+%\s+\d+%$/;
  if (!hslRegex.test(brand.primary_color || '')) {
    console.error('Invalid primary color format:', brand.primary_color);
    return false;
  }
  if (!hslRegex.test(brand.primary_glow_color || '')) {
    console.error('Invalid primary glow color format:', brand.primary_glow_color);
    return false;
  }
  if (!hslRegex.test(brand.accent_color || '')) {
    console.error('Invalid accent color format:', brand.accent_color);
    return false;
  }
  
  return true;
};

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitchingBrand, setIsSwitchingBrand] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingLocalData, setIsUsingLocalData] = useState(false);

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      setError(null);
      
      // Load from localStorage first for instant UI
      const savedBrandId = getActiveBrandFromStorage();
      if (savedBrandId && allBrands.length > 0) {
        const cachedBrand = allBrands.find(b => b.club_id === savedBrandId);
        if (cachedBrand) {
          setCurrentBrand(cachedBrand);
          applyBrandStyles(cachedBrand);
        }
      }

      const { data, error: fetchError } = await supabase
        .from('offers')
        .select('*')
        .order('name')
        .returns<Brand[]>();

      if (fetchError) {
        console.error('Error fetching brands:', fetchError);
        setError(fetchError.message);
        // Use local data on error
        useLocalData();
        return;
      }

      if (!data || data.length === 0) {
        console.warn('No brands found in database, using local data');
        useLocalData();
        return;
      }

      setIsUsingLocalData(false);

      // Validate and filter brands
      const validBrands = (data || []).filter(validateBrand);
      if (validBrands.length < (data?.length || 0)) {
        console.warn(`Filtered out ${(data?.length || 0) - validBrands.length} invalid brands`);
      }
      
      setAllBrands(validBrands);
      
      // Set active brand (prioritize database over localStorage)
      const activeBrand = validBrands?.find((b) => b.is_active) || validBrands?.[0];
      if (activeBrand) {
        setCurrentBrand(activeBrand);
        applyBrandStyles(activeBrand);
        saveActiveBrandToStorage(activeBrand.club_id);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Exception fetching brands:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      useLocalData();
    }
  };

  // Use local data if Supabase fetch fails
  const useLocalData = () => {
    console.log('Using local brand data');
    const brandsWithIds = localBrands.map((brand, index) => ({
      ...brand,
      id: `local-${brand.club_id}-${index}`
    }));
    
    setAllBrands(brandsWithIds as Brand[]);
    const activeBrand = brandsWithIds.find(b => b.is_active) || brandsWithIds[0];
    if (activeBrand) {
      setCurrentBrand(activeBrand as Brand);
      applyBrandStyles(activeBrand as Brand);
    }
    setIsUsingLocalData(true);
    setIsLoading(false);
  };

  // Sync local brands to Supabase with better error handling
  const syncBrandsToSupabase = async () => {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ brand: string; error: string }>
    };

    try {
      toast.info('Syncing brands to database...');
      
      // Use Promise.allSettled for better error handling
      const syncPromises = localBrands.map(async (brand) => {
        try {
          // Check if brand already exists
          const { data: existing } = await supabase
            .from('offers')
            .select('id')
            .eq('club_id', brand.club_id)
            .maybeSingle();

          const brandData: OfferInsert = {
            club_id: brand.club_id,
            name: brand.name,
            logo_url: brand.logo_url,
            hero_image_url: brand.hero_image_url,
            offer_card_url: brand.offer_card_url || brand.hero_image_url,
            primary_color: brand.primary_color,
            primary_glow_color: brand.primary_glow_color,
            accent_color: brand.accent_color,
            is_active: brand.is_active,
            category: brand.category,
            state: brand.state,
            city: brand.city,
            full_address: brand.full_address || '',
            website: brand.website || '',
            redemption_info: brand.redemption_info || '',
            description: brand.description || ''
          };

          let error;
          if (existing) {
            ({ error } = await supabase
              .from('offers')
              .update(brandData)
              .eq('club_id', brand.club_id));
          } else {
            ({ error } = await supabase
              .from('offers')
              .insert(brandData));
          }

          if (error) throw error;
          
          results.success++;
          return { success: true, brand: brand.name };
        } catch (err: any) {
          results.failed++;
          results.errors.push({ 
            brand: brand.name, 
            error: err.message 
          });
          return { success: false, brand: brand.name, error: err.message };
        }
      });

      await Promise.allSettled(syncPromises);

      // Show results
      if (results.failed === 0) {
        toast.success(`All ${results.success} brands synced successfully!`);
      } else if (results.success > 0) {
        toast.warning(`Synced ${results.success} brands. ${results.failed} failed.`);
        console.error('Failed syncs:', results.errors);
      } else {
        toast.error('Failed to sync any brands. Check console for details.');
        console.error('Sync errors:', results.errors);
      }

      // Refresh brands even if some failed
      await fetchBrands();
    } catch (err) {
      console.error('Sync error:', err);
      toast.error('Failed to sync brands. Check console for details.');
    }
  };

  // Helper: Determine if text should be black or white based on background
  const shouldUseBlackText = (hsl: string): boolean => {
    const parts = hsl.match(/\d+/g);
    if (!parts || parts.length < 3) return false;
    
    let [h, s, l] = parts.map(Number);
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const rs = r / 255 <= 0.03928 ? r / 255 / 12.92 : Math.pow((r / 255 + 0.055) / 1.055, 2.4);
    const gs = g / 255 <= 0.03928 ? g / 255 / 12.92 : Math.pow((g / 255 + 0.055) / 1.055, 2.4);
    const bs = b / 255 <= 0.03928 ? b / 255 / 12.92 : Math.pow((b / 255 + 0.055) / 1.055, 2.4);
    
    const luminance = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    return luminance > 0.5;
  };

  // Apply brand colors to CSS variables
  const applyBrandStyles = (brand: Brand) => {
    const root = document.documentElement;
    
    // Apply the club's custom colors
    root.style.setProperty('--primary', brand.primary_color);
    root.style.setProperty('--primary-glow', brand.primary_glow_color);
    root.style.setProperty('--accent', brand.accent_color);
    
    // Smart text colors based on background luminance
    const primaryText = shouldUseBlackText(brand.primary_color) ? '0 0% 10%' : '0 0% 100%';
    const accentText = shouldUseBlackText(brand.accent_color) ? '0 0% 10%' : '0 0% 100%';
    
    root.style.setProperty('--primary-foreground', primaryText);
    root.style.setProperty('--accent-foreground', accentText);

    // Also update ring color to match accent
    root.style.setProperty('--ring', brand.accent_color);

    // Update gradient backgrounds to use club's primary color
    const [h, s, l] = brand.primary_color.split(' ').map(v => parseFloat(v));
    root.style.setProperty('--gradient-premium', 
      `linear-gradient(135deg, hsl(${h} ${s} ${Math.max(l - 2, 0)}%) 0%, hsl(${h} ${s} ${l}%) 100%)`
    );
    root.style.setProperty('--gradient-card', 
      `linear-gradient(135deg, hsl(${h} ${s} ${l}%) 0%, hsl(${h} ${s} ${Math.min(l + 4, 100)}%) 100%)`
    );
    
    // Log for debugging
    console.log('Brand styles applied:', {
      primary: brand.primary_color,
      primaryText,
      glow: brand.primary_glow_color,
      accent: brand.accent_color,
      accentText
    });
  };

  // Set active brand using atomic database function
  const setActiveBrand = async (clubId: string) => {
    if (isSwitchingBrand) return; // Prevent double-click
    
    setIsSwitchingBrand(true);
    try {
      const { error } = await supabase
        .rpc('set_active_brand', { p_club_id: clubId });

      if (error) {
        console.error('Error setting active brand:', error);
        toast.error('Failed to switch brand');
        return;
      }

      // Save to localStorage after successful switch
      saveActiveBrandToStorage(clubId);

      // Fetch updated brands
      await fetchBrands();
      
      const targetBrand = allBrands.find(b => b.club_id === clubId);
      if (targetBrand) {
        toast.success(`Switched to ${targetBrand.name}`);
      }
    } finally {
      setIsSwitchingBrand(false);
    }
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
    <BrandContext.Provider value={{ 
      currentBrand, 
      allBrands, 
      setActiveBrand, 
      getBrandById, 
      isLoading,
      isSwitchingBrand,
      isUsingLocalData,
      syncBrandsToSupabase,
      refreshBrands: fetchBrands
    }}>
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
