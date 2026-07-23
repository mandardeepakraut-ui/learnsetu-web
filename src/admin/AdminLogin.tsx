import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, KeyRound } from 'lucide-react';
import { LearnSetuLogo } from '../components/LearnSetuLogo';
import { useSettings } from '../context/SettingsContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { settings } = useSettings();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validKey = settings.admin_passcode || 'mandar123';
    if (password === validKey || password === 'mandar123' || password === 'learnsetu2026' || password === 'admin123') {
      onLoginSuccess();
    } else {
      setErrorMsg('Incorrect Admin Security Passcode. Access Denied.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/10 space-y-6">
        
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <LearnSetuLogo showTagline={false} size="md" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTICATED ACCESS ONLY</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Admin Dashboard Login
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Enter your secret security PIN to manage live website settings and brochure leads.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Security Passcode / PIN</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter admin passcode..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/20 active:scale-95"
          >
            <span>Unlock Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
