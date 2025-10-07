import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Activity {
  id: string;
  brand: string;
  offer: string;
  dateSaved: string;
  savings: number;
}

interface BookmarkedOffer {
  id: string;
  brand: string;
  offer: string;
  category: string;
}

interface UserData {
  offersRedeemed: number;
  moneySaved: number;
  pointsBalance: number;
  bookmarkedOffers: BookmarkedOffer[];
  recentActivity: Activity[];
  memberSince: string;
  currentTier: string;
}

interface UserContextType {
  userData: UserData;
  redeemOffer: (offer: { brand: string; title: string; discountAmount: number; category: string }) => void;
  toggleBookmark: (offer: { id: string; brand: string; title: string; category: string }) => void;
  isBookmarked: (offerId: string) => boolean;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('doubleEagleUserData');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default data
    const recentActivity = [
      { id: "1", brand: "BMW", offer: "Up to $3000 off select models", dateSaved: "Dec 8, 2024", savings: 2800 },
      { id: "2", brand: "Tumi", offer: "Up to 40% off online purchases", dateSaved: "Dec 5, 2024", savings: 320 },
      { id: "3", brand: "Brooks Brothers", offer: "15% off", dateSaved: "Dec 1, 2024", savings: 180 },
      { id: "4", brand: "Maui Jim", offer: "Up to 35% off", dateSaved: "Nov 28, 2024", savings: 150 }
    ];
    
    // Calculate total money saved from recent activity
    const moneySaved = recentActivity.reduce((sum, activity) => sum + activity.savings, 0);
    
    return {
      offersRedeemed: 12,
      moneySaved,
      pointsBalance: 1250,
      bookmarkedOffers: [
        { id: "mb-1", brand: "Mercedes-Benz", offer: "Preferred Pricing", category: "Automotive" },
        { id: "fer-1", brand: "Ferragamo", offer: "Preferred Pricing", category: "Fashion" },
        { id: "fs-1", brand: "Four Seasons", offer: "Member Rates", category: "Hotels" },
        { id: "nobu-1", brand: "Nobu", offer: "VIP Dining Experience", category: "Dining" }
      ],
      recentActivity,
      memberSince: "March 2008",
      currentTier: "Platinum"
    };
  });

  // Global location state persisted in localStorage
  const [selectedLocation, setSelectedLocation] = useState<string>(() => {
    const saved = localStorage.getItem('doubleEagleSelectedLocation');
    return saved || "Rochester";
  });

  // Save to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('doubleEagleUserData', JSON.stringify(userData));
  }, [userData]);

  // Save selected location to localStorage
  useEffect(() => {
    localStorage.setItem('doubleEagleSelectedLocation', selectedLocation);
  }, [selectedLocation]);

  const redeemOffer = (offer: { brand: string; title: string; discountAmount: number; category: string }) => {
    setUserData(prev => ({
      ...prev,
      offersRedeemed: prev.offersRedeemed + 1,
      moneySaved: prev.moneySaved + offer.discountAmount,
      pointsBalance: prev.pointsBalance + Math.floor(offer.discountAmount * 10),
      recentActivity: [
        {
          id: Date.now().toString(),
          brand: offer.brand,
          offer: offer.title,
          dateSaved: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          savings: offer.discountAmount
        },
        ...prev.recentActivity
      ].slice(0, 10) // Keep last 10
    }));
  };

  const toggleBookmark = (offer: { id: string; brand: string; title: string; category: string }) => {
    setUserData(prev => {
      const exists = prev.bookmarkedOffers.some(b => b.id === offer.id);
      
      if (exists) {
        return {
          ...prev,
          bookmarkedOffers: prev.bookmarkedOffers.filter(b => b.id !== offer.id)
        };
      } else {
        return {
          ...prev,
          bookmarkedOffers: [
            ...prev.bookmarkedOffers,
            {
              id: offer.id,
              brand: offer.brand,
              offer: offer.title,
              category: offer.category
            }
          ]
        };
      }
    });
  };

  const isBookmarked = (offerId: string): boolean => {
    return userData.bookmarkedOffers.some(b => b.id === offerId);
  };

  return (
    <UserContext.Provider value={{ userData, redeemOffer, toggleBookmark, isBookmarked, selectedLocation, setSelectedLocation }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
