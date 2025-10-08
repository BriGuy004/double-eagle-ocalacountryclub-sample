import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { ColorPicker } from "@/components/ColorPicker";

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

interface BrandFormProps {
  brand: Partial<Brand>;
  onChange: (updates: Partial<Brand>) => void;
  categoryInfo: { category: string };
  isEdit?: boolean;
  onImageUpload: (file: File, field: 'logo_url' | 'hero_image_url' | 'offer_card_url', clubId: string) => Promise<string | null>;
}

export const BrandForm: React.FC<BrandFormProps> = ({
  brand,
  onChange,
  categoryInfo,
  isEdit = false,
  onImageUpload
}) => {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('url');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="flex items-center gap-1">
            Club ID (unique, lowercase)
            <span className="text-destructive">*</span>
          </Label>
          <Input
            value={brand.club_id || ""}
            onChange={(e) => onChange({ club_id: e.target.value })}
            placeholder="e.g., northgate"
            disabled={isEdit}
            className={isEdit ? "bg-muted" : ""}
            required
          />
        </div>
        <div>
          <Label className="flex items-center gap-1">
            Name
            <span className="text-destructive">*</span>
          </Label>
          <Input
            value={brand.name || ""}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g., Northgate Country Club"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>City</Label>
          <Input
            value={brand.city || ""}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="e.g., Houston"
          />
        </div>
        <div>
          <Label>State</Label>
          <Input
            value={brand.state || ""}
            onChange={(e) => onChange({ state: e.target.value })}
            placeholder="e.g., TX"
          />
        </div>
      </div>

      <div>
        <Label>Full Address</Label>
        <Input
          value={brand.full_address || ""}
          onChange={(e) => onChange({ full_address: e.target.value })}
          placeholder="e.g., 123 Golf Course Dr, Houston, TX 77001"
        />
      </div>

      <div>
        <Label>Website URL</Label>
        <Input
          value={brand.website || ""}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder="e.g., https://example.com"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          value={brand.description || ""}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Brief description"
        />
      </div>

      <div>
        <Label>Redemption Information</Label>
        <Input
          value={brand.redemption_info || ""}
          onChange={(e) => onChange({ redemption_info: e.target.value })}
          placeholder="Instructions for members"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="flex items-center gap-1">
            Images
            <span className="text-destructive">*</span>
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setUploadMethod(prev => prev === 'upload' ? 'url' : 'upload')}
          >
            {uploadMethod === 'upload' ? 'Use URL instead' : 'Upload files instead'}
          </Button>
        </div>

        {uploadMethod === 'upload' ? (
          <div className="grid grid-cols-3 gap-4">
            <ImageUpload
              label="Logo"
              currentUrl={brand.logo_url}
              onImageSelect={async (file) => {
                const url = await onImageUpload(file, 'logo_url', brand.club_id || '');
                if (url) onChange({ logo_url: url });
              }}
              thumbnail
            />
            <ImageUpload
              label="Hero Image"
              currentUrl={brand.hero_image_url}
              onImageSelect={async (file) => {
                const url = await onImageUpload(file, 'hero_image_url', brand.club_id || '');
                if (url) onChange({ hero_image_url: url });
              }}
            />
            <ImageUpload
              label="Offer Card"
              currentUrl={brand.offer_card_url}
              onImageSelect={async (file) => {
                const url = await onImageUpload(file, 'offer_card_url', brand.club_id || '');
                if (url) onChange({ offer_card_url: url });
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="flex items-center gap-1">
                Logo URL
                <span className="text-destructive">*</span>
              </Label>
              <Input
                value={brand.logo_url || ""}
                onChange={(e) => onChange({ logo_url: e.target.value })}
                required
                placeholder="/lovable-uploads/logo.png"
              />
              {brand.logo_url && (
                <img src={brand.logo_url} alt="Logo preview" className="mt-2 h-20 object-contain bg-muted rounded p-2" />
              )}
            </div>
            <div>
              <Label className="flex items-center gap-1">
                Hero Image URL
                <span className="text-destructive">*</span>
              </Label>
              <Input
                value={brand.hero_image_url || ""}
                onChange={(e) => onChange({ hero_image_url: e.target.value })}
                required
                placeholder="/lovable-uploads/hero.png"
              />
              {brand.hero_image_url && (
                <img src={brand.hero_image_url} alt="Hero preview" className="mt-2 h-20 object-cover rounded" />
              )}
            </div>
            <div>
              <Label>Offer Card URL</Label>
              <Input
                value={brand.offer_card_url || ""}
                onChange={(e) => onChange({ offer_card_url: e.target.value })}
                placeholder="/lovable-uploads/card.png"
              />
              {brand.offer_card_url && (
                <img src={brand.offer_card_url} alt="Card preview" className="mt-2 h-20 object-cover rounded" />
              )}
            </div>
          </div>
        )}
      </div>

      {categoryInfo.category === 'Golf' && (
        <div className="space-y-2">
          <Label>Brand Colors</Label>
          <div className="grid grid-cols-3 gap-4">
            <ColorPicker
              label="Primary"
              value={brand.primary_color || "38 70% 15%"}
              onChange={(val) => onChange({ primary_color: val })}
            />
            <ColorPicker
              label="Primary Glow"
              value={brand.primary_glow_color || "38 70% 25%"}
              onChange={(val) => onChange({ primary_glow_color: val })}
            />
            <ColorPicker
              label="Accent"
              value={brand.accent_color || "45 85% 50%"}
              onChange={(val) => onChange({ accent_color: val })}
            />
          </div>
        </div>
      )}
    </div>
  );
};
