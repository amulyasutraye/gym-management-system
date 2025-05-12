import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MemberHeader from './MemberHeader';
import { Menu } from 'lucide-react';

// Member sidebar menu items
const memberMenuItems = [
  { label: 'Dashboard', path: '/member', icon: 'LayoutDashboard' },
  { label: 'My Payments', path: '/member/payments', icon: 'Receipt' },
  { label: 'My Profile', path: '/member/profile', icon: 'User' },
];

const MemberLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Sidebar */}
      <Sidebar
        menuItems={memberMenuItems}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        role="member"
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <MemberHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;