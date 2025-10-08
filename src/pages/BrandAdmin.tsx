import { useBrand } from "@/contexts/BrandContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/ImageUpload";
import { BrandForm } from "@/components/BrandForm";
import { ColorPicker } from "@/components/ColorPicker";
import { useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Type-safe Brand interface matching database schema
interface Brand {
  id?: string;
  club_id: string;
  name: string;
  logo_url: string;
  hero_image_url: string;
  offer_card_url?: string;
  primary_color: string;
  primary_glow_color: string;
  accent_color: string;
  category?: string;
  state?: string;
  city?: string;
  full_address?: string;
  website?: string;
  redemption_info?: string;
  description?: string;
  is_active?: boolean;
}

const BrandAdmin = () => {
  const location = useLocation();
  const { currentBrand, allBrands, setActiveBrand, isLoading, isUsingLocalData, syncBrandsToSupabase, refreshBrands } = useBrand();
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [editedBrand, setEditedBrand] = useState<Brand | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newBrand, setNewBrand] = useState<Omit<Brand, 'id'>>({
    club_id: "",
    name: "",
    logo_url: "",
    hero_image_url: "",
    offer_card_url: "",
    primary_color: "38 70% 15%",
    primary_glow_color: "38 70% 25%",
    accent_color: "45 85% 50%",
    category: "Golf",
    state: "",
    city: "",
    full_address: "",
    website: "",
    redemption_info: "",
    description: ""
  });

  // Determine category based on route
  const getCategoryInfo = () => {
    const path = location.pathname;
    if (path.includes('/golf')) return { title: 'Golf Club', route: '/admin/golf', category: 'Golf' };
    if (path.includes('/hotels')) return { title: 'Hotel', route: '/admin/hotels', category: 'Hotels' };
    if (path.includes('/dining')) return { title: 'Dining', route: '/admin/dining', category: 'Dining' };
    if (path.includes('/entertainment')) return { title: 'Entertainment', route: '/admin/entertainment', category: 'Entertainment' };
    if (path.includes('/shopping')) return { title: 'Shopping', route: '/admin/shopping', category: 'Shopping' };
    if (path.includes('/travel')) return { title: 'Travel', route: '/admin/travel', category: 'Travel' };
    if (path.includes('/lifestyle')) return { title: 'Lifestyle', route: '/admin/lifestyle', category: 'Lifestyle' };
    return { title: 'Brand', route: '/admin', category: 'All' };
  };

  const categoryInfo = getCategoryInfo();
  
  // Filter brands by category
  const filteredBrands = allBrands.filter(brand => 
    categoryInfo.category === 'All' || brand.category === categoryInfo.category
  );

  // Comprehensive validation function
  const validateBrand = (brand: Partial<Brand>): string | null => {
    if (!brand.club_id) return "Club ID is required";
    if (!/^[a-z0-9-]+$/.test(brand.club_id)) {
      return "Club ID must be lowercase alphanumeric with hyphens only";
    }
    if (!brand.name || brand.name.length < 3) {
      return "Name must be at least 3 characters";
    }
    if (brand.website && !brand.website.startsWith('http')) {
      return "Website must start with http:// or https://";
    }
    if (!brand.logo_url || !brand.hero_image_url || !brand.offer_card_url) {
      return "All images (logo, hero, and offer card) are required";
    }
    
    // Validate HSL color format (e.g., "38 70% 15%")
    const hslRegex = /^\d+\s+\d+%\s+\d+%$/;
    if (brand.primary_color && !hslRegex.test(brand.primary_color)) {
      return "Invalid primary color format. Use: 'H S% L%' (e.g., '38 70% 15%')";
    }
    if (brand.primary_glow_color && !hslRegex.test(brand.primary_glow_color)) {
      return "Invalid primary glow color format. Use: 'H S% L%' (e.g., '38 70% 25%')";
    }
    if (brand.accent_color && !hslRegex.test(brand.accent_color)) {
      return "Invalid accent color format. Use: 'H S% L%' (e.g., '45 85% 50%')";
    }
    
    return null; // Valid
  };

  const handleBrandSwitch = async (clubId: string) => {
    await setActiveBrand(clubId);
    toast.success("Brand switched successfully!");
    // No need to reload - context updates automatically
  };

  const handleImageUpload = async (
    file: File, 
    field: 'logo_url' | 'hero_image_url' | 'offer_card_url',
    clubId: string
  ): Promise<string | null> => {
    try {
      if (!clubId) {
        toast.error("Please enter a Club ID first");
        return null;
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${clubId}-${field}-${Date.now()}.${fileExt}`;
      const filePath = `brand-assets/${fileName}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('brand-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brand-images')
        .getPublicUrl(filePath);

      toast.success(`${field.replace('_', ' ')} uploaded successfully!`);
      return publicUrl;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Upload failed: ${error.message}`);
      return null;
    }
  };

  const handleAddBrand = async () => {
    const validationError = validateBrand(newBrand);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const { data, error } = await supabase
      .from('offers')
      .insert([{ 
        ...newBrand,
        category: categoryInfo.category === 'All' ? 'Golf' : categoryInfo.category
      }])
      .select()
      .single();

    if (error) {
      toast.error(`Error adding brand: ${error.message}`);
      return;
    }

    toast.success("Brand added successfully!");
    setIsAddingBrand(false);
    setNewBrand({
      club_id: "",
      name: "",
      logo_url: "",
      hero_image_url: "",
      offer_card_url: "",
      primary_color: "38 70% 15%",
      primary_glow_color: "38 70% 25%",
      accent_color: "45 85% 50%",
      category: "Golf",
      state: "",
      city: "",
      full_address: "",
      website: "",
      redemption_info: "",
      description: ""
    });
    
    // Refresh brands from database (or rely on real-time subscription)
    await refreshBrands();
  };

  const handleEditBrand = (brand: Brand) => {
    // Don't allow editing local brands - they must edit the file directly
    if (brand.id.includes('local-')) {
      toast.error("To edit local brands, please edit src/data/localBrands.ts directly, then sync to database.");
      return;
    }
    setEditingBrandId(brand.id);
    setEditedBrand({ ...brand });
  };

  const handleSaveEdit = async () => {
    if (!editedBrand) return;

    // Validate edited brand
    const validationError = validateBrand(editedBrand);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Don't allow saving local brands
    if (editedBrand.id.includes('local-')) {
      toast.error("Cannot save local brand. Edit src/data/localBrands.ts instead.");
      return;
    }

    try {
      // Prepare clean data object
      const updateData = {
        name: editedBrand.name || '',
        logo_url: editedBrand.logo_url || '',
        hero_image_url: editedBrand.hero_image_url || '',
        offer_card_url: editedBrand.offer_card_url || editedBrand.hero_image_url || '',
        primary_color: editedBrand.primary_color || '38 70% 15%',
        primary_glow_color: editedBrand.primary_glow_color || '38 70% 25%',
        accent_color: editedBrand.accent_color || '45 85% 50%',
        state: editedBrand.state || '',
        city: editedBrand.city || '',
        full_address: editedBrand.full_address || '',
        website: editedBrand.website || '',
        redemption_info: editedBrand.redemption_info || '',
        description: editedBrand.description || ''
      };

      console.log('Updating brand:', editedBrand.id);
      console.log('Update data:', updateData);

      const { data, error } = await supabase
        .from('offers')
        .update(updateData)
        .eq('id', editedBrand.id)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        toast.error(`Database error: ${error.message}`);
        return;
      }

      if (!data || data.length === 0) {
        toast.error("No record was updated. The brand may not exist.");
        return;
      }

      console.log('Update successful:', data);
      toast.success("Brand updated successfully!");
      setEditingBrandId(null);
      setEditedBrand(null);
      
      // Refresh brands from database (or rely on real-time subscription)
      await refreshBrands();
    } catch (err: any) {
      console.error('Update error:', err);
      toast.error(`Network error: ${err.message || 'Failed to connect'}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingBrandId(null);
    setEditedBrand(null);
  };

  const handleDeleteBrand = async (brandId: string) => {
    try {
      // Don't allow deleting local brands
      if (brandId.includes('local-')) {
        toast.error("Cannot delete local brand. Remove it from src/data/localBrands.ts instead.");
        setDeleteConfirm(null);
        return;
      }

      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', brandId);

      if (error) {
        toast.error(`Delete failed: ${error.message}`);
        return;
      }

      toast.success("Brand deleted successfully!");
      setDeleteConfirm(null);
      
      // Refresh brands from database
      await refreshBrands();
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error(`Network error: ${err.message || 'Failed to delete'}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-2">Loading brands...</p>
          <p className="text-muted-foreground text-sm">If this takes too long, refresh the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{categoryInfo.title} Management</h1>
              <p className="text-[#94a3b8]">Access at: <code className="bg-white/10 px-2 py-1 rounded">{categoryInfo.route}</code></p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={syncBrandsToSupabase}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Sync Local to Database
              </Button>
              <Button
                onClick={() => setIsAddingBrand(!isAddingBrand)}
                variant="orange"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New {categoryInfo.title}
              </Button>
            </div>
          </div>
          
          {isUsingLocalData && (
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-yellow-200 font-medium">Using Local Data</p>
                <p className="text-yellow-300/70 text-sm">Database connection failed. Edit src/data/localBrands.ts to manage brands.</p>
              </div>
              <Button onClick={syncBrandsToSupabase} variant="outline" className="border-yellow-600 text-yellow-200 hover:bg-yellow-900/30">
                Sync to Database
              </Button>
            </div>
          )}
        </div>

        {/* Add New Brand Form */}
        {isAddingBrand && (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle>Add New {categoryInfo.title}</CardTitle>
              <CardDescription>Upload logos and configure brand colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <BrandForm
                brand={newBrand}
                onChange={(updates) => setNewBrand(prev => ({ ...prev, ...updates }))}
                categoryInfo={categoryInfo}
                onImageUpload={handleImageUpload}
              />
              <div className="flex gap-4">
                <Button onClick={handleAddBrand} className="bg-primary hover:bg-primary/90">
                  Save Brand
                </Button>
                <Button variant="outline" onClick={() => setIsAddingBrand(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Brands Grid */}
        {editingBrandId && (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle>Edit {categoryInfo.title}</CardTitle>
              <CardDescription>Update information and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <BrandForm
                brand={editedBrand || {}}
                onChange={(updates) => setEditedBrand({ ...editedBrand, ...updates })}
                categoryInfo={categoryInfo}
                isEdit={true}
                onImageUpload={handleImageUpload}
              />
              <div className="flex gap-4">
                <Button onClick={handleSaveEdit} variant="orange">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => {
            const isEditing = editingBrandId === brand.id;
            if (isEditing) return null; // Skip rendering in grid when editing

            return (
              <Card key={brand.id} className={brand.is_active ? "border-primary" : ""}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {brand.name}
                          {brand.is_active && (
                            <Badge variant="orange" className="ml-2">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          )}
                          {brand.id.includes('local-') && (
                            <Badge variant="destructive" className="ml-2">
                              Local Data
                            </Badge>
                          )}
                        </CardTitle>
                      <CardDescription className="mt-2">ID: {brand.club_id}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={brand.hero_image_url} 
                        alt={brand.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <img 
                        src={brand.logo_url} 
                        alt={`${brand.name} logo`}
                        className="h-12 object-contain"
                      />
                    </div>

                    {categoryInfo.category === 'Golf' && (
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: `hsl(${brand.primary_color})` }}></div>
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: `hsl(${brand.primary_glow_color})` }}></div>
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: `hsl(${brand.accent_color})` }}></div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button onClick={() => handleEditBrand(brand)} variant="outline" className="flex-1">
                        Edit
                      </Button>
                      {categoryInfo.category === 'Golf' && !brand.is_active && (
                        <Button
                          onClick={() => handleBrandSwitch(brand.club_id)}
                          className="flex-1"
                          variant="orange"
                        >
                          Switch
                        </Button>
                      )}
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => setDeleteConfirm(brand.id)}
                        title="Delete brand"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Brand?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this brand from the database. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => deleteConfirm && handleDeleteBrand(deleteConfirm)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default BrandAdmin;
