import React, { useState, useEffect } from 'react';
import { X, Activity, Users, Clock, Monitor, Smartphone, Globe, RefreshCw, Eye, ShieldCheck } from 'lucide-react';
import { OnlineVisitorState } from '../hooks/useRealtimePresence';
import { supabase, SiteVisit } from '../lib/supabase';

interface AdminVisitorDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onlineUsers: OnlineVisitorState[];
  onlineCount: number;
}

export const AdminVisitorDashboard: React.FC<AdminVisitorDashboardProps> = ({
  isOpen,
  onClose,
  onlineUsers,
  onlineCount,
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  const [dbVisits, setDbVisits] = useState<SiteVisit[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('site_visits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setDbVisits(data as SiteVisit[]);
      }
    } catch (err) {
      console.warn('Error fetching visit history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'history') {
      fetchHistory();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const filteredVisits = dbVisits.filter(
    (v) =>
      (v.visitor_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.page_path && v.page_path.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.referrer && v.referrer.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.device_type && v.device_type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Real-Time Visitor Analytics
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Sync
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Monitor live user watching sessions and historical website traffic.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-950/40 border-b border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Currently Watching Live</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-400 font-mono">
              {onlineCount} <span className="text-xs text-slate-400 font-normal">active sessions</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Active Devices</span>
              <Monitor className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-2 text-sm text-slate-300 flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-cyan-300 font-semibold">
                <Monitor className="w-3.5 h-3.5" /> Desktop: {onlineUsers.filter(u => u.device !== 'Mobile').length}
              </span>
              <span className="flex items-center gap-1 font-mono text-purple-300 font-semibold">
                <Smartphone className="w-3.5 h-3.5" /> Mobile: {onlineUsers.filter(u => u.device === 'Mobile').length}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Backend Connection</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Supabase Realtime Channel Connected
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between px-6 pt-4 border-b border-slate-800">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                activeTab === 'live'
                  ? 'border-emerald-500 text-emerald-400 bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              Live Presence Feed ({onlineUsers.length})
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                activeTab === 'history'
                  ? 'border-emerald-500 text-emerald-400 bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              Historical Visit Logs (DB)
            </button>
          </div>

          {activeTab === 'history' && (
            <button
              onClick={fetchHistory}
              disabled={isLoadingHistory}
              className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors disabled:opacity-50 mb-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingHistory ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[500px]">
          {activeTab === 'live' ? (
            <div>
              {onlineUsers.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Connecting to live presence channel...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {onlineUsers.map((user, idx) => (
                    <div
                      key={user.sessionId || idx}
                      className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-lg bg-slate-700/60 text-emerald-400">
                            {user.device === 'Mobile' ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <Monitor className="w-4 h-4" />
                            )}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-200 font-mono">
                              {user.visitorId ? user.visitorId.slice(0, 14) : 'Visitor'}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Globe className="w-3 h-3 text-slate-500" />
                              {user.location || 'India'}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active Now
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-700/40 text-xs flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Current View:</span>
                        <span className="font-mono text-emerald-300 font-medium bg-slate-900/60 px-2 py-0.5 rounded">
                          {user.currentPath || '/'}
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-500 flex justify-between font-mono">
                        <span>Joined: {new Date(user.joinedAt).toLocaleTimeString()}</span>
                        <span>Session: {user.sessionId ? user.sessionId.slice(0, 10) : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search by Visitor ID, Path, Device, or Referrer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
              />

              {isLoadingHistory ? (
                <div className="py-12 text-center text-slate-400">
                  <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin text-emerald-400" />
                  <p className="text-xs">Fetching visitor log entries from Supabase DB...</p>
                </div>
              ) : filteredVisits.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-sm">No visitor logs found matching your filter.</p>
                  <p className="text-xs text-slate-500 mt-1">Make sure <code className="text-emerald-400">supabase_setup.sql</code> script has been run in your Supabase SQL Editor.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Timestamp</th>
                        <th className="px-4 py-3 font-semibold">Visitor ID</th>
                        <th className="px-4 py-3 font-semibold">Page Path</th>
                        <th className="px-4 py-3 font-semibold">Referrer</th>
                        <th className="px-4 py-3 font-semibold">Device</th>
                        <th className="px-4 py-3 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 font-mono">
                      {filteredVisits.map((visit) => (
                        <tr key={visit.id || Math.random()} className="hover:bg-slate-800/40">
                          <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                            {visit.created_at ? new Date(visit.created_at).toLocaleString() : 'Just now'}
                          </td>
                          <td className="px-4 py-3 font-bold text-emerald-400">{visit.visitor_id?.slice(0, 12)}</td>
                          <td className="px-4 py-3 text-cyan-300">{visit.page_path}</td>
                          <td className="px-4 py-3 text-slate-400">{visit.referrer || 'Direct'}</td>
                          <td className="px-4 py-3 text-purple-300">{visit.device_type}</td>
                          <td className="px-4 py-3 text-amber-300">{visit.duration_seconds || 0}s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <span>Keyboard shortcut: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Ctrl + Shift + V</kbd> anytime to open dashboard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
