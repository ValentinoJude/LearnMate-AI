import React from 'react';

const activities = [
  {
    icon: '✅',
    description: 'Completed Lesson 2 in Python Basics',
    time: '2 hours ago',
  },
  {
    icon: '📄',
    description: 'Uploaded "Essay.docx"',
    time: '1 day ago',
  },
  {
    icon: '🔄',
    description: 'Used Paraphrase Tool',
    time: '3 days ago',
  },
  {
    icon: '📝',
    description: 'Added new note to Documents',
    time: '4 days ago',
  },
];

const RecentActivity: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
    <ul className="space-y-3">
      {activities.map((activity, idx) => (
        <li key={idx} className="flex items-center gap-3 text-gray-700">
          <span className="text-2xl">{activity.icon}</span>
          <span>{activity.description}</span>
          <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivity; 