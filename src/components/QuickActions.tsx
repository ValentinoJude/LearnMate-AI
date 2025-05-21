import React from 'react';
import Link from 'next/link';

const actions = [
  {
    label: 'Continue Learning',
    href: '/learn',
    color: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  {
    label: 'Upload Document',
    href: '/documents',
    color: 'bg-green-600 hover:bg-green-700 text-white',
  },
  {
    label: 'Try Paraphrase Tool',
    href: '/paraphrase',
    color: 'bg-purple-600 hover:bg-purple-700 text-white',
  },
];

const QuickActions: React.FC = () => (
  <div className="flex flex-wrap gap-4 mb-8">
    {actions.map((action) => (
      <Link
        key={action.label}
        href={action.href}
        className={`px-6 py-3 rounded shadow font-semibold transition ${action.color}`}
      >
        {action.label}
      </Link>
    ))}
  </div>
);

export default QuickActions; 