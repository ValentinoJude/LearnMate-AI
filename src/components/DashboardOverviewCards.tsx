import React from 'react';

const cards = [
  {
    label: 'Active Courses',
    value: 3,
    icon: '📚',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'Study Time (hrs/wk)',
    value: 5,
    icon: '⏰',
    color: 'bg-green-100 text-green-700',
  },
  {
    label: 'Progress',
    value: '60%',
    icon: '📈',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    label: 'Documents',
    value: 8,
    icon: '📄',
    color: 'bg-purple-100 text-purple-700',
  },
];

const DashboardOverviewCards: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {cards.map((card) => (
      <div
        key={card.label}
        className={`flex items-center gap-4 p-5 rounded-lg shadow-sm ${card.color} font-semibold`}
      >
        <span className="text-3xl">{card.icon}</span>
        <div>
          <div className="text-2xl">{card.value}</div>
          <div className="text-sm font-medium opacity-80">{card.label}</div>
        </div>
      </div>
    ))}
  </div>
);

export default DashboardOverviewCards; 