import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { Clipboard, X } from "lucide-react";

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
  offer_text?: string;
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

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number): string => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  const hDeg = Math.round(h * 360);
  const sPercent = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${hDeg} ${sPercent}% ${lPercent}%`;
};

// Helper function to convert HSL string to CSS color
const hslToCss = (hsl: string): string => {
  return `hsl(${hsl})`;
};

// Paste-only Color Picker - Auto-extracts color from pasted image
const PasteColorPicker = ({
  currentColor,
  onColorChange,
  label,
}: {
  currentColor: string;
  onColorChange: (hsl: string) => void;
  label: string;
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPasteReady, setIsPasteReady] = useState(false);
  const pasteAreaRef = useRef<HTMLDivElement>(null);

  const extractColorFromImage = (imageDataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Sample the center pixel area and average for better accuracy
      const centerX = Math.floor(img.width / 2);
      const centerY = Math.floor(img.height / 2);

      let totalR = 0,
        totalG = 0,
        totalB = 0,
        count = 0;

      for (let x = centerX - 2; x <= centerX + 2; x++) {
        for (let y = centerY - 2; y <= centerY + 2; y++) {
          const imageData = ctx.getImageData(x, y, 1, 1);
          const [r, g, b] = imageData.data;
          totalR += r;
          totalG += g;
          totalB += b;
          count++;
        }
      }

      const avgR = Math.round(totalR / count);
      const avgG = Math.round(totalG / count);
      const avgB = Math.round(totalB / count);

      const hsl = rgbToHsl(avgR, avgG, avgB);
      onColorChange(hsl);
      setPreviewImage(imageDataUrl);
    };
    img.src = imageDataUrl;
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!isPasteReady) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageDataUrl = event.target?.result as string;
              extractColorFromImage(imageDataUrl);
              setIsPasteReady(false);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [isPasteReady]);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* Color Preview and Value */}
      <div className="flex gap-2 items-center">
        <div
          className="w-16 h-16 rounded-lg border-2 border-white/20 flex-shrink-0 shadow-lg"
          style={{ backgroundColor: hslToCss(currentColor || "38 70% 15%") }}
          title="Current color"
        />
        <div className="flex-1">
          <Input
            value={currentColor || ""}
            onChange={(e) => onColorChange(e.target.value)}
            placeholder="38 70% 15%"
            className="font-mono text-sm"
            readOnly
          />
          <p className="text-xs text-muted-foreground mt-1">HSL: {currentColor || "Not set"}</p>
        </div>
      </div>

      {/* Paste Area */}
      <div
        ref={pasteAreaRef}
        onClick={() => setIsPasteReady(true)}
        onBlur={() => setTimeout(() => setIsPasteReady(false), 200)}
        tabIndex={0}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-all duration-200
          ${
            isPasteReady
              ? "border-primary bg-primary/10 ring-2 ring-primary/20"
              : "border-white/20 hover:border-white/40 hover:bg-white/5"
          }
        `}
      >
        <Clipboard className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium text-white">
          {isPasteReady ? "Ready! Press Ctrl+V (or Cmd+V) to paste" : "Click here, then paste your screenshot"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Screenshot a solid color from your brand guidelines and paste it here
        </p>
      </div>

      {/* Preview of pasted image */}
      {previewImage && (
        <div className="relative inline-block">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setPreviewImage(null)}
            className="absolute -top-2 -right-2 z-10 h-6 w-6 p-0 rounded-full bg-background"
          >
            <X className="w-3 h-3" />
          </Button>
          <img
            src={previewImage}
            alt="Pasted color"
            className="w-20 h-20 object-cover rounded border-2 border-white/20"
          />
        </div>
      )}
    </div>
  );
};

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
          <Label className="flex items-center gap-1">Club ID (unique, lowercase)</Label>
          <Input
            value={brand.club_id || ""}
            onChange={(e) => {
              const formatted = e.target.value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
              onChange({ club_id: formatted });
            }}
            placeholder="e.g., northgate"
            disabled={isEdit}
            className={isEdit ? "bg-muted" : errors.club_id ? "border-destructive" : ""}
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
          <Label className="flex items-center gap-1">Name</Label>
          <Input
            value={brand.name || ""}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g., Northgate Country Club"
            className={errors.name ? "border-destructive" : ""}
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
          <span className="text-xs text-muted-foreground">{brand.description?.length || 0}/1500</span>
        </div>
        <Textarea
          value={brand.description || ""}
          onChange={(e) => {
            if (e.target.value.length <= 1500) {
              onChange({ description: e.target.value });
            }
          }}
          placeholder="Brief description of the club and its amenities..."
          rows={3}
          maxLength={1500}
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

      {categoryInfo.category !== "Golf" && (
        <div>
          <Label>Offer Text (Display on Card)</Label>
          <Input
            value={brand.offer_text || ""}
            onChange={(e) => onChange({ offer_text: e.target.value })}
            placeholder="e.g., 25% off, $50 off, Buy 1 Get 1"
            className={errors.offer_text ? "border-destructive" : ""}
            maxLength={50}
          />
          <p className="text-xs text-muted-foreground mt-1">
            This will appear in the bordered box on the right side of the offer card. Keep it short and impactful!
          </p>
          {errors.offer_text && <p className="text-sm text-destructive mt-1">{errors.offer_text}</p>}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="flex items-center gap-1">Images</Label>
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
            {!brand.club_id && (
              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-3">
                <p className="text-yellow-200 text-sm">
                  <strong>Please enter a Club ID first</strong> - It's required to upload images
                </p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              <ImageUpload
                label="Logo"
                currentUrl={brand.logo_url}
                disabled={!brand.club_id}
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
                disabled={!brand.club_id}
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
                disabled={!brand.club_id}
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
                  disabled={!brand.club_id}
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
                  disabled={!brand.club_id}
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
                  disabled={!brand.club_id}
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
                <Label className="flex items-center gap-1">Logo URL</Label>
                <Input
                  value={brand.logo_url || ""}
                  onChange={(e) => onChange({ logo_url: e.target.value })}
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
                <Label className="flex items-center gap-1">Hero Image URL</Label>
                <Input
                  value={brand.hero_image_url || ""}
                  onChange={(e) => onChange({ hero_image_url: e.target.value })}
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

      {/* Brand Colors - Only for Golf Category */}
      {categoryInfo.category === "Golf" && (
        <div className="space-y-6 border-t border-white/10 pt-6">
          <div>
            <Label className="text-lg font-semibold">Brand Colors</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Click the paste area, then paste (Ctrl+V or Cmd+V) screenshots of your solid brand colors
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <PasteColorPicker
              label="Primary Color"
              currentColor={brand.primary_color || "38 70% 15%"}
              onColorChange={(hsl) => onChange({ primary_color: hsl })}
            />

            <PasteColorPicker
              label="Primary Glow Color"
              currentColor={brand.primary_glow_color || "38 70% 25%"}
              onColorChange={(hsl) => onChange({ primary_glow_color: hsl })}
            />

            <PasteColorPicker
              label="Accent Color"
              currentColor={brand.accent_color || "45 85% 50%"}
              onColorChange={(hsl) => onChange({ accent_color: hsl })}
            />
          </div>
        </div>
      )}
    </div>
  );
};
