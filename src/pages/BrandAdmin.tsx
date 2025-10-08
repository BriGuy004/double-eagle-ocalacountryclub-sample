import { useBrand } from "@/contexts/BrandContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Upload, Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BrandAdmin = () => {
  const { currentBrand, allBrands, setActiveBrand, isLoading } = useBrand();
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [editedBrand, setEditedBrand] = useState<any>(null);
  const [newBrand, setNewBrand] = useState({
    club_id: "",
    name: "",
    logo_url: "",
    hero_image_url: "",
    primary_color: "38 70% 15%",
    primary_glow_color: "38 70% 25%",
    accent_color: "45 85% 50%"
  });

  const handleBrandSwitch = async (clubId: string) => {
    await setActiveBrand(clubId);
    toast.success("Brand switched successfully! Page will reload...");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleFileUpload = async (file: File, field: 'logo_url' | 'hero_image_url') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${newBrand.club_id}-${field}-${Date.now()}.${fileExt}`;
    const filePath = `lovable-uploads/${fileName}`;

    // For now, just set the path - in production, you'd upload to Supabase Storage
    setNewBrand(prev => ({
      ...prev,
      [field]: `/lovable-uploads/${fileName}`
    }));
    
    toast.info(`File ready: ${fileName}. Upload to /public/lovable-uploads/ manually.`);
  };

  const handleAddBrand = async () => {
    if (!newBrand.club_id || !newBrand.name || !newBrand.logo_url || !newBrand.hero_image_url) {
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
            <h1 className="text-4xl font-bold text-white mb-2">Brand Management</h1>
            <p className="text-[#94a3b8]">Access at: <code className="bg-white/10 px-2 py-1 rounded">/admin/brands</code></p>
          </div>
          <Button
            onClick={() => setIsAddingBrand(!isAddingBrand)}
            variant="orange"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Brand
          </Button>
        </div>

        {/* Add New Brand Form */}
        {isAddingBrand && (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle>Add New Country Club Brand</CardTitle>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Logo URL</Label>
                  <Input
                    value={newBrand.logo_url}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, logo_url: e.target.value }))}
                    placeholder="/lovable-uploads/logo.png"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload to /public/lovable-uploads/ folder
                  </p>
                </div>
                <div>
                  <Label>Hero Image URL</Label>
                  <Input
                    value={newBrand.hero_image_url}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, hero_image_url: e.target.value }))}
                    placeholder="/lovable-uploads/hero.png"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload to /public/lovable-uploads/ folder
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Brand Colors (HSL format)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs">Primary</Label>
                    <Input
                      value={newBrand.primary_color}
                      onChange={(e) => setNewBrand(prev => ({ ...prev, primary_color: e.target.value }))}
                      placeholder="38 70% 15%"
                    />
                    <div 
                      className="h-8 rounded mt-1" 
                      style={{ backgroundColor: `hsl(${newBrand.primary_color})` }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Primary Glow</Label>
                    <Input
                      value={newBrand.primary_glow_color}
                      onChange={(e) => setNewBrand(prev => ({ ...prev, primary_glow_color: e.target.value }))}
                      placeholder="38 70% 25%"
                    />
                    <div 
                      className="h-8 rounded mt-1" 
                      style={{ backgroundColor: `hsl(${newBrand.primary_glow_color})` }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Accent</Label>
                    <Input
                      value={newBrand.accent_color}
                      onChange={(e) => setNewBrand(prev => ({ ...prev, accent_color: e.target.value }))}
                      placeholder="45 85% 50%"
                    />
                    <div 
                      className="h-8 rounded mt-1" 
                      style={{ backgroundColor: `hsl(${newBrand.accent_color})` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Format: Hue Saturation% Lightness% (e.g., "38 70% 15%")
                </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBrands.map((brand) => {
            const isEditing = editingBrandId === brand.id;
            const displayBrand = isEditing ? editedBrand : brand;

            return (
              <Card key={brand.id} className={brand.is_active ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {isEditing ? (
                        <Input
                          value={displayBrand.name}
                          onChange={(e) => setEditedBrand({ ...editedBrand, name: e.target.value })}
                          className="mb-2"
                        />
                      ) : (
                        <CardTitle className="flex items-center gap-2">
                          {brand.name}
                          {brand.is_active && (
                            <Badge variant="default" className="ml-2">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </CardTitle>
                      )}
                      <CardDescription className="mt-2">ID: {brand.club_id}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <Label className="text-xs">Logo URL</Label>
                          <Input
                            value={displayBrand.logo_url}
                            onChange={(e) => setEditedBrand({ ...editedBrand, logo_url: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Hero Image URL</Label>
                          <Input
                            value={displayBrand.hero_image_url}
                            onChange={(e) => setEditedBrand({ ...editedBrand, hero_image_url: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label className="text-xs">Primary</Label>
                            <Input
                              value={displayBrand.primary_color}
                              onChange={(e) => setEditedBrand({ ...editedBrand, primary_color: e.target.value })}
                            />
                            <div className="h-6 rounded mt-1" style={{ backgroundColor: `hsl(${displayBrand.primary_color})` }}></div>
                          </div>
                          <div>
                            <Label className="text-xs">Glow</Label>
                            <Input
                              value={displayBrand.primary_glow_color}
                              onChange={(e) => setEditedBrand({ ...editedBrand, primary_glow_color: e.target.value })}
                            />
                            <div className="h-6 rounded mt-1" style={{ backgroundColor: `hsl(${displayBrand.primary_glow_color})` }}></div>
                          </div>
                          <div>
                            <Label className="text-xs">Accent</Label>
                            <Input
                              value={displayBrand.accent_color}
                              onChange={(e) => setEditedBrand({ ...editedBrand, accent_color: e.target.value })}
                            />
                            <div className="h-6 rounded mt-1" style={{ backgroundColor: `hsl(${displayBrand.accent_color})` }}></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}

                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button onClick={handleSaveEdit} className="flex-1">
                            Save
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
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
                        </>
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
