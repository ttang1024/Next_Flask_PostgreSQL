'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { userAPI, ordersAPI, wishlistAPI, addressAPI } from '@/lib/api';
import UserDashboard from '@/components/UserDashboard'; // Import the artifact

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchAllData();
    }
  }, [isAuthenticated, user]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [profile, ordersData, wishlistData, addressesData] = await Promise.all([
        userAPI.getProfile(user.id),
        ordersAPI.getUserOrders(user.id),
        wishlistAPI.getWishlist(user.id),
        addressAPI.getAddresses(user.id)
      ]);

      setProfileData(profile);
      setOrders(ordersData);
      setWishlist(wishlistData);
      setAddresses(addressesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <UserDashboard
        user={profileData}
        orders={orders}
        wishlist={wishlist}
        addresses={addresses}
        onRefresh={fetchAllData}
      />
    </ProtectedRoute>
  );
}