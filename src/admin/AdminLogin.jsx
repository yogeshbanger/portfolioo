import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  loginAdmin,
  isSessionValid,
  resetThisDevice,
} from '../utils/adminAuth';
import {
  RiShieldKeyholeLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
  RiInformationLine,
  RiRefreshLine,
} from 'react-icons/ri';

export default function AdminLogin({ onLoginSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // already logged in? go to dashboard
    if (isSessionValid()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    try {
      const res = await loginAdmin(passcode);
      if (res.success) {
        onLoginSuccess?.();
        navigate('/admin/dashboard');
      } else {
        setError(res.error || 'Invalid admin password.');
      }
    } catch {
      setError('Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Reset admin password to default ("banger130")?\n\n' +
          'This will reset the password across all devices.'
      )
    ) {
      resetThisDevice();
      setPasscode('');
      setError('');
      setInfo('Admin password reset to default ("banger130"). Enter banger130 to log in.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <Helmet>
        <title>Admin Login | Yogesh Banger Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white text-3xl mb-4 shadow-lg shadow-cyan-500/20">
            <RiShieldKeyholeLine />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-1">
            One password for Window & Mobile access
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3"
          >
            <RiInformationLine className="text-lg shrink-0 text-rose-400" />
            <span>{error}</span>
          </motion.div>
        )}

        {info && !error && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
            <RiInformationLine className="text-lg shrink-0 text-emerald-400" />
            <span>{info}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <RiLockPasswordLine className="text-xl" />
              </div>
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin password..."
                required
                autoComplete="current-password"
                className="w-full pl-11 pr-12 py-3.5 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPasscode((v) => !v)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                aria-label={showPasscode ? 'Hide password' : 'Show password'}
              >
                {showPasscode ? <RiEyeOffLine className="text-xl" /> : <RiEyeLine className="text-xl" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50"
          >
            {loading ? (
              <span>Please wait...</span>
            ) : (
              <>
                <span>Access Admin Panel</span>
                <RiArrowRightLine className="text-xl" />
              </>
            )}
          </button>
        </form>

        <button
          type="button"
          onClick={handleReset}
          className="mt-5 w-full text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center justify-center gap-1.5"
        >
          <RiRefreshLine /> 
        </button>

     
      </motion.div>
    </div>
  );
}