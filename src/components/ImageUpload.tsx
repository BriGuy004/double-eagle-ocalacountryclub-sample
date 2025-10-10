import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

interface ImageUploadProps {
  label: string;
  currentUrl?: string;
  onImageSelect: (file: File) => void;
  onImageRemove?: () => void;
  thumbnail?: boolean;
  disabled?: boolean;
}

export const ImageUpload = ({ label, currentUrl, onImageSelect, onImageRemove, thumbnail = false, disabled = false }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs">{label}</Label>
      {currentUrl && (
        <div className={`relative bg-muted rounded-lg overflow-hidden mb-2 group ${
          thumbnail ? 'w-20 h-20' : 'w-full aspect-video'
        }`}>
          <img 
            src={currentUrl} 
            alt={label}
            className={`w-full h-full ${thumbnail ? 'object-contain' : 'object-cover'}`}
          />
          {onImageRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              onClick={onImageRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload {label}
      </Button>
    </div>
  );
};
