import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Scissors, 
  CreditCard, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: CreditCard, label: 'Billing', path: '/billing' },
    { icon: Scissors, label: 'Services', path: '/services' }, 
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-500 font-bold text-xl">
             <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center">M</div>
             MintSalon
          </div>
          <button className="ml-auto lg:hidden" onClick={toggleSidebar}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}
              `}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 justify-between">
           <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400">
             <Menu className="h-6 w-6" />
           </button>
           <span className="font-semibold text-gray-900 dark:text-white">MintSalon</span>
           <div className="w-6" /> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

        {/* Dashboard Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-center lg:text-right transition-colors duration-200">
          <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 MintSalon Management System. v1.1.0</p>
        </footer>
      </main>
    </div>
  );
};
