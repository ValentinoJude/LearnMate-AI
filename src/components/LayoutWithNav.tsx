'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/" || pathname === "/login" || pathname === "/signup";

  return (
    <div className="min-h-full">
      {!hideNav && <Topbar />}
      {!hideNav && <div className="hidden lg:block"><Sidebar /></div>}
      <main
        className={
          !hideNav
            ? "pt-16 lg:pl-60 min-h-[calc(100vh-4rem)] bg-gray-50"
            : "min-h-screen bg-gray-100"
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 