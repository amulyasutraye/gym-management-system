import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import { Menu } from 'lucide-react';

// Admin sidebar menu items
const adminMenuItems = [
  { label: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
  { label: 'Members', path: '/admin/members', icon: 'Users' },
  { label: 'Payments', path: '/admin/payments', icon: 'Receipt' },
  { label: 'Announcements', path: '/admin/announcements', icon: 'Bell' },
];

const AdminLayout = () => {
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
        menuItems={adminMenuItems}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        role="admin"
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;