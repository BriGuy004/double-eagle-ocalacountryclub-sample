import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OfferVisibility {
  id: string;
  offer_id: string;
  is_visible: boolean;
  max_reciprocal_access: number | null;
  notes: string | null;
  offer_name: string;
  offer_category: string;
  offer_city: string;
  offer_state: string;
}

export default function ClubAdmin() {
  const [clubId, setClubId] = useState<string | null>(null);
  const [clubName, setClubName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [visibilitySettings, setVisibilitySettings] = useState<OfferVisibility[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkClubAdminAccess();
  }, []);

  const checkClubAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the club admin panel.",
          variant: "destructive",
        });
        return;
      }

      // Get user's club_id from user_roles
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("club_id")
        .eq("user_id", user.id)
        .eq("role", "club_admin")
        .single();

      if (roleError || !roleData?.club_id) {
        toast({
          title: "Access Denied",
          description: "You don't have club admin permissions.",
          variant: "destructive",
        });
        return;
      }

      setClubId(roleData.club_id);

      // Get club name
      const { data: clubData } = await supabase
        .from("offers")
        .select("name")
        .eq("club_id", roleData.club_id)
        .single();

      if (clubData) {
        setClubName(clubData.name);
      }

      // Load all offers and visibility settings
      await loadVisibilitySettings(roleData.club_id);
    } catch (error) {
      console.error("Error checking club admin access:", error);
      toast({
        title: "Error",
        description: "Failed to load club admin panel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadVisibilitySettings = async (clubId: string) => {
    try {
      // Get all offers
      const { data: offers, error: offersError } = await supabase
        .from("offers")
        .select("id, name, category, city, state");

      if (offersError) throw offersError;

      // Get existing visibility settings for this club
      const { data: existingSettings, error: settingsError } = await supabase
        .from("club_offer_visibility")
        .select("*")
        .eq("club_id", clubId);

      if (settingsError) throw settingsError;

      // Combine offers with their visibility settings
      const combined = offers.map(offer => {
        const setting = existingSettings?.find(s => s.offer_id === offer.id);
        return {
          id: setting?.id || "",
          offer_id: offer.id,
          is_visible: setting?.is_visible ?? true,
          max_reciprocal_access: setting?.max_reciprocal_access ?? null,
          notes: setting?.notes ?? null,
          offer_name: offer.name,
          offer_category: offer.category,
          offer_city: offer.city,
          offer_state: offer.state,
        };
      });

      setVisibilitySettings(combined);
    } catch (error) {
      console.error("Error loading visibility settings:", error);
      toast({
        title: "Error",
        description: "Failed to load offer visibility settings.",
        variant: "destructive",
      });
    }
  };

  const updateVisibilitySetting = async (offerSetting: OfferVisibility) => {
    if (!clubId) return;

    setSaving(offerSetting.offer_id);

    try {
      const settingData = {
        club_id: clubId,
        offer_id: offerSetting.offer_id,
        is_visible: offerSetting.is_visible,
        max_reciprocal_access: offerSetting.max_reciprocal_access,
        notes: offerSetting.notes,
      };

      if (offerSetting.id) {
        // Update existing setting
        const { error } = await supabase
          .from("club_offer_visibility")
          .update(settingData)
          .eq("id", offerSetting.id);

        if (error) throw error;
      } else {
        // Insert new setting
        const { data, error } = await supabase
          .from("club_offer_visibility")
          .insert(settingData)
          .select()
          .single();

        if (error) throw error;

        // Update local state with new ID
        setVisibilitySettings(prev =>
          prev.map(s =>
            s.offer_id === offerSetting.offer_id
              ? { ...s, id: data.id }
              : s
          )
        );
      }

      toast({
        title: "Settings Updated",
        description: "Offer visibility settings have been saved.",
      });
    } catch (error) {
      console.error("Error updating visibility setting:", error);
      toast({
        title: "Error",
        description: "Failed to update visibility settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const toggleVisibility = (offerId: string) => {
    const setting = visibilitySettings.find(s => s.offer_id === offerId);
    if (!setting) return;

    const updated = {
      ...setting,
      is_visible: !setting.is_visible,
    };

    setVisibilitySettings(prev =>
      prev.map(s => s.offer_id === offerId ? updated : s)
    );

    updateVisibilitySetting(updated);
  };

  const updateAccessLimit = (offerId: string, value: string) => {
    const numValue = value === "" ? null : parseInt(value);
    setVisibilitySettings(prev =>
      prev.map(s =>
        s.offer_id === offerId
          ? { ...s, max_reciprocal_access: numValue }
          : s
      )
    );
  };

  const updateNotes = (offerId: string, value: string) => {
    setVisibilitySettings(prev =>
      prev.map(s =>
        s.offer_id === offerId
          ? { ...s, notes: value }
          : s
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!clubId) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this club admin panel.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Club Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Managing offer visibility for: <span className="font-semibold text-foreground">{clubName}</span>
        </p>
      </div>

      <div className="space-y-4">
        {visibilitySettings.map((setting) => (
          <Card key={setting.offer_id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{setting.offer_name}</CardTitle>
                    <Badge variant="outline">{setting.offer_category}</Badge>
                    {setting.is_visible ? (
                      <Badge variant="default" className="gap-1">
                        <Eye className="h-3 w-3" />
                        Visible
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <EyeOff className="h-3 w-3" />
                        Hidden
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {setting.offer_city}, {setting.offer_state}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={`visible-${setting.offer_id}`} className="text-base">
                  Show this offer to your members
                </Label>
                <Switch
                  id={`visible-${setting.offer_id}`}
                  checked={setting.is_visible}
                  onCheckedChange={() => toggleVisibility(setting.offer_id)}
                  disabled={saving === setting.offer_id}
                />
              </div>

              {setting.offer_category === "Golf" && (
                <div className="space-y-2">
                  <Label htmlFor={`access-${setting.offer_id}`}>
                    Maximum Reciprocal Access (Leave empty for unlimited)
                  </Label>
                  <Input
                    id={`access-${setting.offer_id}`}
                    type="number"
                    min="0"
                    placeholder="Unlimited"
                    value={setting.max_reciprocal_access ?? ""}
                    onChange={(e) => updateAccessLimit(setting.offer_id, e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Limit how many members from other clubs can access this golf course per month
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor={`notes-${setting.offer_id}`}>
                  Internal Notes
                </Label>
                <Textarea
                  id={`notes-${setting.offer_id}`}
                  placeholder="Add any notes about this offer visibility..."
                  value={setting.notes ?? ""}
                  onChange={(e) => updateNotes(setting.offer_id, e.target.value)}
                  rows={2}
                />
              </div>

              <Button
                onClick={() => updateVisibilitySetting(setting)}
                disabled={saving === setting.offer_id || !setting.id}
                className="w-full sm:w-auto"
              >
                {saving === setting.offer_id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
