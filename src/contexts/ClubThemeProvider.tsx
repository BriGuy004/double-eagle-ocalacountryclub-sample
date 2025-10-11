import { useEffect } from 'react';

interface ClubThemeProviderProps {
  primaryColor: string;      // e.g., "292 45% 22%" from database
  primaryGlowColor: string;  // e.g., "292 45% 35%" from database  
  accentColor: string;       // e.g., "45 85% 50%" from database
  children?: React.ReactNode;
}

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

export const ClubThemeProvider: React.FC<ClubThemeProviderProps> = ({
  primaryColor,
  primaryGlowColor,
  accentColor,
  children,
}) => {
  useEffect(() => {
    const root = document.documentElement;

    // Apply the club's custom colors
    root.style.setProperty('--primary', primaryColor);
    root.style.setProperty('--primary-glow', primaryGlowColor);
    root.style.setProperty('--accent', accentColor);
    
    // Smart text colors based on background luminance
    const primaryText = shouldUseBlackText(primaryColor) ? '0 0% 10%' : '0 0% 100%';
    const accentText = shouldUseBlackText(accentColor) ? '0 0% 10%' : '0 0% 100%';
    
    root.style.setProperty('--primary-foreground', primaryText);
    root.style.setProperty('--accent-foreground', accentText);

    // Also update ring color to match accent
    root.style.setProperty('--ring', accentColor);

    // Update gradient backgrounds to use club's primary color
    const [h, s, l] = primaryColor.split(' ').map(v => parseFloat(v));
    root.style.setProperty('--gradient-premium', 
      `linear-gradient(135deg, hsl(${h} ${s} ${Math.max(l - 2, 0)}%) 0%, hsl(${h} ${s} ${l}%) 100%)`
    );
    root.style.setProperty('--gradient-card', 
      `linear-gradient(135deg, hsl(${h} ${s} ${l}%) 0%, hsl(${h} ${s} ${Math.min(l + 4, 100)}%) 100%)`
    );

    // Cleanup function to reset on unmount
    return () => {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-glow');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--primary-foreground');
      root.style.removeProperty('--accent-foreground');
      root.style.removeProperty('--ring');
      root.style.removeProperty('--gradient-premium');
      root.style.removeProperty('--gradient-card');
    };
  }, [primaryColor, primaryGlowColor, accentColor]);

  return <>{children}</>;
};
