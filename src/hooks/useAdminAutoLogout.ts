import { useState, useEffect, useCallback } from 'react';

interface UseAdminAutoLogoutOptions {
  timeoutMinutes?: number; // Total timeout in minutes (default: 30)
  warningMinutes?: number; // Show warning when remaining minutes <= warningMinutes (default: 2)
  onLogout: () => void;
  enabled?: boolean;
}

export function useAdminAutoLogout({
  timeoutMinutes = 30,
  warningMinutes = 2,
  onLogout,
  enabled = true,
}: UseAdminAutoLogoutOptions) {
  const totalSeconds = timeoutMinutes * 60;
  const warningSeconds = warningMinutes * 60;

  const [remainingSeconds, setRemainingSeconds] = useState<number>(totalSeconds);
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);

  const resetTimer = useCallback(() => {
    setRemainingSeconds(totalSeconds);
    setIsWarningOpen(false);
  }, [totalSeconds]);

  // Listen for user interactions to reset idle timer
  useEffect(() => {
    if (!enabled) return;

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleUserActivity = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
          // Reset timer only if not in warning window (or extend session)
          setRemainingSeconds((prev) => {
            if (prev > warningSeconds) {
              return totalSeconds;
            }
            return prev;
          });
        }, 1000);
      }
    };

    events.forEach((evt) => window.addEventListener(evt, handleUserActivity));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [enabled, totalSeconds, warningSeconds]);

  // Main Interval Countdown (1-second tick)
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onLogout();
          return 0;
        }

        const nextSeconds = prev - 1;
        if (nextSeconds <= warningSeconds && !isWarningOpen) {
          setIsWarningOpen(true);
        }
        return nextSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, warningSeconds, isWarningOpen, onLogout]);

  const extendSession = () => {
    resetTimer();
  };

  const formatRemainingTime = (): string => {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    remainingSeconds,
    formattedTime: formatRemainingTime(),
    isWarningOpen,
    extendSession,
    resetTimer,
  };
}
