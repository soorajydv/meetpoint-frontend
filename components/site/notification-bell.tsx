'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { InAppNotification } from '@/lib/types'
import { Bell } from 'lucide-react'

export default function NotificationBell({
  unread, items, onOpen,
}: { unread: number; items: InAppNotification[]; onOpen: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) onOpen() }}>
      <DialogTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          aria-label="Open notifications"
          className="relative p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-semibold text-white">
              {unread}
            </span>
          )}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>In-app updates about your bookings.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-auto space-y-2">
          {items.length === 0 && <div className="text-sm text-muted-foreground">No notifications yet.</div>}
          {items.map(n => (
            <div key={n.id} className="rounded-md border p-2 transition-colors bg-background/60">
              <div className="text-sm font-medium">{n.title}</div>
              <div className="text-xs text-muted-foreground">{n.body}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
