import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getVisitorId, getSessionId, getDeviceType, getUserLocationInfo, logSiteVisit, updateVisitDuration } from '../services/visitorTracker';

export interface OnlineVisitorState {
  presence_ref?: string;
  visitorId: string;
  sessionId: string;
  currentPath: string;
  device: string;
  location: string;
  joinedAt: string;
  lastSeenAt: string;
}

export function useRealtimePresence() {
  const [onlineUsers, setOnlineUsers] = useState<OnlineVisitorState[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const device = getDeviceType();
    const location = getUserLocationInfo();
    const currentPath = window.location.pathname + window.location.hash || '/';

    // Log to DB once on mount
    logSiteVisit(currentPath);

    // Periodic heartbeat to update duration in DB
    const durationInterval = setInterval(() => {
      updateVisitDuration();
    }, 15000);

    // Setup Supabase Realtime Presence Channel
    const channel = supabase.channel('online-visitors', {
      config: {
        presence: {
          key: sessionId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<OnlineVisitorState>();
        const activeUsersList: OnlineVisitorState[] = [];

        if (state && typeof state === 'object') {
          Object.keys(state).forEach((key) => {
            const presences = state[key];
            if (Array.isArray(presences) && presences.length > 0) {
              const latest = presences[presences.length - 1];
              if (latest && latest.visitorId) {
                activeUsersList.push(latest);
              }
            }
          });
        }

        setOnlineUsers(activeUsersList);
        setOnlineCount(Math.max(1, activeUsersList.length));
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined live session:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left live session:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          const initialPresence: OnlineVisitorState = {
            visitorId,
            sessionId,
            currentPath,
            device,
            location,
            joinedAt: new Date().toISOString(),
            lastSeenAt: new Date().toISOString(),
          };

          await channel.track(initialPresence);
        }
      });

    // Update path on hash/URL changes
    const handleUrlChange = () => {
      const newPath = window.location.pathname + window.location.hash || '/';
      channel.track({
        visitorId,
        sessionId,
        currentPath: newPath,
        device,
        location,
        joinedAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
      });
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);

    return () => {
      clearInterval(durationInterval);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
      channel.unsubscribe();
    };
  }, []);

  return {
    onlineUsers,
    onlineCount,
    isConnected,
  };
}
