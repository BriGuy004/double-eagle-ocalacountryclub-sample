import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BookmarkContextType {
  bookmarks: Set<string>;
  toggleBookmark: (offerId: string) => void;
  isBookmarked: (offerId: string) => boolean;
  getBookmarkedOffers: () => string[];
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('clubcard_bookmarks');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Persist to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem('clubcard_bookmarks', JSON.stringify([...bookmarks]));
  }, [bookmarks]);

  const toggleBookmark = (offerId: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(offerId)) {
        newBookmarks.delete(offerId);
      } else {
        newBookmarks.add(offerId);
      }
      return newBookmarks;
    });
  };

  const isBookmarked = (offerId: string) => bookmarks.has(offerId);
  
  const getBookmarkedOffers = () => [...bookmarks];

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, getBookmarkedOffers }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};
