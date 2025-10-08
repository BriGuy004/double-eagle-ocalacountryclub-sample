import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/ImageUpload";
import { ColorPicker } from "@/components/ColorPicker";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type ProductCategory = "Golf" | "Dining" | "Hotels" | "Lifestyle" | "Entertainment";

interface OfferFormData {
  club_id: string;
  name: string;
  logo_url: string;
  hero_image_url: string;
  offer_card_url: string;
  primary_color: string;
  primary_glow_color: string;
  accent_color: string;
  category: ProductCategory;
  city: string;
  state: string;
  full_address?: string;
  website?: string;
  redemption_info?: string;
  description?: string;
}

interface OffersAdminProps {
  category: ProductCategory;
}

export const OffersAdmin = ({ category }: OffersAdminProps) => {
  const queryClient = useQueryClient();
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [editedOffer, setEditedOffer] = useState<OfferFormData | null>(null);
  const [newOffer, setNewOffer] = useState<OfferFormData>({
    club_id: "",
    name: "",
    logo_url: "",
    hero_image_url: "",
    offer_card_url: "",
    primary_color: "38 70% 15%",
    primary_glow_color: "38 70% 25%",
    accent_color: "45 85% 50%",
    category,
    city: "",
    state: "",
  });

  const { data: offers, isLoading } = useQuery({
    queryKey: ['offers', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleImageUpload = async (file: File, field: 'logo_url' | 'hero_image_url' | 'offer_card_url', isEdit = false) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (isEdit && editedOffer) {
        setEditedOffer({ ...editedOffer, [field]: dataUrl });
      } else {
        setNewOffer({ ...newOffer, [field]: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddOffer = async () => {
    if (!newOffer.club_id || !newOffer.name || !newOffer.logo_url || !newOffer.hero_image_url || 
        !newOffer.offer_card_url || !newOffer.city || !newOffer.state) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { error } = await supabase.from('offers').insert([newOffer]);

    if (error) {
      toast.error("Failed to add offer");
      return;
    }

    toast.success("Offer added successfully");
    queryClient.invalidateQueries({ queryKey: ['offers', category] });
    setIsAddingOffer(false);
    setNewOffer({
      club_id: "",
      name: "",
      logo_url: "",
      hero_image_url: "",
      offer_card_url: "",
      primary_color: "38 70% 15%",
      primary_glow_color: "38 70% 25%",
      accent_color: "45 85% 50%",
      category,
      city: "",
      state: "",
    });
  };

  const handleEditOffer = (offer: any) => {
    setEditingOfferId(offer.id);
    setEditedOffer({
      ...offer,
      category: offer.category as ProductCategory,
    });
  };

  const handleSaveEdit = async () => {
    if (!editedOffer) return;

    const { error } = await supabase
      .from('offers')
      .update({
        club_id: editedOffer.club_id,
        name: editedOffer.name,
        logo_url: editedOffer.logo_url,
        hero_image_url: editedOffer.hero_image_url,
        offer_card_url: editedOffer.offer_card_url,
        primary_color: editedOffer.primary_color,
        primary_glow_color: editedOffer.primary_glow_color,
        accent_color: editedOffer.accent_color,
        city: editedOffer.city,
        state: editedOffer.state,
        full_address: editedOffer.full_address,
        website: editedOffer.website,
        redemption_info: editedOffer.redemption_info,
        description: editedOffer.description,
      })
      .eq('id', editingOfferId);

    if (error) {
      toast.error("Failed to update offer");
      return;
    }

    toast.success("Offer updated successfully");
    queryClient.invalidateQueries({ queryKey: ['offers', category] });
    setEditingOfferId(null);
    setEditedOffer(null);
  };

  const handleCancelEdit = () => {
    setEditingOfferId(null);
    setEditedOffer(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{category} Offers Management</h1>
        <Button onClick={() => setIsAddingOffer(!isAddingOffer)}>
          {isAddingOffer ? "Cancel" : `Add ${category} Offer`}
        </Button>
      </div>

      {isAddingOffer && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add New {category} Offer</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Club/Business ID</label>
              <Input
                value={newOffer.club_id}
                onChange={(e) => setNewOffer({ ...newOffer, club_id: e.target.value })}
                placeholder="e.g., northgate-cc"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={newOffer.name}
                onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                placeholder="Business name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">City</label>
              <Input
                value={newOffer.city}
                onChange={(e) => setNewOffer({ ...newOffer, city: e.target.value })}
                placeholder="e.g., Minneapolis"
              />
            </div>
            <div>
              <label className="text-sm font-medium">State</label>
              <Input
                value={newOffer.state}
                onChange={(e) => setNewOffer({ ...newOffer, state: e.target.value })}
                placeholder="e.g., MN"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Full Address</label>
            <Input
              value={newOffer.full_address || ""}
              onChange={(e) => setNewOffer({ ...newOffer, full_address: e.target.value })}
              placeholder="Full street address"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Website</label>
            <Input
              value={newOffer.website || ""}
              onChange={(e) => setNewOffer({ ...newOffer, website: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Redemption Info</label>
            <Input
              value={newOffer.redemption_info || ""}
              onChange={(e) => setNewOffer({ ...newOffer, redemption_info: e.target.value })}
              placeholder="e.g., 20% off, Complimentary Round"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={newOffer.description || ""}
              onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
              placeholder="Detailed description for redemption page"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <ImageUpload
              label="Logo"
              currentUrl={newOffer.logo_url}
              onImageSelect={(file) => handleImageUpload(file, 'logo_url')}
              thumbnail
            />
            <ImageUpload
              label="Hero Image"
              currentUrl={newOffer.hero_image_url}
              onImageSelect={(file) => handleImageUpload(file, 'hero_image_url')}
              thumbnail
            />
            <ImageUpload
              label="Offer Card"
              currentUrl={newOffer.offer_card_url}
              onImageSelect={(file) => handleImageUpload(file, 'offer_card_url')}
              thumbnail
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <ColorPicker
              label="Primary Color"
              value={newOffer.primary_color}
              onChange={(color) => setNewOffer({ ...newOffer, primary_color: color })}
            />
            <ColorPicker
              label="Primary Glow"
              value={newOffer.primary_glow_color}
              onChange={(color) => setNewOffer({ ...newOffer, primary_glow_color: color })}
            />
            <ColorPicker
              label="Accent Color"
              value={newOffer.accent_color}
              onChange={(color) => setNewOffer({ ...newOffer, accent_color: color })}
            />
          </div>

          <Button onClick={handleAddOffer} className="w-full">
            Add Offer
          </Button>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers?.map((offer) => {
          const isEditing = editingOfferId === offer.id;
          const displayOffer = isEditing ? editedOffer! : offer;

          return (
            <Card key={offer.id} className="p-4">
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <ImageUpload
                        label="Logo"
                        currentUrl={displayOffer.logo_url}
                        onImageSelect={(file) => handleImageUpload(file, 'logo_url', true)}
                        thumbnail
                      />
                      <ImageUpload
                        label="Hero Image"
                        currentUrl={displayOffer.hero_image_url}
                        onImageSelect={(file) => handleImageUpload(file, 'hero_image_url', true)}
                        thumbnail
                      />
                      <ImageUpload
                        label="Offer Card"
                        currentUrl={displayOffer.offer_card_url}
                        onImageSelect={(file) => handleImageUpload(file, 'offer_card_url', true)}
                        thumbnail
                      />
                    </div>
                    <Input
                      value={displayOffer.name}
                      onChange={(e) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, name: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={displayOffer.city}
                        onChange={(e) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, city: e.target.value })}
                        placeholder="City"
                      />
                      <Input
                        value={displayOffer.state}
                        onChange={(e) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, state: e.target.value })}
                        placeholder="State"
                      />
                    </div>
                    <Input
                      value={displayOffer.full_address || ""}
                      onChange={(e) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, full_address: e.target.value })}
                      placeholder="Full Address"
                    />
                    <Input
                      value={displayOffer.website || ""}
                      onChange={(e) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, website: e.target.value })}
                      placeholder="Website"
                    />
                    <Input
                      value={displayOffer.redemption_info || ""}
                      onChange={(e) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, redemption_info: e.target.value })}
                      placeholder="Redemption Info"
                    />
                    <Textarea
                      value={displayOffer.description || ""}
                      onChange={(e) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, description: e.target.value })}
                      placeholder="Description"
                      rows={3}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <ColorPicker
                        label="Primary"
                        value={displayOffer.primary_color}
                        onChange={(color) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, primary_color: color })}
                      />
                      <ColorPicker
                        label="Glow"
                        value={displayOffer.primary_glow_color}
                        onChange={(color) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, primary_glow_color: color })}
                      />
                      <ColorPicker
                        label="Accent"
                        value={displayOffer.accent_color}
                        onChange={(color) => setEditedOffer({ ...displayOffer, category: displayOffer.category as ProductCategory, accent_color: color })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveEdit} className="flex-1">Save</Button>
                      <Button onClick={handleCancelEdit} variant="outline" className="flex-1">Cancel</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={displayOffer.logo_url} alt={displayOffer.name} className="w-full h-32 object-cover rounded" />
                    <h3 className="font-semibold">{displayOffer.name}</h3>
                    <p className="text-sm text-muted-foreground">{displayOffer.city}, {displayOffer.state}</p>
                    {displayOffer.redemption_info && (
                      <p className="text-sm font-medium">{displayOffer.redemption_info}</p>
                    )}
                    <Button onClick={() => handleEditOffer(offer)} className="w-full">
                      Edit Offer
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
