'use client';
import React, { useState } from 'react';

// Activity data model
type Activity = {
  id: string;
  title: string;
  type: string;
  day: string; // e.g., 'Monday', 'Tuesday', ...
  start: string; // 'HH:MM'
  end: string;   // 'HH:MM'
  color: string;
  textColor: string;
  typeColor: string;
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const colorOptions = [
  { bg: 'bg-blue-500', text: 'text-white', type: 'text-blue-200' },
  { bg: 'bg-green-500', text: 'text-white', type: 'text-green-200' },
  { bg: 'bg-yellow-500', text: 'text-white', type: 'text-yellow-100' },
  { bg: 'bg-purple-500', text: 'text-white', type: 'text-purple-200' },
  { bg: 'bg-pink-500', text: 'text-white', type: 'text-pink-200' },
  { bg: 'bg-red-500', text: 'text-white', type: 'text-red-200' },
];

const initialActivities: Activity[] = [
  {
    id: '1',
    title: 'Math Class',
    type: 'Class',
    day: 'Monday',
    start: '09:00',
    end: '10:00',
    color: 'bg-blue-500',
    textColor: 'text-white',
    typeColor: 'text-blue-200',
  },
  {
    id: '2',
    title: 'Study: Science',
    type: 'Study',
    day: 'Monday',
    start: '11:00',
    end: '12:00',
    color: 'bg-green-500',
    textColor: 'text-white',
    typeColor: 'text-green-200',
  },
  {
    id: '3',
    title: 'Football Practice',
    type: 'Extracurricular',
    day: 'Wednesday',
    start: '16:00',
    end: '17:30',
    color: 'bg-yellow-500',
    textColor: 'text-white',
    typeColor: 'text-yellow-100',
  },
  {
    id: '4',
    title: 'English Homework',
    type: 'Homework',
    day: 'Friday',
    start: '18:00',
    end: '19:00',
    color: 'bg-purple-500',
    textColor: 'text-white',
    typeColor: 'text-purple-200',
  },
];

function getColorOption(idx: number) {
  return colorOptions[idx % colorOptions.length];
}

const Timetable: React.FC = () => {
  const [view, setView] = useState<'weekly' | 'daily'>('weekly');
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [form, setForm] = useState({
    title: '',
    type: '',
    day: daysOfWeek[0],
    start: '',
    end: '',
    colorIdx: 0,
  });
  const [error, setError] = useState('');

  function handleAddActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.type || !form.start || !form.end) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.end <= form.start) {
      setError('End time must be after start time.');
      return;
    }
    const color = getColorOption(form.colorIdx);
    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        title: form.title,
        type: form.type,
        day: form.day,
        start: form.start,
        end: form.end,
        color: color.bg,
        textColor: color.text,
        typeColor: color.type,
      },
    ]);
    setShowModal(false);
    setForm({ title: '', type: '', day: daysOfWeek[0], start: '', end: '', colorIdx: 0 });
    setError('');
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-bold text-gray-900">Timetable</h3>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            <button
              className={`px-3 py-1.5 rounded text-sm sm:text-base ${view === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setView('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-3 py-1.5 rounded text-sm sm:text-base ${view === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setView('daily')}
            >
              Daily
            </button>
          </div>
          <button 
            className="px-4 py-1.5 bg-green-600 text-white rounded shadow text-sm sm:text-base" 
            onClick={() => setShowModal(true)}
          >
            + Add Activity
          </button>
        </div>
      </div>

      {/* Modal for adding activity */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30 p-4">
          <form className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-md relative" onSubmit={handleAddActivity}>
            <button 
              type="button" 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 p-2" 
              onClick={() => setShowModal(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Add Activity</h4>
            {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-900">Title</label>
                <input 
                  className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900" 
                  value={form.title} 
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-900">Type</label>
                <input 
                  className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900" 
                  value={form.type} 
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-900">Day</label>
                <select 
                  className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900" 
                  value={form.day} 
                  onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
                >
                  {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-900">Start Time</label>
                  <input 
                    type="time" 
                    className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900" 
                    value={form.start} 
                    onChange={e => setForm(f => ({ ...f, start: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-900">End Time</label>
                  <input 
                    type="time" 
                    className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900" 
                    value={form.end} 
                    onChange={e => setForm(f => ({ ...f, end: e.target.value }))} 
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-900">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((c, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className={`w-8 h-8 rounded-full border-2 ${c.bg} ${form.colorIdx === idx ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setForm(f => ({ ...f, colorIdx: idx }))}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold mt-4"
            >
              Add Activity
            </button>
          </form>
        </div>
      )}

      {/* Weekly grid view */}
      {view === 'weekly' && (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[800px] px-4 sm:px-0">
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="min-w-[110px]">
                  <div className="font-semibold text-center mb-2 text-gray-900 text-sm sm:text-base">{day}</div>
                  <div className="flex flex-col gap-2">
                    {activities.filter((a) => a.day === day).length === 0 && (
                      <div className="text-xs text-gray-400 text-center py-2">No activities</div>
                    )}
                    {activities
                      .filter((a) => a.day === day)
                      .sort((a, b) => a.start.localeCompare(b.start))
                      .map((activity) => (
                        <div
                          key={activity.id}
                          className={`rounded p-2 shadow-sm ${activity.color} flex flex-col`}
                        >
                          <span className={`font-medium ${activity.textColor} text-sm`}>{activity.title}</span>
                          <span className={`text-xs ${activity.textColor}`}>{activity.start} - {activity.end}</span>
                          <span className={`text-xs italic ${activity.typeColor}`}>{activity.type}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Daily view placeholder */}
      {view === 'daily' && (
        <div className="text-gray-400 text-center py-8">Daily view coming soon!</div>
      )}
    </div>
  );
};

export default Timetable; 