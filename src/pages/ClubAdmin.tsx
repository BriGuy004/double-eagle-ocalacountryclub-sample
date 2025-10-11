import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Save, DollarSign, Calendar as CalendarIcon, Clock, Lock, Unlock, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isAfter, startOfToday } from "date-fns";
import { cn } from "@/lib/utils";

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

interface Club {
  club_id: string;
  name: string;
  city: string;
  state: string;
}

interface OwnCourseDetails {
  guest_play_price: string | null;
  available_days: string | null;
  available_times: string | null;
  availability_notes: string | null;
  last_availability_update: string | null;
}

interface VisibilityRestriction {
  id: string;
  restricted_club_id: string;
  restricted_club_name: string;
  notes: string | null;
}

interface AvailabilitySlot {
  id: string;
  offer_id: string;
  available_date: string;
  start_time: string | null;
  end_time: string | null;
  price_override: number | null;
  notes: string | null;
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TIME_OPTIONS = [
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"
];

export default function ClubAdmin() {
  const navigate = useNavigate();
  const [clubId, setClubId] = useState<string | null>(null);
  const [clubName, setClubName] = useState<string>("");
  const [clubCity, setClubCity] = useState<string>("");
  const [clubState, setClubState] = useState<string>("");
  const [ownOfferId, setOwnOfferId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibilitySettings, setVisibilitySettings] = useState<OfferVisibility[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [availableClubs, setAvailableClubs] = useState<Club[]>([]);

  // Own course details
  const [ownCourseDetails, setOwnCourseDetails] = useState<OwnCourseDetails>({
    guest_play_price: null,
    available_days: null,
    available_times: null,
    availability_notes: null,
    last_availability_update: null,
  });

  // Visibility restrictions (who can't see YOUR course)
  const [visibilityRestrictions, setVisibilityRestrictions] = useState<VisibilityRestriction[]>([]);
  const [allGolfClubs, setAllGolfClubs] = useState<Club[]>([]);

  // Availability slots
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [newSlot, setNewSlot] = useState({
    start_time: "",
    end_time: "",
    price_override: null as number | null,
    notes: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    checkClubAdminAccess();
  }, []);

  const checkClubAdminAccess = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // If no user, redirect to auth page
      if (!user) {
        navigate("/auth");
        setLoading(false);
        return;
      }

      // Load ONLY Golf clubs for the dropdown
      const { data: offersData, error: offersError } = await supabase
        .from("offers")
        .select("id, club_id, name, city, state, category")
        .eq("category", "Golf")
        .order("name");

      if (offersError) {
        console.error("Error loading clubs:", offersError);
        toast({
          title: "Error",
          description: "Failed to load golf clubs list.",
          variant: "destructive",
        });
      } else if (offersData) {
        // Get unique golf clubs by club_id
        const uniqueClubs = offersData.reduce((acc: Club[], offer) => {
          if (!acc.find((c) => c.club_id === offer.club_id)) {
            acc.push({
              club_id: offer.club_id,
              name: offer.name,
              city: offer.city,
              state: offer.state,
            });
          }
          return acc;
        }, []);
        setAvailableClubs(uniqueClubs);
        setAllGolfClubs(uniqueClubs);
      }

      // Check if user is an admin
      const { data: adminRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (adminRole) {
        setIsAdmin(true);
        setLoading(false);
        return;
      }

      // Check if user is a club admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("club_id")
        .eq("user_id", user.id)
        .eq("role", "club_admin")
        .maybeSingle();

      if (roleData?.club_id) {
        setClubId(roleData.club_id);

        // Get club details and offer ID
        const { data: clubData } = await supabase
          .from("offers")
          .select(
            "id, name, city, state, guest_play_price, available_days, available_times, availability_notes, last_availability_update",
          )
          .eq("club_id", roleData.club_id)
          .eq("category", "Golf")
          .single();

        if (clubData) {
          setClubName(clubData.name);
          setClubCity(clubData.city);
          setClubState(clubData.state);
          setOwnOfferId(clubData.id);

          // Set own course details
          setOwnCourseDetails({
            guest_play_price: clubData.guest_play_price || null,
            available_days: clubData.available_days || null,
            available_times: clubData.available_times || null,
            availability_notes: clubData.availability_notes || null,
            last_availability_update: clubData.last_availability_update || null,
          });

          // Load availability slots
          await loadAvailabilitySlots(clubData.id);
        }

        await loadVisibilitySettings(roleData.club_id, clubData?.city || "");
        await loadVisibilityRestrictions(roleData.club_id);
      }
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

  const loadVisibilitySettings = async (clubId: string, city: string) => {
    try {
      const { data: offers, error: offersError } = await supabase
        .from("offers")
        .select("id, name, category, city, state")
        .or(`category.eq.Golf,and(category.eq.Dining,city.eq.${city})`);

      if (offersError) throw offersError;

      const { data: existingSettings, error: settingsError } = await supabase
        .from("club_offer_visibility")
        .select("*")
        .eq("club_id", clubId);

      if (settingsError) throw settingsError;

      const combined = offers.map((offer) => {
        const setting = existingSettings?.find((s) => s.offer_id === offer.id);
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

      const sorted = combined.sort((a, b) => {
        if (a.offer_category === "Golf" && b.offer_category !== "Golf") return -1;
        if (a.offer_category !== "Golf" && b.offer_category === "Golf") return 1;
        return a.offer_name.localeCompare(b.offer_name);
      });

      setVisibilitySettings(sorted);
    } catch (error) {
      console.error("Error loading visibility settings:", error);
      toast({
        title: "Error",
        description: "Failed to load offer visibility settings.",
        variant: "destructive",
      });
    }
  };

  const loadVisibilityRestrictions = async (clubId: string) => {
    try {
      const { data, error } = await supabase
        .from("club_visibility_restrictions")
        .select("id, restricted_club_id, notes")
        .eq("club_id", clubId);

      if (error) throw error;

      // Enrich with club names
      const enriched = await Promise.all(
        (data || []).map(async (restriction) => {
          const club = allGolfClubs.find((c) => c.club_id === restriction.restricted_club_id);
          return {
            ...restriction,
            restricted_club_name: club?.name || "Unknown Club",
          };
        }),
      );

      setVisibilityRestrictions(enriched);
    } catch (error) {
      console.error("Error loading visibility restrictions:", error);
    }
  };

  const saveOwnCourseDetails = async () => {
    if (!ownOfferId) return;

    setSaving("own-course");

    try {
      const { error } = await supabase
        .from("offers")
        .update({
          guest_play_price: ownCourseDetails.guest_play_price,
          available_days: ownCourseDetails.available_days,
          available_times: ownCourseDetails.available_times,
          availability_notes: ownCourseDetails.availability_notes,
          last_availability_update: new Date().toISOString(),
        })
        .eq("id", ownOfferId);

      if (error) throw error;

      toast({
        title: "Course Details Updated",
        description:
          "Your reciprocal play information has been saved. A 'New' badge will appear on your offer card for 30 days.",
      });

      // Refresh own course details
      const { data } = await supabase.from("offers").select("last_availability_update").eq("id", ownOfferId).single();

      if (data) {
        setOwnCourseDetails((prev) => ({
          ...prev,
          last_availability_update: data.last_availability_update,
        }));
      }
    } catch (error) {
      console.error("Error saving course details:", error);
      toast({
        title: "Error",
        description: "Failed to save course details.",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const toggleDayAvailability = (day: string) => {
    setOwnCourseDetails((prev) => {
      const currentDays = prev.available_days ? prev.available_days.split(',').filter(d => d.trim()) : [];
      const newDays = currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day];
      return {
        ...prev,
        available_days: newDays.join(','),
      };
    });
  };

  // Load availability slots
  const loadAvailabilitySlots = async (offerId: string) => {
    try {
      const { data, error } = await supabase
        .from("golf_course_availability")
        .select("*")
        .eq("offer_id", offerId)
        .gte("available_date", format(startOfToday(), "yyyy-MM-dd"))
        .order("available_date", { ascending: true });

      if (error) throw error;
      setAvailabilitySlots(data || []);
    } catch (error) {
      console.error("Error loading availability slots:", error);
    }
  };

  // Add availability slot
  const addAvailabilitySlot = async () => {
    if (!ownOfferId || !selectedDate) {
      toast({
        title: "Missing Information",
        description: "Please select a date first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("golf_course_availability")
        .insert({
          offer_id: ownOfferId,
          available_date: format(selectedDate, "yyyy-MM-dd"),
          start_time: newSlot.start_time || null,
          end_time: newSlot.end_time || null,
          price_override: newSlot.price_override,
          notes: newSlot.notes || null,
        })
        .select()
        .single();

      if (error) throw error;

      setAvailabilitySlots(prev => [...prev, data].sort((a, b) => 
        new Date(a.available_date).getTime() - new Date(b.available_date).getTime()
      ));

      // Update last_availability_update
      await supabase
        .from("offers")
        .update({ last_availability_update: new Date().toISOString() })
        .eq("id", ownOfferId);

      setSelectedDate(undefined);
      setNewSlot({ start_time: "", end_time: "", price_override: null, notes: "" });

      toast({
        title: "Availability Added",
        description: "Guest play slot has been added to your calendar.",
      });
    } catch (error: any) {
      console.error("Error adding availability:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add availability slot.",
        variant: "destructive",
      });
    }
  };

  // Delete availability slot
  const deleteAvailabilitySlot = async (slotId: string) => {
    try {
      const { error } = await supabase
        .from("golf_course_availability")
        .delete()
        .eq("id", slotId);

      if (error) throw error;

      setAvailabilitySlots(prev => prev.filter(s => s.id !== slotId));

      // Update last_availability_update
      if (ownOfferId) {
        await supabase
          .from("offers")
          .update({ last_availability_update: new Date().toISOString() })
          .eq("id", ownOfferId);
      }

      toast({
        title: "Availability Removed",
        description: "Guest play slot has been removed.",
      });
    } catch (error) {
      console.error("Error deleting availability:", error);
      toast({
        title: "Error",
        description: "Failed to remove availability slot.",
        variant: "destructive",
      });
    }
  };

  const toggleVisibilityRestriction = async (restrictedClubId: string) => {
    if (!clubId) {
      toast({
        title: "Error",
        description: "Club ID not found.",
        variant: "destructive",
      });
      return;
    }

    const existing = visibilityRestrictions.find(r => r.restricted_club_id === restrictedClubId);

    console.log("Toggle visibility restriction:", {
      clubId,
      restrictedClubId,
      existing,
      action: existing ? "remove" : "add"
    });

    try {
      if (existing) {
        // Remove restriction - allow them to see our course
        console.log("Deleting restriction with id:", existing.id);
        
        const { error } = await supabase
          .from("club_visibility_restrictions")
          .delete()
          .eq("id", existing.id);

        if (error) {
          console.error("Delete error:", error);
          throw error;
        }

        setVisibilityRestrictions(prev => prev.filter(r => r.id !== existing.id));

        toast({
          title: "Visibility Updated",
          description: "This club can now see your course in their marketplace.",
        });
      } else {
        // Add restriction - hide our course from them
        const club = allGolfClubs.find(c => c.club_id === restrictedClubId);
        
        console.log("Inserting new restriction:", {
          club_id: clubId,
          restricted_club_id: restrictedClubId
        });
        
        const { data, error } = await supabase
          .from("club_visibility_restrictions")
          .insert({
            club_id: clubId,
            restricted_club_id: restrictedClubId,
          })
          .select()
          .single();

        if (error) {
          console.error("Insert error:", error);
          throw error;
        }

        console.log("Restriction added successfully:", data);

        setVisibilityRestrictions(prev => [
          ...prev,
          {
            id: data.id,
            restricted_club_id: restrictedClubId,
            restricted_club_name: club?.name || "Unknown Club",
            notes: null,
          },
        ]);

        toast({
          title: "Visibility Updated",
          description: "This club can no longer see your course in their marketplace.",
        });
      }
    } catch (error: any) {
      console.error("Full error object:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update visibility restriction. Check console for details.",
        variant: "destructive",
      });
    }
  };

  const updateVisibilitySetting = async (offerSetting: OfferVisibility) => {
    if (!clubId) {
      toast({
        title: "Error",
        description: "Club ID not found.",
        variant: "destructive",
      });
      return;
    }

    setSaving(offerSetting.offer_id);

    console.log("Updating visibility setting:", {
      clubId,
      offerId: offerSetting.offer_id,
      isVisible: offerSetting.is_visible,
      hasExistingId: !!offerSetting.id
    });

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
        console.log("Updating existing setting with id:", offerSetting.id);
        
        const { error } = await supabase
          .from("club_offer_visibility")
          .update(settingData)
          .eq("id", offerSetting.id);

        if (error) {
          console.error("Update error:", error);
          throw error;
        }

        console.log("Update successful");
      } else {
        // Insert new setting
        console.log("Inserting new setting");
        
        const { data, error } = await supabase
          .from("club_offer_visibility")
          .insert(settingData)
          .select()
          .single();

        if (error) {
          console.error("Insert error:", error);
          throw error;
        }

        console.log("Insert successful:", data);

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
    } catch (error: any) {
      console.error("Full error object:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update visibility settings. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const toggleVisibility = (offerId: string) => {
    const setting = visibilitySettings.find((s) => s.offer_id === offerId);
    if (!setting) return;

    const updated = {
      ...setting,
      is_visible: !setting.is_visible,
    };

    setVisibilitySettings((prev) => prev.map((s) => (s.offer_id === offerId ? updated : s)));

    updateVisibilitySetting(updated);
  };

  const updateAccessLimit = (offerId: string, value: string) => {
    const numValue = value === "" ? null : parseInt(value);
    setVisibilitySettings((prev) =>
      prev.map((s) => (s.offer_id === offerId ? { ...s, max_reciprocal_access: numValue } : s)),
    );
  };

  const updateNotes = (offerId: string, value: string) => {
    setVisibilitySettings((prev) => prev.map((s) => (s.offer_id === offerId ? { ...s, notes: value } : s)));
  };

  const handleClubSelect = async (selectedClubId: string) => {
    setClubId(selectedClubId);
    const club = availableClubs.find((c) => c.club_id === selectedClubId);
    if (club) {
      setClubName(club.name);
      setClubCity(club.city);
      setClubState(club.state);
      await loadVisibilitySettings(selectedClubId, club.city);
      await loadVisibilityRestrictions(selectedClubId);

      // Load own course details
      const { data: clubData } = await supabase
        .from("offers")
        .select("id, guest_play_price, available_days, available_times, availability_notes, last_availability_update")
        .eq("club_id", selectedClubId)
        .eq("category", "Golf")
        .single();

      if (clubData) {
        setOwnOfferId(clubData.id);
        setOwnCourseDetails({
          guest_play_price: clubData.guest_play_price || null,
          available_days: clubData.available_days || null,
          available_times: clubData.available_times || null,
          availability_notes: clubData.availability_notes || null,
          last_availability_update: clubData.last_availability_update || null,
        });

        // Load availability slots
        await loadAvailabilitySlots(clubData.id);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const golfSettings = visibilitySettings.filter((s) => s.offer_category === "Golf");
  const diningSettings = visibilitySettings.filter((s) => s.offer_category === "Dining");

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Club Admin Dashboard</h1>
        {isAdmin || !clubId ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {isAdmin ? "Admin view: Select a golf club to manage" : "Select a club to manage its settings"}
            </p>
            <Select value={clubId || ""} onValueChange={handleClubSelect}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select a club..." />
              </SelectTrigger>
              <SelectContent>
                {availableClubs.map((club) => (
                  <SelectItem key={club.club_id} value={club.club_id}>
                    {club.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Managing: <span className="font-semibold text-foreground">{clubName}</span>
          </p>
        )}
      </div>

      {!clubId ? (
        <Card>
          <CardHeader>
            <CardTitle>Select a Golf Club</CardTitle>
            <CardDescription>Choose a golf club from the dropdown above to manage its settings.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Tabs defaultValue="own-course" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 h-auto">
            <TabsTrigger value="own-course" className="py-3 text-sm md:text-base">
              Your Course Details
            </TabsTrigger>
            <TabsTrigger value="visibility-control" className="py-3 text-sm md:text-base">
              Who Sees Your Course
            </TabsTrigger>
            <TabsTrigger value="member-marketplace" className="py-3 text-sm md:text-base">
              Member Marketplace
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Your Course Details */}
          <TabsContent value="own-course" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Default Guest Play Price
                </CardTitle>
                <CardDescription>
                  Set your standard pricing (can be overridden for specific dates below)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-price">Price per Round</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="guest-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={ownCourseDetails.guest_play_price ?? ""}
                      onChange={(e) => setOwnCourseDetails(prev => ({
                        ...prev,
                        guest_play_price: e.target.value ? parseFloat(e.target.value).toString() : null,
                      }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="general-notes">General Booking Information</Label>
                  <Textarea
                    id="general-notes"
                    placeholder="e.g., Must book 48 hours in advance, Cart fee additional $25, Dress code strictly enforced"
                    value={ownCourseDetails.availability_notes ?? ""}
                    onChange={(e) => setOwnCourseDetails(prev => ({
                      ...prev,
                      availability_notes: e.target.value,
                    }))}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={saveOwnCourseDetails}
                  disabled={saving === "own-course"}
                >
                  {saving === "own-course" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Default Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Guest Play Availability Calendar
                </CardTitle>
                <CardDescription>
                  Select specific dates and times when reciprocal play is available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Date */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => !isAfter(date, startOfToday())}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-3">
                    <Label>Time Window</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={newSlot.start_time}
                        onValueChange={(val) => setNewSlot(prev => ({ ...prev, start_time: val }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={newSlot.end_time}
                        onValueChange={(val) => setNewSlot(prev => ({ ...prev, end_time: val }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="End" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price Override (optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Use default price"
                        value={newSlot.price_override ?? ""}
                        onChange={(e) => setNewSlot(prev => ({
                          ...prev,
                          price_override: e.target.value ? parseFloat(e.target.value) : null,
                        }))}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use default price
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Date-Specific Notes (optional)</Label>
                    <Input
                      placeholder="e.g., Tournament day - limited availability"
                      value={newSlot.notes}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                </div>

                <Button
                  onClick={addAvailabilitySlot}
                  disabled={!selectedDate}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Availability Slot
                </Button>

                {/* Current Availability */}
                <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Current Availability</h3>
                    <Badge variant="secondary">{availabilitySlots.length} dates</Badge>
                  </div>

                  {availabilitySlots.length === 0 ? (
                    <Card className="border-dashed">
                      <CardContent className="pt-6 text-center text-muted-foreground">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No availability slots added yet</p>
                        <p className="text-sm">Add dates above to allow reciprocal play</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-2">
                      {availabilitySlots.map(slot => (
                        <Card key={slot.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-semibold">
                                    {format(new Date(slot.available_date), "EEEE, MMMM d, yyyy")}
                                  </span>
                                </div>
                                
                                {(slot.start_time || slot.end_time) && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {slot.start_time || "Any time"} - {slot.end_time || "Any time"}
                                    </span>
                                  </div>
                                )}

                                {slot.price_override && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="h-3 w-3 text-primary" />
                                    <span className="font-semibold text-primary">
                                      ${slot.price_override.toFixed(2)} (override)
                                    </span>
                                  </div>
                                )}

                                {slot.notes && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    {slot.notes}
                                  </p>
                                )}
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteAvailabilitySlot(slot.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: Control Who Sees Your Course */}
          <TabsContent value="visibility-control" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Control Who Can See Your Course
                </CardTitle>
                <CardDescription>
                  Hide your course from specific golf clubs, even if they offer reciprocal play to your members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allGolfClubs
                    .filter((club) => club.club_id !== clubId) // Don't show own club
                    .map((club) => {
                      const isRestricted = visibilityRestrictions.some((r) => r.restricted_club_id === club.club_id);

                      return (
                        <div
                          key={club.club_id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold">{club.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {club.city}, {club.state}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            {isRestricted ? (
                              <Badge variant="secondary" className="gap-1">
                                <EyeOff className="h-3 w-3" />
                                Hidden
                              </Badge>
                            ) : (
                              <Badge variant="default" className="gap-1">
                                <Eye className="h-3 w-3" />
                                Visible
                              </Badge>
                            )}

                            <Switch
                              checked={!isRestricted}
                              onCheckedChange={() => toggleVisibilityRestriction(club.club_id)}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> This controls whether OTHER clubs can see YOUR course. This is independent of
                    whether you show their courses to your members (managed in the "Member Marketplace" tab).
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: Member Marketplace (existing functionality) */}
          <TabsContent value="member-marketplace" className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Marketplace Visibility Controls</CardTitle>
                <CardDescription>Control what YOUR members can see in the marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Golf
                    </Badge>
                    <span>All other golf clubs nationwide (reciprocal access network)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Dining
                    </Badge>
                    <span>
                      Dining options in {clubCity}, {clubState} only
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  Note: Shopping, Lifestyle, Entertainment, Travel, and Hotels are managed centrally and always visible
                  to your members.
                </p>
              </CardContent>
            </Card>

            {/* Golf Clubs Section */}
            {golfSettings.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">Golf Clubs</h2>
                  <Badge variant="secondary">{golfSettings.length} clubs</Badge>
                </div>

                {golfSettings.map((setting) => (
                  <Card key={setting.offer_id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{setting.offer_name}</CardTitle>
                            <Badge variant="outline">Golf</Badge>
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
                          Show this golf club to your members
                        </Label>
                        <Switch
                          id={`visible-${setting.offer_id}`}
                          checked={setting.is_visible}
                          onCheckedChange={() => toggleVisibility(setting.offer_id)}
                          disabled={saving === setting.offer_id}
                        />
                      </div>

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
                          Limit how many of your members can access this golf course per month
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`notes-${setting.offer_id}`}>Internal Notes</Label>
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
            )}

            {/* Dining Section */}
            {diningSettings.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">Local Dining</h2>
                  <Badge variant="secondary">{diningSettings.length} restaurants</Badge>
                  <span className="text-sm text-muted-foreground">
                    in {clubCity}, {clubState}
                  </span>
                </div>

                {diningSettings.map((setting) => (
                  <Card key={setting.offer_id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{setting.offer_name}</CardTitle>
                            <Badge variant="outline">Dining</Badge>
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
                          Show this restaurant to your members
                        </Label>
                        <Switch
                          id={`visible-${setting.offer_id}`}
                          checked={setting.is_visible}
                          onCheckedChange={() => toggleVisibility(setting.offer_id)}
                          disabled={saving === setting.offer_id}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`notes-${setting.offer_id}`}>Internal Notes</Label>
                        <Textarea
                          id={`notes-${setting.offer_id}`}
                          placeholder="Add any notes about this restaurant..."
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
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
