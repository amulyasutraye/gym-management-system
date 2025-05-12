import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell } from 'lucide-react';

const MemberHeader: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Member'}
          </h1>
          <p className="text-sm text-gray-600">
            Member Portal
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-1 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
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

export default MemberHeader;