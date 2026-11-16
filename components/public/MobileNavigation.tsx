'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/public/ThemeToggle';

type NavigationItem = {
  href: string;
  label: string;
};

export default function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:text-[#2563EB]"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${isOpen ? 'block' : 'hidden'} absolute inset-x-0 top-full z-50 border-t border-slate-200 bg-white p-4 shadow-lg md:hidden`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-[#2563EB]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/start-a-project"
            onClick={closeMenu}
            className="mt-2 rounded-full bg-[#2563EB] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
          >
            Start a Project
          </Link>
        </div>
      </nav>
    </div>
  );
}
