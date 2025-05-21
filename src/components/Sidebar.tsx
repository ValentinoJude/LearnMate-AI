import React from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Learn', href: '/learn' },
  { label: 'Courses', href: '/courses' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Documents', href: '/documents' },
  { label: 'Paraphrase Tool', href: '/paraphrase' },
  { label: 'Settings', href: '/settings' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-gray-100 shadow z-20 flex flex-col p-4">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="px-3 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 