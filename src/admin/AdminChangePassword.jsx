import React, { useState } from 'react';
import { changePassword } from '../utils/adminAuth';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function AdminChangePassword({ onChanged }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setMsg('');
    setLoading(true);
    const res = await changePassword(current, next, confirm);
    setLoading(false);
    if (res.success) {
      setMsg('Password updated on THIS device only. Please log in again.');
      setCurrent('');
      setNext('');
      setConfirm('');
      onChanged?.();
    } else {
      setErr(res.error);
    }
  };

  return (
    <form
      onSubmit={submit}
      autoComplete="off"
      className="max-w-md mx-auto p-6 space-y-4 bg-slate-900 border border-slate-800 rounded-2xl"
    >
      <div className="flex items-center gap-3 text-white">
        <RiLockPasswordLine className="text-2xl text-cyan-400" />
        <h2 className="text-xl font-bold">Change Password (this device)</h2>
      </div>

      {msg && (
        <p className="text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          {msg}
        </p>
      )}
      {err && (
        <p className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
          {err}
        </p>
      )}

      <input
        type="password"
        placeholder="Current password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        required
        autoComplete="current-password"
        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <input
        type="password"
        placeholder="New password (min 8 chars)"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        required
        autoComplete="new-password"
        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
        autoComplete="new-password"
        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
      <p className="text-xs text-slate-500 text-center">
        This only changes the password stored in this browser.
      </p>
    </form>
  );
}