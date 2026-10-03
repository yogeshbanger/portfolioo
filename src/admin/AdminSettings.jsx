import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { changeAdminPasscode, resetAdminPasscodeToDefault } from '../utils/leadStore';
import {
  RiShieldKeyholeLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckDoubleLine,
  RiErrorWarningLine,
  RiRefreshLine,
  RiDatabase2Line
} from 'react-icons/ri';

export default function AdminSettings() {
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChangePasscode = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPasscode !== confirmPasscode) {
      setMessage({ type: 'error', text: 'New passcode and confirm passcode do not match.' });
      return;
    }

    setLoading(true);
    try {
      const res = await changeAdminPasscode(currentPasscode, newPasscode);
      if (res.success) {
        setMessage({ type: 'success', text: 'Admin passcode updated successfully! SHA-256 hash saved securely.' });
        setCurrentPasscode('');
        setNewPasscode('');
        setConfirmPasscode('');
      } else {
        setMessage({ type: 'error', text: res.error || 'Failed to update passcode.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasscode = () => {
    if (window.confirm('Reset admin passcode to default ("banger130")?')) {
      resetAdminPasscodeToDefault();
      setMessage({ type: 'success', text: 'Admin passcode reset to default ("banger130").' });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans">
      <Helmet>
        <title>Admin Security Settings | Yogesh Banger Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-cyan-500/20">
            <RiShieldKeyholeLine />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Security & Passcode Settings</h1>
            <p className="text-xs text-slate-400 mt-1">Manage admin credentials & security configurations</p>
          </div>
        </div>
      </div>

      {/* Security Guarantee Card */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl shrink-0 mt-0.5">
            <RiCheckDoubleLine />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Privacy & Security Guarantee
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Your admin password is <strong className="text-emerald-300">never stored in plaintext</strong> in sessionStorage, localStorage, cookies, or browser application inspection tools. All passcode verifications use high-entropy <strong>SHA-256 cryptographic hashing</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Change Passcode Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
          <RiLockPasswordLine className="text-cyan-400" /> Change Admin Passcode
        </h2>

        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            {message.type === 'success' ? <RiCheckDoubleLine className="text-base" /> : <RiErrorWarningLine className="text-base" />}
            <span>{message.text}</span>
          </motion.div>
        )}

        <form onSubmit={handleChangePasscode} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Current Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPasscode}
                onChange={(e) => setCurrentPasscode(e.target.value)}
                required
                placeholder="Enter current passcode..."
                className="w-full pl-4 pr-12 py-3 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showCurrent ? <RiEyeOffLine className="text-lg" /> : <RiEyeLine className="text-lg" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                New Passcode
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  required
                  placeholder="Min 4 characters..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showNew ? <RiEyeOffLine className="text-lg" /> : <RiEyeLine className="text-lg" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Confirm New Passcode
              </label>
              <input
                type="password"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                required
                placeholder="Re-enter new passcode..."
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Admin Passcode'}
            </button>

            <button
              type="button"
              onClick={handleResetPasscode}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RiRefreshLine /> Reset Passcode to Default
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
