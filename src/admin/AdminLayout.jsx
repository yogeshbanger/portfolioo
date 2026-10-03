import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, logoutAdmin } from '../utils/leadStore';
import { 
  RiDashboardLine, 
  RiContactsLine, 
  RiSettings4Line, 
  RiLogoutBoxRLine, 
  RiShieldCheckLine,
  RiArrowLeftLine,
  RiMailCheckLine
} from 'react-icons/ri';

export default function AdminLayout() {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = isAdminAuthenticated();
    setAuthenticated(isAuth);
    if (!isAuth && location.pathname !== '/admin/login' && location.pathname !== '/admin') {
      navigate('/admin/login');
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    logoutAdmin();
    setAuthenticated(false);
    navigate('/admin/login');
  };

  if (!authenticated && (location.pathname === '/admin/login' || location.pathname === '/admin')) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-cyan-500/20">
              YB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-white">Yogesh Admin Portal</h1>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                  <RiShieldCheckLine /> Protected
                </span>
              </div>
              <p className="text-xs text-slate-400">Leads & Direct Customer Response System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/admin/dashboard' || location.pathname === '/admin'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <RiDashboardLine className="text-base" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/leads"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/admin/leads'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <RiContactsLine className="text-base" />
              <span>Leads</span>
            </Link>

            <Link
              to="/admin/settings"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/admin/settings'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <RiSettings4Line className="text-base" />
              <span>Settings</span>
            </Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <RiArrowLeftLine />
              <span className="hidden md:inline">Back to Portfolio</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-bold transition-all"
            >
              <RiLogoutBoxRLine />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 py-4 px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Yogesh Banger Admin Panel. All Security Checks Active.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <RiMailCheckLine className="text-cyan-400" /> Direct Customer Reply Engine Enabled
          </p>
        </div>
      </footer>
    </div>
  );
}
