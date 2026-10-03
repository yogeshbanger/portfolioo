import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { getLeads, updateLeadStatus, toggleStarLead, exportLeadsToCSV, exportLeadsToJSON } from '../utils/leadStore';
import DirectReplyModal from './DirectReplyModal';
import {
  RiUserFollowLine,
  RiMailUnreadLine,
  RiCheckDoubleLine,
  RiStarFill,
  RiStarLine,
  RiDownload2Line,
  RiFileTextLine,
  RiMailSendLine,
  RiTimeLine,
  RiArrowRightLine,
  RiSearchLine,
  RiPhoneLine,
  RiMailLine
} from 'react-icons/ri';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReplyLead, setActiveReplyLead] = useState(null);

  const loadLeads = () => {
    setLeads(getLeads());
  };

  useEffect(() => {
    loadLeads();
    window.addEventListener('portfolio_leads_updated', loadLeads);
    return () => window.removeEventListener('portfolio_leads_updated', loadLeads);
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const starredLeads = leads.filter((l) => l.starred).length;

  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.subject.toLowerCase().includes(q) ||
      lead.message.toLowerCase().includes(q)
    );
  });

  const recentLeads = filteredLeads.slice(0, 5);

  const handleToggleStar = (id) => {
    toggleStarLead(id);
    loadLeads();
  };

  const handleStatusChange = (id, status) => {
    updateLeadStatus(id, status);
    loadLeads();
  };

  return (
    <div className="space-y-8 font-sans">
      <Helmet>
        <title>Admin Dashboard | Yogesh Banger Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              Overview Dashboard
            </span>
            <h1 className="text-3xl font-black text-white mt-3">Welcome Back, Yogesh!</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Track incoming client leads, respond directly to customer inquiries, and export lead data securely.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => exportLeadsToCSV(leads)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-xs font-bold text-white flex items-center gap-2 transition-all shadow-sm"
            >
              <RiDownload2Line className="text-cyan-400 text-base" /> Export CSV
            </button>
            <button
              onClick={() => exportLeadsToJSON(leads)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-xs font-bold text-white flex items-center gap-2 transition-all shadow-sm"
            >
              <RiFileTextLine className="text-purple-400 text-base" /> Export JSON
            </button>
            <Link
              to="/admin/leads"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              Manage All Leads <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
              <h2 className="text-4xl font-black text-white mt-2">{totalLeads}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl">
              <RiUserFollowLine />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
            <RiTimeLine className="text-cyan-400" /> All-time contact submissions
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Inquiries</p>
              <h2 className="text-4xl font-black text-amber-400 mt-2">{newLeads}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl">
              <RiMailUnreadLine />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Requires response or review</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Replied / Contacted</p>
              <h2 className="text-4xl font-black text-emerald-400 mt-2">{contactedLeads}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl">
              <RiCheckDoubleLine />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Direct reply sent to customer</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starred Leads</p>
              <h2 className="text-4xl font-black text-purple-400 mt-2">{starredLeads}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-2xl">
              <RiStarFill />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">High priority client leads</p>
        </motion.div>
      </div>

      {/* Recent Activity / Leads Preview */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white">Recent Customer Leads</h2>
            <p className="text-xs text-slate-400">Click &quot;Direct Reply&quot; to send email response directly to customer</p>
          </div>

          <div className="relative w-full sm:w-72">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No leads found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Subject & Message</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleStar(lead.id)}
                          className="text-lg text-slate-500 hover:text-amber-400 transition-colors"
                          title={lead.starred ? 'Starred' : 'Star Lead'}
                        >
                          {lead.starred ? <RiStarFill className="text-amber-400" /> : <RiStarLine />}
                        </button>
                        <div>
                          <div className="font-bold text-white">{lead.name}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1"><RiMailLine /> {lead.email}</span>
                            {lead.phone && <span className="flex items-center gap-1"><RiPhoneLine /> {lead.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-200">{lead.subject}</div>
                      <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{lead.message}</div>
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                          lead.status === 'new'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : lead.status === 'contacted'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : lead.status === 'read'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="new" className="bg-slate-900 text-white">New</option>
                        <option value="read" className="bg-slate-900 text-white">Read</option>
                        <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                        <option value="archived" className="bg-slate-900 text-white">Archived</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setActiveReplyLead(lead)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 ml-auto shadow-md shadow-cyan-500/20"
                      >
                        <RiMailSendLine className="text-sm" /> Direct Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Direct Reply Modal */}
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
