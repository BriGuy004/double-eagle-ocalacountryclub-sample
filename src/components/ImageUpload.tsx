import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

interface ImageUploadProps {
  label: string;
  currentUrl?: string;
  onImageSelect: (file: File) => void;
}

export const ImageUpload = ({ label, currentUrl, onImageSelect }: ImageUploadProps) => {
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
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-2">
          <img 
            src={currentUrl} 
            alt={label}
            className="w-full h-full object-cover"
          />
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
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload {label}
      </Button>
    </div>
  );
};
