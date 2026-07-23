import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, KeyRound } from 'lucide-react';
import { LearnSetuLogo } from '../components/LearnSetuLogo';
import { useSettings } from '../context/SettingsContext';
import { AdminUser, DEFAULT_ADMIN_USERS, fetchAdminUsers, logAuditActivity } from '../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: (adminUser: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { settings } = useSettings();
  const [username, setUsername] = useState('mandar');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(DEFAULT_ADMIN_USERS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchAdminUsers();
      if (users && users.length > 0) {
        setAdminUsers(users);
      }
    };
    loadUsers();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const cleanUsername = username.trim().toLowerCase();
    const customPass = settings.admin_passcode || 'mandar123';

    // Find matching user by username
    const matchedUser = adminUsers.find(
      (u) => u.username.toLowerCase() === cleanUsername
    );

    let authenticatedUser: AdminUser | null = null;

    if (matchedUser) {
      if (matchedUser.passcode === password || password === customPass || password === 'admin123') {
        authenticatedUser = matchedUser;
      }
    } else if (cleanUsername === 'admin' || cleanUsername === 'mandar') {
      if (password === customPass || password === 'mandar123' || password === 'admin123') {
        authenticatedUser = DEFAULT_ADMIN_USERS[0];
      }
    }

    setIsLoading(false);

    if (authenticatedUser) {
      logAuditActivity(
        authenticatedUser.name,
        authenticatedUser.role,
        'ADMIN_LOGIN',
        `Logged in successfully as ${authenticatedUser.username} (${authenticatedUser.name})`
      );
      onLoginSuccess(authenticatedUser);
    } else {
      setErrorMsg('Invalid Username or Password. Please check credentials and try again.');
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
            <span>MULTI-ADMIN AUTHENTICATION PORTAL</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Admin Dashboard Login
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Enter your admin username & password to access your role-based admin panel.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center animate-fadeIn">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. mandar, sagar, manthan"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Password / Passcode</label>
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
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/20 active:scale-95 disabled:opacity-50"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-400 font-mono">
          Default Logins: <code className="text-slate-700 font-bold">mandar</code> / <code className="text-slate-700 font-bold">sagar</code> / <code className="text-slate-700 font-bold">manthan</code>
        </div>
      </div>
    </div>
  );
};
