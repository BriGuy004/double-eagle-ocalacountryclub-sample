import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TrendingUp, Heart, DollarSign, Gift, Star } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { getAllOffers } from "@/data/allOffers";

const MemberDashboard = () => {
  const { userData } = useUser();
  const { getBookmarkedOffers } = useBookmarks();
  
  // Get saved offers
  const bookmarkedIds = getBookmarkedOffers();
  const allOffers = getAllOffers();
  const savedOffers = allOffers.filter(offer => bookmarkedIds.includes(offer.offerId));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Justin Kuehn</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <Badge className="bg-accent text-accent-foreground px-4 py-2 text-base md:text-lg">
              {userData.currentTier} Member
            </Badge>
            <span className="text-sm md:text-base text-muted-foreground">
              Member since {userData.memberSince}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12">
          <Card className="group p-6 bg-gradient-to-br from-[#1a2332] to-[#253447] border border-white/10 rounded-xl transition-all duration-300 touch-active md:hover:scale-[1.02] md:hover:shadow-[0_0_30px_rgba(230,126,60,0.3)] overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[#94a3b8] text-sm mb-2">Offers Redeemed</p>
                <p className="text-[48px] sm:text-[52px] lg:text-[56px] font-bold text-white leading-none truncate">
                  <AnimatedCounter end={userData.offersRedeemed} />
                </p>
              </div>
              <Gift className="h-10 w-10 text-[#e67e3c] flex-shrink-0 opacity-70" />
            </div>
          </Card>
          
          <Card className="group p-6 bg-gradient-to-br from-[#1a2332] to-[#253447] border border-white/10 rounded-xl transition-all duration-300 touch-active md:hover:scale-[1.02] md:hover:shadow-[0_0_30px_rgba(230,126,60,0.3)] overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[#94a3b8] text-sm mb-2">Money Saved</p>
                <p className="text-[48px] sm:text-[52px] lg:text-[56px] font-bold text-white leading-none truncate">
                  <AnimatedCounter end={userData.moneySaved} prefix="$" abbreviate />
                </p>
              </div>
              <DollarSign className="h-10 w-10 text-[#e67e3c] flex-shrink-0 opacity-70" />
            </div>
          </Card>
          
          <Card className="group p-6 bg-gradient-to-br from-[#1a2332] to-[#253447] border border-white/10 rounded-xl transition-all duration-300 touch-active md:hover:scale-[1.02] md:hover:shadow-[0_0_30px_rgba(230,126,60,0.3)] overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[#94a3b8] text-sm mb-2">Saved Offers</p>
                <p className="text-[48px] sm:text-[52px] lg:text-[56px] font-bold text-white leading-none truncate">
                  <AnimatedCounter end={savedOffers.length} />
                </p>
              </div>
              <Heart className="h-10 w-10 text-[#e67e3c] flex-shrink-0 opacity-70" />
            </div>
          </Card>
          
          <Card className="group p-6 bg-gradient-to-br from-[#1a2332] to-[#253447] border border-white/10 rounded-xl transition-all duration-300 touch-active md:hover:scale-[1.02] md:hover:shadow-[0_0_30px_rgba(230,126,60,0.3)] overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[#94a3b8] text-sm mb-2">Points Balance</p>
                <p className="text-[48px] sm:text-[52px] lg:text-[56px] font-bold text-white leading-none truncate">
                  <AnimatedCounter end={userData.pointsBalance} abbreviate />
                </p>
              </div>
              <Star className="h-10 w-10 text-[#e67e3c] flex-shrink-0 opacity-70" />
            </div>
          </Card>
        </div>

        {/* Recent Activity and Bookmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Recent Activity */}
          <Card className="p-4 md:p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Recent Activity</h2>
            </div>
            <div className="space-y-3 md:space-y-4">
              {userData.recentActivity.length > 0 ? (
                userData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex flex-col sm:flex-row justify-between items-start p-3 md:p-4 rounded-lg bg-muted/50 gap-2 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-base">{activity.brand}</h3>
                      <p className="text-sm text-muted-foreground">{activity.offer}</p>
                      <span className="text-xs text-muted-foreground">{activity.dateSaved}</span>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-accent text-sm md:text-base">
                        Saved ${activity.savings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No activity yet. Start redeeming offers!</p>
              )}
            </div>
          </Card>

          {/* Saved Offers */}
          <Card className="p-4 md:p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Heart className="h-5 w-5 text-accent" />
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Saved Offers</h2>
            </div>
            <div className="space-y-3 md:space-y-4">
              {savedOffers.length > 0 ? (
                savedOffers.map((offer) => (
                  <div key={offer.offerId} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 md:p-4 rounded-lg bg-muted/50 gap-2 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-base">{offer.brand}</h3>
                      <p className="text-sm text-muted-foreground">{offer.title}</p>
                    </div>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground text-xs md:text-sm whitespace-nowrap">
                      {offer.category}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No saved offers yet. Browse offers to save your favorites!</p>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MemberDashboard;