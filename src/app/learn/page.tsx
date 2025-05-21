"use client";
import React from 'react';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Learning Session</h2>
      
      {/* Placeholder for actual lesson content */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Lesson Content</h3>
        <p className="text-gray-700 mb-4">
          Lesson content for the selected module would be displayed here.
        </p>
        <p className="text-gray-600 italic">
          Please select a course and a lesson from your <Link href="/courses" className="text-blue-600 hover:underline">My Courses</Link> page to start learning.
        </p>
        {/* Future: Rich lesson content (text, images, videos, interactive elements) will be added here */}
      </div>

      {/* Placeholder for Interactive AI Teacher */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
         <h3 className="text-xl font-semibold mb-3 text-gray-900">Ask your AI Teacher (Coming Soon)</h3>
         <div className="text-gray-500 italic text-center py-8">
             Interactive chat interface with your AI Teacher will appear here.
         </div>
         {/* Future: Chat input, message display, AI responses */}
      </div>

    </div>
  );
} 