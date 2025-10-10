import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // This would come from your UserContext
  const memberName = "Justin";
  const clubName = "The Country Club of Ocala";

  const categories = [
    { name: "Golf", icon: "🏌️", path: "/golf", color: "from-green-600 to-green-800" },
    { name: "Hotels", icon: "🏨", path: "/hotels", color: "from-blue-600 to-blue-800" },
    { name: "Dining", icon: "🍽️", path: "/dining", color: "from-red-600 to-red-800" },
    { name: "Entertainment", icon: "🎭", path: "/entertainment", color: "from-purple-600 to-purple-800" },
    { name: "Shopping", icon: "🛍️", path: "/shopping", color: "from-pink-600 to-pink-800" },
    { name: "Travel", icon: "✈️", path: "/travel", color: "from-sky-600 to-sky-800" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/lifestyle?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Club Logo - Would be dynamic based on active club */}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/ocala-logo.png" 
              alt={clubName}
              className="h-12 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Button 
              variant="default"
              className="bg-[hsl(50,35%,40%)] hover:bg-[hsl(50,35%,35%)]"
              onClick={() => navigate('/member-dashboard')}
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&h=600&fit=crop")',
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <p className="text-sm md:text-base text-primary/90 font-medium mb-3 tracking-wider uppercase">
            {clubName}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome back, {memberName}!
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Your exclusive member benefits at a glance
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search hotels, restaurants, golf courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white/95 backdrop-blur border-0 rounded-xl shadow-2xl"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 mb-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate(category.path)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
              
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </button>
          ))}
        </div>
      </section>

      {/* Featured Benefits */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Featured This Month
            </h2>
            <p className="text-muted-foreground">
              Hand-picked exclusive offers for our members
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-primary hover:text-primary/80"
            onClick={() => navigate('/lifestyle')}
          >
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards - would be dynamic */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <img
                  src={`https://images.unsplash.com/photo-${1535131749006 + i * 1000}-b7f58c99034b?w=600&h=400&fit=crop`}
                  alt="Featured offer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Member Exclusive Badge */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-semibold">
                  MEMBER EXCLUSIVE
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  Featured Offer {i}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Exclusive member benefits and preferred pricing
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats / Recent Activity */}
      <section className="container mx-auto px-4 md:px-6 py-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">You've redeemed 5 offers this month</p>
            <Button variant="link" className="text-primary p-0 h-auto hover:text-primary/80">
              View history →
            </Button>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">New Offers</h3>
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">8 new benefits added this week</p>
            <Button variant="link" className="text-primary p-0 h-auto hover:text-primary/80">
              Explore new →
            </Button>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Saved Favorites</h3>
              <span className="text-2xl">❤️</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">12 offers in your favorites</p>
            <Button variant="link" className="text-primary p-0 h-auto hover:text-primary/80">
              View favorites →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
