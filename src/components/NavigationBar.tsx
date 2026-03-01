'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { NavigationBarProps, NavLink } from '@/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Farms', href: '/farms' },
  { label: 'About', href: '/about' },
];

export function NavigationBar({ siteName = 'FarmCraft' }: NavigationBarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <header className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
      <nav aria-label="Main navigation" className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-800 rounded px-2 py-1"
            >
              <Image
                src="/logo.png"
                alt="FarmCraft Logo"
                width={150} // Slightly reduced to keep the h-16 clean
                height={150}
                className="rounded-sm object-contain"
              />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION (Single Instance) */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-4" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ${isActive
                          ? 'bg-green-900 text-white border-b-2 border-green-400 rounded-b-none'
                          : 'hover:bg-green-700 hover:text-white'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU (With Active State) */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden pb-3">
            <ul className="px-2 pt-2 space-y-1" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                          ? 'bg-green-900 text-white border-l-4 border-green-400'
                          : 'hover:bg-green-700 hover:text-white'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}