import React from 'react';
import { Eye, Users, ShieldAlert } from 'lucide-react';

interface LiveVisitorBadgeProps {
  onlineCount: number;
  onOpenDashboard?: () => void;
  showAdminTrigger?: boolean;
}

export const LiveVisitorBadge: React.FC<LiveVisitorBadgeProps> = ({
  onlineCount,
  onOpenDashboard,
  showAdminTrigger = true,
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Live Badge */}
      <div 
        onClick={onOpenDashboard}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer shadow-lg select-none ${
          onOpenDashboard 
            ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200 hover:border-emerald-400 hover:bg-slate-900' 
            : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
        }`}
        title="Click to view Real-time Visitor Analytics Dashboard"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-emerald-400 font-bold">{onlineCount}</span>
          <span className="text-slate-300 hidden sm:inline">watching live</span>
        </div>

        {showAdminTrigger && (
          <span className="ml-1 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Live
          </span>
        )}
      </div>
    </div>
  );
};
