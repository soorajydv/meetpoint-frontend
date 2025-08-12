'use client'

import { useState } from 'react'; // Removed useEffect to avoid side effects
import type { InAppNotification } from '@/lib/types';
import { Bell, X } from 'lucide-react';

// Move timeAgo to a client-side utility or compute it after hydration
function timeAgo(dateInput: string | number, nowDate: Date = new Date()) {
  const date = new Date(dateInput);
  const seconds = Math.floor((nowDate.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

export default function NotificationSidebar({
  unread,
  items,
  onOpen,
}: {
  unread: number;
  items: InAppNotification[];
  onOpen: () => void;
}) {
  const [open, setOpen] = useState(false);

  // Call onOpen only when opening, avoiding useEffect
  const handleOpen = () => {
    setOpen(true);
    onOpen();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        aria-label="Open notifications"
        className="relative p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-semibold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/30 transition-opacity"
            aria-hidden="true"
          />
          <aside
            className={`fixed top-0 right-0 z-60 h-screen w-80 max-w-full bg-white/70 backdrop-blur-md border-l border-gray-200 dark:bg-slate-900/70 dark:border-slate-700 flex flex-col transition-transform ${open ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close notifications"
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="px-4 py-2 text-sm text-muted-foreground border-b border-gray-200 dark:border-slate-700">
              In-app updates about your bookings.
            </p>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 && (
                <div className="text-sm text-muted-foreground">No notifications yet.</div>
              )}
              {items.map((n) => (
                <div
                  key={n.id}
                  className="relative rounded-md border border-gray-700 dark:border-slate-700 p-3 bg-white/80 backdrop-blur-lg"
                >
                  <span className="absolute top-2 right-2 inline-block rounded-full bg-teal-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {timeAgo(n.createdAt)}
                  </span>
                  <div className="text-sm font-medium text-black">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{n.body}</div>
                </div>
              ))}
            </div>
          </aside>
        </>
      )}
    </>
  );
}