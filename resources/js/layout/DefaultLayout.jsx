import React, { useState, ReactNode } from 'react';
import Header from './header';
 import Sidebar from './Sidebar';

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              
            </li>
            <li>
             
            </li>
            <li>
              
            </li>
            <li>
              
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
              {/* <img src="/path/to/notification-icon.svg" alt="Notifications" className="w-6 h-6" /> */}
            </button>
            <div className="flex items-center space-x-2">
              {children}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Welcome to the admin dashboard!</h2>
            <p className="mt-2 text-gray-600">Here you can manage users, view analytics, and more.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
