import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  getLeads,
  updateLeadStatus,
  toggleStarLead,
  deleteLead,
  clearAllLeads,
  verifyAdminPasscode,
  setAdminPasscode,
  resetAdminPasscode,
  exportLeadsToCSV,
  exportLeadsToJSON,
  saveLead
} from '../utils/leadStore';
import {
  FaShieldHalved,
  FaLock,
  FaArrowRightFromBracket,
  FaMagnifyingGlass,
  FaStar,
  FaRegStar, 
  FaTrash,
  FaEnvelope,
  FaDownload,
  FaKey,
  FaPlus,
  FaCheck,
  FaXmark,
  FaArrowUpRightFromSquare,
  FaInbox,
  FaCircleInfo,
  FaUser,
  FaClock,
  FaTag,
  FaPhone,
  FaPaperPlane
} from 'react-icons/fa6';

export default function AdminPanel() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('yogesh_admin_authed') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Leads Data State
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // all, new, read, starred, contacted, archived
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Modals & Settings State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passcodeStatusMsg, setPasscodeStatusMsg] = useState({ type: '', msg: '' });

  // Refresh leads list
  const refreshLeads = () => {
    const data = getLeads();
    setLeads(data);
  };

  useEffect(() => {
    refreshLeads();

    const handleLeadsUpdated = () => {
      refreshLeads();
    };

    window.addEventListener('portfolio_leads_updated', handleLeadsUpdated);
    return () => window.removeEventListener('portfolio_leads_updated', handleLeadsUpdated);
  }, []);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('yogesh_admin_authed', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid passcode');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('yogesh_admin_authed');
  };


  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Tab filter
      if (activeTab === 'new' && lead.status !== 'new') return false;
      if (activeTab === 'read' && lead.status !== 'read') return false;
      if (activeTab === 'contacted' && lead.status !== 'contacted') return false;
      if (activeTab === 'archived' && lead.status !== 'archived') return false;
      if (activeTab === 'starred' && !lead.starred) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = lead.name?.toLowerCase().includes(query);
        const matchEmail = lead.email.includes(query);
        const matchPhone = lead.phone?.toLowerCase().includes(query);
        const matchSubject = lead.subject?.toLowerCase().includes(query);
        const matchMessage = lead.message?.toLowerCase().includes(query);
        return matchName || matchEmail || matchPhone || matchSubject || matchMessage;
      }

      return true;
    });
  }, [leads, activeTab, searchQuery]);

  // Lead Metrics
  const stats = useMemo(() => {
    return {
      total: leads.length,
      unread: leads.filter((l) => l.status === 'new').length,
      starred: leads.filter((l) => l.starred).length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
    };
  }, [leads]);

  // Update Status
  const handleStatusChange = (leadId, status) => {
    updateLeadStatus(leadId, status);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({ ...prev, status }));
    }
  };

  // Toggle Star
  const handleToggleStar = (leadId, e) => {
    if (e) e.stopPropagation();
    toggleStarLead(leadId);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({ ...prev, starred: !prev.starred }));
    }
  };

  // Delete Lead
  const handleDelete = (leadId, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(leadId);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
    }
  };

 

  // Add demo test lead
  const handleAddDemoLead = () => {
    const demoLead = {
      name: 'Sample Client',
      email: 'client@example.com',
      phone: '+91 9876543210',
      subject: 'MERN Stack Web App Project Inquiry',
      message: 'Hi Yogesh, I saw your portfolio and loved your work! We need a custom web application built with React and Node.js.',
    };
    saveLead(demoLead);
    refreshLeads();
  };

  // Reset passcode to default (admin123) from login screen
  const handleResetPasscode = () => {
    resetAdminPasscode();
    setPasscode('admin123');
    setAuthError('Passcode has been reset to default: admin123');
  };

  // Clear all leads
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all leads? This action cannot be undone.')) {
      clearAllLeads();
      setSelectedLead(null);
    }
  };

  // Change Passcode
  const handleChangePasscode = (e) => {
    e.preventDefault();
    if (newPasscode !== confirmPasscode) {
      setPasscodeStatusMsg({ type: 'error', msg: 'Passwords do not match.' });
      return;
    }
    const res = setAdminPasscode(newPasscode);
    if (res.success) {
      setPasscodeStatusMsg({ type: 'success', msg: 'Admin passcode updated successfully!' });
      setTimeout(() => {
        setShowPasswordModal(false);
        setNewPasscode('');
        setConfirmPasscode('');
        setPasscodeStatusMsg({ type: '', msg: '' });
      }, 1500);
    } else {
      setPasscodeStatusMsg({ type: 'error', msg: res.error });
    }
  };

  const handleModalResetPasscode = () => {
    resetAdminPasscode();
    setPasscodeStatusMsg({ type: 'success', msg: 'Passcode reset back to default: admin123' });
    setTimeout(() => {
      setShowPasswordModal(false);
      setNewPasscode('');
      setConfirmPasscode('');
      setPasscodeStatusMsg({ type: '', msg: '' });
    }, 1500);
  };

  // If Not Authenticated, show Admin Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-20 text-white font-sans flex items-center justify-center relative overflow-hidden">
        <Helmet>
          <title>Admin Login | Yogesh Banger Portfolio</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-cyan-950/40 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300 text-2xl">
                <FaShieldHalved />
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Yogesh Banger Portfolio Lead Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Enter Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              </div>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold text-center"
              >
                {authError}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              Access Dashboard <FaArrowRightFromBracket />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <FaCircleInfo className="text-cyan-400" /> Default passcode is <strong className="text-slate-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">admin123</strong>
            </p>
            <div>
              <button
                type="button"
                onClick={handleResetPasscode}
                className="text-xs text-cyan-400 hover:underline font-semibold bg-transparent border-0 cursor-pointer"
              >
                Forgot passcode? Reset to default (admin123)
              </button>
            </div>
            <div>
              <a
                href="/"
                className="inline-block text-xs font-semibold text-slate-400 hover:text-cyan-300 transition"
              >
                ← Back to Main Portfolio
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 pt-8 px-4 sm:px-8">
      <Helmet>
        <title>Admin Dashboard | Leads Management</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* ============================================================ */}
        {/* DASHBOARD HEADER */}
        {/* ============================================================ */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xl">
                <FaShieldHalved />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Lead Management Center
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  View and respond to client inquiries & portfolio submissions
                </p>
              </div>
            </div>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 transition"
            >
              View Website <FaArrowUpRightFromSquare />
            </a>

            <button
              onClick={() => exportLeadsToCSV(leads)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-2 transition cursor-pointer"
            >
              Export CSV <FaDownload />
            </button>

            <button
              onClick={() => exportLeadsToJSON(leads)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-purple-300 flex items-center gap-2 transition cursor-pointer"
            >
              Export JSON <FaDownload />
            </button>

            <button
              onClick={handleClearAll}
              title="Clear all leads from store"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-950/40 border border-slate-700 hover:border-red-500/50 text-xs font-bold text-red-400 flex items-center gap-2 transition cursor-pointer"
            >
              Clear All <FaTrash />
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 transition cursor-pointer"
            >
              Passcode <FaKey />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-300 flex items-center gap-2 transition cursor-pointer"
            >
              Logout <FaArrowRightFromBracket />
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* STATS METRICS CARDS */}
        {/* ============================================================ */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Leads</div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-2">{stats.total}</div>
            <div className="mt-2 text-xs text-slate-500">All submissions recorded</div>
            <div className="absolute right-4 bottom-4 text-slate-800 text-4xl font-black">#</div>
          </div>

          <div className="bg-slate-900/60 border border-cyan-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> New / Unread
            </div>
            <div className="text-3xl sm:text-4xl font-black text-cyan-300 mt-2">{stats.unread}</div>
            <div className="mt-2 text-xs text-cyan-400/70">Awaiting your response</div>
          </div>

          <div className="bg-slate-900/60 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <FaStar className="text-amber-400 text-xs" /> Starred
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-2">{stats.starred}</div>
            <div className="mt-2 text-xs text-amber-400/70">Important opportunities</div>
          </div>

          <div className="bg-slate-900/60 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Contacted</div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-300 mt-2">{stats.contacted}</div>
            <div className="mt-2 text-xs text-emerald-400/70">Responded leads</div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SEARCH & TAB FILTERS */}
        {/* ============================================================ */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
          {/* Tab buttons */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {[
              { id: 'all', label: 'All', count: leads.length },
              { id: 'new', label: 'New', count: stats.unread, color: 'text-cyan-400' },
              { id: 'starred', label: 'Starred', count: stats.starred, color: 'text-amber-400' },
              { id: 'contacted', label: 'Contacted', count: stats.contacted, color: 'text-emerald-400' },
              { id: 'archived', label: 'Archived', count: leads.filter((l) => l.status === 'archived').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 ${tab.color || 'text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search bar & Add Test Lead button */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white text-xs rounded-xl py-2.5 pl-9 pr-3 outline-none transition"
              />
              <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            </div>

            <button
              onClick={handleAddDemoLead}
              title="Add a test lead to verify real-time dashboard updates"
              className="px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-bold text-cyan-300 flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <FaPlus /> <span className="hidden sm:inline">Add Test Lead</span>
            </button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* LEADS LIST / MAIN CONTENT */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Leads Table / Grid (8 columns on lg) */}
          <div className={`${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3 transition-all`}>
            {filteredLeads.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
                <FaInbox className="mx-auto text-4xl text-slate-700 mb-3" />
                <h3 className="text-lg font-bold text-slate-300">No leads found</h3>
                <p className="text-slate-500 text-xs mt-1">
                  {searchQuery ? 'No inquiries matched your search criteria.' : 'No form submissions in this category.'}
                </p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                return (
                  <motion.div
                    key={lead.id}
                    layout
                    onClick={() => {
                      setSelectedLead(lead);
                      if (lead.status === 'new') {
                        handleStatusChange(lead.id, 'read');
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-950/50'
                        : lead.status === 'new'
                        ? 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400/50'
                        : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Status accent bar */}
                    {lead.status === 'new' && (
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan-400" />
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Star Button */}
                        <button
                          onClick={(e) => handleToggleStar(lead.id, e)}
                          className="mt-1 text-slate-600 hover:text-amber-400 transition cursor-pointer"
                        >
                          {lead.starred ? (
                            <FaStar className="text-amber-400 text-sm" />
                          ) : (
                            <FaRegStar className="text-sm" />
                          )}
                        </button>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className={`font-bold text-sm truncate ${lead.status === 'new' ? 'text-white font-extrabold' : 'text-slate-200'}`}>
                              {lead.name}
                            </h4>
                            <span className="text-xs text-slate-400 font-mono">
                              &lt;{lead.email}&gt;
                            </span>
                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                title={`Call ${lead.phone}`}
                                className="text-xs text-cyan-300 font-mono flex items-center gap-1 hover:underline bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md"
                              >
                                <FaPhone className="text-[10px]" /> {lead.phone}
                              </a>
                            )}
                            
                            {/* Status badge */}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                lead.status === 'new'
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                  : lead.status === 'contacted'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : lead.status === 'archived'
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-cyan-300/90 mt-1 truncate">
                            {lead.subject}
                          </p>

                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {lead.message}
                          </p>
                        </div>
                      </div>

                      {/* Time & Quick Actions */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-[11px] text-slate-500 whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>

                        <div className="flex items-center gap-1">
                          <a
                            href={`mailto:${lead.email}?subject=Re: ${encodeURIComponent(lead.subject)}`}
                            onClick={(e) => e.stopPropagation()}
                            title="Reply via Email"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
                          >
                            <FaEnvelope className="text-xs" />
                          </a>

                          <button
                            onClick={(e) => handleDelete(lead.id, e)}
                            title="Delete Lead"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Selected Lead Detailed Inspection View (5 columns on lg) */}
          <AnimatePresence>
            {selectedLead && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24 h-fit backdrop-blur-xl shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <FaCircleInfo className="text-cyan-400" /> Lead Details
                  </h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  >
                    <FaXmark className="text-lg" />
                  </button>
                </div>

                {/* Lead Contact Info */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FaUser className="text-cyan-400" /> Name
                    </div>
                    <div className="text-lg font-black text-white mt-0.5">{selectedLead.name}</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FaEnvelope className="text-cyan-400" /> Email (Exact Casing)
                    </div>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-sm font-semibold text-cyan-300 hover:underline mt-0.5 block font-mono"
                    >
                      {selectedLead.email}
                    </a>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FaPhone className="text-cyan-400" /> Phone Number
                    </div>
                    {selectedLead.phone ? (
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="text-sm font-semibold text-cyan-300 hover:underline mt-0.5 block font-mono"
                      >
                        {selectedLead.phone}
                      </a>
                    ) : (
                      <div className="text-xs text-slate-500 italic mt-0.5">Not provided</div>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FaTag className="text-cyan-400" /> Subject
                    </div>
                    <div className="text-sm font-bold text-slate-200 mt-0.5">{selectedLead.subject}</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FaClock className="text-cyan-400" /> Submitted On
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {new Date(selectedLead.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                      Full Message Content
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs leading-relaxed text-slate-300 whitespace-pre-wrap max-h-52 overflow-y-auto">
                      {selectedLead.message}
                    </div>
                  </div>
                </div>

                {/* Lead Actions */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="text-xs text-slate-400 font-bold">Update Lead Status:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { status: 'new', label: 'Mark New' },
                      { status: 'read', label: 'Mark Read' },
                      { status: 'contacted', label: 'Mark Contacted' },
                      { status: 'archived', label: 'Archive' },
                    ].map(({ status, label }) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedLead.id, status)}
                        className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          selectedLead.status === status
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Direct Reply Section */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <FaPaperPlane /> Direct Reply to Client
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">from: yogeshbanger111@gmail.com</span>
                    </div>

                    <textarea
                      rows="3"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Hi ${selectedLead.name.split(' ')[0]},\n\nThank you for reaching out!...`}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white rounded-xl p-3 text-xs outline-none transition resize-none placeholder:text-slate-600"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedLead.email)}&su=${encodeURIComponent('Re: ' + selectedLead.subject)}&body=${encodeURIComponent(replyText || `Hi ${selectedLead.name.split(' ')[0]},\n\nThank you for reaching out! I received your inquiry about "${selectedLead.subject}".`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleStatusChange(selectedLead.id, 'contacted')}
                        className="py-2.5 px-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md shadow-red-500/20 cursor-pointer"
                      >
                        <FaEnvelope /> Reply via Gmail
                      </a>

                      <a
                        href={`mailto:${selectedLead.email}?subject=${encodeURIComponent('Re: ' + selectedLead.subject)}&body=${encodeURIComponent(replyText || `Hi ${selectedLead.name.split(' ')[0]},\n\nThank you for reaching out! I received your inquiry about "${selectedLead.subject}".`)}`}
                        onClick={() => handleStatusChange(selectedLead.id, 'contacted')}
                        className="py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md shadow-cyan-500/20 cursor-pointer"
                      >
                        <FaPaperPlane /> Reply via Mail App
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* ============================================================ */}
      {/* CHANGE PASSCODE MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaKey className="text-cyan-400" /> Change Admin Passcode
                </h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
                >
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleChangePasscode} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    New Passcode
                  </label>
                  <input
                    type="password"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter new passcode (min 4 chars)"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white rounded-xl py-3 px-4 text-sm outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    value={confirmPasscode}
                    onChange={(e) => setConfirmPasscode(e.target.value)}
                    placeholder="Confirm new passcode"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white rounded-xl py-3 px-4 text-sm outline-none"
                    required
                  />
                </div>

                {passcodeStatusMsg.msg && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold text-center ${
                      passcodeStatusMsg.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : 'bg-red-500/10 border border-red-500/30 text-red-300'
                    }`}
                  >
                    {passcodeStatusMsg.msg}
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black rounded-xl transition cursor-pointer text-xs uppercase tracking-wider"
                  >
                    Update Passcode
                  </button>

                  <button
                    type="button"
                    onClick={handleModalResetPasscode}
                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-semibold rounded-xl transition cursor-pointer text-xs"
                  >
                    Reset Passcode to Default (admin123)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
