import { useCallback, useRef, useState } from 'react';

interface DropdownIntentConfig {
  openDelay?: number;
  closeDelay?: number;
}

// Bump delays slightly to reduce hover flicker between trigger and panel
export function useDropdownIntent({ openDelay = 50, closeDelay = 400 }: DropdownIntentConfig = {}) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<NodeJS.Timeout | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  }, [clearTimers, openDelay]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clearTimers, closeDelay]);

  const immediateOpen = useCallback(() => {
    clearTimers();
    setOpen(true);
  }, [clearTimers]);

  const immediateClose = useCallback(() => {
    clearTimers();
    setOpen(false);
  }, [clearTimers]);

  return {
    open,
    scheduleOpen,
    scheduleClose,
    immediateOpen,
    immediateClose,
    clearTimers,
  };
}
