import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getLeads, 
  updateLeadStatus, 
  toggleStarLead, 
  deleteLead, 
  clearAllLeads,
  exportLeadsToCSV,
  exportLeadsToJSON
} from '../utils/leadStore';
import DirectReplyModal from './DirectReplyModal';
import {
  RiContactsLine,
  RiSearchLine,
  RiFilter3Line,
  RiStarFill,
  RiStarLine,
  RiDeleteBinLine,
  RiMailSendLine,
  RiDownload2Line,
  RiFileTextLine,
  RiCheckDoubleLine,
  RiPhoneLine,
  RiMailLine,
  RiCalendarLine,
  RiHistoryLine
} from 'react-icons/ri';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeReplyLead, setActiveReplyLead] = useState(null);
  const [expandedLeadId, setExpandedLeadId] = useState(null);

  const loadLeads = () => {
    setLeads(getLeads());
  };

  useEffect(() => {
    loadLeads();
    window.addEventListener('portfolio_leads_updated', loadLeads);
    return () => window.removeEventListener('portfolio_leads_updated', loadLeads);
  }, []);

  const handleToggleStar = (id, e) => {
    e.stopPropagation();
    toggleStarLead(id);
    loadLeads();
  };

  const handleDelete = (id, name, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete lead from ${name}?`)) {
      deleteLead(id);
      loadLeads();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL customer leads? This action cannot be undone.')) {
      clearAllLeads();
      loadLeads();
    }
  };

  const handleStatusChange = (id, newStatus, e) => {
    e.stopPropagation();
    updateLeadStatus(id, newStatus);
    loadLeads();
  };

  // Filter leads based on tab and search query
  const filteredLeads = leads.filter((lead) => {
    // Status filter
    if (statusFilter === 'new' && lead.status !== 'new') return false;
    if (statusFilter === 'read' && lead.status !== 'read') return false;
    if (statusFilter === 'contacted' && lead.status !== 'contacted') return false;
    if (statusFilter === 'starred' && !lead.starred) return false;
    if (statusFilter === 'archived' && lead.status !== 'archived') return false;

    // Search query
    const q = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.phone || '').toLowerCase().includes(q) ||
      lead.subject.toLowerCase().includes(q) ||
      lead.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 font-sans">
      <Helmet>
        <title>Leads Management | Yogesh Banger Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <RiContactsLine className="text-base" /> Customer Leads Manager
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Portfolio Inquiries & Leads</h1>
          <p className="text-xs text-slate-400 mt-1">View, filter, and reply directly to incoming inquiries</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportLeadsToCSV(filteredLeads)}
            disabled={filteredLeads.length === 0}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-xs font-bold text-white flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            <RiDownload2Line className="text-cyan-400" /> Export CSV
          </button>
          <button
            onClick={() => exportLeadsToJSON(filteredLeads)}
            disabled={filteredLeads.length === 0}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-xs font-bold text-white flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            <RiFileTextLine className="text-purple-400" /> Export JSON
          </button>
          {leads.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RiDeleteBinLine /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Controls Bar: Search & Status Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: 'all', label: `All (${leads.length})` },
            { id: 'new', label: `New (${leads.filter((l) => l.status === 'new').length})` },
            { id: 'contacted', label: `Contacted (${leads.filter((l) => l.status === 'contacted').length})` },
            { id: 'starred', label: `Starred (${leads.filter((l) => l.starred).length})` },
            { id: 'archived', label: `Archived (${leads.filter((l) => l.status === 'archived').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
          <input
            type="text"
            placeholder="Search leads by name, email, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Leads List Grid / Accordion */}
      {filteredLeads.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-sm">
          No customer leads found matching your criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const isExpanded = expandedLeadId === lead.id;
            return (
              <motion.div
                key={lead.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-slate-900/80 border transition-all rounded-3xl p-6 ${
                  isExpanded ? 'border-cyan-500/40 ring-1 ring-cyan-500/20' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={(e) => handleToggleStar(lead.id, e)}
                      className="text-xl text-slate-500 hover:text-amber-400 transition-colors mt-0.5"
                      title={lead.starred ? 'Starred Lead' : 'Star Lead'}
                    >
                      {lead.starred ? <RiStarFill className="text-amber-400" /> : <RiStarLine />}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-black text-white">{lead.name}</h3>
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                          lead.status === 'new'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : lead.status === 'contacted'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : lead.status === 'read'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {lead.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                          <RiMailLine className="text-cyan-400" /> {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                            <RiPhoneLine className="text-purple-400" /> {lead.phone}
                          </a>
                        )}
                        <span className="flex items-center gap-1 text-slate-500">
                          <RiCalendarLine /> {new Date(lead.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value, e)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none cursor-pointer"
                    >
                      <option value="new">Mark New</option>
                      <option value="read">Mark Read</option>
                      <option value="contacted">Mark Contacted</option>
                      <option value="archived">Mark Archived</option>
                    </select>

                    <button
                      onClick={() => setActiveReplyLead(lead)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                    >
                      <RiMailSendLine /> Direct Reply
                    </button>

                    <button
                      onClick={(e) => handleDelete(lead.id, lead.name, e)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                      title="Delete Lead"
                    >
                      <RiDeleteBinLine className="text-base" />
                    </button>
                  </div>
                </div>

                {/* Subject & Message Preview */}
                <div 
                  onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                  className="mt-4 pt-4 border-t border-slate-800/80 cursor-pointer"
                >
                  <p className="text-xs font-bold text-slate-300">
                    Subject: <span className="text-cyan-300 font-semibold">{lead.subject}</span>
                  </p>
                  <p className={`text-xs text-slate-400 mt-1 leading-relaxed ${isExpanded ? 'whitespace-pre-line' : 'line-clamp-2'}`}>
                    {lead.message}
                  </p>
                  <span className="inline-block text-[11px] font-bold text-cyan-400 mt-2 hover:underline">
                    {isExpanded ? 'Show Less ↑' : 'Show Full Message & Reply History ↓'}
                  </span>
                </div>

                {/* Reply History if expanded */}
                {isExpanded && lead.replyHistory && lead.replyHistory.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-800/60 bg-slate-950/60 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <RiHistoryLine className="text-purple-400" /> Direct Replies Logged ({lead.replyHistory.length})
                    </h4>
                    <div className="space-y-3">
                      {lead.replyHistory.map((rep, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                          <div className="flex justify-between text-slate-400 mb-1">
                            <span className="font-semibold text-emerald-400">{rep.subject}</span>
                            <span className="text-[10px] text-slate-500">{new Date(rep.sentAt).toLocaleString()}</span>
                          </div>
                          <p className="text-slate-300 whitespace-pre-line leading-relaxed">{rep.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Reply Modal */}
      {activeReplyLead && (
        <DirectReplyModal
          lead={activeReplyLead}
          onClose={() => setActiveReplyLead(null)}
          onReplySuccess={loadLeads}
        />
      )}
    </div>
  );
}
