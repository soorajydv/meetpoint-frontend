'use client'

import Logo from './logo'
import NotificationBell from './notification-bell'
import { Coins, User } from 'lucide-react'
import type { Client, InAppNotification } from '@/lib/types'

export default function Navbar({
currentClient,
notifications,
unreadCount,
onNotificationsOpen,
onBuyClick,
onRegisterClick,
onNav,
}: {
currentClient: Client | null
notifications: InAppNotification[]
unreadCount: number
onNotificationsOpen: () => void
onBuyClick: () => void
onRegisterClick: () => void
onNav: (id: string) => void
}) {
return (
  <header className="sticky top-0 z-20 bg-white/70 dark:bg-slate-950/60 backdrop-blur border-b border-teal-100/60 dark:border-white/10">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo />
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer transition-colors" onClick={() => onNav('how')}>How it works</a>
          <a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer transition-colors" onClick={() => onNav('pros')}>Professionals</a>
          <a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer transition-colors" onClick={() => onNav('pricing')}>Coins</a>
          <a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer transition-colors" onClick={() => onNav('faq')}>FAQs</a>
          <a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer transition-colors" onClick={() => onNav('testimonials')}>Testimonials</a>
        </nav>
      </div>
      <div className="flex items-center gap-1.5">
        {/* Coins icon (icon-only) */}
        <span
          role="button"
          tabIndex={0}
          aria-label="Buy coins"
          onClick={() => onBuyClick()}
          onKeyDown={(e) => { if (e.key === 'Enter') onBuyClick() }}
          className="relative p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
        >
          <Coins className="h-5 w-5" />
          {currentClient && (
            <span className="absolute -top-1 -right-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-semibold text-white">
              {currentClient.coins}
            </span>
          )}
        </span>

        {/* Notifications */}
        <NotificationBell unread={unreadCount} items={notifications} onOpen={onNotificationsOpen} />

        {/* User icon (icon-only) */}
        <span
          role="button"
          tabIndex={0}
          aria-label="Login or Register"
          onClick={() => onRegisterClick()}
          onKeyDown={(e) => { if (e.key === 'Enter') onRegisterClick() }}
          className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
        >
          <User className="h-5 w-5" />
        </span>
      </div>
    </div>
  </header>
)
}
