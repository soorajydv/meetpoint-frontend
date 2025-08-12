'use client'

import { useState, useEffect } from 'react';
import Logo from './logo';
import NotificationBell from './notification-bell';
import { Coins, User, X } from 'lucide-react';
import type { Client, InAppNotification } from '@/lib/types';
import ThemeToggleIcon from './theme-toggle-icon';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavPanelOpen, setIsNavPanelOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'how', label: 'How it Works' },
    { id: 'pros', label: 'Professionals' },
    { id: 'pricing', label: 'Coins' },
    { id: 'faq', label: 'FAQs' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  const toggleNavPanel = () => setIsNavPanelOpen(!isNavPanelOpen);

  return (
    <>
      <header
        className={`fixed top-0 z-30 w-full ${isScrolled
            ? 'bg-white/90 dark:bg-slate-950/80 border-b border-teal-100/50 dark:border-white/10 shadow-sm'
            : 'bg-transparent border-b border-transparent'
          } backdrop-blur-md transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left side: Logo & Name */}
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          {/* Right side: Notification Bell and Hamburger on mobile */}
          <div className="flex items-center gap-3">
            <NotificationBell unread={unreadCount} items={notifications} onOpen={onNotificationsOpen} />

            <button
              onClick={toggleNavPanel}
              aria-label="Toggle navigation panel"
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
            >
              {!isNavPanelOpen ? (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <X className="h-8 w-8" />
              )}
            </button>

            {/* Desktop full nav */}
            <nav className="hidden md:flex items-center gap-8 text-base font-medium">
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
                  onClick={() => onNav(id)}
                  aria-label={`Navigate to ${label}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onNav(id)}
                >
                  {label}
                </a>
              ))}
              {/* Coins Icon */}
              <span
                role="button"
                tabIndex={0}
                aria-label="Buy coins"
                onClick={onBuyClick}
                onKeyDown={(e) => e.key === 'Enter' && onBuyClick()}
                className="relative p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200 cursor-pointer"
              >
                <Coins className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                {isClient && currentClient && (
                  <span className="absolute -top-1 -right-1 inline-flex min-w-[22px] h-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-semibold px-1.5">
                    {currentClient.coins}
                  </span>
                )}
              </span>

              {/* User Icon */}
              <span
                role="button"
                tabIndex={0}
                aria-label="Login or Register"
                onClick={onRegisterClick}
                onKeyDown={(e) => e.key === 'Enter' && onRegisterClick()}
                className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200 cursor-pointer"
              >
                <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </span>

              {/* Theme Toggle */}
              <ThemeToggleIcon />
            </nav>
          </div>
        </div>
      </header>

      {/* Side Nav Panel (right side) */}
      {isNavPanelOpen && (
        <>
          {/* Background overlay with blur */}
          <div
            onClick={() => setIsNavPanelOpen(false)}
            className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Side panel from right */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation panel"
            className="fixed top-0 right-0 h-full w-1/2 max-w-xs bg-white dark:bg-slate-900 shadow-xl z-50 flex flex-col p-6 gap-8 overflow-y-auto"
            style={{ transition: 'transform 0.3s ease-in-out' }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsNavPanelOpen(false)}
              aria-label="Close navigation panel"
              className="self-end p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
            >
              <X className="h-7 w-7" />
            </button>

            {/* Nav Links */}
            <nav className="flex flex-col gap-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  onClick={() => {
                    onNav(id);
                    setIsNavPanelOpen(false);
                  }}
                  aria-label={`Navigate to ${label}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && (onNav(id), setIsNavPanelOpen(false))}
                  className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>

            <hr className="border-teal-200 dark:border-teal-700" />

            {/* Buy Coins button */}
            <button
              onClick={() => {
                onBuyClick();
                setIsNavPanelOpen(false);
              }}
              aria-label="Buy coins"
              className="flex items-center gap-2 p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 justify-center"
            >
              <Coins className="h-6 w-6" />
              Buy Coins
              {isClient && currentClient && (
                <span className="ml-2 inline-flex min-w-[22px] h-6 items-center justify-center rounded-full bg-teal-800 text-white text-xs font-semibold px-1.5">
                  {currentClient.coins}
                </span>
              )}
            </button>

            {/* Login/Register button */}
            <button
              onClick={() => {
                onRegisterClick();
                setIsNavPanelOpen(false);
              }}
              aria-label="Login or Register"
              className="flex items-center gap-2 p-3 border border-teal-600 hover:bg-teal-600 hover:text-white rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 justify-center"
            >
              <User className="h-6 w-6" />
              Login / Register
            </button>

            {/* Theme Toggle at bottom */}
            <div className="mt-auto">
              <ThemeToggleIcon />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
