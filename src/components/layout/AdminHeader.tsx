import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Search } from 'lucide-react';

const AdminHeader: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Manage your gym with ease
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-1 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              5
            </span>
          </button>
          
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <img
              src={user?.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg'}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;