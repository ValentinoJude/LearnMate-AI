'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/" || pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!hideNav && <Topbar />}
      {!hideNav && <Sidebar />}
      <main
        className={
          !hideNav
            ? "pt-16 pl-60 min-h-screen bg-gray-50"
            : "min-h-screen bg-gray-100"
        }
      >
        {children}
      </main>
    </>
  );
} 