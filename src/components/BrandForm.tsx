import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  image_2_url?: string;
  image_3_url?: string;
  image_4_url?: string;
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
  onImageUpload: (
    file: File,
    field: "logo_url" | "hero_image_url" | "offer_card_url" | "image_2_url" | "image_3_url" | "image_4_url",
    clubId: string,
  ) => Promise<string | null>;
  onImageRemove?: (
    imageUrl: string,
    field: "logo_url" | "hero_image_url" | "offer_card_url" | "image_2_url" | "image_3_url" | "image_4_url",
  ) => Promise<void>;
  errors?: Record<string, string>;
}

export const BrandForm: React.FC<BrandFormProps> = ({
  brand,
  onChange,
  categoryInfo,
  isEdit = false,
  onImageUpload,
  onImageRemove,
  errors = {},
}) => {
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("url");

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
            onChange={(e) => {
              // Auto-format: lowercase, replace spaces with hyphens, remove invalid chars
              const formatted = e.target.value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
              onChange({ club_id: formatted });
            }}
            placeholder="e.g., northgate"
            disabled={isEdit}
            className={isEdit ? "bg-muted" : errors.club_id ? "border-destructive" : ""}
            required
          />
          {errors.club_id ? (
            <p className="text-sm text-destructive mt-1">{errors.club_id}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Used in URLs. Only lowercase letters, numbers, and hyphens. Cannot be changed after creation.
            </p>
          )}
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
            className={errors.name ? "border-destructive" : ""}
            required
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>City</Label>
          <Input
            value={brand.city || ""}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="e.g., Houston"
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
        </div>
        <div>
          <Label>State</Label>
          <Input
            value={brand.state || ""}
            onChange={(e) => onChange({ state: e.target.value })}
            placeholder="e.g., TX"
            className={errors.state ? "border-destructive" : ""}
          />
          {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
        </div>
      </div>

      <div>
        <Label>Full Address</Label>
        <Input
          value={brand.full_address || ""}
          onChange={(e) => onChange({ full_address: e.target.value })}
          placeholder="e.g., 123 Golf Course Dr, Houston, TX 77001"
          className={errors.full_address ? "border-destructive" : ""}
        />
        {errors.full_address && <p className="text-sm text-destructive mt-1">{errors.full_address}</p>}
      </div>

      <div>
        <Label>Website URL</Label>
        <Input
          value={brand.website || ""}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder="e.g., https://example.com"
          className={errors.website ? "border-destructive" : ""}
        />
        {errors.website ? (
          <p className="text-sm text-destructive mt-1">{errors.website}</p>
        ) : (
          <p className="text-xs text-muted-foreground mt-1">Must include http:// or https://</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label>Description</Label>
          <span className="text-xs text-muted-foreground">{brand.description?.length || 0}/500</span>
        </div>
        <Textarea
          value={brand.description || ""}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              onChange({ description: e.target.value });
            }
          }}
          placeholder="Brief description of the club and its amenities..."
          rows={3}
          maxLength={200}
          className={errors.description ? "border-destructive" : ""}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-muted-foreground">Describe what makes this club unique</p>
        </div>
        {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label>Redemption Information</Label>
          <span className="text-xs text-muted-foreground">{brand.redemption_info?.length || 0}/500</span>
        </div>
        <Textarea
          value={brand.redemption_info || ""}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              onChange({ redemption_info: e.target.value });
            }
          }}
          placeholder="Step-by-step instructions for members to redeem this offer..."
          rows={4}
          maxLength={500}
          className={errors.redemption_info ? "border-destructive" : ""}
        />
        {errors.redemption_info && <p className="text-sm text-destructive mt-1">{errors.redemption_info}</p>}
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
            onClick={() => setUploadMethod((prev) => (prev === "upload" ? "url" : "upload"))}
          >
            {uploadMethod === "upload" ? "Use URL instead" : "Upload files instead"}
          </Button>
        </div>

        {uploadMethod === "upload" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <ImageUpload
                label="Logo"
                currentUrl={brand.logo_url}
                onImageSelect={async (file) => {
                  const url = await onImageUpload(file, "logo_url", brand.club_id || "");
                  if (url) onChange({ logo_url: url });
                }}
                onImageRemove={
                  onImageRemove
                    ? async () => {
                        if (brand.logo_url) {
                          await onImageRemove(brand.logo_url, "logo_url");
                          onChange({ logo_url: "" });
                        }
                      }
                    : undefined
                }
                thumbnail
              />
              <ImageUpload
                label="Hero Image"
                currentUrl={brand.hero_image_url}
                onImageSelect={async (file) => {
                  const url = await onImageUpload(file, "hero_image_url", brand.club_id || "");
                  if (url) onChange({ hero_image_url: url });
                }}
                onImageRemove={
                  onImageRemove
                    ? async () => {
                        if (brand.hero_image_url) {
                          await onImageRemove(brand.hero_image_url, "hero_image_url");
                          onChange({ hero_image_url: "" });
                        }
                      }
                    : undefined
                }
              />
              <ImageUpload
                label="Offer Card"
                currentUrl={brand.offer_card_url}
                onImageSelect={async (file) => {
                  const url = await onImageUpload(file, "offer_card_url", brand.club_id || "");
                  if (url) onChange({ offer_card_url: url });
                }}
                onImageRemove={
                  onImageRemove
                    ? async () => {
                        if (brand.offer_card_url) {
                          await onImageRemove(brand.offer_card_url, "offer_card_url");
                          onChange({ offer_card_url: "" });
                        }
                      }
                    : undefined
                }
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Additional Carousel Images (Optional)</Label>
              <div className="grid grid-cols-3 gap-4">
                <ImageUpload
                  label="Image 2"
                  currentUrl={brand.image_2_url}
                  onImageSelect={async (file) => {
                    const url = await onImageUpload(file, "image_2_url", brand.club_id || "");
                    if (url) onChange({ image_2_url: url });
                  }}
                  onImageRemove={
                    onImageRemove
                      ? async () => {
                          if (brand.image_2_url) {
                            await onImageRemove(brand.image_2_url, "image_2_url");
                            onChange({ image_2_url: "" });
                          }
                        }
                      : undefined
                  }
                />
                <ImageUpload
                  label="Image 3"
                  currentUrl={brand.image_3_url}
                  onImageSelect={async (file) => {
                    const url = await onImageUpload(file, "image_3_url", brand.club_id || "");
                    if (url) onChange({ image_3_url: url });
                  }}
                  onImageRemove={
                    onImageRemove
                      ? async () => {
                          if (brand.image_3_url) {
                            await onImageRemove(brand.image_3_url, "image_3_url");
                            onChange({ image_3_url: "" });
                          }
                        }
                      : undefined
                  }
                />
                <ImageUpload
                  label="Image 4"
                  currentUrl={brand.image_4_url}
                  onImageSelect={async (file) => {
                    const url = await onImageUpload(file, "image_4_url", brand.club_id || "");
                    if (url) onChange({ image_4_url: url });
                  }}
                  onImageRemove={
                    onImageRemove
                      ? async () => {
                          if (brand.image_4_url) {
                            await onImageRemove(brand.image_4_url, "image_4_url");
                            onChange({ image_4_url: "" });
                          }
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
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
                  className={errors.logo_url ? "border-destructive" : ""}
                />
                {errors.logo_url && <p className="text-sm text-destructive mt-1">{errors.logo_url}</p>}
                {brand.logo_url && (
                  <img
                    src={brand.logo_url}
                    alt="Logo preview"
                    className="mt-2 h-20 object-contain bg-muted rounded p-2"
                  />
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
                  className={errors.hero_image_url ? "border-destructive" : ""}
                />
                {errors.hero_image_url && <p className="text-sm text-destructive mt-1">{errors.hero_image_url}</p>}
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
                  className={errors.offer_card_url ? "border-destructive" : ""}
                />
                {errors.offer_card_url && <p className="text-sm text-destructive mt-1">{errors.offer_card_url}</p>}
                {brand.offer_card_url && (
                  <img src={brand.offer_card_url} alt="Card preview" className="mt-2 h-20 object-cover rounded" />
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Additional Carousel Images (Optional)</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Image 2 URL</Label>
                  <Input
                    value={brand.image_2_url || ""}
                    onChange={(e) => onChange({ image_2_url: e.target.value })}
                    placeholder="/lovable-uploads/image2.png"
                  />
                  {brand.image_2_url && (
                    <img src={brand.image_2_url} alt="Image 2 preview" className="mt-2 h-20 object-cover rounded" />
                  )}
                </div>
                <div>
                  <Label>Image 3 URL</Label>
                  <Input
                    value={brand.image_3_url || ""}
                    onChange={(e) => onChange({ image_3_url: e.target.value })}
                    placeholder="/lovable-uploads/image3.png"
                  />
                  {brand.image_3_url && (
                    <img src={brand.image_3_url} alt="Image 3 preview" className="mt-2 h-20 object-cover rounded" />
                  )}
                </div>
                <div>
                  <Label>Image 4 URL</Label>
                  <Input
                    value={brand.image_4_url || ""}
                    onChange={(e) => onChange({ image_4_url: e.target.value })}
                    placeholder="/lovable-uploads/image4.png"
                  />
                  {brand.image_4_url && (
                    <img src={brand.image_4_url} alt="Image 4 preview" className="mt-2 h-20 object-cover rounded" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {categoryInfo.category === "Golf" && (
        <div className="space-y-2">
          <Label>Brand Colors</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Colors in HSL format (e.g., "38 70% 15%"). Used to theme the brand's pages.
          </p>
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
