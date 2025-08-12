'use client'

import { useState, useEffect } from 'react';
import Logo from './logo';
import NotificationBell from './notification-bell';
import { Coins, User } from 'lucide-react';
import type { Client, InAppNotification } from '@/lib/types';
import ThemeToggleIcon from './theme-toggle-icon';

// Hamburger menu icon (simplified SVG for mobile)
const HamburgerIcon = () => (
  <svg className="h-8 w-8 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

export default function Navbar({
  currentClient,
  notifications,
  unreadCount,
  onNotificationsOpen,
  onBuyClick,
  onRegisterClick,
  onNav,
}: {
  currentClient: Client | null;
  notifications: InAppNotification[];
  unreadCount: number;
  onNotificationsOpen: () => void;
  onBuyClick: () => void;
  onRegisterClick: () => void;
  onNav: (id: string) => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={`sticky top-0 z-20 ${isScrolled ? 'bg-white/90 dark:bg-slate-950/80 border-b border-teal-100/50 dark:border-white/10 shadow-sm' : 'bg-transparent border-b border-transparent'} backdrop-blur-md transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center gap-6">
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-base font-medium">
            {[
              { id: 'how', label: 'How it Works' },
              { id: 'pros', label: 'Professionals' },
              { id: 'pricing', label: 'Coins' },
              { id: 'faq', label: 'FAQs' },
              { id: 'testimonials', label: 'Testimonials' },
            ].map(({ id, label }) => (
              <a
                key={id}
                className="text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200"
                onClick={() => onNav(id)}
                aria-label={`Navigate to ${label}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNav(id)}
              >
                {label}
              </a>
            ))}
          </nav>
          {/* Mobile Navigation */}
          <nav className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-teal-700 focus:outline-none"
            >
              <HamburgerIcon />
            </button>
            {isMobileMenuOpen && (
              <div className="absolute top-20 left-0 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-teal-100/50 dark:border-white/10 shadow-lg z-30">
                <div className="flex flex-col items-start gap-6 p-6">
                  {[
                    { id: 'how', label: 'How it Works' },
                    { id: 'pros', label: 'Professionals' },
                    { id: 'pricing', label: 'Coins' },
                    { id: 'faq', label: 'FAQs' },
                    { id: 'testimonials', label: 'Testimonials' },
                  ].map(({ id, label }) => (
                    <a
                      key={id}
                      className="text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200 text-lg"
                      onClick={() => {
                        onNav(id);
                        setIsMobileMenuOpen(false);
                      }}
                      aria-label={`Navigate to ${label} on mobile`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && (onNav(id), setIsMobileMenuOpen(false))}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>

        {/* Right Section: Actions and Icons */}
        <div className="flex items-center gap-3">
          {/* Coins Icon */}
          <span
            role="button"
            tabIndex={0}
            aria-label="Buy coins"
            onClick={onBuyClick}
            onKeyDown={(e) => e.key === 'Enter' && onBuyClick()}
            className="relative p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
          >
            <Coins className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            {isClient && currentClient && (
              <span className="absolute -top-1 -right-1 inline-flex min-w-[20px] h-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-semibold">
                {currentClient.coins}
              </span>
            )}
          </span>

          {/* Notifications */}
          <NotificationBell unread={unreadCount} items={notifications} onOpen={onNotificationsOpen} />

          {/* User Icon */}
          <span
            role="button"
            tabIndex={0}
            aria-label="Login or Register"
            onClick={onRegisterClick}
            onKeyDown={(e) => e.key === 'Enter' && onRegisterClick()}
            className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
          >
            <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </span>

          {/* Theme Toggle */}
          <ThemeToggleIcon />
        </div>
      </div>
    </header>
  );
}