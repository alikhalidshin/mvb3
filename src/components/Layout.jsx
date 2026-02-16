import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Shield, FileText, Settings, LogOut, Menu, Moon, Sun, Building } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = [
    // Owner Links
    { name: 'Dashboard', to: '/owner', icon: Home, role: 'owner' },
    { name: 'Properties', to: '/owner/properties', icon: Building, role: 'owner' },
    { name: 'Settings', to: '/owner/settings', icon: Settings, role: 'owner' },
    
    // Analyst Links
    { name: 'My Inspections', to: '/analyst', icon: ClipboardList, role: 'analyst' },
    
    // Tenant Links
    { name: 'My Home', to: '/tenant', icon: Home, role: 'tenant' },
    { name: 'Reports', to: '/tenant/reports', icon: FileText, role: 'tenant' },
  ];

  const filteredLinks = links.filter(link => link.role === currentUser.role);

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="w-full navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <Menu size={24} />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-bold text-primary">PropInspect</div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div> 
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content flex flex-col gap-2 shadow-xl">
          {/* Sidebar content here */}
          <div className="mb-8 px-4 mt-2">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Shield className="w-8 h-8" /> PropInspect
            </h1>
            <p className="text-xs text-base-content/60 mt-1 uppercase tracking-wider font-semibold">
              {currentUser.role} Portal
            </p>
          </div>

          {filteredLinks.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-primary-content shadow-md' : 'hover:bg-base-200'}`
                }
                end={link.to === '/owner' || link.to === '/analyst' || link.to === '/tenant'}
              >
                <link.icon size={20} />
                {link.name}
              </NavLink>
            </li>
          ))}

          <div className="mt-auto">
            <div className="divider"></div>
            <li>
              <button 
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 rounded-xl font-medium"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </li>
            <li>
              <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center gap-3 px-4 py-3 hover:bg-error/10 hover:text-error rounded-xl font-medium w-full text-left">
                <LogOut size={20} />
                Logout
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
