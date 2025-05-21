'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

const Topbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login page after logout, unless already on landing, login, or signup
  useEffect(() => {
    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/signup';
    if (!user && !isAuthPage) {
      router.push('/login');
    }
  }, [user, router, pathname]); // Depend on user, router, and pathname

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow z-30 flex items-center px-6 justify-between">
      {/* Branding/Logo */}
      <Link href="/" className="font-bold text-xl text-blue-600">LearnMate AI</Link>
      
      {/* Auth or User Info */}
      <div>
        {user ? (
          // User is logged in
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user.name || user.email}!</span>
            <button 
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          // User is not logged in
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar; 