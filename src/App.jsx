import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import SEO from './components/SEO.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Resume from './components/Resume.jsx';
import Personal from './components/Personal.jsx';
import Skills from './components/Skills.jsx';
import Project from './components/Project.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

// Lazy load Admin Panel components for code-splitting and faster initial page loads
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'));
const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'));
const AdminLeads = lazy(() => import('./admin/AdminLeads.jsx'));
const AdminSettings = lazy(() => import('./admin/AdminSettings.jsx'));

// Loading Fallback Component
function AdminLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 animate-pulse flex items-center justify-center text-xl font-black shadow-lg shadow-cyan-500/20 mb-4">
        YB
      </div>
      <p className="text-sm font-semibold text-slate-400">Loading Admin Panel...</p>
    </div>
  );
}

function MainPortfolio() {
  return (
    <>
      <Navbar />
      <Home />
      <Contact />
      <Resume />
      <Skills />
      <Project />
      <Personal />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <div className="app-container">
        {/* All SEO Tags are injected cleanly from this component */}
        <SEO />
        
        <BrowserRouter>
          <Suspense fallback={<AdminLoadingFallback />}>
            <Routes>
              {/* Admin Panel Routes starting with /admin */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Public Portfolio Route Fallback */}
              <Route path="*" element={<MainPortfolio />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}