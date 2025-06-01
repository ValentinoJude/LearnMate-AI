'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import MobileMenu from './MobileMenu';

const Topbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirect to login page after logout, unless already on landing, login, or signup
  useEffect(() => {
    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/signup';
    if (!user && !isAuthPage) {
      router.push('/login');
    }
  }, [user, router, pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-30">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Branding/Logo */}
          <Link href="/" className="font-bold text-xl text-blue-600">LearnMate AI</Link>
          
          {/* Auth or User Info */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              // User is logged in
              <>
                <span className="hidden sm:inline text-gray-700">Welcome, {user.name || user.email}!</span>
                <button 
                  className="px-3 sm:px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm sm:text-base"
                  onClick={logout}
                >
                  Sign Out
                </button>
              </>
            ) : (
              // User is not logged in
              <>
                <Link 
                  href="/login" 
                  className="px-3 sm:px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-sm sm:text-base"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-3 sm:px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Topbar; 