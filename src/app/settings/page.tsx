"use client";
import React from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  // Mock user data for display
  const mockUser = {
    name: "Student User",
    email: "student.user@example.com",
    // Add other mock data as needed
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Settings</h2>

      {/* User Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">User Information</h3>
        <div className="space-y-2 text-gray-700">
          <div>
            <span className="font-medium">Name:</span> {mockUser.name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {mockUser.email}
          </div>
          {/* Add other user info fields here */}
        </div>
        {/* Future: Edit profile button */}
      </div>

      {/* Placeholder for Account Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 opacity-50 cursor-not-allowed" title="Coming Soon">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Account Settings (Coming Soon)</h3>
        <p className="text-gray-600 italic">Manage your password, linked accounts, etc.</p>
      </div>

      {/* Placeholder for Notification Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 opacity-50 cursor-not-allowed" title="Coming Soon">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Notification Preferences (Coming Soon)</h3>
        <p className="text-gray-600 italic">Configure email or in-app notifications.</p>
      </div>

      {/* Placeholder for Privacy Settings */}
       <div className="bg-white rounded-lg shadow-sm p-6 mb-6 opacity-50 cursor-not-allowed" title="Coming Soon">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Privacy Settings (Coming Soon)</h3>
        <p className="text-gray-600 italic">Manage your data and privacy options.</p>
      </div>

      {/* Sign Out Button Placeholder */}
      <div className="mt-8 text-center">
        {/* This will eventually trigger the authentication context sign out function */}
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
          Sign Out (Placeholder)
        </button>
      </div>

    </div>
  );
} 