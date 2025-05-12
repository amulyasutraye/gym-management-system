import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { X, LogOut, Dumbbell, LayoutDashboard, Users, Receipt, Bell, User } from 'lucide-react';

const iconComponents: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  Receipt,
  Bell,
  User
};

interface SidebarProps {
  menuItems: { label: string; path: string; icon: string }[];
  isOpen: boolean;
  toggleSidebar: () => void;
  role: 'admin' | 'member';
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, isOpen, toggleSidebar, role }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Function to render the correct icon
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">
                {role === 'admin' ? 'Admin Panel' : 'Member Portal'}
              </span>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    end={item.path === '/admin' || item.path === '/member'}
                  >
                    {renderIcon(item.icon)}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;