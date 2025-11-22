'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import WishlistSidebar from './WishlistSidebar';

export default function Header() {
  const [showWishlist, setShowWishlist] = useState(false);

  return (
    <>
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-4">
          {/* ... other header content ... */}

          <button
            onClick={() => setShowWishlist(true)}
            className="relative"
          >
            <Heart className="w-6 h-6 cursor-pointer hover:opacity-80" />
            {/* Add wishlist count badge here */}
          </button>
        </div>
      </header>

      <WishlistSidebar
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
      />
    </>
  );
}