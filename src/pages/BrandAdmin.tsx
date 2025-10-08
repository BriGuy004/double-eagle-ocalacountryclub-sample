import { useBrand } from "@/contexts/BrandContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/ImageUpload";
import { ColorPicker } from "@/components/ColorPicker";
import { useLocation } from "react-router-dom";

const BrandAdmin = () => {
  const location = useLocation();
  const { currentBrand, allBrands, setActiveBrand, isLoading } = useBrand();
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [editedBrand, setEditedBrand] = useState<any>(null);
  const [newBrand, setNewBrand] = useState({
    club_id: "",
    name: "",
    logo_url: "",
    hero_image_url: "",
    offer_card_url: "",
    primary_color: "38 70% 15%",
    primary_glow_color: "38 70% 25%",
    accent_color: "45 85% 50%"
  });

  // Determine category based on route
  const getCategoryInfo = () => {
    const path = location.pathname;
    if (path.includes('/golf')) return { title: 'Golf Club', route: '/admin/golf' };
    if (path.includes('/hotels')) return { title: 'Hotel', route: '/admin/hotels' };
    if (path.includes('/dining')) return { title: 'Dining', route: '/admin/dining' };
    if (path.includes('/entertainment')) return { title: 'Entertainment', route: '/admin/entertainment' };
    if (path.includes('/shopping')) return { title: 'Shopping', route: '/admin/shopping' };
    if (path.includes('/travel')) return { title: 'Travel', route: '/admin/travel' };
    if (path.includes('/lifestyle')) return { title: 'Lifestyle', route: '/admin/lifestyle' };
    return { title: 'Brand', route: '/admin' };
  };

  const categoryInfo = getCategoryInfo();

  const handleBrandSwitch = async (clubId: string) => {
    await setActiveBrand(clubId);
    toast.success("Brand switched successfully! Page will reload...");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleImageUpload = async (file: File, field: 'logo_url' | 'hero_image_url' | 'offer_card_url', isEdit = false) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (isEdit && editedBrand) {
        setEditedBrand(prev => ({
          ...prev,
          [field]: dataUrl
        }));
      } else {
        setNewBrand(prev => ({
          ...prev,
          [field]: dataUrl
        }));
      }
      toast.success("Image loaded! Save to apply changes.");
    };
    reader.readAsDataURL(file);
  };

  const handleAddBrand = async () => {
    if (!newBrand.club_id || !newBrand.name || !newBrand.logo_url || !newBrand.hero_image_url || !newBrand.offer_card_url) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { error } = await supabase
      .from('brands')
      .insert([newBrand]);

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
      accent_color: "45 85% 50%"
    });
    window.location.reload();
  };

  const handleEditBrand = (brand: any) => {
    setEditingBrandId(brand.id);
    setEditedBrand({ ...brand });
  };

  const handleSaveEdit = async () => {
    if (!editedBrand) return;

    const { error } = await supabase
      .from('brands')
      .update({
        name: editedBrand.name,
        logo_url: editedBrand.logo_url,
        hero_image_url: editedBrand.hero_image_url,
        offer_card_url: editedBrand.offer_card_url,
        primary_color: editedBrand.primary_color,
        primary_glow_color: editedBrand.primary_glow_color,
        accent_color: editedBrand.accent_color
      })
      .eq('id', editedBrand.id);

    if (error) {
      toast.error(`Error updating brand: ${error.message}`);
      return;
    }

    toast.success("Brand updated successfully!");
    setEditingBrandId(null);
    setEditedBrand(null);
    window.location.reload();
  };

  const handleCancelEdit = () => {
    setEditingBrandId(null);
    setEditedBrand(null);
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{categoryInfo.title} Management</h1>
            <p className="text-[#94a3b8]">Access at: <code className="bg-white/10 px-2 py-1 rounded">{categoryInfo.route}</code></p>
          </div>
          <Button
            onClick={() => setIsAddingBrand(!isAddingBrand)}
            variant="orange"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New {categoryInfo.title}
          </Button>
        </div>

        {/* Add New Brand Form */}
        {isAddingBrand && (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle>Add New {categoryInfo.title}</CardTitle>
              <CardDescription>Upload logos and configure brand colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Club ID (unique, lowercase)</Label>
                  <Input
                    value={newBrand.club_id}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, club_id: e.target.value }))}
                    placeholder="e.g., northgate"
                  />
                </div>
                <div>
                  <Label>Club Name</Label>
                  <Input
                    value={newBrand.name}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Northgate Country Club"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <ImageUpload
                  label="Logo"
                  currentUrl={newBrand.logo_url}
                  onImageSelect={(file) => handleImageUpload(file, 'logo_url')}
                  thumbnail
                />
                <ImageUpload
                  label="Hero Image"
                  currentUrl={newBrand.hero_image_url}
                  onImageSelect={(file) => handleImageUpload(file, 'hero_image_url')}
                  thumbnail
                />
                <ImageUpload
                  label="Offer Card"
                  currentUrl={newBrand.offer_card_url}
                  onImageSelect={(file) => handleImageUpload(file, 'offer_card_url')}
                  thumbnail
                />
              </div>

              <div className="space-y-2">
                <Label>Brand Colors</Label>
                <div className="grid grid-cols-3 gap-4">
                  <ColorPicker
                    label="Primary"
                    value={newBrand.primary_color}
                    onChange={(val) => setNewBrand(prev => ({ ...prev, primary_color: val }))}
                  />
                  <ColorPicker
                    label="Primary Glow"
                    value={newBrand.primary_glow_color}
                    onChange={(val) => setNewBrand(prev => ({ ...prev, primary_glow_color: val }))}
                  />
                  <ColorPicker
                    label="Accent"
                    value={newBrand.accent_color}
                    onChange={(val) => setNewBrand(prev => ({ ...prev, accent_color: val }))}
                  />
                </div>
              </div>

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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Club ID</Label>
                  <Input value={editedBrand?.club_id} disabled className="bg-muted" />
                </div>
                <div>
                  <Label>Club Name</Label>
                  <Input
                    value={editedBrand?.name}
                    onChange={(e) => setEditedBrand({ ...editedBrand, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <ImageUpload
                  label="Logo"
                  currentUrl={editedBrand?.logo_url}
                  onImageSelect={(file) => handleImageUpload(file, 'logo_url', true)}
                  thumbnail
                />
                <ImageUpload
                  label="Hero Image"
                  currentUrl={editedBrand?.hero_image_url}
                  onImageSelect={(file) => handleImageUpload(file, 'hero_image_url', true)}
                  thumbnail
                />
                <ImageUpload
                  label="Offer Card"
                  currentUrl={editedBrand?.offer_card_url}
                  onImageSelect={(file) => handleImageUpload(file, 'offer_card_url', true)}
                  thumbnail
                />
              </div>

              <div className="space-y-2">
                <Label>Brand Colors</Label>
                <div className="grid grid-cols-3 gap-6">
                  <ColorPicker
                    label="Primary"
                    value={editedBrand?.primary_color}
                    onChange={(val) => setEditedBrand({ ...editedBrand, primary_color: val })}
                  />
                  <ColorPicker
                    label="Primary Glow"
                    value={editedBrand?.primary_glow_color}
                    onChange={(val) => setEditedBrand({ ...editedBrand, primary_glow_color: val })}
                  />
                  <ColorPicker
                    label="Accent"
                    value={editedBrand?.accent_color}
                    onChange={(val) => setEditedBrand({ ...editedBrand, accent_color: val })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSaveEdit} className="bg-primary hover:bg-primary/90">
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
          {allBrands.map((brand) => {
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

                    <div className="flex gap-2">
                      <div className="flex-1 h-8 rounded" style={{ backgroundColor: `hsl(${brand.primary_color})` }}></div>
                      <div className="flex-1 h-8 rounded" style={{ backgroundColor: `hsl(${brand.primary_glow_color})` }}></div>
                      <div className="flex-1 h-8 rounded" style={{ backgroundColor: `hsl(${brand.accent_color})` }}></div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => handleEditBrand(brand)} variant="outline" className="flex-1">
                        Edit
                      </Button>
                      {!brand.is_active && (
                        <Button
                          onClick={() => handleBrandSwitch(brand.club_id)}
                          className="flex-1"
                        >
                          Switch
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandAdmin;
